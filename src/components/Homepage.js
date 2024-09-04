import React, { useEffect, useState, useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TabContent from "./small-code/TabContent";
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
} from "./small-code/TopicListData"; // Adjust the path as needed

const Homepage = () => {
  const [text, setText] = useState("");
  const isTyping = true;
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
  const [userData, setUserData] = useState({});

  const messages = useMemo(
    () => [
      "Percentage",
      "Time and Work",
      "Profit and Loss.",
      "Number System",
      "Profit and Loss",
      "Averages",
      "Boats and Streams",
      "Functions",
    ],
    []
  );

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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

  const tabContents = {
    Aptitude: (
      <div>
        {aptitudeTopics.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    "Verbal Reasoning": (
      <div>
        {verbalReasoning.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    "Non Verbal Reasoning": (
      <div>
        {nonVerbalReasoning.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    "Verbal Ability": (
      <div>
        {verbalAbility.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    Programming: (
      <div>
        {programming &&
          programming.map((topics, i) => {
            return <TabContent topics={topics} index={i} userData={userData} />;
          })}
      </div>
    ),
    OS: (
      <div>
        {operatingsystem.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    CN: (
      <div>
        {computernetworks.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    DBMS: (
      <div>
        {dbms.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    DSA: (
      <div>
        {dsa.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    COA: (
      <div>
        {computerarchitecture.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
    SE: (
      <div>
        {softwareengineering.map((topics, i) => {
          return <TabContent topics={topics} index={i} userData={userData} />;
        })}
      </div>
    ),
  };
  return (
    <div>
      {" "}
      <Navbar />{" "}
      <div>
        <div className="">
          <div className="rain-container">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="raindrop" />
            ))}
          </div>

          <section class="mt-8 text-gray-600 body-font">
            <div class="container mx-auto flex flex-col px-5 py-10 items-center">
              <div class="w-full md:w-2/3 flex flex-col mb-16">
                <div class="mt-4 mb-6 w-full p-4 border rounded-lg border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 px-12">
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Prepare {text}{" "}
                  </h1>
                  <p class="mt-4 mb-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    Gear up, sharpen your mind, and conquer those aptitude
                    challenges – success awaits in your upcoming exams! 🚀✨{" "}
                  </p>
                </div>
                <div class="max-w-7xl">
                  <div className="mb-8 overflow-x-auto scrolling-touch">
                    <div className="flex border-b border-gray-200">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          className={`${
                            activeTab === tab
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 whitespace-nowrap`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">{tabContents[activeTab]}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
