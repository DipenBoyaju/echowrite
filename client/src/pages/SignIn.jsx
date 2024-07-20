import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

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
    <div className="min-h-screen mt-20 sm:px-10 lg:px-0">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 sm:text-center lg:text-left">
          <Link to='/' className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white text-black">
            <span className="md:text-4xl">Echo<span className="bg-black dark:bg-white text-white px-2 rounded-sm dark:text-black">Write</span></span>
          </Link>
        </div>
        <div className="space-y-4 flex-1">
          <div className="w-full text-center">
            <OAuth />
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-xl font-semibold uppercase text-center relative px-2">or</span>
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
          <div className="sm:text-center lg:text-left">
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