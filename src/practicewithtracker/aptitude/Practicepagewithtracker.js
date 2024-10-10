import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { topicData } from "./assests/aptitudetopicslist";
import "../../index.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import Adsense from "../components/Adsense";

const Practicepagewithtracker = () => {
  const { pagetopic } = useParams();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const tabs = ["Easy", "Medium", "Hard"];
  const defaultTab = "Easy";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const apiEndpoint = process.env.REACT_APP_API;
  console.log(process.env.REACT_APP_API);
  const [userData, setUserData] = useState({});
  const topicInfo = topicData[pagetopic];
  const chapterName = topicInfo.name;
  // const storageKey = topicInfo.storageKey;
  const pageValue = topicInfo.pageValue;

  const sitename = "https://examise.in";

  useEffect(() => {
    // console.log('Running');
    const fetchData = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get(
            `${apiEndpoint}?topic=${pageValue}&difficulty=${topicInfo.type_1}`
          ),
          axios.get(
            `${apiEndpoint}?topic=${pageValue}&difficulty=${topicInfo.type_2}`
          ),
          axios.get(
            `${apiEndpoint}?topic=${pageValue}&difficulty=${topicInfo.type_3}`
          ),
        ]);

        const combinedData = [
          ...response1.data.data,
          ...response2.data.data,
          ...response3.data.data,
        ];

        setData(combinedData);
        setData1(response1.data.data);
        setData2(response2.data.data);
        setData3(response3.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [
    apiEndpoint,
    pageValue,
    topicInfo.type_1,
    topicInfo.type_2,
    topicInfo.type_3,
  ]);

  function customSort(a, b) {
    return a.id - b.id;
  }

  data.sort(customSort);

  const handleOptionClick = (option, id) => {
    const filteredData = data.filter((item) => item._id === id);

    if (option === filteredData[0]?.correct_option) {
      toast.success("Correct option");

      if (!userData[filteredData[0]?.topic]?.completedQuestions.includes(id)) {
        const topicData = userData[filteredData[0]?.topic] || {}; // Get topic data or default to an empty object
        const newCompletedQuestions = [
          ...(topicData.completedQuestions || []),
          id,
        ];
        const newCorrectlyAnsweredQuestionIds = [
          ...(topicData.correctlyAnsweredQuestionIds || []),
          filteredData[0]?._id,
        ];
        const newPreviouslyCorrectlyAnsweredQuestionIds = [
          ...(topicData.previouslyCorrectlyAnsweredQuestionIds || []),
          filteredData[0]?._id,
        ];
        const newPoints = (topicData.points || 0) + 100;

        const updatedUserData = {
          ...userData,
          [filteredData[0]?.topic]: {
            points: newPoints,
            completedQuestions: newCompletedQuestions,
            correctlyAnsweredQuestionIds: newCorrectlyAnsweredQuestionIds,
            previouslyCorrectlyAnsweredQuestionIds:
              newPreviouslyCorrectlyAnsweredQuestionIds,
            totalquestion: data.length,
          },
        };

        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
      }
    } else {
      toast.error("Wrong option");
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    window.MathJax = {
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        processEscapes: true,
      },
      svg: {
        fontCache: "global",
      },
    };
  }, []);

  const copyText = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied Successfully!...");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const tabContents = {
    Easy: (
      <div className="overflow-x-auto">
        <h1 class="title-font sm:text-2xl text-2xl  font-medium text-gray-900">
          Easy Level Questions{" "}
        </h1>
        <h3 class="title-font sm:text-sm text-xs mb-4 font-medium text-gray-600">
          Total Questions: {data1.length}
        </h3>
        <MathJaxContext>
          {data1.map((index, i) => (
            <>
              {index?.question?.trim() ? (
                <div key={index._id}>
                  <div class="relative question-numbercontainer">
                    <p class="text-xs text-gray-600">
                      Subject : {index.subject}{" "}
                    </p>
                    <p class="text-xs text-gray-600">
                      Topic : {index.topic.replace(/-/g, " ")}{" "}
                    </p>
                    <p class="text-xs text-gray-600">Year : {index.year} </p>

                    <p class="mt-2 text-xs text-gray-400 justify-end">
                      {" "}
                      {userData[index?.topic]?.completedQuestions.includes(
                        index._id.toString()
                      )
                        ? "Attempted"
                        : "Not Attempted"}{" "}
                      {userData[index?.topic]?.completedQuestions.length != null
                        ? Math.round(
                            (userData[index?.topic]?.completedQuestions.length /
                              data.length) *
                              100
                          )
                        : 0}{" "}
                      % Module Completed{" "}
                    </p>
                  </div>
                  <MathJax>
                    <div class="questioncontainer">
                      Q{i + 1 + ": "}{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: index.question }}
                      />
                      {index?.questionImage ? (
                        <img src={index?.questionImage} alt="QuestionImage" />
                      ) : null}
                      {index?.questionCode ? (
                        <SyntaxHighlighter language="cpp" style={docco}>
                          {index?.questionCode}
                        </SyntaxHighlighter>
                      ) : null}
                    </div>
                  </MathJax>
                  <div id={i} class="flex-col leading-none optionscontainer">
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("A", index._id)}
                        id="A"
                        dangerouslySetInnerHTML={{ __html: index.options["A"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("B", index._id)}
                        id="B"
                        dangerouslySetInnerHTML={{ __html: index.options["B"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("C", index._id)}
                        id="C"
                        dangerouslySetInnerHTML={{ __html: index.options["C"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("D", index._id)}
                        id="D"
                        dangerouslySetInnerHTML={{ __html: index.options["D"] }}
                      ></div>
                    </MathJax>
                  </div>
                  <div></div>
                  <div class="relative mt-0 mb-20 flex flex-wrap items-center">
                    {/* Accordian */}
                    <details class="py-2 group">
                      <summary class="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl">
                        View Solution
                      </summary>
                      <div class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: index.correct_option}}></span> */}

                        <p>Correct Option: {index.correct_option}</p>
                        <a
                          href={index.solution}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          See Solution: {index.solution}
                        </a>
                      </div>
                    </details>

                    <button
                      className="absolute top-0 right-0 py-4 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl"
                      onClick={() =>
                        copyText(`examise.in/questions/${index?._id}`)
                      }
                    >
                      Share
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </MathJaxContext>
      </div>
    ),
    Medium: (
      <div>
        <h1 class="title-font sm:text-2xl text-2xl font-medium text-gray-900">
          Medium Level Questions{" "}
        </h1>
        <h3 class="title-font sm:text-sm text-xs mb-4 font-medium text-gray-600">
          Total Questions: {data2.length}
        </h3>
        <MathJaxContext>
          {data2.map((index, i) => (
            <>
              {index?.question?.trim() ? (
                <div key={index._id}>
                  <div class="relative question-numbercontainer">
                    <p class="text-xs text-gray-600">
                      Subject : {index.subject}{" "}
                    </p>
                    <p class="text-xs text-gray-600">
                      Topic : {index.topic.replace(/-/g, " ")}{" "}
                    </p>
                    <p class="text-xs text-gray-600">Year : {index.year} </p>

                    <p class="mt-2 text-xs text-gray-400 justify-end">
                      {" "}
                      {userData[index?.topic]?.completedQuestions.includes(
                        index._id.toString()
                      )
                        ? "Attempted"
                        : "Not Attempted"}{" "}
                      {userData[index?.topic]?.completedQuestions.length != null
                        ? Math.round(
                            (userData[index?.topic]?.completedQuestions.length /
                              data.length) *
                              100
                          )
                        : 0}{" "}
                      % Module Completed{" "}
                    </p>
                  </div>
                  <MathJax>
                    <div class="questioncontainer">
                      Q{i + 1 + ": "}{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: index.question }}
                      />
                      {index?.questionImage ? (
                        <img src={index?.questionImage} alt="QuestionImage" />
                      ) : null}
                      {index?.questionCode ? (
                        <SyntaxHighlighter language="cpp" style={docco}>
                          {index?.questionCode}
                        </SyntaxHighlighter>
                      ) : null}
                    </div>
                  </MathJax>
                  <div id={i} class="flex-col leading-none optionscontainer">
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("A", index._id)}
                        id="A"
                        dangerouslySetInnerHTML={{ __html: index.options["A"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("B", index._id)}
                        id="B"
                        dangerouslySetInnerHTML={{ __html: index.options["B"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("C", index._id)}
                        id="C"
                        dangerouslySetInnerHTML={{ __html: index.options["C"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("D", index._id)}
                        id="D"
                        dangerouslySetInnerHTML={{ __html: index.options["D"] }}
                      ></div>
                    </MathJax>
                  </div>
                  <div></div>
                  <div class="relative mt-0 mb-20 flex flex-wrap items-center">
                    {/* Accordian */}
                    <details class="py-2 group">
                      <summary class="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl">
                        View Solution
                      </summary>
                      <div class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: index.correct_option}}></span> */}

                        <p>Correct Option: {index.correct_option}</p>
                        <a
                          href={index.solution}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          See Solution: {index.solution}
                        </a>
                      </div>
                    </details>

                    <button
                      className="absolute top-0 right-0 py-4 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl"
                      onClick={() =>
                        copyText(`examise.in/questions/${index?._id}`)
                      }
                    >
                      Share
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </MathJaxContext>
      </div>
    ),
    Hard: (
      <div>
        <h1 class="title-font sm:text-2xl text-2xl font-medium text-gray-900">
          Hard Level Questions{" "}
        </h1>
        <h3 class="title-font sm:text-sm text-xs mb-4 font-medium text-gray-600">
          Total Questions: {data3.length}
        </h3>
        <MathJaxContext>
          {data3.map((index, i) => (
            <>
              {index?.question?.trim() ? (
                <div key={index._id}>
                  <div class="relative question-numbercontainer">
                    <p class="text-xs text-gray-600">
                      Subject : {index.subject}{" "}
                    </p>
                    <p class="text-xs text-gray-600">
                      Topic : {index.topic.replace(/-/g, " ")}{" "}
                    </p>
                    <p class="text-xs text-gray-600">Year : {index.year} </p>

                    <p class="mt-2 text-xs text-gray-400 justify-end">
                      {" "}
                      {userData[index?.topic]?.completedQuestions.includes(
                        index._id.toString()
                      )
                        ? "Attempted"
                        : "Not Attempted"}{" "}
                      {userData[index?.topic]?.completedQuestions.length != null
                        ? Math.round(
                            (userData[index?.topic]?.completedQuestions.length /
                              data.length) *
                              100
                          )
                        : 0}{" "}
                      % Module Completed{" "}
                    </p>
                  </div>
                  <MathJax>
                    <div class="questioncontainer">
                      Q{i + 1 + ": "}{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: index.question }}
                      />
                      {index?.questionImage ? (
                        <img src={index?.questionImage} alt="QuestionImage" />
                      ) : null}
                      {index?.questionCode ? (
                        <SyntaxHighlighter language="cpp" style={docco}>
                          {index?.questionCode}
                        </SyntaxHighlighter>
                      ) : null}
                    </div>
                  </MathJax>
                  <div id={i} class="flex-col leading-none optionscontainer">
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("A", index._id)}
                        id="A"
                        dangerouslySetInnerHTML={{ __html: index.options["A"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("B", index._id)}
                        id="B"
                        dangerouslySetInnerHTML={{ __html: index.options["B"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("C", index._id)}
                        id="C"
                        dangerouslySetInnerHTML={{ __html: index.options["C"] }}
                      ></div>
                    </MathJax>
                    <MathJax>
                      <div
                        onClick={() => handleOptionClick("D", index._id)}
                        id="D"
                        dangerouslySetInnerHTML={{ __html: index.options["D"] }}
                      ></div>
                    </MathJax>
                  </div>
                  <div></div>
                  <div class="relative mt-0 mb-20 flex flex-wrap items-center">
                    {/* Accordian */}
                    <details class="py-2 group">
                      <summary class="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl">
                        View Solution
                      </summary>
                      <div class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: index.correct_option}}></span> */}

                        <p>Correct Option: {index.correct_option}</p>
                        <a
                          href={index.solution}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          See Solution: {index.solution}
                        </a>
                      </div>
                    </details>

                    <button
                      className="absolute top-0 right-0 py-4 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl"
                      onClick={() =>
                        copyText(`examise.in/questions/${index?._id}`)
                      }
                    >
                      Share
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </MathJaxContext>
      </div>
    ),
  };

  if (!data[0]) {
    return (
      <div className="loader flex justify-center items-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 animate-spin"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>{" "}
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="app overflow-x-hidden">
      <Navbar />

      <Helmet>
        <title> {chapterName.replace(/-/g, " ")} - Practice Questions</title>
        <meta
          name="description"
          content={`Boost your ${chapterName.replace(
            /-/g,
            " "
          )} skills with our extensive collection of multiple-choice questions (MCQs) covering various topics such as arithmetic, algebra, geometry, and more. Practice for job interviews, entrance exams, or simply enhance your problem-solving abilities. Access our free online resource today.`}
        />
        <meta
          name="keywords"
          content={`Aptitude questions,Multiple choice questions,Test preparation,Quantitative reasoning,Verbal reasoning,Numerical reasoning,Problem solving,Practice tests,Assessment,Exams,Job interviews,Entrance exams,Competitive exams,Learning,Education,Online learning,Study materials,Test-taking strategies`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={chapterName + ` Practice Questions`}
        />
        <meta
          name="twitter:description"
          content={`Boost your ${chapterName} skills with our extensive collection of multiple-choice questions (MCQs) covering various topics such as arithmetic, algebra, geometry, and more. Practice for job interviews, entrance exams, or simply enhance your problem-solving abilities. Access our free online resource today.`}
        />
        <meta name="twitter:image" content={sitename + "/logo512.png"} />
        <meta name="twitter:site" content="@aptitudetracker" />
        <meta name="twitter:creator" content="@aptitudetracker"></meta>
      </Helmet>

      <section class="mt-20 text-gray-600 body-font">
        <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
          <div class="w-full md:w-2/3 flex flex-col mb-16">
            <h1 class="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">
              {data[0]?.subject} | {data[0]?.topic}
              <p class="text-sm text-gray-600">
                Total Questions: {data.length}{" "}
              </p>
              <p class="text-sm text-gray-600">
                Points Gained:{" "}
                {userData[data[0]?.topic]?.points != null
                  ? userData[data[0]?.topic]?.points
                  : "0"}{" "}
              </p>
            </h1>
            <p class="mb-8 leading-relaxed">
              Practice {chapterName} questions and improve your problem-solving
              skills with our comprehensive collection of multiple choice
              questions and answers.
            </p>

            {/* <Adsense dataAdSlot='9103370999' /> */}

            <div class="w-full h-4 bg-gray-400 rounded-full mb-4">
              <div
                class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{
                  width: `${Math.round(
                    (userData[data[0]?.topic]?.completedQuestions.length != null
                      ? userData[data[0]?.topic]?.completedQuestions.length /
                        data.length
                      : "0") * 100
                  )}%`,
                }}
              >
                {" "}
                {userData[data[0]?.topic]?.completedQuestions.length != null
                  ? Math.round(
                      (userData[data[0]?.topic]?.completedQuestions.length /
                        data.length) *
                        100
                    )
                  : 0}
                %
              </div>
            </div>

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
            <div className="">{tabContents[activeTab]}</div>
          </div>
        </div>
      </section>

      <Toaster />

      <Footer />
    </div>
  );
};

export default Practicepagewithtracker;
