import React from 'react'

function Buttons(
    {children,
         className = '',
        type = 'button',
    textcolor= 'text-black',
    bgColor = 'bg-blue-500',
...props}

) {
  return (
   <button className={
    `px-4 py-2 rounded-lg ${bgColor} ${textcolor} ${className}`}
    {...props}>
    {children}
   </button>
  )
}

export default Buttons