import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type SignInFormType={
    email: string,
    password: string
}
function SignIn() {
    const { showToast }= useAppContext()
    const navigate= useNavigate()
    const queryClient= useQueryClient()
    const { register, formState: {errors}, handleSubmit } = useForm<SignInFormType>()
    const mutation= useMutation(apiClient.signIn,{
        onSuccess: async ()=>{
            showToast({
                message:"User login Successfully",
                type:"Success"
            });
            queryClient.invalidateQueries('validateToken')
            navigate('/')
        },
        onError: async (error: Error)=>{
            showToast({
                message:error.message,
                type:"Error"
            })
        }
    })

    const onSubmit= handleSubmit((data)=>{
        mutation.mutate(data)
    })
  return (
    
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold'>Sign In</h2>
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
        <span className=''>
            <button 
                type='submit' 
                className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl mt-2'
            >
                SignIn
            </button>
            <span className='ps-1'>Not Registered?<Link to="/register" className='underline'>Create an account here</Link> </span>
        </span>
    </form>
    
  )
}

export default SignIn