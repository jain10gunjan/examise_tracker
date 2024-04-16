import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { Button } from "../../components/ui/button"
import { useParams } from 'react-router-dom';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Mainpage = () => {
  let { codeproblemid } = useParams();
  const [items, setItems] = useState([]);
  const [question, setQuestion] = useState('');
  const [itemOrder, setItemOrder] = useState(items.map((item) => item.id));
  const [finalOrder, setFinalOrder] = useState(null);
  const [showPop, setShowPop] = useState(true);
  const [language, setLanguage] = useState('java'); // Default language is Java
  const [language1, setLanguage1] = useState('cpp'); // Default language is Java
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/codingcontestquestionsapi?_id=${codeproblemid}`);
        console.log(response.data[0]);

        // Use the selected language to set items
        setItems(shuffleArray(response.data[0][language]));
        setQuestion(response.data[0].question);

        const numbersArray = Array.from({ length: response.data[0][language].length }, (_, index) => index);
        setFinalOrder(numbersArray.toString());
        console.log(numbersArray.toString());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [language, codeproblemid]); // Update useEffect dependency to include language

  useEffect(() => {
    setItemOrder(items.map((item) => item.id));
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'java' ? 'cpp' : 'java'));
    setLanguage1((prevLanguage) => (prevLanguage === 'java' ? 'cpp' : 'java'));
  };

  const closePopUp = () => {
    setShowPop(false);
  };

  const dismissAlert = () => {
    setIsVisible(false);
  };


  return (
    <>
<Navbar/>

<div class="flex flex-wrap mt-24 mx-4 mb-8">
   <div class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
         <p>{question}</p>
   </div>
   
   <div class="w-full lg:w-3/4 px-2">
      
         {/* Toggle Button */}
         
<label class="relative inline-flex items-center cursor-pointer">
  <input onClick={toggleLanguage} type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Switch To {language1}</span>
</label>

{/* {itemOrder.toString() === finalOrder ? 'Yes' : 'NO'} */}
{/* <div id="alert-1" class="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ms-3 text-sm font-medium">
    A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
  </div>
    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
  </button>
</div> */}
 
 

{isVisible? <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
      <div className="flex items-center">
        <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <span className="text-sm font-medium">Ensure that these requirements are met:</span>
      </div>
      <div className="mt-2 mb-4 text-sm"> 
        <ul class="mt-1.5 list-disc list-inside">
      <li>This is a drag-and-drop code-solving problem.</li>
      <li>You need to drag and drop the code statements to where they are meant to be.</li>
      <li>Once all the code statements are arranged correctly, you will receive a completion alert.</li>
      <li>This is how you will solve the problem.</li>
      <li>You can switch between the languages at present on JAVA and C++ available and we adding more soon.</li>
    </ul>
      </div>
      <div className="flex">
        {/* <button type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
          </svg>
          View more
        </button> */}
        <button type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" onClick={dismissAlert} aria-label="Close">
          Dismiss
        </button>
      </div>
    </div> : null}


         {/* <button onClick={toggleLanguage}>Toggle Language {language1}</button> */}
            
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col space-y-2"
                  >
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-gray-200 p-4 m-2 cursor-move"
                          >
                            {/* {item.id} */}
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <AlertDialog open={(itemOrder.toString() === finalOrder) && showPop}>  
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voila!.</AlertDialogTitle>
          <AlertDialogDescription>
           Congratulations, You have successfully completed this problem. Your solution matches with our code.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <Button onClick={closePopUp} variant="outline">Close</Button>
        <a href={`/top100codes`} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>More Problems</a>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      
   </div>
</div>

<Footer/>
    </>
  );
};

export default Mainpage;
