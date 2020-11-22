import React, { useEffect } from 'react'
import css from '../../styles/styles.scss'

export default function Button() {
  useEffect(() => {
    return () => {}
  }, [])
  return <button class="bubblyButton">Click me!</button>
}
