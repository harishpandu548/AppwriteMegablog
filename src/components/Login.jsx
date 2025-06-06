import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authservice from '../appwrite/auth';
import { login as authlogin } from '../store/authSlice';
import { Buttons, Input, Logo } from './index';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({});
  const [error, setError] = useState('');

const login = async (data) => {
  try {
    const session = await authservice.login(data); // returns session
    if (session) {
      const user = await authservice.getcurrentUser(); // get actual user details
      if (user) {
        dispatch(authlogin(user)); // ✅ This is what Post.jsx needs
        navigate('/');
      }
    }
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <>
    <div className='absolute mb-130 text-black bg-gray-100 dark:bg-gray-800 dark:text-white'> Login to Read and Edit the posts :) </div>
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-160px)] my-10 px-4  ">
      {/* 160px = combined header/footer approx height, px-4 for padding on small screens */}
      <div className="mx-auto w-full max-w-lg bg-gray-200 dark:bg-gray-500 rounded-xl p-10 border border-black/10 shadow-lg">
        <div className="mb-2 flex justify-center"> 
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl dark:text-gray-200 font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center dark:text-gray-200  text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5 dark:text-gray-900">
            <Input 
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />

            <Buttons type="submit" textcolor="text-dark dark:text-white" className="w-full  hover:bg-blue-600">
              Sign in
            </Buttons>
          </div>
        </form>
      </div>
    </div>
    </>

  );
  
}
export default Login;
