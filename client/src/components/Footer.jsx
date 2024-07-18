import { Footer, FooterLink } from "flowbite-react"
import { FaDiscord, FaDribbble, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';


const FooterCon = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
              <span className="">Echo<span className="bg-black text-white px-2 rounded-sm text-md">Write</span></span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-8 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <FooterLink>100 JS Projects</FooterLink>
                <FooterLink href="/about">About</FooterLink>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <FooterLink>Github</FooterLink>
                <FooterLink href="">Discord</FooterLink>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <FooterLink>Privacy Policy</FooterLink>
                <FooterLink href="">Terms &amp; Conditions</FooterLink>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="" by="echowrite" year={new Date().getFullYear()} />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="" icon={FaFacebook} />
            <Footer.Icon href="" icon={FaInstagram} />
            <Footer.Icon href="" icon={FaTwitter} />
            <Footer.Icon href="" icon={FaDribbble} />
            <Footer.Icon href="" icon={FaDiscord} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
export default FooterCon