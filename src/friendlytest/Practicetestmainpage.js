import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

const Practicetestmainpage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [number, setNumber] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    const numValue = parseInt(value, 10);

    if (value === "" || (numValue >= 10 && numValue <= 20)) {
      setNumber(value);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    {
      id: "tab1",
      label: "Aptitude",
      content: aptitudeTopics,
    },
    {
      id: "tab2",
      label: "Verbal Reasoning",
      content: verbalReasoning,
    },
    {
      id: "tab3",
      label: "Non Verbal Reasoning",
      content: nonVerbalReasoning,
    },
    {
      id: "tab4",
      label: "Verbal Ability",
      content: verbalAbility,
    },
    {
      id: "tab5",
      label: "Programming",
      content: programming,
    },
    {
      id: "tab6",
      label: "Operating System",
      content: operatingsystem,
    },
    {
      id: "tab7",
      label: "Computer Networks",
      content: computernetworks,
    },
    {
      id: "tab8",
      label: "DBMS",
      content: dbms,
    },
    {
      id: "tab9",
      label: "Data Strcutures & Algorithms",
      content: dsa,
    },
    {
      id: "tab10",
      label: "COA",
      content: computerarchitecture,
    },
    {
      id: "tab11",
      label: "Software Engineering",
      content: softwareengineering,
    },

    // Add more tabs here as needed
  ];

  const handleClick = (event) => {
    event.preventDefault();
    if (selectedTopics.length === 0 && !number) {
      toast.error("Please select at least one topic and enter a number.", {
        position: "bottom-left",
      });
    } else if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic.", {
        position: "bottom-left",
      });
    } else if (!number) {
      toast.error("Please enter a number.", {
        position: "bottom-left",
      });
    } else {
      toast.success("Creating Your Test..");
      // Use encodeURIComponent to safely handle special characters in URLs
      const topics = selectedTopics.join("_");
      const url = `/customisetest/${encodeURIComponent(topics)}/${number}`;
      window.location.href = url;
    }
  };

  const handleSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="mt-12 text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-2">
          <div className="relative overflow-hidden">
            <div class="mt-12 text-center">
              <h1 class="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-neutral-200">
                Create Unlimited Free{" "}
                <p class="text-blue-500">Customise Test</p>
              </h1>
              <p class="text-xs font-semibold text-gray-500 tracking-wide uppercase mt-3 dark:text-neutral-200">
                Create unlimited customized topic-wise tests, gain insights, and
                practice for free.
              </p>
            </div>
            <div className="mt-12 p-4">
              <form>
                <div class="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-gray-100 border rounded-lg shadow-lg shadow-gray-100 ">
                  <div class="w-full pb-2 sm:pb-0">
                    <label
                      for="hs-hero-name-1"
                      class="block text-sm font-medium"
                    >
                      <span class="sr-only text-gray-900">
                        Enter Total Number Of Questions You Want.
                      </span>
                    </label>
                    <input
                      type="number"
                      id="numberInput"
                      value={number}
                      onChange={handleChange}
                      min="10"
                      max="20"
                      className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Enter Total Number Of Questions"
                    />
                  </div>

                  <div className="whitespace-nowrap pt-2 sm:pt-0 grid sm:block">
                    <button
                      className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={handleClick}
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              </form>
              {/* {number && (
                <p className="mt-2 text-gray-600">
                  You entered: <strong>{number}</strong>
                </p>
              )} */}
            </div>
            <div className="mt-20 flex flex-wrap">
              <div class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                <div className="border-e border-gray-200">
                  <nav
                    className="flex flex-col space-y-2"
                    aria-label="Tabs"
                    role="tablist"
                    aria-orientation="horizontal"
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        className={`hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 py-1 pe-4 inline-flex items-center gap-x-2 border-e-2 text-sm whitespace-nowrap focus:outline-none focus:text-blue-600 ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-800 hover:text-blue-600"
                        }`}
                        aria-selected={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        role="tab"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              <div class="w-full lg:w-3/4 px-2">
                <div className="ms-3 ">
                  {tabs.map(
                    (tab) =>
                      activeTab === tab.id && (
                        <div
                          key={tab.id}
                          id={`vertical-tab-with-border-${tab.id}`}
                          role="tabpanel"
                          aria-labelledby={`vertical-tab-with-border-item-${tab.id}`}
                        >
                          <div className="text-gray-500 text-lg">
                            <div>
                              <div className="flex flex-wrap">
                                {tab.content.map((topic, index) => (
                                  <>
                                    <button
                                      key={index}
                                      className={`m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                                        selectedTopics.includes(
                                          topic.link.replace("practice/", "")
                                        )
                                          ? "ring-2 ring-blue-500"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleSelect(
                                          topic.link.replace("practice/", "")
                                        )
                                      }
                                    >
                                      {topic.icon}
                                      {topic.name}
                                    </button>
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div class="flex flex-wrap mt-24 mx-4 mb-8">
        <div class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
          <div className="mt-10 sm:mt-20">
            {selectedTopics.length > 0 && (
              <div className="mt-5">
                <h2 className="text-lg font-semibold">Selected Topics:</h2>
                <ul className="list-disc list-inside">
                  {selectedTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
                {selectedTopics.join("_")}
              </div>
            )}
          </div>
        </div>
      </div> */}
      <Toaster />
      <Footer />
    </div>
  );
};

export default Practicetestmainpage;
