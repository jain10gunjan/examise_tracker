import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { matrix, searchandsort, strings , arrays} from '../dsatracker/assests/db';
import { useParams } from 'react-router-dom';


function TopicWiseTemplate() {
  const {topicname} = useParams();
  const [taskState, setTaskState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);


  const topicInfo = {
    'matrix': {
      dbname: matrix,
      Topic: 'Matrix' // Assuming you have defined `matrix` elsewhere
    },
    'searchandsort': {
      dbname: searchandsort ,
      Topic: 'Search and Sorting'// Assuming you have defined `matrix` elsewhere
    },
    'strings': {
      dbname: strings ,
      Topic: 'Strings'// Assuming you have defined `matrix` elsewhere
    },
    'arrays': {
      dbname: arrays ,
      Topic: 'Arrays'// Assuming you have defined `matrix` elsewhere
    }
    
  };

  const selectedTasks = topicInfo[topicname].dbname;

  
  useEffect(() => {
    console.log('working')
    setTasks(selectedTasks[0]);
  }, [selectedTasks]);


  useEffect(() => {
      // Use the default tasks if user is not signed in
      const tasksFromLocalStorage = JSON.parse(localStorage.getItem(`${topicname}`));
      if (tasksFromLocalStorage) {
        // Merge the tasks from the localStorage with the default tasks
        setTaskState((prevState) => {
          const merged1 = {...tasks,...tasksFromLocalStorage};
          const mergedTasks = { ...prevState, ...merged1};
          return mergedTasks;
        });
      } else {
        // Use the default tasks if there are no tasks in the localStorage
        setTaskState(tasks);
        localStorage.setItem(`${topicname}`, JSON.stringify(tasks));
      }
    
  }, [tasks, topicname]);

  const handleTaskCompleted = (taskKey) => {

      const updatedTask = {
        ...taskState[taskKey],
        completed: true
      };
      const updatedTaskState = {
        ...taskState,
        [taskKey]: updatedTask
      };
      setTaskState(updatedTaskState);
localStorage.setItem(`${topicname}`, JSON.stringify(updatedTaskState));
    
  };

  const handleTaskUnchecked = (taskKey) => {
      const updatedTask = {
        ...taskState[taskKey],
        completed: false
      };
      const updatedTaskState = {
        ...taskState,
        [taskKey]: updatedTask
      };
      ;
setTaskState(updatedTaskState);
localStorage.setItem(`${topicname}`, JSON.stringify(updatedTaskState));
    
  };

  let i = 0;

  const tasksCompleted = taskState ? Object.values(taskState).filter(task => task.completed).length : 0;
  const tasksTotal = taskState ? Object.keys(taskState).length : 0;


  const notify = () => {
    toast.success(`Congrats You completed the task...`);
  };

  const notify2 = () => {
    toast(`Tasks not completed...`);
  };

  const filteredTasks = Object.entries(taskState).filter(([taskKey, task]) =>
    task.Topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.Problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div>
          <div className="relative max-w-screen-xl mx-10 mt-20 mb-10 px-5 bg-white min-h-sceen shadow-lg rounded-2xl dark:bg-gray-700">
            <p className="p-4 font-bold text-black text-md dark:text-white">
              {topicInfo[topicname].Topic}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
                <p>{tasksCompleted} out of {tasksTotal} Questions. completed</p>
              </span>
            </p>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mx-4 my-4 absolute top-0 right-0 p-2 border rounded-lg shadow-md mb-4"
            />
            {filteredTasks.map(([taskKey, task]) => (
              <div key={taskKey}>
                <details className="group">
                  <summary className="justify-between items-center cursor-pointer list-none">
                    <ul>
                      <li className="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-start text-sm">
                          <span className="mx-4">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => task.completed ? handleTaskUnchecked(taskKey) : handleTaskCompleted(taskKey)}
                              className='relative h-5 w-10 appearance-none rounded-[20px] bg-gray-300 outline-none transition duration-[0.5s] 
                              before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                              before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                              checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-gray-500 dark:checked:bg-brand-400'
                              onClick={() => {
                                if (task.completed) {
                                  notify2();
                                } else {
                                  notify();
                                }
                              }}
                            />
                          </span>
                          <span className="mx-2">
                            {i = i + 1}
                          </span>
                          <a href={task.URL}>
                            <span>
                              {task.Problem}
                            </span>
                            <span className="mx-4 px-2 py-1  text-xs rounded text-gray-800 bg-green-300">
                              Click Here
                            </span>
                          </a>
                        </div>
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </li>
                    </ul>
                  </summary>
                </details>
              </div>
            ))}
          </div>
        </div>
      <Toaster />
      <Footer />
    </div>
);
}

export default TopicWiseTemplate;





