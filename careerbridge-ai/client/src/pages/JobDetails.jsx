import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { MapPin, Briefcase, DollarSign, ExternalLink, Calendar, ShieldCheck, AlertTriangle, Bookmark, BookmarkCheck } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Track save state
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.data || res.data);
      } catch (err) {
        setError('Job not found or failed to load.');
      }
      setLoading(false);
    };
    fetchJob();
    
    // In a real app, we would fetch if this job is already saved by the user
    // For now, we assume it's not saved initially on load.
  }, [id]);

  const handleSaveToggle = async () => {
    if (!user) {
      alert("Please login to save jobs.");
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await api.delete(`/jobs/${id}/save`);
        setIsSaved(false);
      } else {
        await api.post(`/jobs/${id}/save`);
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Failed to save job:", err);
      alert("Something went wrong while saving the job.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-600 animate-pulse">Loading job details...</div>;
  if (error || !job) return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 overflow-hidden py-10">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow-sm">{job.title}</h1>
              <p className="text-xl text-green-700 mt-2 font-bold">{job.company}</p>
            </div>
            {job.isDemo ? (
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1 shadow-sm">
                <AlertTriangle className="h-3.5 w-3.5" /> Demo Listing
              </span>
            ) : job.isVerified ? (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200 flex items-center gap-1 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" /> Official Source
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 p-6 bg-white/50 rounded-xl border border-white">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-green-500" /> Location</p>
              <p className="font-bold text-gray-900 mt-1">{job.location}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-green-500" /> Experience</p>
              <p className="font-bold text-gray-900 mt-1">{job.experience}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-green-500" /> Salary</p>
              <p className="font-bold text-gray-900 mt-1">{job.salary || 'Not Disclosed'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-extrabold flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-green-500" /> Type</p>
              <p className="font-bold text-gray-900 mt-1">{job.jobType}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, index) => (
                <span key={index} className="bg-green-50 text-green-700 border border-green-100 font-bold px-4 py-2 rounded-lg shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">{job.description}</p>
          </div>

          <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100/50 shadow-sm">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              Company Selection Process
            </h3>
            <p className="text-gray-700 font-medium mb-6">
              Most MNCs follow a standard multi-stage interview process. Prepare for the following potential rounds:
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-white text-green-600 border border-green-200 shadow-sm font-extrabold text-lg flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Aptitude & Coding Round (Online)</h4>
                  <p className="text-gray-600 font-medium mt-1">Quantitative aptitude, logical reasoning, and 2-3 DSA coding questions on platforms like HackerRank or company-specific portals.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-white text-green-600 border border-green-200 shadow-sm font-extrabold text-lg flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Technical Interview (1-2 Rounds)</h4>
                  <p className="text-gray-600 font-medium mt-1">Deep dive into your resume, core subjects (OS, DBMS, Computer Networks), system design basics, and live problem-solving.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-white text-green-600 border border-green-200 shadow-sm font-extrabold text-lg flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">HR / Behavioral Round</h4>
                  <p className="text-gray-600 font-medium mt-1">Discussion on company culture fit, your background, situational questions, and salary expectations.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
            <a
              href={job.applicationUrl || job.sourceUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 shadow-[0_6px_0_rgb(5,150,105)] hover:shadow-[0_3px_0_rgb(5,150,105)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all"
            >
              Apply on Official Website <ExternalLink className="h-5 w-5" />
            </a>
            
            <button 
              onClick={handleSaveToggle}
              disabled={isSaving}
              className={`flex-1 flex items-center justify-center gap-2 text-center py-4 rounded-xl font-extrabold text-lg transition-all border-2 
                ${isSaved 
                  ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-[0_4px_0_rgb(191,219,254)]' 
                  : 'bg-white text-gray-700 border-gray-200 shadow-[0_6px_0_rgb(229,231,235)] hover:shadow-[0_3px_0_rgb(229,231,235)] hover:translate-y-1 active:shadow-none active:translate-y-2'
                }`}
            >
              {isSaved ? <BookmarkCheck className="h-5 w-5 text-blue-600" /> : <Bookmark className="h-5 w-5" />}
              {isSaving ? 'Saving...' : isSaved ? 'Job Saved!' : 'Save Job'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
