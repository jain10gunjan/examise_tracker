import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MathJax, MathJaxContext } from 'better-react-mathjax';


 

const PracticeUnlimited = () => {
  const [data, setData] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [correctlyAnsweredQuestionIds, setCorrectlyAnsweredQuestionIds] = useState([]);
  const [previouslyCorrectlyAnsweredQuestionIds, setPreviouslyCorrectlyAnsweredQuestionIds] = useState([]); // New state variable

  const apiEndpoint = process.env.REACT_APP_API;

  useEffect(() => {
    // Fetch initial data...
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiEndpoint]);



  const fetchData = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      const question = response.data;
      if (!completedQuestions.includes(question?._id) ||  previouslyCorrectlyAnsweredQuestionIds.includes(question?._id)) {
        setData(question);
      } else {
        await fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionClick = async (option) => {

    if (completedQuestions.includes(data[0]?._id) || previouslyCorrectlyAnsweredQuestionIds.includes(data[0]?._id)) {
      // Exit early if the question is already completed
      handleNext();
      return;
    }

    if (option !== data[0]?.correct_option) {
      toast.error('Wrong option');
      return; // Exit early if the selected option is incorrect
    }
  
    toast.success('Correct option');
    const newCorrectlyAnsweredQuestionIds = [...correctlyAnsweredQuestionIds, data[0]?._id];
    setCorrectlyAnsweredQuestionIds(newCorrectlyAnsweredQuestionIds);    
    const newPreviouslyCorrectlyAnsweredQuestionIds = [...previouslyCorrectlyAnsweredQuestionIds, data[0]?._id];
    setPreviouslyCorrectlyAnsweredQuestionIds(newPreviouslyCorrectlyAnsweredQuestionIds);
    const newCompletedQuestions = [...completedQuestions, data[0]?._id];
    setCompletedQuestions(newCompletedQuestions);
    const newPoints = points + 100;
    setPoints(newPoints);
    handleNext();
  };
  


  const handleNext = async () => {
    await fetchData();
  };

  


  return (

    <>
    <div>


<Navbar />


<MathJaxContext>
  <section class="mt-20 text-gray-600 body-font">
    <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
      <div class="w-full md:w-2/3 flex flex-col mb-16 relative">
      <div>
              <div class="relative question-numbercontainer">
                <p class="text-xs text-gray-600">Aptitude Questions <br />Chapter : {data[0]?.topic} </p>
                <p class="text-xs text-gray-600">Difficulty  : {data[0]?.difficulty} </p>

              </div>
              <MathJax><div class="questioncontainer">
                   <span dangerouslySetInnerHTML={{ __html: data[0]?.question }} />
              </div></MathJax>
              <div class="flex-col leading-none optionscontainer">


                <MathJax><div onClick={() => handleOptionClick("A", data[0]?._id)} id="A" dangerouslySetInnerHTML={{ __html: data[0]?.options['A'] }}></div></MathJax>
                <MathJax><div onClick={() => handleOptionClick("B", data[0]?._id)} id="B" dangerouslySetInnerHTML={{ __html: data[0]?.options['B'] }}></div></MathJax>
                <MathJax><div onClick={() => handleOptionClick("C", data[0]?._id)} id="C" dangerouslySetInnerHTML={{ __html: data[0]?.options['C'] }}></div></MathJax>
                <MathJax><div onClick={() => handleOptionClick("D", data[0]?._id)} id="D" dangerouslySetInnerHTML={{ __html: data[0]?.options['D'] }}></div></MathJax>
              </div>
              <div>
              </div>
              <div class="relative mt-0 mb-20 flex flex-wrap items-center">
                {/* Accordian */}
                <details class="py-2 group">
                  <summary class="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl">
                    View Solution
                  </summary>
                  <div class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    {/* Correct Option:  <span dangerouslySetInnerHTML={{ __html: data[0]?.correct_option}}></span> */}
                    <MathJax><p dangerouslySetInnerHTML={{ __html: data[0]?.solution }}></p></MathJax>
                  </div>
                </details>
                {/* 
  <button className="absolute top-0 right-0 py-4 hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-100 rounded-2xl" onClick={() => saveProgress(points, data[0]?._id)}>Save Progress</button> */}
                {/* <button onClick={handleNext}>Next</button> */}

              </div>
              
            </div>
            
      </div>
    </div>

  </section>
</MathJaxContext>




<Toaster />
<Footer/>
</div>
    </>

  )
}

export default PracticeUnlimited