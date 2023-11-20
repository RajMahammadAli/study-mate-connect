import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-4 md:p-8">
      <div className="text-center w-full">
        {" "}
        {/* Add text-center class for centering on small devices */}
        <nav className="grid grid-flow-col gap-4 mb-4 md:mb-8 justify-center  w-full">
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press Kit</a>
        </nav>
        <nav className="grid grid-flow-col gap-4 mb-4 md:mb-8 justify-center  w-full">
          <a className="link link-hover">
            <FaYoutube className="text-3xl"></FaYoutube>
          </a>
          <a className="link link-hover">
            <FaFacebookF className="text-3xl" />
          </a>
          <a className="link link-hover">
            <FaTwitter className="text-3xl"></FaTwitter>
          </a>
        </nav>
        <aside className="grid w-full justify-center">
          <p>Copyright © 2023 - All rights reserved by STUDY MATE CONNECT</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
