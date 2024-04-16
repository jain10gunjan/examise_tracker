import React, { useEffect, useState, useMemo } from 'react';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './Navbar';
import Footer from './Footer';



const HomeComponent = () => {

  const [text, setText] = useState('');

  const isTyping = true;


  const messages = useMemo(
    () => ['Aptitude', 'Coding', 'DSA', 'Operating System', 'Computer Networks', 'System Design'],
    []
  );

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
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






  return (
    <>
      <div className=''>
        <Navbar />








        <div className=''>
          <div className="rain-container">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="raindrop" />
            ))}
          </div>
          <section class="mt-20 text-gray-600 body-font">
            <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
            <div class="mt-4 w-full p-4 border rounded-lg border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 px-12">

<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Prepare {text}</h1>    
<p class="mt-4 mb-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">Aptitude Tracker :  Crafting a future of success through simplified placement preparation platform, thanks to the wonders of technology.</p>
     
</div>




<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">

      <div class="p-4 md:w-1/3">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
</svg>

    <a href={`/`}>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Prepare Aptitude</h5>
    </a>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Excel in aptitude assessments with our comprehensive and user-friendly preparation tools.</p>
    <a href={`/aptitude`} class="inline-flex items-center text-blue-600 hover:underline">
        Get Started
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
      </div>

      {/* <div class="p-4 md:w-1/3">
      <div class="max-w-sm p-6 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-7 h-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
</svg>


    <a href={`/top100codes`}>
        <h5 class="mb-2 text-white text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Top 100 Codes</h5>
    </a>
    <p class="mb-3 text-white font-normal text-gray-500 dark:text-gray-400">Master Coding Challenges: Tackling the Top Coding Problems for Skill Enhancement with our new drag and drop feature.</p>
    <a href={`/top100codes`} class="inline-flex items-center text-white hover:underline">
                Get Started
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
      </div> */}

      <div class="p-4 md:w-1/3">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
</svg>


    <a href={`/`}>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">DSA Tracker Sheet</h5>
    </a>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Navigating Success: The Ultimate DSA Tracker Sheet for Efficient Skill Development.</p>
    <a href={`https://dsatrackeronline.netlify.app`} class="inline-flex items-center text-blue-600 hover:underline">
        Get Started
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
      </div>
      
{/* 
      <div class="p-4 md:w-1/3">
      <div class="max-w-sm p-6 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-6 h-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
</svg>



    <a href={`/freetest`}>
        <h5 class="text-white mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Free Online Test</h5>
    </a>
    <p class="text-white mb-3 font-normal text-gray-500 dark:text-gray-400">Level Up Your Skills: Explore Free Online Tests for Continuous Learning.</p>
    <a href={`/freetest`} class="inline-flex items-center text-white hover:underline">
        Get Started
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
      </div> */}


      <div class="p-4 md:w-1/3">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>



    <a href={`/`}>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Core Subjects MCQs</h5>
    </a>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Knowledge Essentials: Explore Core Subject MCQs for In-Depth Understanding.</p>
    <a href={`/practice/engineering`} class="inline-flex items-center text-blue-600 hover:underline">
        Get Started
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
      </div>

      

      {/* <div class="p-4 md:w-1/3">
      <div class="max-w-sm p-6 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-6 h-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>



    <a href={`/`}>
        <h5 class="text-white mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Weekly Contest</h5>
    </a>
    <p class="text-white mb-3 font-normal text-gray-500 dark:text-gray-400">Compete and Conquer: Engage in the Thrills of Our Weekly Contest Series.</p>
    <a href={`https://test.aptitudetracker.com`} class="inline-flex items-center text-white hover:underline">
        Get Started
        <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a>
</div>
      </div> */}
      
    </div>
  </div>
</section>
            </div>
          </section>
        </div>


        {/* <Meteors/> */}
        <Footer />
      </div>
    </>
  );
}

export default HomeComponent