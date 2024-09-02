import React, { useState, useEffect } from "react";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";

const Testpage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(questions?.length).fill("")
  );
  const [showResult, setShowResult] = useState(false);
  const { testtopics } = useParams();
  const { totalnumber } = useParams();
  const [showPop, setShowPop] = useState(true);

  const apiEndpoint = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/microtestfeature?topics=${testtopics}&number=${parseInt(
            totalnumber
          )}`
        );
        setQuestions(response.data);
        toast.success("Organising Your Test..");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiEndpoint, testtopics, totalnumber]);

  const correctAnswers = questions?.map((question) => question.correct_option);

  const renderAnswerStatus = (index) => {
    const isCorrect = userAnswers[index] === correctAnswers[index];
    return (
      <>
        <p
          key={index}
          className={`text-lg mt-2 ${
            isCorrect ? "text-green-500" : "text-red-500"
          }`}
        >
          {isCorrect ? "Correct" : "Wrong"}
        </p>
        <p className="text-sm">You Selected: {userAnswers[index]}</p>
        <p className="text-sm mb-4 ">Correct Option: {correctAnswers[index]}</p>

        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: `Q${index + 1}: ${questions[index].question}`,
          }}
        ></p>
        <p
          className="text-sm mt-2"
          dangerouslySetInnerHTML={{
            __html: `A: ${questions[index].options["A"]}`,
          }}
        ></p>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: `B: ${questions[index].options["B"]}`,
          }}
        ></p>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: `C: ${questions[index].options["C"]}`,
          }}
        ></p>
        <p
          className="text-sm mb-2"
          dangerouslySetInnerHTML={{
            __html: `D: ${questions[index].options["D"]}`,
          }}
        ></p>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: `${questions[index].solution}` }}
        ></p>
      </>
    );
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (
      currentQuestion < questions?.length - 1 &&
      userAnswers[currentQuestion] !== ""
    ) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === questions?.[index].correct_option ? score + 1 : score;
    }, 0);
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
    submitPerformance();
  };

  const userData = {
    // userid: user?.uid,
    // fname:user?.email.split('@')[0],
    // lname:user?.email.split('@')[0],// Replace with the actual user ID or any identifier
    score: calculateScore(),
  };

  const submitPerformance = async () => {
    try {
      toast.success("Generating Result...");
      // Handle the response if needed
    } catch (error) {
      console.log(userData);
      console.error("Error submitting performance:", error);
    }
  };

  const closePopUp = () => {
    setShowPop(false);
  };

  const options = Object.entries(questions?.[currentQuestion]?.options || {});

  return (
    <div>
      <AlertDialog open={showPop}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Information</AlertDialogTitle>
            <AlertDialogDescription>
              Topics Covered in this test are:
              {testtopics.split("_").map((part) => (
                <li>{part}</li>
              ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={closePopUp} variant="outline">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {questions !== undefined ? (
        <div className="container mx-auto p-4 mt-20">
          {showResult ? (
            <div>
              <Navbar />
              <p className="text-xl font-semibold mb-2">Your Result:</p>
              <button
                onClick={window.print}
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-6"
              >
                Save As PDF
              </button>

              {/* <button onClick={() => submitPerformance()} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-6">
                Save Your Performance
              </button> */}
              <p className="text-lg">
                You scored {calculateScore()} out of {questions?.length}{" "}
                questions correctly!
              </p>
              <p className="text-lg mt-4">Answer Status:</p>
              {userAnswers.map((_, index) => renderAnswerStatus(index))}
              <Footer />
            </div>
          ) : (
            <div>
              <Navbar />

              <section class="mt-20 text-gray-600 body-font">
                <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
                  <div class="w-full md:w-2/3 flex flex-col mb-16">
                    {/* <Adsense dataAdSlot='9103370999' /> */}
                    {/* {pagetopic.charAt(0).toLocaleUpperCase() + pagetopic.slice(1).toLowerCase()} */}

                    <MathJaxContext>
                      <div className="mb-8 overflow-x-auto scrolling-touch">
                        <div className="flex border-gray-200">
                          <div key={questions?.[currentQuestion]?._id}>
                            <div class="relative question-numbercontainer">
                              <p class="text-xs text-gray-600">
                                Aptitude Questions <br />
                                Chapter : {
                                  questions?.[currentQuestion]?.topic
                                }{" "}
                              </p>
                              <p class="text-xs text-gray-600">
                                Difficulty :{" "}
                                {questions?.[currentQuestion]?.difficulty}{" "}
                              </p>
                              <p class="text-xs text-gray-600">
                                Question {currentQuestion + 1} of{" "}
                                {questions?.length}
                              </p>
                            </div>
                            <div class="questioncontainer">
                              <MathJax>
                                Q{currentQuestion + 1}:{" "}
                                {questions?.[currentQuestion]?.question.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                )}
                              </MathJax>
                            </div>
                            <div
                              id={currentQuestion}
                              class="flex-col space-y-2 leading-none"
                            >
                              <div className="flex">
                                <div className="w-1/2">
                                  {options
                                    .slice(0, 2)
                                    .map(([optionKey, optionValue]) => (
                                      <label key={optionKey} className="block">
                                        <input
                                          type="radio"
                                          name="answer"
                                          value={optionKey}
                                          checked={
                                            userAnswers[currentQuestion] ===
                                            optionKey
                                          }
                                          onChange={() =>
                                            handleAnswerSelect(optionKey)
                                          }
                                          className="mr-2 mt-4"
                                        />
                                        {`${optionKey}: ${optionValue.replace(
                                          /<\/?[^>]+(>|$)/g,
                                          ""
                                        )}`}
                                      </label>
                                    ))}
                                </div>
                                <div className="w-1/2">
                                  {options
                                    .slice(2)
                                    .map(([optionKey, optionValue]) => (
                                      <label key={optionKey} className="block">
                                        <input
                                          type="radio"
                                          name="answer"
                                          value={optionKey}
                                          checked={
                                            userAnswers[currentQuestion] ===
                                            optionKey
                                          }
                                          onChange={() =>
                                            handleAnswerSelect(optionKey)
                                          }
                                          className="mr-2 mt-4"
                                        />
                                        {`${optionKey}: ${optionValue.replace(
                                          /<\/?[^>]+(>|$)/g,
                                          ""
                                        )}`}
                                      </label>
                                    ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex mt-4 relative">
                              <button
                                onClick={handlePrevQuestion}
                                className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                disabled={currentQuestion === 0}
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNextQuestion}
                                className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={
                                  currentQuestion === questions?.length - 1 ||
                                  userAnswers[currentQuestion] === ""
                                }
                              >
                                Next
                              </button>
                              <button
                                onClick={handleFinishQuiz}
                                className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Finish Test
                              </button>
                            </div>

                            <div></div>
                          </div>
                        </div>
                      </div>
                    </MathJaxContext>
                  </div>
                </div>
              </section>

              {/* <p className="text-xl font-semibold mb-2">{questions?.[currentQuestion]?.question}</p>
              <div className="space-y-2">
                {Object.entries(questions?.[currentQuestion]?.options || {}).map(([optionKey, optionValue]) => (
                  <label key={optionKey} className="block">
                    <input
                      type="radio"
                      name="answer"
                      value={optionKey}
                      checked={userAnswers[currentQuestion] === optionKey}
                      onChange={() => handleAnswerSelect(optionKey)}
                      className="mr-2"
                    />
                    {`${optionKey}: ${optionValue}`}
                  </label>
                ))}
              </div>
              <div className="flex mt-4">
                <button
                  onClick={handlePrevQuestion}
                  className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={currentQuestion === questions?.length - 1 || userAnswers[currentQuestion] === ''}
                >
                  Next
                </button>
                <button
                  onClick={handleFinishQuiz}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Finish
                </button>
              </div>
              <p className="mt-2">
                Question {currentQuestion + 1} of {questions?.length}
              </p> */}
              <Footer />
            </div>
          )}
        </div>
      ) : null}
      <Toaster />
    </div>
  );
};

export default Testpage;
