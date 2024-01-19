import React from 'react'
import { useNavigate } from 'react-router-dom'
import PandaLogo from "../../assets/pandalogo.png";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/auth.slice';

const LoginPage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const gotoSignup = () => {
    navigation('/signup')
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    dispatch(login({
      data: payload
    }))
  }


  return (
    <div className="w-full h-[100vh] flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-24 w-auto" src={PandaLogo} alt="Panda Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="off" required className="block w-full rounded-md border-0 px-2 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <span className="font-semibold text-pink-600 hover:text-pink-500 cursor-pointer">Forgot password?</span>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="off" required className="block w-full rounded-md border-0 px-2 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <span className="font-semibold leading-6 text-pink-600 hover:text-pink-500 cursor-pointer" onClick={gotoSignup}> Create an account</span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage