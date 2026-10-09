"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronForward, IoChevronBack, IoClose } from "react-icons/io5";
import "./style.css";

/* =========================================
   LIGHTBOX / MEDIA GALLERY (slideable)
   - drag with mouse, swipe on touch, flick to change
   - arrows, thumbnails, ← → keys, Esc to close
   - TOUCH ONLY: pinch to zoom, drag to pan when zoomed,
     double-tap to zoom in / reset (no icons)
========================================= */

const DRAG_THRESHOLD = 6;      // px before a press counts as a drag
const SWIPE_RATIO = 0.18;      // drag 18% of width to change slide
const FLICK_SPEED = 0.5;       // px/ms for a quick flick
const EDGE_RESISTANCE = 0.35;  // rubber-band at first/last image

const MAX_SCALE = 4;           // max pinch zoom
const DOUBLE_TAP_SCALE = 2.5;  // zoom level on double-tap
const DOUBLE_TAP_MS = 300;     // max time between taps
const ZOOM_RESET = { scale: 1, x: 0, y: 0 };

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function Lightbox({ project, index, onClose, onChange }) {
  const images = project.images;
  const total = images.length;

  const stageRef = useRef(null);
  const thumbsRef = useRef(null);
  const imgRefs = useRef([]);
  const drag = useRef({ active: false, moved: false, startX: 0, startT: 0 });

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  /* ---------- ZOOM STATE ---------- */
  const [zoom, setZoomState] = useState(ZOOM_RESET);
  const zoomRef = useRef(ZOOM_RESET);
  const setZoom = useCallback((z) => {
    zoomRef.current = z;
    setZoomState(z);
  }, []);
  const [gesturing, setGesturing] = useState(false); // no transition while fingers move

  const pointers = useRef(new Map()); // active touch points
  const pinch = useRef(null);
  const pan = useRef(null);
  const lastTap = useRef({ t: 0, x: 0, y: 0 });
  const suppressClick = useRef(false);

  const goTo = useCallback(
    (i) => onChange(Math.max(0, Math.min(total - 1, i))),
    [total, onChange]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Reset zoom whenever the image changes
  useEffect(() => {
    setZoom(ZOOM_RESET);
  }, [index, setZoom]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev]);

  // Lock page (background) scroll while open: wheel, touch, keys, Lenis
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    // Smooth-scroll libraries (e.g. Lenis exposed as window.lenis)
    const lenis = window.lenis;
    lenis?.stop?.();

    const inThumbs = (e) => e.target?.closest?.(".ppj_lb_thumbs");

    const blockWheel = (e) => {
      // allow sideways scrolling of the thumbnail strip
      if (inThumbs(e) && Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
    };

    const blockTouch = (e) => {
      if (inThumbs(e)) return; // thumbnail strip can still be swiped
      e.preventDefault();
    };

    const SCROLL_KEYS = [" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"];
    const blockKeys = (e) => {
      if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", blockWheel, { passive: false });
    window.addEventListener("touchmove", blockTouch, { passive: false });
    window.addEventListener("keydown", blockKeys);

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      lenis?.start?.();
      window.removeEventListener("wheel", blockWheel);
      window.removeEventListener("touchmove", blockTouch);
      window.removeEventListener("keydown", blockKeys);
    };
  }, []);

  // Keep active thumbnail in view
  useEffect(() => {
    const active = thumbsRef.current?.querySelector(".ppj_lb_thumb.is-active");
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  /* ---------- ZOOM HELPERS ---------- */

  const stageCenter = () => {
    const r = stageRef.current.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  };

  // Keep the zoomed image covering the screen (no empty gaps when panning)
  const clampZoom = useCallback(
    (scale, x, y) => {
      const img = imgRefs.current[index];
      const stage = stageRef.current;
      if (!img || !stage) return { scale, x, y };
      const maxX = Math.max(0, (img.offsetWidth * scale - stage.clientWidth) / 2);
      const maxY = Math.max(0, (img.offsetHeight * scale - stage.clientHeight) / 2);
      return { scale, x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
    },
    [index]
  );

  const startPinch = () => {
    const [a, b] = [...pointers.current.values()];
    const z = zoomRef.current;
    pinch.current = {
      dist: Math.hypot(b.x - a.x, b.y - a.y) || 1,
      mx: (a.x + b.x) / 2,
      my: (a.y + b.y) / 2,
      scale: z.scale,
      x: z.x,
      y: z.y,
    };
    pan.current = null;
  };

  const startPan = (p) => {
    const z = zoomRef.current;
    pan.current = { sx: p.x, sy: p.y, x: z.x, y: z.y, moved: false };
  };

  // Double-tap on the image: zoom in at the tap point, or reset
  const handleTap = (e) => {
    const now = performance.now();
    const lt = lastTap.current;
    const isDouble =
      now - lt.t < DOUBLE_TAP_MS &&
      Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 30;

    if (!isDouble) {
      lastTap.current = { t: now, x: e.clientX, y: e.clientY };
      return;
    }

    lastTap.current = { t: 0, x: 0, y: 0 };
    suppressClick.current = true;

    if (zoomRef.current.scale > 1) {
      setZoom(ZOOM_RESET);
    } else {
      const { cx, cy } = stageCenter();
      const s = DOUBLE_TAP_SCALE;
      setZoom(clampZoom(s, (e.clientX - cx) * (1 - s), (e.clientY - cy) * (1 - s)));
    }
  };

  /* ---------- POINTER HANDLERS (slide + zoom) ---------- */

  const onPointerDown = (e) => {
    if (e.target.closest("button")) return;

    if (e.pointerType === "touch") {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      // second finger → pinch (cancel any slide drag)
      if (pointers.current.size === 2) {
        drag.current.active = false;
        setDragging(false);
        setDragX(0);
        startPinch();
        setGesturing(true);
        return;
      }
      if (pointers.current.size > 2) return;

      suppressClick.current = false;

      // one finger on a zoomed image → pan instead of slide
      if (zoomRef.current.scale > 1) {
        startPan({ x: e.clientX, y: e.clientY });
        setGesturing(true);
        return;
      }
    } else if (e.button !== 0) {
      return;
    }

    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startT: performance.now(),
    };
  };

  const onPointerMove = (e) => {
    if (e.pointerType === "touch" && pointers.current.has(e.pointerId)) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    /* pinch zoom */
    if (pinch.current && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const pc = pinch.current;
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;

      const s = clamp((pc.scale * dist) / pc.dist, 1, MAX_SCALE);
      const { cx, cy } = stageCenter();
      // keep the point between the fingers under the fingers
      const x = mx - cx - (s * (pc.mx - cx - pc.x)) / pc.scale;
      const y = my - cy - (s * (pc.my - cy - pc.y)) / pc.scale;

      setZoom(clampZoom(s, x, y));
      return;
    }

    /* pan zoomed image */
    if (pan.current) {
      const p = pan.current;
      const dx = e.clientX - p.sx;
      const dy = e.clientY - p.sy;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) p.moved = true;
      setZoom(clampZoom(zoomRef.current.scale, p.x + dx, p.y + dy));
      return;
    }

    /* slide drag */
    const d = drag.current;
    if (!d.active) return;

    let dx = e.clientX - d.startX;

    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(true);
      // capture only once it's a real drag, so normal clicks still work
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }

    const atStart = index === 0 && dx > 0;
    const atEnd = index === total - 1 && dx < 0;
    if (atStart || atEnd) dx *= EDGE_RESISTANCE;

    setDragX(dx);
  };

  const endPointer = (e, cancelled = false) => {
    const isTouch = e.pointerType === "touch";
    if (isTouch) pointers.current.delete(e.pointerId);

    /* pinch ending */
    if (pinch.current) {
      if (pointers.current.size < 2) {
        pinch.current = null;
        suppressClick.current = true;

        if (zoomRef.current.scale <= 1.02) setZoom(ZOOM_RESET);

        // one finger still down on a zoomed image → continue as pan
        if (pointers.current.size === 1 && zoomRef.current.scale > 1) {
          startPan([...pointers.current.values()][0]);
          pan.current.moved = true;
        } else {
          setGesturing(false);
        }
      }
      return;
    }

    /* pan ending */
    if (pan.current) {
      const moved = pan.current.moved;
      pan.current = null;
      setGesturing(false);
      if (moved) {
        suppressClick.current = true;
      } else if (isTouch && !cancelled && e.target.closest(".ppj_lb_img")) {
        handleTap(e);
      }
      return;
    }

    /* slide drag ending */
    const d = drag.current;
    if (!d.active) return;
    d.active = false;

    if (d.moved && !cancelled) {
      const dx = e.clientX - d.startX;
      const dt = Math.max(1, performance.now() - d.startT);
      const width = stageRef.current?.offsetWidth || window.innerWidth;
      const isFlick = Math.abs(dx) / dt > FLICK_SPEED && Math.abs(dx) > 30;

      if (Math.abs(dx) > width * SWIPE_RATIO || isFlick) {
        dx < 0 ? next() : prev();
      }
    }

    setDragging(false);
    setDragX(0);

    if (!d.moved && isTouch && !cancelled && e.target.closest(".ppj_lb_img")) {
      handleTap(e);
    }
  };

  // Drags, pinches and taps on a zoomed image must not close the gallery
  const onClickCapture = (e) => {
    const onButton = e.target.closest("button");
    if (
      drag.current.moved ||
      suppressClick.current ||
      (zoomRef.current.scale > 1 && !onButton)
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
    drag.current.moved = false;
    suppressClick.current = false;
  };

  const trackStyle = {
    transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)`,
    transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  const zoomStyle = {
    transform: `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`,
    transition: gesturing ? "none" : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <div
      className="ppj_lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.heading} gallery`}
      data-lenis-prevent
      onClick={onClose}
    >
      {/* LIQUID GLASS FILTER for the gallery buttons (invisible) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter
            id="ppj-lb-glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="120"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Top bar */}
      <div className="ppj_lb_top" onClick={(e) => e.stopPropagation()}>
        <div className="ppj_lb_title">
          {project.logo_img && (
            <img src={project.logo_img} alt="" className="ppj_lb_logo" />
          )}
          <span>{project.heading}</span>
        </div>
        <span className="ppj_lb_counter">
          {index + 1} / {total}
        </span>
        <button
          className="ppj_lb_close ppj_lb_glass"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <IoClose />
        </button>
      </div>

      {/* Slider */}
      <div
        ref={stageRef}
        className={`ppj_lb_stage ${dragging ? "is-dragging" : ""} ${
          zoom.scale > 1 ? "is-zoomed" : ""
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endPointer(e)}
        onPointerCancel={(e) => endPointer(e, true)}
        onClickCapture={onClickCapture}
      >
        <div className="ppj_lb_track" style={trackStyle}>
          {images.map((src, i) => (
            <div className="ppj_lb_slide" key={i} aria-hidden={i !== index}>
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={src}
                alt={`${project.label} project image ${i + 1}`}
                className="ppj_lb_img"
                style={i === index ? zoomStyle : undefined}
                draggable={false}
                loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              className="ppj_lb_nav ppj_lb_prev ppj_lb_glass"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              disabled={index === 0}
              aria-label="Previous image"
            >
              <IoChevronBack />
            </button>
            <button
              className="ppj_lb_nav ppj_lb_next ppj_lb_glass"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              disabled={index === total - 1}
              aria-label="Next image"
            >
              <IoChevronForward />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div
          className="ppj_lb_thumbs"
          ref={thumbsRef}
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              className={`ppj_lb_thumb ${i === index ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}