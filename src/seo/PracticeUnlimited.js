import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  verbalAbility,
  programming,
  operatingsystem,
  computernetworks,
  dsa,
  computerarchitecture,
  dbms,
  softwareengineering,
  aptitudeTopics,
  verbalReasoning,
  nonVerbalReasoning,
} from "../components/small-code/TopicListData"; // Adjust the path as needed

const PracticeUnlimited = () => {
  const [data, setData] = useState([]);
  const [points, setPoints] = useState(0);

  const tabs = [
    "Aptitude",
    "Verbal Reasoning",
    "Non Verbal Reasoning",
    "Verbal Ability",
    "Programming",
    "OS",
    "CN",
    "DBMS",
    "DSA",
    "COA",
    "SE",
  ];
  const defaultTab = "Aptitude";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [correctlyAnsweredQuestionIds, setCorrectlyAnsweredQuestionIds] =
    useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isTopicsSelected, setIsTopicsSelected] = useState(false);
  const apiEndpoint =
    "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/practiceunlimited";

  const fetchDataInitial = async () => {
    toast("Fetching questions...");
    await fetchData();
    setIsTopicsSelected(true);
  };

  const fetchData = async (retryCount = 0, maxRetries = 5) => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          topics: selectedTopics.join(","),
        },
      });
      const question = response.data;
      if (!correctlyAnsweredQuestionIds.includes(question?._id)) {
        setData(question);
        setShowSolution(false);
        toast.success("Question fetched.");
      } else if (retryCount < maxRetries) {
        await fetchData(retryCount + 1, maxRetries);
      } else {
        toast.error("Max retries reached. No new questions available.");
      }
    } catch (error) {
      toast.error("Error fetching data.");
      console.error(error);
    }
  };

  const handleOptionClick = async (option) => {
    if (option === data[0]?.correct_option) {
      toast.success("Correct option", {
        position: "top-left",
      });
      setCorrectlyAnsweredQuestionIds([
        ...correctlyAnsweredQuestionIds,
        data[0]?._id,
      ]);
      setPoints(points + 100);
    } else {
      toast.error("Wrong option", {
        position: "top-left",
      });
    }
    setShowSolution(true);
  };

  const handleNext = async () => {
    await fetchData();
  };

  const handleOkClick = () => {
    if (selectedTopics.length > 0) {
      fetchDataInitial();
    } else {
      toast.error("Please select at least one topic.", {
        position: "bottom-left",
      });
    }
  };

  const handleSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const tabContents = {
    Aptitude: (
      <div>
        <div className="flex flex-wrap">
          {aptitudeTopics.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.topic)
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.topic)}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    "Verbal Reasoning": (
      <div>
        <div className="flex flex-wrap">
          {verbalReasoning.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.topic)
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.topic)}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    "Non Verbal Reasoning": (
      <div>
        <div className="flex flex-wrap">
          {nonVerbalReasoning.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    "Verbal Ability": (
      <div>
        <div className="flex flex-wrap">
          {verbalAbility.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    Programming: (
      <div>
        <div className="flex flex-wrap">
          {programming.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    OS: (
      <div>
        <div className="flex flex-wrap">
          {operatingsystem.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    CN: (
      <div>
        <div className="flex flex-wrap">
          {computernetworks.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    DBMS: (
      <div>
        <div className="flex flex-wrap">
          {dbms.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    DSA: (
      <div>
        <div className="flex flex-wrap">
          {dsa.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    COA: (
      <div>
        <div className="flex flex-wrap">
          {computerarchitecture.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
    SE: (
      <div>
        <div className="flex flex-wrap">
          {softwareengineering.map((topic, index) => (
            <button
              key={index}
              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                selectedTopics.includes(topic.link.replace("practice/", ""))
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelect(topic.link.replace("practice/", ""))}
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <>
      <div>
        <Navbar />

        <MathJaxContext>
          <section class="mt-12 text-gray-600 body-font">
            <div class="container mx-auto flex flex-col px-5 py-2 justify-center items-center">
              <div class="relative overflow-hidden">
                <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                  <div class="text-center">
                    <h1 class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">
                      Practice Unlimited
                    </h1>

                    <p class="mt-3 text-gray-600 dark:text-neutral-400">
                      Practice without limits by selecting multiple topics of
                      your choice from a diverse range of subjects.
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-full md:w-2/3 flex flex-col mb-16 relative">
                {!isTopicsSelected && (
                  <>
                    <div className="mb-8 overflow-x-auto scrolling-touch">
                      <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                          <button
                            key={tab}
                            className={`${
                              activeTab === tab
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            } px-4 py-2 border-b-2 font-medium`}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">{tabContents[activeTab]}</div>

                    <button
                      onClick={handleOkClick}
                      class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Practice
                    </button>
                  </>
                )}

                {/* Topic Selection */}
                {/* {!isTopicsSelected && (
                  <div class="mb-4">
                    <p class="text-lg font-bold">Select Topics:</p>
                    <label>
                      <input
                        type="checkbox"
                        value="average"
                        onChange={handleTopicChange}
                      />{" "}
                      Average
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="partnership"
                        onChange={handleTopicChange}
                      />{" "}
                      Partnership
                    </label>
                    {/* Add more topics as needed */}
                {/* <button
                      onClick={handleOkClick}
                      class="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      OK
                    </button>
                  </div> */}
                {/* )} */}

                {/* Display question and options if topics are selected */}
                {isTopicsSelected && data.length > 0 && (
                  <div>
                    <div>
                      <p className="text-sm font-bold"> Topics Selected:</p>
                      <div className="flex flex-wrap mb-4">
                        {selectedTopics.map((topic, index) => (
                          <>
                            <button
                              key={index}
                              className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700`}
                            >
                              {topic}
                            </button>
                          </>
                        ))}
                      </div>
                    </div>
                    <div class="relative question-numbercontainer">
                      <p class="text-xs text-gray-600">
                        Aptitude Questions <br />
                        Chapter : {data[0]?.topic}{" "}
                      </p>
                      <p class="text-xs text-gray-600">
                        Difficulty : {data[0]?.difficulty}{" "}
                      </p>
                    </div>
                    <MathJax>
                      <div class="questioncontainer">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.question,
                          }}
                        />
                      </div>
                    </MathJax>
                    <div class="flex-col leading-none optionscontainer">
                      <MathJax>
                        <div
                          onClick={() => handleOptionClick("A", data[0]?._id)}
                          id="A"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["A"],
                          }}
                        ></div>
                      </MathJax>
                      <MathJax>
                        <div
                          onClick={() => handleOptionClick("B", data[0]?._id)}
                          id="B"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["B"],
                          }}
                        ></div>
                      </MathJax>
                      <MathJax>
                        <div
                          onClick={() => handleOptionClick("C", data[0]?._id)}
                          id="C"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["C"],
                          }}
                        ></div>
                      </MathJax>
                      <MathJax>
                        <div
                          onClick={() => handleOptionClick("D", data[0]?._id)}
                          id="D"
                          dangerouslySetInnerHTML={{
                            __html: data[0]?.options["D"],
                          }}
                        ></div>
                      </MathJax>
                    </div>
                    {/* Display Solution and Next Button */}
                    {showSolution && (
                      <div class="relative mt-4 flex flex-col">
                        <div class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                          <MathJax>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: data[0]?.solution,
                              }}
                            ></p>
                          </MathJax>
                        </div>
                        <button
                          onClick={handleNext}
                          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </MathJaxContext>

        <Toaster />
        <Footer />
      </div>
    </>
  );
};

export default PracticeUnlimited;
