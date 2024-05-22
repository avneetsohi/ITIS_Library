import React from 'react'

export const HighlightText = ({text,type='highlighted-text1'}) => {
  return (
    <span className={`font-bold ${type}`}>
        {text}
    </span>
  )
}
