import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const nav = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      // return setErrorMessage('Please fill out all fields')
      return dispatch(signInFailure('Please fill out all fields'))
    }
    try {
      dispatch(signInStart);
      // setLoading(true);
      // setErrorMessage(null);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message))
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data))
        nav('/')
      }
    } catch (error) {
      // setErrorMessage(error.message)
      // setLoading(false);
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to='/' className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
            <span className="md:text-4xl">Echo<span className="bg-black text-white px-2 rounded-sm">Write</span></span>
          </Link>
        </div>
        <div className="space-y-4 flex-1">
          <div className="border rounded-md border-zinc-900 py-3 px-4 flex gap-3 items-center text-md font-semibold justify-center hover:bg-zinc-800 hover:text-white transition-all duration-500 cursor-pointer">
            <FaGoogle />Continue with Google
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-xl font-semibold uppercase text-center relative bg-white px-2">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label value="Email" className="text-md font-semibold" />
              <TextInput type="email" placeholder="email@mail.com" id="email" onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label value="Password" className="text-md font-semibold" />
              <TextInput type="password" placeholder="********" id="password" onChange={handleChange} />
            </div>
            <Button type="submit" gradientDuoTone='pinkToOrange' className="text-white font-semibold" size='lg' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading ...</span>
                  </>
                ) :
                  'Sign In'
              }
            </Button>
          </form>
          <div className="">
            <p>Dont Have an Account <span className="cursor-pointer text-pink-500 font-semibold" onClick={() => nav('/signup')}>Sign Up</span></p>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div >
  )
}
export default SignIn