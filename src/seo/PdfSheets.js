import React, {useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const PdfSheets = () => {

    const [coinsData, setCoinsData] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  //const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [selectedTopics, setSelectedTopics] = useState([]);

    const topicData = {
        'number-system': {
          name: 'Number System',
          data: require('./Aptitude/Quality/numbersystem.json'),
          storageKey: 'numbersystemcompletedQuestions',
          pageValue: 'number-system'
        },
        'ratio-and-proportion': {
          name: 'Ratio and Proportion',
          data: require('./Aptitude/Quality/ratioandproportion.json'),
          storageKey: 'ratiocompletedQuestions',
          pageValue: 'ratio-and-proportion'
        },
        'averages': {
          name: 'Averages',
          data: require('./Aptitude/Quality/averages.json'),
          storageKey: 'averagescompletedQuestions',
          pageValue: 'averages'
        },
        'calendars': {
          name: 'Calendars',
          data: require('./Aptitude/Quality/calendars.json'),
          storageKey: 'calendarscompletedQuestions',
          pageValue: 'calendars'
        },
        'chain-rule': {
          name: 'Chain Rule',
          data: require('./Aptitude/Quality/chainrule.json'),
          storageKey: 'chainrulecompletedQuestions',
          pageValue: 'chain-rule'
        },
        'coding-and-decoding': {
          name: 'Coding and Decoding',
          data: require('./Aptitude/Quality/codinganddecoding.json'),
          storageKey: 'codinganddecodingcompletedQuestions',
          pageValue: 'coding-and-decoding'
        },
        'hcf-and-lcm': {
          name: 'HCF and LCM',
          data: require('./Aptitude/Quality/hcfandlcm.json'),
          storageKey: 'hcfandlcmcompletedQuestions',
          pageValue: 'hcf-and-lcm'
        },
        'order-man-out-series': {
          name: 'Order Man Out Series',
          data: require('./Aptitude/Quality/oddmanoutseries.json'),
          storageKey: 'ordermanoutseriescompletedQuestions',
          pageValue: 'order-man-out-series'
        },
        'order-of-magnitude': {
          name: 'Order of Magnitude',
          data: require('./Aptitude/Quality/orderofmagnitude.json'),
          storageKey: 'orderofmagnitudecompletedQuestions',
          pageValue: 'order-of-magnitude'
        },
        'problems-on-partnership': {
          name: 'Partnership',
          data: require('./Aptitude/Quality/partnership.json'),
          storageKey: 'partnershipcompletedQuestions',
          pageValue: 'problems-on-partnership'
        },
        'percentage': {
          name: 'Percentage',
          data: require('./Aptitude/Quality/percentage.json'),
          storageKey: 'percentagecompletedQuestions',
          pageValue: 'percentage'
        },
        'pipes-and-cistern': {
          name: 'Pipes and Cistern',
          data: require('./Aptitude/Quality/Pipesandcistern.json'),
          storageKey: 'pipesandcisterncompletedQuestions',
          pageValue: 'pipes-and-cistern'
        },
        'problems-on-ages': {
          name: 'Problems on Ages',
          data: require('./Aptitude/Quality/problemsonages.json'),
          storageKey: 'problemsonagescompletedQuestions',
          pageValue: 'problems-on-ages'
        },
        'problems-on-trains': {
          name: 'Problems on Trains',
          data: require('./Aptitude/Quality/problemsontrains.json'),
          storageKey: 'trainscompletedQuestions',
          pageValue: 'problems-on-trains'
        },
        'profit-and-loss': {
          name: 'Profit and Loss',
          data: require('./Aptitude/Quality/profitandloss.json'),
          storageKey: 'profitandlosscompletedQuestions',
          pageValue: 'profit-and-loss'
        },
        'quadratic-equations': {
          name: 'Quadratic Equations',
          data: require('./Aptitude/Quality/quadraticequations.json'),
          storageKey: 'quadraticcompletedQuestions',
          pageValue: 'quadratic-equations'
        },
        'sets-and-functions': {
          name: 'Sets and Functions',
          data: require('./Aptitude/Quality/setsandfunctions.json'),
          storageKey: 'setsandfunctionscompletedQuestions',
          pageValue: 'sets-and-functions'
        },
        'simple-interest': {
          name: 'Simple Interest',
          data: require('./Aptitude/Quality/simpleinterest.json'),
          storageKey: 'simpleinterestcompletedQuestions',
          pageValue: 'simple-interest'
        },
        'simplification': {
          name: 'Simplification',
          data: require('./Aptitude/Quality/simplification.json'),
          storageKey: 'simplificationcompletedQuestions',
          pageValue: 'simplification'
        },
        'sqaure-roots-and-cube-roots': {
          name: 'Sqaure Roots and Cube Roots',
          data: require('./Aptitude/Quality/Sqaurerootandcuberoot.json'),
          storageKey: 'sqaureandcubecompletedQuestions',
          pageValue: 'sqaure-roots-and-cube-roots'
        },
        'surds-and-indices': {
          name: 'Surds and Indices',
          data: require('./Aptitude/Quality/surdsandindices.json'),
          storageKey: 'surdsandindicescompletedQuestions',
          pageValue: 'surds-and-indices'
        },
        'time-and-work': {
          name: 'Time and Work',
          data: require('./Aptitude/Quality/timeandwork.json'),
          storageKey: 'timeandworkcompletedQuestions',
          pageValue: 'time-and-work'
        },
        'work-and-wages': {
          name: 'Work and Wages',
          data: require('./Aptitude/Quality/workandwages.json'),
          storageKey: 'workandwagescompletedQuestions',
          pageValue: 'work-and-wages'
        },
        // Add more topics and their respective JSON files here
      };

// Function to shuffle an array using Fisher-Yates algorithm
      const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };

      const handleTopicChange = (e) => {
        const topic = e.target.value;
        if (e.target.checked) {
          setSelectedTopics((prevTopics) => [...prevTopics, topic]);
        } else {
          setSelectedTopics((prevTopics) =>
            prevTopics.filter((prevTopic) => prevTopic !== topic)
          );
        }
      };
    
      const handleNumQuestionsChange = (e) => {
        const value = parseInt(e.target.value);
        if(value > 10 || value < 5){
            toast.error('Enter Value Between 5 - 10 Only');
            return; // Exit the function if validation fails
        }else{
        setNumQuestions(value);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedTopics.length > 0 && numQuestions) {
          const newData = [];
          selectedTopics.forEach((topic) => {
            const topicInfo = topicData[topic];
            if (topicInfo && topicInfo.name) {
              const name = topicInfo.name;
              const percentageData = topicInfo.data;
              const shuffledData = shuffleArray(percentageData).map((question) => ({
                ...question,
                topic: name,
              }));
              const selectedData = shuffledData.slice(0, numQuestions);
              newData.push(...selectedData);
            }
          });
          setChapterName(selectedTopics.map(topic => {
            const capitalizedTopic = topic.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            return capitalizedTopic;
          }).join(', '));
          
          setCoinsData(newData);
          setFormSubmitted(true);
        } else {
          toast.error("Please select at least one topic and specify the number of questions.");
        }
      };


      if (!formSubmitted) {
        // Render the form
        return (
          <div className="app">
            <Navbar />
            {/* Render your form here */}
            <section class="mt-24 w-full px-8 py-16 bg-gray-100 xl:px-8 tails-selected-element">
    <div class="max-w-5xl mx-auto">
        <div class="flex flex-col items-center md:flex-row">

         
            
            <div class="w-full mt-16 md:mt-0 md:w-5/5">
                <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7" data-rounded="rounded-lg" data-rounded-max="rounded-full">
                    <h3 class="mb-6 text-2xl font-medium text-center">Create Unlimited Sheets In Pdf For Free.</h3>
                    

                    <form onSubmit={handleSubmit}>
<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
{Object.keys(topicData).map((topic) => (
      <div key={topic}>
        <li class="mr-2 mb-2 inline-block text-gray-800 bg-white">
        <input
        class="mx-2"
          type="checkbox"
          value={topic}
          onChange={handleTopicChange}
          checked={selectedTopics.includes(topic)}
        />
        <span>{topicData[topic].name}</span>
        </li>
      </div>
    ))}
</ul>



                    <div class="block">
                        <input 
                        type="number"
                        value={numQuestions}
                        onChange={handleNumQuestionsChange}
                        id="create-account-pseudo" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Pseudo"/>
                    </div>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit">Generate Questions</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</section>


{/*
            <form onSubmit={handleSubmit}>
  <label>
    Select Topics:
    {Object.keys(topicData).map((topic) => (
      <div key={topic}>
        <input
          type="checkbox"
          value={topic}
          onChange={handleTopicChange}
          checked={selectedTopics.includes(topic)}
        />
        <span>{topicData[topic].name}</span>
      </div>
    ))}
  </label>
  <label>
    Number of Questions:
    <input
      type="number"
      value={numQuestions}
      onChange={handleNumQuestionsChange}
    />
  </label>
  <button type="submit">Generate Questions</button>
</form>
*/}

            <Toaster />
            <Footer />
          </div>
        );
      }


  return (
<div className="app">
          
  
          
  
        <section class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
      <div class="w-full md:w-2/3 flex flex-col mb-16">
      <h1 class="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">{chapterName}</h1>
      
        <p class="mb-4 leading-relaxed">Practice {chapterName} questions and improve your problem-solving skills with our comprehensive collection of multiple choice questions and answers.</p>
        
        <button onClick={window.print} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-6">
  Save As PDF
</button>
        

        <MathJaxContext>
               {coinsData.map((index, i) => (
                 
             <div key={i}>
                       
                   <div> 
                   <p class="text-xs text-gray-600">Chapter : {index.topic} </p> 
                   </div>                
                   <div className="mb-2">
                   <MathJax>Q{i+1 + ': '} {index.question}</MathJax>                                      
                   </div>                
                   <div id={i} class="flex-col leading-none mb-6">
           
           
                   <p className="mb-2" id="A"><MathJax>A: {index.options['A']}</MathJax></p>
         <p className="mb-2" id="B"><MathJax>B: {index.options['B']}</MathJax></p>
         <p className="mb-2" id="C"><MathJax>C: {index.options['C']}</MathJax></p>
         <p className="mb-2" id="D"><MathJax>D: {index.options['D']}</MathJax></p>                 
                                                
                                        </div>                
                                        <div>                                     
                                           </div>     
         
                                           {/* Buttons */}
                                           
         
         {/* Buttons */}         
       
                                           </div>
               
               ))}
             </MathJaxContext>
  

             <MathJaxContext>

             <h1>Solutions:</h1>

               {coinsData.map((index, i) => (
                 
             <div key={i}>
                       
                                   
                                        <div>                                     
                                           </div>     
         
                                           {/* Buttons */}
                                           <div class="relative mt-0 mb-4 flex flex-wrap items-center">
         
                         <span class="text-neutral-600 mt-3 group-open:animate-fadeIn">
                         Q{i+1 + ': '} Correct Option: {index.correct_option}
                   <br/>
         <MathJax>{index.solution}</MathJax>     
         <hr/>     
                              
                         </span>
         
         
                         
                     </div>
         
         {/* Buttons */}         
       
                                           </div>
               
               ))}
             </MathJaxContext>
             
  
        
       
  
        
        
       
        </div>
        </div>
        </section>

        
  <Toaster/>
  
  
      </div>  )
}

export default PdfSheets