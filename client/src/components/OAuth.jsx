import { FaGoogle } from "react-icons/fa"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import app from '../firebase.js'
import { useDispatch } from "react-redux";
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'


const OAuth = () => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data))
        nav('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full">
      <div className="border rounded-md border-zinc-900 py-3 px-4 flex gap-3 items-center text-md font-semibold justify-center hover:bg-zinc-800 dark:hover:bg-zinc-200 dark:hover:text-black hover:text-white dark:border-zinc-200 transition-all duration-500 cursor-pointer" onClick={handleGoogleClick}>
        <FaGoogle className="w-6 h-6" />Continue with Google
      </div>
    </div>
  )
}
export default OAuth