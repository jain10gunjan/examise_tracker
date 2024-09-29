import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { allquestions } from "../staticDB/tcs/Alldb";

const AllQuestionCompanyWise = () => {
  // Convert slotdate to the corresponding export key
  const { companyname } = useParams();
  const quizData = allquestions;
  const [data] = useState(quizData);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const tabs = ["Numerical-Ability", "Verbal-Ability", "Reasoning-Ability"];
  const defaultTab = "Numerical-Ability";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isVisible, setIsVisible] = useState(true);
  const dismissAlert = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Load user data from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (option, id) => {
    // Retrieve the user's answered questions from local storage
    const answeredQuestions =
      JSON.parse(localStorage.getItem(companyname)) || [];

    // Check if the current question has already been answered
    if (answeredQuestions.includes(id)) {
      toast.success("You've already answered this question.");
      return; // Exit the function early if the question is already answered
    }

    // Filter data to get the current question based on the id
    const filteredData = data?.filter((item) => item._id === id);
    if (filteredData?.length > 0) {
      const currentQuestion = filteredData[0];

      // Check if the selected option is correct
      if (option === currentQuestion.correct_option) {
        toast.success("Correct option");

        // Update the user data and store the answered question
        updateUserData(currentQuestion.topic, id, true);

        // Add the question to the list of answered questions in local storage
        answeredQuestions.push(id);
        localStorage.setItem(companyname, JSON.stringify(answeredQuestions));
      } else {
        toast.error("Wrong option");
      }
    }
  };

  const updateUserData = (topic, id, isCorrect) => {
    const topicData = userData[topic] || {};
    const newCompletedQuestions = [
      ...(topicData?.completedQuestions || []),
      id,
    ];
    const newCorrectlyAnsweredQuestionIds = isCorrect
      ? [...(topicData?.correctlyAnsweredQuestionIds || []), id]
      : topicData?.correctlyAnsweredQuestionIds;

    const newPoints = isCorrect
      ? (topicData?.points || 0) + 100
      : topicData?.points;

    const updatedUserData = {
      ...userData,
      [topic]: {
        points: newPoints,
        completedQuestions: newCompletedQuestions,
        correctlyAnsweredQuestionIds: newCorrectlyAnsweredQuestionIds,
        totalQuestions: data?.length,
      },
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
  };

  const filterQuestionsByDifficulty = (category) => {
    return data?.filter((question) => question.category === category);
  };

  const renderQuestions = (questions) => {
    return questions?.map((index, i) => (
      <div key={index._id}>
        <div className="relative question-numbercontainer">
          <p className="text-xs text-gray-600">Topic : {index.topic}</p>
          <p className="text-xs text-gray-600">
            Difficulty : {index.difficulty}{" "}
          </p>

          <p className="text-xs text-gray-600">
            Attempted:{" "}
            {userData[index?.topic]?.completedQuestions?.includes(
              index._id.toString()
            )
              ? "True"
              : "False"}{" "}
            {/* {Math.round(
              (userData[index?.topic]?.completedQuestions.length /
                data?.length) *
                100
            )}{" "}
            % Module Completed{" "} */}
          </p>
        </div>
        <MathJax>
          <div className="questioncontainer">
            Q{i + 1 + ": "}{" "}
            <span dangerouslySetInnerHTML={{ __html: index.question }} />
          </div>
        </MathJax>
        <div className="flex-col leading-none optionscontainer">
          {["A", "B", "C", "D"].map((option) => (
            <MathJax key={option}>
              <div
                onClick={() => handleOptionClick(option, index._id)}
                dangerouslySetInnerHTML={{ __html: index.options[option] }}
              />
            </MathJax>
          ))}
        </div>
        <div className="relative mt-0 mb-20 flex flex-wrap items-center">
          <details className="py-2 group">
            <summary className="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl">
              View Solution
            </summary>
            <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              <MathJax>
                {index.solution ? (
                  <p dangerouslySetInnerHTML={{ __html: index.solution }}></p>
                ) : (
                  <p>
                    {" "}
                    Correct Option is: {index.correct_option} <br /> Detailed
                    Solution Not Available...
                  </p>
                )}
              </MathJax>
            </div>
          </details>
        </div>
      </div>
    ));
  };

  return (
    <div className="app">
      <Navbar />
      <Helmet>
        <title>{companyname.toUpperCase()} NQT Previous Year</title>
        <meta
          name="description"
          content={`Boost your ${"chapterName"} skills with our extensive collection of multiple-choice questions (MCQs).`}
        />
        <meta
          name="keywords"
          content="Aptitude questions,Test preparation,Quantitative reasoning"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {loading ? (
        <div className="loader flex justify-center items-center h-screen">
          <h1 className="animate-bounce text-sm">
            Relax! Questions are loading....
          </h1>
        </div>
      ) : (
        <section className="mt-20 text-gray-600 body-font">
          <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
            <div className="w-full md:w-2/3 flex flex-col mb-16">
              {isVisible ? (
                <div
                  id="alert-additional-content-1"
                  className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                  role="alert"
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <span className="text-sm font-medium">
                      Important Disclaimer
                    </span>
                  </div>
                  <div className="mt-2 mb-4 text-sm">
                    <ul className="mt-1.5 list-disc list-inside">
                      <li>
                        We have collected these questions from sources like the
                        Internet and social media.
                      </li>
                      <li>
                        We have not generated these questions. We have only
                        gathered and summarized the questions that are already
                        available on the Internet in one place.
                      </li>
                      <li>
                        We are not liable for any misprints, misinformation, or
                        other logical errors, and we do not hold any copyright
                        infringement.
                      </li>
                      <li>
                        If you want to remove any questions, please contact us
                        with proper documentation. We will respond within 48
                        hours.
                      </li>
                    </ul>
                  </div>

                  <div className="flex">
                    {/* <button type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
          </svg>
          View more
        </button> */}
                    <button
                      type="button"
                      className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                      onClick={dismissAlert}
                      aria-label="Close"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : null}
              <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">
                TCS NQT Previous Year{" "}
                <p className="mt-2 text-sm text-gray-600">
                  Total Questions: {data?.length}
                </p>
                <p className="text-sm text-gray-600">
                  Points Gained: {userData[data?.topic]?.points}
                </p>
              </h1>
              <p className="mb-2 leading-relaxed">
                Practice TCS NQT Previous Year questions and improve your
                problem-solving skills.
              </p>

              <p className="mb-8 leading-relaxed">
                Note: These Are Not All The Question Regarding The Paper Some
                Questions Are Missing Also The Questions Data can be Incorrect
                Due To Some Issues. We Recommend Analysing The Pattern Of The
                Question.
              </p>

              <div className="mb-8 overflow-x-auto scrolling-touch">
                <div className="flex border-b border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      } px-4 py-2 border-b-2 font-medium whitespace-nowrap`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="">
                <MathJaxContext>
                  {renderQuestions(filterQuestionsByDifficulty(activeTab))}
                </MathJaxContext>
              </div>
            </div>
          </div>
        </section>
      )}

      <Toaster />
      <Footer />
    </div>
  );
};

export default AllQuestionCompanyWise;
