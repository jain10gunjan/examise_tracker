import React, { useEffect, useState, useMemo } from "react";
//import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomeComponent = () => {
  const [text, setText] = useState("");

  const isTyping = true;

  const messages = useMemo(
    () => [
      "Aptitude",
      "Coding",
      "Verbal Ability",
      "DSA",
      "Operating System",
      "Computer Networks",
    ],
    []
  );

  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let timer;

    const type = () => {
      if (currentIndex === messages.length) {
        currentIndex = 0; // Reset to the beginning of the messages array
      }

      if (currentText.length === messages[currentIndex].length) {
        clearTimeout(timer);
        timer = setTimeout(erase, 1000); // Display each message for 1 second before erasing
        return;
      }

      currentText = messages[currentIndex].slice(0, currentText.length + 1);
      setText(currentText);

      timer = setTimeout(type, 100); // Adjust typing speed here
    };

    const erase = () => {
      if (currentText.length === 0) {
        currentIndex++;
        timer = setTimeout(type, 500); // Delay before typing the next message
        return;
      }

      currentText = currentText.slice(0, currentText.length - 1);
      setText(currentText);

      timer = setTimeout(erase, 50); // Adjust erasing speed here
    };

    if (isTyping) {
      timer = setTimeout(type, 1000); // Start typing after 1 second
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [isTyping, messages]);

  return (
    <>
      <Navbar />

      <section>
        <div className="rain-container">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="raindrop" />
          ))}
        </div>

        <div>
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-8">
            <div class="flex justify-center">
              <div class="group inline-flex items-center bg-gray-100/10 hover:bg-gray-800/10 border border-gray-600/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-gray-600/10">
                <p class="me-2 text-sm">Examise is live. {`[β Version]`}</p>
                <span class="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-sm">
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
              </div>
            </div>

            <div class="max-w-3xl text-center mx-auto">
              <h1 class="block font-medium text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Now it's easier to practice{" "}
                <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                  {text}
                </span>
              </h1>
            </div>

            <div class="max-w-3xl text-center mx-auto">
              <p class="text-lg text-gray-600/70">
                Examise: Your ultimate MCQ hub for all your needs—practice,
                create custom tests, and track your progress, all in one place.
              </p>
            </div>
          </div>
        </div>

        <div class="max-w-6xl px-4 mt-24 sm:px-6 lg:px-8 lg:mt-14 mx-auto">
          <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center lg:justify-between">
            <div class="lg:col-span-4 lg:col-start-1">
              <div class="mb-8">
                <h2 class="mb-2 text-3xl text-gray-800 font-bold lg:text-4xl">
                  Our Products
                </h2>
                <p class="text-gray-600">
                  We offer a comprehensive range of products designed to meet
                  all your needs, from practicing and testing your knowledge to
                  mastering every subject area. Whether you're preparing for
                  exams or sharpening your skills, we've got you covered.
                </p>
              </div>

              <blockquote class="relative">
                <svg
                  class="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-200"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"
                  />
                </svg>

                <div class="relative">
                  <p class="text-xl italic text-gray-800">
                    One day, all your hard work will pay off.
                  </p>
                </div>

                <footer class="mt-6">
                  <div class="flex items-center gap-x-4">
                    <div class="grow">
                      <div class="font-semibold text-gray-800">From Team </div>
                      <div class="text-xs text-gray-500">Examise.in</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div class="mt-10 lg:mt-0 lg:col-span-8 lg:col-end-13">
              <div class="space-y-6 sm:space-y-4">
                <ul class="grid grid-rows-1 md:grid-cols-3 divide-y divide-y-2 divide-x divide-x-2 divide-gray-200 overflow-hidden">
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8 hover:bg-gray-200 hover:cursor-pointer">
                    <a href="/tracker">
                      <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                          />
                        </svg>
                        <p className="text-lg">MCQ Tracker</p>
                      </div>
                      <p class="text-sm sm:text-base text-gray-600">
                        Track Your Mastery: Tailored MCQ Progress Insights
                      </p>
                    </a>
                  </li>
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8 hover:bg-gray-200 hover:cursor-pointer">
                    <a href="/dsatracker">
                      <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                          />
                        </svg>
                        <p className="text-lg">DSA Tracker</p>
                      </div>
                      <p class="text-sm sm:text-base text-gray-600">
                        Conquer DSA: Track Your Algorithmic Journey
                      </p>
                    </a>
                  </li>
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8 hover:bg-gray-200 hover:cursor-pointer">
                    <a href="/practiceunlimited">
                      <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                          />
                        </svg>
                        <p className="text-lg">Custom Practice</p>
                      </div>
                      <p class="text-sm sm:text-base text-gray-600">
                        Personalized Drills: Practice Made Just for You
                      </p>
                    </a>
                  </li>
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8 hover:bg-gray-200 hover:cursor-pointer">
                    <a href="/freetest">
                      <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                          />
                        </svg>
                        <p className="text-lg">Customise Test</p>
                      </div>
                      <p class="text-sm sm:text-base text-gray-600">
                        Limitless Testing: Craft Your Own Challenges
                      </p>
                    </a>
                  </li>
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8 hover:bg-gray-200 hover:cursor-pointer">
                    <a href="/top100codes">
                      <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                          />
                        </svg>
                        <p className="text-lg">Top 100 Codes</p>
                      </div>
                      <p class="text-sm sm:text-base text-gray-600">
                        Crack the Code: Explore the Top 100 Essential Problems
                      </p>
                    </a>
                  </li>
                  <li class="flex flex-col -m-0.5 p-4 sm:p-8 hover:bg-gray-200 hover:cursor-pointer">
                    <a href="https://test.examise.in">
                      <div class="flex items-end gap-x-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                          />
                        </svg>
                        <p className="text-lg">Host Test</p>
                      </div>
                      <p class="text-sm sm:text-base text-gray-600">
                        Be the Host: Launch Your Own Tests and Contests
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
            <div class="lg:col-span-4">
              <div class="lg:pe-6 xl:pe-12">
                <p class="text-5xl font-bold leading-10 text-blue-600">
                  42K+
                  <span class="ms-1 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2">
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    </svg>
                    +4K+ this month
                  </span>
                </p>
                <p class="mt-2 sm:mt-3 text-gray-500">
                  Collection of MCQs Across All Subjects.
                </p>
              </div>
            </div>

            <div class="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:">
              <div class="grid gap-6 sm:gap-8">
                <div>
                  <p class="mt-1 text-gray-500">
                    We offer an extensive collection of over 42,000+ MCQs
                    spanning across all subjects, ensuring comprehensive
                    coverage of a wide range of topics. Our database is
                    continually expanding as we regularly add new problems to
                    keep you updated with the latest and most relevant content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="max-w-7xl px-4 lg:px-6 lg:px-8 py-12 lg:py-24 mx-auto">
            <blockquote class="max-w-6xl mx-auto">
              <p class="mb-6 md:text-lg">
                <span class="font-semibold text-blue-400">Message,</span>{" "}
                <span class="text-neutral-500">From Team Examise.in</span>
              </p>

              <p class="text-sm sm:text-lg md:text-xl md:leading-normal">
                We've meticulously considered every detail in the creation of
                this product to ensure it meets the highest standards. However,
                we value your feedback and are always open to new ideas and
                suggestions to make it even better. Rest assured, we've done our
                utmost to deliver the best experience possible. For a
                comprehensive overview, please refer to the demo video provided
                below.
              </p>

              <footer class="mt-6 md:mt-10">
                <div class="border-neutral-700">
                  <button
                    type="button"
                    class="group inline-flex items-center gap-x-3 text-neutral-400 text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span class="size-8 md:size-10 flex flex-col justify-center items-center text-black rounded-full group-hover:bg-blue-400 group-focus:bg-blue-400">
                      <svg
                        class="shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                      </svg>
                    </span>
                    Watch the Video
                  </button>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default HomeComponent;
