import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = '100px', height = '100px'}) {
  return (
    <img src={logo} alt="Logo" style={{width,height}} />
  )
}

export default Logo