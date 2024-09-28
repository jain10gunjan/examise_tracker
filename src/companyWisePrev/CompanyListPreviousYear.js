import React from "react";
import { useParams } from "react-router-dom";
import { companyList } from "../staticDB/companylist/db"; // Import your companyList data
import toast, { Toaster } from "react-hot-toast";

const CompanyListPreviousYear = () => {
  const { companyname } = useParams(); // Get company name from URL

  // Dynamically access the company's exam data from the companyList
  const companyExams = companyList[companyname.toLowerCase()]; // Handle case-insensitive URL params

  // Check if the company exists in the companyList
  if (!companyExams) {
    return <p>No data available for this company.</p>; // Handle invalid company names
  }

  return (
    <section className="mt-8 text-gray-600 body-font">
      <div className="container mx-auto flex flex-col px-5 py-10 items-center">
        <div className="w-full md:w-2/3 flex flex-col mb-16">
          <div className="mt-4 mb-6 w-full p-4 border rounded-lg border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 px-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Prepare for {companyname.toUpperCase()} Exams
            </h1>
            <p className="mt-4 mb-2 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              Gear up, sharpen your mind, and conquer those aptitude challenges
              – success awaits in your upcoming exams! 🚀✨{" "}
            </p>
          </div>

          {/* Display all exams for the selected company */}
          {companyExams.map((exam, index) => (
            <div key={index} className="relative question-numbercontainer">
              <div className="py-2 flex border-b border-gray-200">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    {exam.link !== null ? (
                      <span>
                        <a
                          className={`${exam.textcolor}`}
                          href={`${exam.link}`}
                        >
                          {index + 1}: {exam.name}
                        </a>
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          toast.success("Uploading Soon.");
                        }}
                      >
                        <p className={`${exam.textcolor}`}>
                          {index + 1}: {exam.name}
                          <p className="text-sm">Uploading Soon</p>
                        </p>
                      </span>
                    )}
                  </summary>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default CompanyListPreviousYear;
