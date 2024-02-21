// import React from 'react'
import { useForm } from 'react-hook-form';
import {  useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
export type registerFormData={
  fName:string;
  lName:string;
  email:string;
  password:string;
  confirmPassword:string;
}
function Register() {
  const queryClient= useQueryClient()
  const navigate=useNavigate()
  const {showToast}=useAppContext()
  const { 
    register, 
    watch, 
    handleSubmit,
    formState:{errors}
  }=useForm<registerFormData>()

  const mutation=useMutation(apiClient.register, {
    onSuccess:async ()=>{
      showToast({
        message:"Registration Success!",
        type:"Success"
      })
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
    },
    onError:(error:Error)=>{
      showToast({
        message: error.message,
        type:'Error'
      })
      
    }
  });
  const onSubmit=handleSubmit((data)=>{
    mutation.mutate(data)
  })
  return (
    <div className='row mx-auto'>
      <div className='flex flex-col gap-5'>
        <form onSubmit={onSubmit}>
          <h2 className='text-3xl font-bold'>Create An Account</h2>
            <div className='flex flex-col md:flex-row gap-5 '>
              <label className="text-gray-700 font-bold text-sm flex-1">
                First Name
                <input 
                  className="border rounded w-full py-1 px-2 font-normal" 
                  {...register('fName',{required:'First Name is required'})}
                />
                {
                  errors.fName && (
                    <span className='text-red-500'>{errors.fName.message}</span>
                  )
                }
              </label>
              <label className="text-gray-700 font-bold text-sm flex-1">
                Last Name
                <input 
                  className="border rounded w-full py-1 px-2 font-normal"
                  {...register('lName',{required:'First Name is required'})}
                />
                {
                  errors.lName && (
                    <span className='text-red-500'>{errors.lName.message}</span>
                  )
                }
              </label>
            </div>
            <label className="text-gray-700 font-bold text-sm">
              Email
              <input 
                type='email'
                className="border rounded w-full py-1 px-2 font-normal"
                {...register('email',{required:'Email is required'})}
              />
              {
                  errors.email && (
                    <p className='text-red-500'>{errors.email.message}</p>
                  )
                }
            </label>
            <label className="text-gray-700 font-bold text-sm">
              Password
              <input 
                type='password'
                className="border rounded w-full py-1 px-2 font-normal"
                { ...register('password',
                  {required:'Password is required',
                  minLength:{value:6, message:'Password must be more 6 or more characters'}})}
              />
              {
                  errors.password && (
                    <p className='text-red-500'>{errors.password.message}</p>
                  )
                }
            </label>
            <label className="text-gray-700 font-bold text-sm">
              Confirm Password
              <input 
                type='password'
                className="border rounded w-full py-1 px-2 font-normal"
                {...register('confirmPassword',{
                  validate:(val)=>{
                    if(!val){
                      return 'Confirm Password is Required';
                    } else if(watch('password') !== val){
                      return 'Confirm Password did not match'
                    }
                  }
                })}
              />
              {
                  errors.confirmPassword && (
                    <p className='text-red-500'>{errors.confirmPassword.message}</p>
                  )
                }
            </label>
            <span>
              <button type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl mt-2'>Create Account</button>
            </span>
        </form>
      </div>
    </div>
  )
}

export default Register