import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import {
  matrix,
  searchandsort,
  strings,
  arrays,
} from "../dsatracker/assests/db";
import { useParams } from "react-router-dom";

function TopicWiseTemplate() {
  const { topicname } = useParams();
  const [taskState, setTaskState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);

  const topicInfo = {
    matrix: {
      dbname: matrix,
      Topic: "Matrix", // Assuming you have defined `matrix` elsewhere
    },
    searchandsort: {
      dbname: searchandsort,
      Topic: "Search and Sorting", // Assuming you have defined `matrix` elsewhere
    },
    strings: {
      dbname: strings,
      Topic: "Strings", // Assuming you have defined `matrix` elsewhere
    },
    arrays: {
      dbname: arrays,
      Topic: "Arrays", // Assuming you have defined `matrix` elsewhere
    },
  };

  const selectedTasks = topicInfo[topicname].dbname;

  useEffect(() => {
    console.log("working");
    setTasks(selectedTasks[0]);
  }, [selectedTasks]);

  useEffect(() => {
    // Use the default tasks if user is not signed in
    const tasksFromLocalStorage = JSON.parse(
      localStorage.getItem(`${topicname}`)
    );
    if (tasksFromLocalStorage) {
      // Merge the tasks from the localStorage with the default tasks
      setTaskState((prevState) => {
        const merged1 = { ...tasks, ...tasksFromLocalStorage };
        const mergedTasks = { ...prevState, ...merged1 };
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
      completed: true,
    };
    const updatedTaskState = {
      ...taskState,
      [taskKey]: updatedTask,
    };
    setTaskState(updatedTaskState);
    localStorage.setItem(`${topicname}`, JSON.stringify(updatedTaskState));
  };

  const handleTaskUnchecked = (taskKey) => {
    const updatedTask = {
      ...taskState[taskKey],
      completed: false,
    };
    const updatedTaskState = {
      ...taskState,
      [taskKey]: updatedTask,
    };
    setTaskState(updatedTaskState);
    localStorage.setItem(`${topicname}`, JSON.stringify(updatedTaskState));
  };

  let i = 0;

  const tasksCompleted = taskState
    ? Object.values(taskState).filter((task) => task.completed).length
    : 0;
  const tasksTotal = taskState ? Object.keys(taskState).length : 0;

  const notify = () => {
    toast.success(`Congrats You completed the task...`);
  };

  const notify2 = () => {
    toast(`Tasks not completed...`);
  };

  const filteredTasks = Object.entries(taskState).filter(
    ([taskKey, task]) =>
      task.Topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.Problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div class="relative overflow-hidden">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24 ">
          <div class="text-center">
            <h1 class="text-4xl sm:text-6xl font-bold text-gray-800">
              {topicname.charAt(0).toUpperCase() + topicname.slice(1)}
            </h1>

            <p class="mt-3 text-gray-600">
              Elevate your knowledge by practicing premium, filtered questions
              on the topic of {topicname}.
            </p>

            <div class="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form>
                <div class="relative flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                  <div class="w-full">
                    <label
                      for="hs-search-article-1"
                      class="block text-sm text-gray-700 font-medium"
                    >
                      <span class="sr-only">Search article</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      class="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <div
                      class="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      href="#"
                    >
                      <svg
                        class="shrink-0 size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <div class="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <svg
                  class="w-16 h-auto text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    stroke-width="10"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div class="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  class="w-40 h-auto text-cyan-500"
                  width="347"
                  height="188"
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    stroke-width="7"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>

            <div class="mt-10 sm:mt-20 text-left">
              <span className="ml-2 text-sm text-gray-900 font-bold">
                <p>
                  Completion Score: {tasksCompleted} out of {tasksTotal}{" "}
                  Questions. completed
                </p>
              </span>
              <div class="m-1 py-3 px-4 gap-x-2 text-sm font-medium rounded-lg">
                {filteredTasks.map(([taskKey, task]) => (
                  <div key={taskKey}>
                    <details className="group">
                      <summary className="justify-between cursor-pointer list-none">
                        <ul>
                          <li className="flex justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
                            <div className="flex justify-start text-sm">
                              <span className="mx-4">
                                <input
                                  type="checkbox"
                                  checked={task.completed}
                                  onChange={() =>
                                    task.completed
                                      ? handleTaskUnchecked(taskKey)
                                      : handleTaskCompleted(taskKey)
                                  }
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
                              <span className="mx-2">{(i = i + 1)}</span>
                              <a href={task.URL}>
                                <span>{task.Problem}</span>
                                <span className="mx-4 px-2 py-1  text-xs rounded text-gray-800 bg-green-300">
                                  Click Here
                                </span>
                              </a>
                            </div>
                            <svg
                              fill="none"
                              height="24"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
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
          </div>
        </div>
      </div>

      {/* <div>
        <div className="relative max-w-screen-xl mx-10 mt-20 mb-10 px-5 bg-white min-h-sceen shadow-lg rounded-2xl dark:bg-gray-700">
          <p className="p-4 font-bold text-black text-md dark:text-white">
            {topicInfo[topicname].Topic}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
              <p>
                {tasksCompleted} out of {tasksTotal} Questions. completed
              </p>
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
                            onChange={() =>
                              task.completed
                                ? handleTaskUnchecked(taskKey)
                                : handleTaskCompleted(taskKey)
                            }
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
                        <span className="mx-2">{(i = i + 1)}</span>
                        <a href={task.URL}>
                          <span>{task.Problem}</span>
                          <span className="mx-4 px-2 py-1  text-xs rounded text-gray-800 bg-green-300">
                            Click Here
                          </span>
                        </a>
                      </div>
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </li>
                  </ul>
                </summary>
              </details>
            </div>
          ))}
        </div>
      </div> */}
      <Toaster />
      <Footer />
    </div>
  );
}

export default TopicWiseTemplate;
