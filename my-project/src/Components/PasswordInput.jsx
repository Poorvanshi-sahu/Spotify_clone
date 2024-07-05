import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'

const PasswordInput = ({label,placeholder}) => {
  const [visiblility, setVisibility] = useState(false);
  return (
    <div className='flex flex-col w-full'>
         <label for={label} className='pb-3 font-semibold'>{label}</label>
         <div className='w-full relative'>
            <input type={`${visiblility?'text':"password"}`} placeholder={placeholder} className='border border-solid p-3 border-grey-300 w-full'>
            </input> 
            <Icon icon="arcticons:emoji-eye" width={25} className={`${visiblility?'hidden':'block absolute right-3 top-3 cursor-pointer'}`} onClick={()=>{setVisibility(!visiblility)}}/>
            <Icon icon="arcticons:emoji-eyes" width={25} className={`${visiblility?'block absolute right-3 top-3':'hidden cursor-pointer'}`} onClick={()=>{setVisibility(!visiblility)}}/>
         </div>
    </div>
  )
}

export default PasswordInput;