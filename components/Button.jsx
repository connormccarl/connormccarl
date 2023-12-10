import React from 'react'

export default function Button({ text }) {
  return (
    <button className='button' onClick={(event) => (event.target.innerText += '|')}>{text}</button>
  )
}