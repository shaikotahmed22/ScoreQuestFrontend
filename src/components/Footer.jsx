import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import images from "../constants/images";

const Footer = () => {
  return (
    <footer className="bg-primary-darkNavy text-white py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* About ScoreQuest */}
          <div className="md:w-1/3 w-full">
            <img src={images.ScoreQuest} width={150} alt="" />
            <p className="text-secondary-coolGray mt-5">
              ScoreQuest is the premier live cricket scoring app designed for
              local matches. Keep track of your games and share them in
              real-time with players and fans alike.
            </p>
          </div>

          {/* Essential Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Essential Links</h3>
            <ul className="text-gray-300 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Today’s Match
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Finished Matches
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Upcoming Matches
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="text-gray-300 space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@scorequest.com"
                  className="hover:text-white"
                >
                  asif522666@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-white">
                  +8801857610902
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/shaikotahmed.22.asif/"
                  target="_blank"
                  className="text-gray-300 hover:text-white"
                >
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaGithub size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Privacy */}
        <div className="mt-8 border-t border-secondary-coolGray pt-4 text-center text-gray-400">
          <span>Developed By: </span>{" "}
          <a
            href="https://www.facebook.com/shaikotahmed.22.asif/"
            target="_blank"
            className="hover:text-white"
          >
            Shaikot Ahmed Asif
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
