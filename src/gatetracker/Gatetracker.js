import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Gatetracker = () => {
  return (
    <>
      <Navbar />
      <div class=" ">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
          <div class="flex justify-center">
            <a
              class="group inline-flex items-center bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
              href="../figma.html"
            >
              <p class="me-2  text-sm">Examise is Live</p>
              <span class="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold  text-sm">
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          <div class="max-w-3xl text-center mx-auto">
            <h1 class="block font-medium text-gray-800 text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
              GATE Your Way to Success: Practice with Purpose!
            </h1>
          </div>

          <div class="max-w-3xl text-center mx-auto">
            <p class="text-lg /70">
              Enhance your GATE preparation with PYQ's, real-time progress
              tracking, and personalized insights to ensure you're always a step
              closer to success.
            </p>
          </div>
          <div class="text-center">
            <div class="inline-block bg-gray-200 border shadow-sm rounded-full dark:bg-neutral-900 dark:border-neutral-800">
              <div class="py-3 px-4 flex items-center gap-x-2">
                <p class="text-gray-600 dark:text-neutral-400">
                  We are updating our Database for remaining Branches Please
                  Stay Tuned...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-4 mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 lg:mb-14">
          <a
            class="group flex flex-col bg-blue-700  border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
            href="/gate/cse"
          >
            <div class="aspect-w-16 aspect-h-9"></div>
            <div class="p-4 md:p-5 ">
              <p class="mt-2 text-xs uppercase text-white ">CSE</p>
              <h3 class="mt-2 text-lg font-medium text-white group-hover:text-gray-200 ">
                GATE Computer Science and Engineering (CSE)
              </h3>
            </div>
          </a>

          <a
            class="group flex flex-col bg-gray-200 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            href="/"
          >
            <div class="aspect-w-16 aspect-h-9"></div>
            <div class="p-4 md:p-5">
              <p class="mt-2 text-xs uppercase text-white">ME</p>
              <h3 class="mt-2 text-lg font-medium text-white group-hover:text-gray-200 ">
                GATE Mechanical Engineering (ME)
              </h3>
            </div>
          </a>

          <a
            class="group flex flex-col bg-gray-200 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            href="/"
          >
            <div class="aspect-w-16 aspect-h-9"></div>
            <div class="p-4 md:p-5">
              <p class="mt-2 text-xs uppercase text-white">CE</p>
              <h3 class="mt-2 text-lg font-medium text-white group-hover:text-gray-200 ">
                GATE Civil Engineering (CE)
              </h3>
            </div>
          </a>

          <a
            class="group flex flex-col bg-gray-200 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            href="/"
          >
            <div class="aspect-w-16 aspect-h-9"></div>
            <div class="p-4 md:p-5">
              <p class="mt-2 text-xs uppercase text-white"> EC</p>
              <h3 class="mt-2 text-lg font-medium text-white group-hover:text-gray-200 ">
                GATE Electronics and Communications (EC)
              </h3>
            </div>
          </a>
          <a
            class="group flex flex-col bg-gray-200 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            href="/"
          >
            <div class="aspect-w-16 aspect-h-9"></div>
            <div class="p-4 md:p-5">
              <p class="mt-2 text-xs uppercase text-white">EE</p>
              <h3 class="mt-2 text-lg font-medium text-white group-hover:text-gray-200 ">
                GATE Electrical Engineering (EE)
              </h3>
            </div>
          </a>
          <a
            class="group flex flex-col bg-gray-200 border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            href="/"
          >
            <div class="aspect-w-16 aspect-h-9"></div>
            <div class="p-4 md:p-5">
              <p class="mt-2 text-xs uppercase text-white">ISRO</p>
              <h3 class="mt-2 text-lg font-medium text-white group-hover:text-gray-200">
                ISRO Computer Science and Engineering (CSE)
              </h3>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gatetracker;
