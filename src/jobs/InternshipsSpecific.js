"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Make sure to import useParams
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const InternshipSpecific = () => {
  const { jobId } = useParams(); // Get jobId from URL parameters
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Error state

  // Fetch job data based on the job ID from URL
  const fetchInitialJobData = async (jobId) => {
    try {
      const response = await fetch(
        `https://api.cuvette.tech/api/v1/company/public/internship-post/${jobId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch initial job data on component mount using jobId from URL
  useEffect(() => {
    if (jobId) {
      fetchInitialJobData(jobId);
    }
  }, [jobId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return (
      <div className="mt-32">
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Helmet>
        <title></title>
        <meta
          name="description"
          content={`Boost your skills with our extensive collection of multiple-choice questions (MCQs).`}
        />
        <meta
          name="keywords"
          content="Aptitude questions,Test preparation,Quantitative reasoning"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="mt-36 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto min-h-screen ">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
          <div className="lg:col-span-6">
            <div className="py-8 lg:pe-8">
              <div className="flex flex-grid">
                <img
                  src={`${data?.data?.companyProfile?.logoUrl}`}
                  alt="Company Logo"
                  height={20}
                  width={100}
                />
                <h2 className="text-3xl font-bold lg:text-5xl dark:text-white mb-4">
                  {data?.data?.companyProfile?.companyName} is Hiring{" "}
                  {data?.data?.jobPost?.refJobTitle?.name}
                </h2>
              </div>
              <p>Company Name: {data?.data?.companyProfile?.companyName}</p>
              <p>Experience: {data?.data?.jobPost?.yearsOfExperience} Years</p>
              <p>Apply Before: {data?.data?.jobPost?.expiryDate}</p>
              <p>
                Requirements:{" "}
                {data?.data?.jobPost?.refSkills?.map((skill, index) => (
                  <span key={index}>
                    {skill.name}
                    {index < data.data.jobPost.refSkills.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>
                Location:{" "}
                {data?.data?.jobPost?.isRemoteJob
                  ? "Remote"
                  : data?.data?.jobPost?.refLocation === null
                  ? "Not Disclosed"
                  : `${data?.data?.jobPost?.refLocation.city}, ${data?.data?.jobPost?.refLocation.state}`}
              </p>
              <p>
                Salary: {data?.data?.jobPost?.jobOffer[0]} -{" "}
                {data?.data?.jobPost?.jobOffer[1]} LPA
              </p>
              <p>
                Apply Link:{" "}
                <a
                  href={`https://cuvette.tech/app/public/job/${data?.data?.jobPost?._id}?referralCode=FMYBFK`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Click Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InternshipSpecific;
