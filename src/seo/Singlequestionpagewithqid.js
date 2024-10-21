import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

import { Helmet } from "react-helmet";
// import Footer from '../components/Footer';
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Footer from "../components/Footer";
//import Adsense from '../../components/Adsense';

const Singlequestionpagewithqid = () => {
  //let { topic } = useParams();
  let { slug } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  //const id = parseInt(qid);

  const apiEndpoint = process.env.REACT_APP_API;

  // Regular expression to extract the part after 'qid-'
  const idMatch = slug.match(/qid-([a-zA-Z0-9]+)/);

  // The _id will be in the first capture group if found
  const _id = idMatch ? idMatch[1] : null;

  useEffect(() => {
    console.log("working");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}?_id=${_id}`);
        const response2 = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/microtestfeature?topics=${response.data.data[0]?.topic}&number=5`
        );

        setData(response.data.data);
        setData2(response2.data);

        //console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiEndpoint, _id]);

  const handleOptionClick = (option) => {
    if (!data[0] || option !== data[0].correct_option) {
      toast.error("Wrong option");
    } else {
      toast.success("Correct option");
    }

    const optionDiv = document.getElementById(option);
    if (optionDiv) {
      optionDiv.className =
        option === data[0].correct_option ? "correct" : "wrong";
    }
  };

  const chapterName = data[0]?.topic;
  // const questionSchema = data[0]?.question.replace(/<[^>]+>/g, "");
  // console.log(questionSchema);
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Quiz",
    about: {
      "@type": "Question",
      name: `${data[0]?.question.replace(/<[^>]+>/g, "")}`,
    },
    educationalAlignment: [
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalSubject",
        targetName: `${chapterName}`,
      },
    ],
    hasPart: [
      {
        "@context": "https://schema.org/",
        "@type": "Question",
        eduQuestionType: "Flashcard",
        text: `${data[0]?.question.replace(/<[^>]+>/g, "")}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Correct option is : ${data[0]?.correct_option}`,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>
          {data[0]?.question
            ? data[0].question.replace(/<[^>]+>/g, "").slice(0, 90)
            : "Aptitude Questions"}
        </title>
        <meta name="description" content={data[0]?.question} />
        <meta
          name="keywords"
          content={`Aptitude Questions, Placements preparation, ${chapterName} Placements Questions, UPSC ${chapterName} Questions.`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="mt-20 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-8">
              <div className="space-y-5 lg:space-y-8">
                <div className="mb-8 overflow-x-auto scrolling-touch">
                  <div className="flex border-b border-gray-200">
                    <MathJaxContext>
                      <div>
                        <div class="relative question-numbercontainer">
                          <p class="text-xs text-gray-600">
                            Aptitude Questions <br />
                            Chapter : {chapterName}{" "}
                          </p>
                          <p class="text-xs text-gray-600">
                            Difficulty : {data[0]?.difficulty}{" "}
                          </p>

                          <div class="absolute top-0 right-0  flex items-center mb-3 space-x-3"></div>
                        </div>

                        <div class="questioncontainer">
                          <MathJax>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data[0]?.question,
                              }}
                            />
                          </MathJax>
                        </div>
                        <div class="flex-col leading-none optionscontainer">
                          <MathJax>
                            <div
                              onClick={() =>
                                handleOptionClick("A", data[0]?.id)
                              }
                              id="A"
                              dangerouslySetInnerHTML={{
                                __html: data[0]?.options["A"],
                              }}
                            ></div>
                          </MathJax>
                          <MathJax>
                            <div
                              onClick={() =>
                                handleOptionClick("B", data[0]?.id)
                              }
                              id="B"
                              dangerouslySetInnerHTML={{
                                __html: data[0]?.options["B"],
                              }}
                            ></div>
                          </MathJax>
                          <MathJax>
                            <div
                              onClick={() =>
                                handleOptionClick("C", data[0]?.id)
                              }
                              id="C"
                              dangerouslySetInnerHTML={{
                                __html: data[0]?.options["C"],
                              }}
                            ></div>
                          </MathJax>
                          <MathJax>
                            <div
                              onClick={() =>
                                handleOptionClick("D", data[0]?.id)
                              }
                              id="D"
                              dangerouslySetInnerHTML={{
                                __html: data[0]?.options["D"],
                              }}
                            ></div>
                          </MathJax>
                        </div>
                        <div></div>

                        {/* Buttons */}

                        <div class="relative mt-0 mb-20 flex flex-wrap items-center">
                          {/* Accordian */}
                          <span class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                            {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: data[0]?.correct_option }}></span>   */}
                            <MathJax>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: data[0]?.solution,
                                }}
                              ></p>
                            </MathJax>
                          </span>

                          {/* Accordian 
    <a href={`/${pageValue + '/questions/' + i}`} className="absolute top-0 right-0 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">Share</a>*/}
                        </div>
                        {/* Buttons */}
                      </div>
                    </MathJaxContext>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 lg:w-full lg:h-full lg:bg-gradient-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-neutral-800">
            <div className="sticky top-0 start-0 py-8 lg:ps-8">
              <div className="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8 dark:border-neutral-700">
                <a className="block flex-shrink-0" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <path
                      fill="#0078d4"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                    />
                    <path
                      d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                      opacity=".05"
                    />
                    <path
                      d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                      opacity=".07"
                    />
                    <path
                      fill="#fff"
                      d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                    />
                  </svg>
                </a>

                <a
                  className="group grow block"
                  href="https://www.linkedin.com/company/itjobsalerts"
                >
                  <h5 className="group-hover:text-gray-600 text-sm font-semibold text-gray-800  ">
                    Examise.In
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    Follow Us On Linkedin
                  </p>
                </a>

                <div className="grow">
                  <div className="flex justify-end">
                    <a
                      href="https://www.linkedin.com/company/itjobsalerts"
                      type="button"
                      className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                      </svg>
                      Follow
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div class="flex flex-col items-center">
                  <h2 class="font-bold text-2xl mt-5 tracking-tight">
                    Frequenty Simillar Questions
                  </h2>
                </div>

                <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                  {data2.map((item, index) => (
                    <div key={index} className="py-5">
                      <div className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <a
                          href={`/ques/${item.question
                            .slice(0, 20)
                            .replace(/\s+/g, "-")
                            .replace(/<\/?[^>]+(>|$)/g, "")}-qid-${item._id}`}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.question,
                            }}
                          ></span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </>
  );
};

export default Singlequestionpagewithqid;
