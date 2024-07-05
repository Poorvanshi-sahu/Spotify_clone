import React from 'react'

const TextInput = ({label, placeholder, className}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
         <label for={label} className='pb-3 font-semibold'>{label}</label>
         <input type="text" placeholder={placeholder} className='border border-solid p-3 border-grey-300'/>
    </div>
  )
}

export default TextInput;