import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Practicepagewithtracker from "./practicewithtracker/aptitude/Practicepagewithtracker";
import "./index.css";
import Homepage from "./components/Homepage";
import Singlequestionpage from "./seo/Singlequestionpage";
import TopicWiseTemplate from "./dsatracker/TopicWiseTemplate";
import Dsahomepage from "./dsatracker/Dsahomepage";
import PracticeUnlimited from "./seo/PracticeUnlimited";
import PdfSheets from "./seo/PdfSheets";
import ProblemsPagemain from "./dsatracker/coding/ProblemsPagemain";
import Mainpage from "./dsatracker/coding/MainPage";
import Practicetestmainpage from "./friendlytest/Practicetestmainpage";
import Testpage from "./friendlytest/Testpage";
import Addtestform from "./friendlytest/Addtestform";
// import HomeComponent from "./components/HomeComponent";
import NotFound from "./NotFound";
import Leetcode from "./dsatracker/Leetcode";
import QuestionsPage from "./companyWisePrev/questionsPage";
// import CompanyListPreviousYear from "./companyWisePrev/CompanyListPreviousYear";
import AllQuestionCompanyWise from "./companyWisePrev/AllQuestionsCompanyWise";
import Jobspagespecific from "./jobs/Jobspagespecific";
import InternshipSpecific from "./jobs/InternshipsSpecific";
import Singlequestionpageslug from "./seo/Singlequestionpageslug";
import Singlequestionpagewithqid from "./seo/Singlequestionpagewithqid";
import Gatetrackercse from "./gatetracker/Gatetrackercse";
import Gatetracker from "./gatetracker/Gatetracker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomeComponent />} /> 
        <Route path="/gate" element={<Gatetracker />} />
        <Route path="/tracker" element={<Homepage />} />
        <Route
          path="/practice/:pagetopic"
          element={<Practicepagewithtracker />}
        />
        <Route path="/questions/:qid" element={<Singlequestionpage />} />
        <Route path="/question/:slug" element={<Singlequestionpageslug />} />
        <Route path="/ques/:slug" element={<Singlequestionpagewithqid />} />
        <Route path="/dsatracker/" element={<Dsahomepage />} />
        <Route path="/dsatracker/:topicname" element={<TopicWiseTemplate />} />
        <Route path="/practiceunlimited" element={<PracticeUnlimited />} />
        <Route path="/createsheets" element={<PdfSheets />} />
        <Route path="/top100codes" element={<ProblemsPagemain />} />
        <Route path="/top100codes/:codeproblemid" element={<Mainpage />} />
        <Route path="/freetest" element={<Practicetestmainpage />} />
        <Route
          path="/customisetest/:testtopics/:totalnumber"
          element={<Testpage />}
        />
        <Route path="/addfreetest" element={<Addtestform />} />
        <Route path="/leetcode" element={<Leetcode />} />

        {/* Add more routes as needed */}
        {/* <Route
          path="/company/previous-year/:companyname"
          element={<CompanyListPreviousYear />}
        /> */}
        <Route
          path="/company/previous-year/tcs-nqt/:slotdate"
          element={<QuestionsPage />}
        />
        <Route
          path="/company/previous-year/:companyname"
          element={<AllQuestionCompanyWise />}
        />
        <Route path="/jobs/:jobId" element={<Jobspagespecific />} />
        <Route path="/internship/:jobId" element={<InternshipSpecific />} />

        {/* Gate Tracker */}
        <Route path="/gate" element={<Gatetracker />} />
        <Route path="/gate/cse" element={<Gatetrackercse />} />
      </Routes>
    </Router>
  );
}

export default App;
