import React from 'react';
import { Icon } from '@iconify/react';
import TestInput from '../Components/TextInput';
import PasswordInput from '../Components/PasswordInput';

const LoginComponent = () => {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className="logo p-5 w-full border-b border-solid border-gray-300 flex flex-col items-center">
          <Icon icon="logos:spotify" width={150} />
      </div>
      <div className="inputRegion w-1/3 py-10 flex flex-col items-center justify-center">
        <div className='font-bold mb-12'>To continue, Log in to spotify</div> 
        <TestInput label={"Email address or username"} placeholder={"Email address or username"} className="my-5"/>
        <PasswordInput label={"Password"} placeholder={"Please enter password"}/>
        <button className='bg-green-300 text-lg font-semibold p-3 rounded-full px-8 w-full mt-8'>LOG IN</button>
        <div className='mt-6'><u className='font-bold'>Forgot your Password ?</u></div>
        <div className='border-b border-solid border-gray-200 w-full mt-8'></div>
        <div className='mt-8'>Don't have an account? <u className='font-bold'>Sign up for Spotify.</u></div>
      </div>
    </div>
  )
}

export default LoginComponent;
