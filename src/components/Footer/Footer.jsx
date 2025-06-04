import Logo from "../Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-400 border-t-2 border-black py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Logo + Copyright */}
          <div>
            <Logo width="100px" />
            <p className="text-sm text-gray-600 mt-4">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-700 underline mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Features</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Pricing</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Affiliate Program</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-700 underline mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Account</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Help</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Contact Us</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-700 underline mb-4">
              Legals
            </h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Terms &amp; Conditions</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Privacy Policy</Link></li>
              <li><Link className="text-base text-gray-900 hover:text-gray-700" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
