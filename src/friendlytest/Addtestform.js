import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Addtestform = () => {
  const [formData, setFormData] = useState({
    topicname: '',
    subject: '',
    testname: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getRandomTopics = (topicList, numberOfTopics) => {
    const shuffledTopics = topicList.slice().sort(() => Math.random() - 0.5);
    return shuffledTopics.slice(0, numberOfTopics);
  };

  const getTopicList = (selectedSubject) => {
    // Add more subjects and their corresponding topic lists as needed
    switch (selectedSubject) {
      case 'biology':
        return [
          'airpollution',
          'lysosomes',
          'waterpollution',
          'solidwastemanagement',
          'vitamins',
          'anatomy',
        ];
      case 'aptitude':
        return [
          'partnership',
          'averages',
          'calendars',
          'problems-on-ages',
          'profit-and-loss',
          'percentage',
          'number-system',
          'simplification',
          'chain-rule',
        ];
      // Add more cases for other subjects
      default:
        return [];
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    const selectedTopicList = getTopicList(selectedSubject);
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: selectedSubject,
      testname: formData.testname,
      topicname: getRandomTopics(selectedTopicList, Math.floor(Math.random() * 5) + 1).join('_'), // Reset the topicname when subject changes
    }));
  };

  const handleAddQuestion = async (event) => {
    event.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/freetestformdata`, {
        data: formData,
      });

      console.log('Data submitted successfully!', response.data);
      toast.success('Question added Successfully');
      // Perform any additional actions or display success message
    } catch (error) {
      console.error('Failed to submit data:', error);
      // Display error message
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mt-4 mb-8">Aptitude Question Form</h1>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
          <form onSubmit={handleAddQuestion}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                Test Name
              </label>
              <input
                type="text"
                id="id"
                name="testname"
                value={formData.testname}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="difficulty">
                Subject Name
              </label>
              <select
                id="difficulty"
                name="subject"
                value={formData.subject}
                onChange={handleSubjectChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Select Subject
                </option>
                <option value="biology">Biology</option>
                <option value="aptitude">Aptitude</option>
                {/* Add more subjects as needed */}
              </select>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Addtestform;
