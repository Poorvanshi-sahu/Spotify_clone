import React from 'react'

const PasswordInput = ({label,placeholder}) => {
  return (
    <div className='flex flex-col w-full'>
         <label for={label} className='pb-3 font-semibold'>{label}</label>
         <input type="password" placeholder={placeholder} className='border border-solid p-3 border-grey-300'/>
    </div>
  )
}

export default PasswordInput;