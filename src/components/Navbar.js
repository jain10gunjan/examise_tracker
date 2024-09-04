import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const Navbar = () => {
  const TRACKING_ID = "G-ZF145CZEKQ";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send an initial pageview
    ReactGA.send("pageview");
    console.log("Sending the google analytics data");
  }, []);

  return (
    <>
      <div>
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 mb-10">
          <nav className="bg-gray-5 00">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-lg px-4">
                    <Link to="/">
                      Examise <sub>.in</sub>
                    </Link>
                  </div>
                  <div className="absolute right-0 hidden md:block">
                    <div className="mx-4 flex space-x-4 ">
                      <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <a href="/tracker">MCQ Tracker</a>
                      </div>
                      <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <a href="/dsatracker">DSA Tracker</a>
                      </div>
                      <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <a href="/practiceunlimited">Practice Unlimited</a>
                      </div>

                      <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <a href="/top100codes">Top 100 Codes</a>
                      </div>
                      <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <a href="/freetest">Free Test</a>
                      </div>

                      <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        <a href="https://test.examise.in">Host Contest</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
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
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
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
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {(ref) => (
                <div className="md:hidden" id="mobile-menu">
                  <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <a href="/tracker">MCQ Tracker</a>
                    </div>
                    <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <a href="/dsatracker">DSA Tracker</a>
                    </div>
                    <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <a href="/practiceunlimited">Practice Unlimited</a>
                    </div>

                    <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <a href="/top100codes">Top 100 Codes</a>
                    </div>
                    <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <a href="/freetest">Free Test</a>
                    </div>

                    <div className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <a href="https://test.examise.in">Host Contest</a>
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
