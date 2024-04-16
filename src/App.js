import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Practicepagewithtracker from './practicewithtracker/aptitude/Practicepagewithtracker';
import './index.css';
import Homepage from './components/Homepage';
import Singlequestionpage from './seo/Singlequestionpage';
import TopicWiseTemplate from './dsatracker/TopicWiseTemplate';
import Dsahomepage from './dsatracker/Dsahomepage';
import PracticeUnlimited from './seo/PracticeUnlimited';
import PdfSheets from './seo/PdfSheets';
import ProblemsPagemain from './dsatracker/coding/ProblemsPagemain';
import Mainpage from './dsatracker/coding/MainPage';
import Practicetestmainpage from './friendlytest/Practicetestmainpage';
import Testpage from './friendlytest/Testpage';
import Addtestform from './friendlytest/Addtestform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/practice/:pagetopic" element={<Practicepagewithtracker />} />
        <Route path="/questions/:qid" element={<Singlequestionpage />} />
        <Route path="/dsatracker/" element={<Dsahomepage />} />
        <Route path="/dsatracker/:topicname" element={<TopicWiseTemplate />} />
        <Route path="/practiceunlimited" element={<PracticeUnlimited />} />
        <Route path="/createsheets" element={<PdfSheets />} />
        <Route path="/top100codes" element={<ProblemsPagemain />} />
        <Route path="/top100codes/:codeproblemid" element={<Mainpage />} />
        <Route path="/freetest" element={<Practicetestmainpage />} />
        <Route path="/freetest/:testtopics/:totalnumber/:testid" element={<Testpage />} />
        <Route path="/addfreetest" element={<Addtestform />} />





        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
