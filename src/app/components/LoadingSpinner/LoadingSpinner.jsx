'use client'
import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="ls-overlay">
      <div className="ls-card">
        <div className="ls-ring"></div>
        <span className="ls-text">Please Wait...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner