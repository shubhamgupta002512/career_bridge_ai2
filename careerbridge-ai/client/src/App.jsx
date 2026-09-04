import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';
import GovernmentJobs from './pages/GovernmentJobs';
import GovJobDetails from './pages/GovJobDetails';
import Companies from './pages/Companies';
import Roadmap from './pages/Roadmap';
import Profile from './pages/Profile';
import AiAdvisor from './pages/AiAdvisor';
import SavedJobs from './pages/SavedJobs';
import JobMatcher from './pages/JobMatcher';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/government-jobs" element={<GovernmentJobs />} />
            <Route path="/government-jobs/:id" element={<GovJobDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-advisor" element={<AiAdvisor />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/job-matcher" element={<JobMatcher />} />
          </Routes>
        </main>
        
        {/* Footer with Legal Disclaimer */}
        <footer className="bg-white border-t py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
            <p className="mb-2 font-medium">© 2026 CareerBridge AI. All rights reserved.</p>
            <p>
              CareerBridge AI provides job and career information for informational and educational purposes. 
              Government recruitment dates, vacancies, eligibility criteria, syllabus and selection processes may change. 
              Always verify the latest official notification and application instructions on the relevant official website before applying.
            </p>
            <p className="mt-2 text-gray-400">
              *Some listings in this development version are demonstration data and are not claims of current vacancies.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
