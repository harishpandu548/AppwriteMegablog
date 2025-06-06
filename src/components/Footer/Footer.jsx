import Logo from "../Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 text-black shadow dark:bg-gray-800 dark:text-white  border-t-2 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Logo + Copyright */}
          <div>
            <Logo width="100px" />
            <p className="text-sm  mt-4">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase underline mb-4">
              Company
            </h3>
            <ul className="space-y-2 ">
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">Affiliate Program</Link></li>
              <li><Link to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-103 underline mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link to="/">Account</Link></li>
              <li><Link to="/">Help</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase  underline mb-4">
              Legals
            </h3>
            <ul className="space-y-2">
              <li><Link to="/">Terms &amp; Conditions</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
