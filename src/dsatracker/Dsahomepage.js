import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dsahomepage() {
  return (
    <div>
      <>
        <div>
          <Navbar />
        </div>
      </>
      <div>
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mt-28">
          <div class="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
            <div class="text-center">
              <h1 class="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-neutral-200">
                DSA <span class="text-blue-500">Tracker</span>
              </h1>
              <p class="line-clamp-2	text-lg font-semibold text-gray-500 tracking-wide mb-3 dark:text-neutral-200">
                Deep dive into micro topics with expertly curated questions,
                designed to strengthen your concept learning and prepare you for
                any challenge.
              </p>
            </div>
          </div>
        </div>

        <div class="mx-16 mt-8 mb-10 mb-4 flex flex-col">
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Arrays</h2>
                <Link to="/dsatracker/arrays">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Matrix</h2>
                <Link to="/dsatracker/matrix">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">String</h2>
                <Link to="/dsatracker/strings">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Search and Sort</h2>
                <Link to="/dsatracker/searchandsort">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Linked List</h2>
                <Link to="/dsatracker/linkedlist">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Binary Trees</h2>
                <Link to="/dsatracker/binarytrees">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">BST</h2>
                <Link to="/dsatracker/bst">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>

            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Greedy</h2>
                <Link to="/dsatracker/greedy">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Backtracking</h2>
                <Link to="/dsatracker/backtracking">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Stack and Queues</h2>
                <Link to="/dsatracker/stackandqueues">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Heap</h2>
                <Link to="/dsatracker/heap">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Graph</h2>
                <Link to="/dsatracker/graph">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Trie</h2>
                <Link to="/dsatracker/trie">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Dynamic Programming</h2>
                <Link to="/dsatracker/dynamicprogramming">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div class="ml-4">
                <h2 class="font-semibold">Bit Manupulation</h2>
                <Link to="/dsatracker/bitmanupulation">
                  <p class="mt-2 text-sm text-gray-500">Start Practicing</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dsahomepage;
