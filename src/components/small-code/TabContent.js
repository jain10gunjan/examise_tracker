import React from 'react';

const TabContent = ({ topics, index, userData }) => {
  // Check if topics and userData are defined before accessing properties
  if (!topics || !userData) {
    return null; // Return null or handle the case of undefined props
  }

  // Proceed with rendering only if topics and userData are defined
  return (
    <div key={index} className="relative question-numbercontainer">
      <div className="py-2 flex border-b border-gray-200">
        <details className="group">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span>
              <a className={`${topics.textcolor}`} href={`${topics.link}`}>
                {index + 1}: {topics.name}
              </a>
              <p className='text-xs'>
                {userData[topics.topic]?.completedQuestions
                  ? `${Math.round((userData[topics.topic].completedQuestions.length / userData[topics.topic].totalquestion) * 100)}% Module Completed`
                  : '0% Module Completed'
                }
              </p>
            </span>
            <span className='text-xs absolute bottom-0 right-0'>
              {userData[topics.topic]?.completedQuestions
                ? `${Math.round(userData[topics.topic].points)} Points`
                : '0 Points'
              }
            </span>
          </summary>
        </details>
      </div>
    </div>
  );
};

export default TabContent;
