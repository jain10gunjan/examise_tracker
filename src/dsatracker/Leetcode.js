import { useEffect, useState } from "react";

const Leetcode = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const query = `
        query {
          matchedUser(username: "jain10gunjan") {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `;

      try {
        const response = await fetch(
          "https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.data.matchedUser);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {userData ? (
        <div>
          <h2>Username: {userData.username}</h2>
          <h3>Submission Stats:</h3>
          <ul>
            {userData.submitStats.acSubmissionNum.map((item, index) => (
              <li key={index}>
                <p>Difficulty: {item.difficulty}</p>
                <p>Count: {item.count}</p>
                <p>Submissions: {item.submissions}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Leetcode;
