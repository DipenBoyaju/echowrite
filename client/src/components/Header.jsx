import { Avatar, Button, Dropdown, Navbar, TextInput, theme } from "flowbite-react"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from "../redux/theme/themeSlice"

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <Navbar className="border-b-2">
      <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="">Echo<span className="bg-black text-white px-2 rounded-sm text-md">Write</span></span>
      </Link>
      <form action="">
        <TextInput type="text" placeholder="Search" rightIcon={AiOutlineSearch} className="hidden lg:inline" />
      </form>
      <Button className="w-12 h-10 lg:hidden" color='gray' pill><AiOutlineSearch className="text-lg" /></Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden lg:inline " color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />
          }
        </Button>
        {
          currentUser ?
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }>
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown> :
            <Link to='/signin'>
              <Button outline gradientDuoTone='purpleToBlue' className="focus:outline-none">
                Sign In
              </Button>
            </Link>
        }

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/About'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header