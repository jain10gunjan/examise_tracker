import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import axios from 'axios';

const ProblemsPagemain = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/codingcontestquestionsapi?q=question`);
        console.log(response.data);
        setProblems(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Update useEffect dependency to include language



  return (
    
<>
<Navbar/> 
<div class="mt-24 relative overflow-x-auto mx-12">

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    S.No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Problem Statement
                </th>
                <th scope="col" class="px-6 py-3">
                    Link
                </th>
            </tr>
        </thead>
        <tbody>

        {problems.map((problem, index) => (
           <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-4">
              {index+1}
          </th>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <a href={`/top100codes/${problem?._id}`}>{problem?.problemstatementshort}</a>
          </td>
          <td class="px-6 py-4">
               <a href={`/top100codes/${problem?._id}`}>Click Here</a>
          </td>
        
      </tr>

        ))}

        </tbody>
    </table>


    

 







    


</div>
<Footer/>
</>
  )
}

export default ProblemsPagemain