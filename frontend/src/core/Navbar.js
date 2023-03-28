import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="shadow-xl mb-5">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img className="h-8 w-auto" src={logo} alt="Stream Mix Logo" />
            </Link>
          </div>

          <div className="flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:flex sm:ml-6">
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className="text-gray-900 hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My videos
                </Link>
                <Link
                  to="/"
                  className="text-gray-900 hover:text-rose-400  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload video
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Link to="/">
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt="avatar"
                className="border border-gray-300 rounded-full w-1/2"
              />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Icon when menu is closed. -->
              <!--
                Heroicon name: menu

                Menu open: "hidden", Menu closed: "block"
              --> */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!-- Icon when menu is open. -->
              <!--
                Heroicon name: x

                Menu open: "block", Menu closed: "hidden"
              --> */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {toggle && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              My videos
            </Link>

            <Link
              to="/"
              className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Upload a video
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
/**
 * <nav className="shadow-2xl flex flex-row items-center justify-between px-10 py-3">
      
      <div className="flex flex-row items-center space-x-5 w-3/4">
        <Link to="/">
          <img src={logo} alt="Stream Mix logo" width={150} className="mr-5" />
        </Link>
        <Link to="/my-videos" className="mx-3 hover:text-rose-400">
          My videos
        </Link>
        <Link to="/upload-video" className="hover:text-rose-400">
          Upload video
        </Link>
      </div>
      <div className="flex">
        <Link>
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
            className="border border-gray-300 rounded-full w-1/2"
          />
        </Link>
      </div>

    </nav>
 */
