import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

const ProblemsPagemain = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/codingcontestquestionsapi?q=question`
        );
        console.log(response.data);
        setProblems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const topicname = "Top 100 Codes";

  // Filter problems based on the search term
  const filteredProblems = problems.filter((problem) =>
    problem.problemstatementshort
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
              {topicname.charAt(0).toUpperCase() + topicname.slice(1)}
            </h1>

            <p className="mt-3 text-gray-600">
              Elevate your knowledge by practicing premium, filtered questions
              on the topic of {topicname}.
            </p>

            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form>
                <div className="relative flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                  <div className="w-full">
                    <label
                      htmlFor="hs-search-article-1"
                      className="block text-sm text-gray-700 font-medium"
                    >
                      <span className="sr-only">Search tasks</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Search Problem To Solve  ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <button
                      className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      type="submit"
                    >
                      <svg
                        className="shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>

              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  className="w-40 h-auto text-cyan-500"
                  width="347"
                  height="188"
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 relative overflow-x-auto mx-12">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Problem Statement
                </th>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th scope="row" className="px-6 py-4">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href={`/top100codes/${problem?._id}`}>
                      {problem?.problemstatementshort}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`/top100codes/${problem?._id}`}>Click Here</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProblemsPagemain;
