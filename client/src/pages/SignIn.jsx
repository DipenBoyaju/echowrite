import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const nav = useNavigate()
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

          <form action="" className="flex flex-col gap-3">
            <div className="space-y-1">
              <Label value="Email" className="text-md font-semibold" />
              <TextInput type="email" placeholder="email@mail.com" id="email" />
            </div>
            <div className="space-y-1">
              <Label value="Password" className="text-md font-semibold" />
              <TextInput type="password" placeholder="********" id="password" />
            </div>
            <Button type="submit" gradientDuoTone='pinkToOrange' className="text-white font-semibold" size='lg'>Sign Up</Button>
          </form>
          <div className="">
            <p>Already have an Account <span className="cursor-pointer text-pink-500 font-semibold" onClick={() => nav('/signup')}>Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn