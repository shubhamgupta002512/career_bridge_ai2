import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search, MapPin, Building, ShieldCheck, AlertTriangle } from 'lucide-react';

const GovernmentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGovJobs = async () => {
      try {
        const res = await api.get('/government-jobs');
        const data = res.data.data || res.data;
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchGovJobs();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100 overflow-hidden py-10">
      {/* 3D Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glassmorphism Info Box */}
        <div className="mb-10 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-l-4 border-l-blue-600 border-y border-r border-white/50 p-6 rounded-2xl transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-xl font-extrabold text-blue-900 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" /> Official Government Opportunities
          </h2>
          <p className="text-blue-800 text-sm mt-2 font-medium">
            Explore verified government exams, public sector jobs, and official recruitment drives. 
            Always verify details on the official organization website before applying.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-blue-800 font-medium text-lg animate-pulse">Loading government opportunities...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {jobs.map((job) => (
              <div key={job._id} className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 p-8 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                    <p className="text-gray-600 font-bold mt-1 flex items-center gap-1">
                      <Building className="h-4 w-4 text-blue-500" /> {job.organization}
                    </p>
                  </div>
                  {job.isVerified && (
                    <span className="bg-green-50/80 backdrop-blur-sm text-green-800 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200 shadow-sm">
                      Official Source ✓
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-8 relative z-10">
                  <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-blue-500 uppercase tracking-wider font-extrabold mb-1">Qualification</p>
                    <p className="text-sm font-bold text-gray-900">{job.qualification}</p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-blue-500 uppercase tracking-wider font-extrabold mb-1">Age Limit</p>
                    <p className="text-sm font-bold text-gray-900">{job.ageLimit}</p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-blue-500 uppercase tracking-wider font-extrabold mb-1">Location</p>
                    <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-blue-400" /> {job.location}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-blue-500 uppercase tracking-wider font-extrabold mb-1">Status</p>
                    <p className="text-sm font-black text-indigo-600">{job.status}</p>
                  </div>
                </div>

                {job.isDemo && (
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50/80 border border-amber-200/50 p-3 rounded-xl relative z-10">
                    <AlertTriangle className="h-4 w-4" />
                    Demo Data — Verify on official website.
                  </div>
                )}

                <div className="mt-8 flex gap-4 relative z-10">
                  <a 
                    href={job.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 text-sm font-extrabold shadow-[0_6px_0_rgb(29,78,216)] hover:shadow-[0_3px_0_rgb(29,78,216)] hover:translate-y-1 active:shadow-[0_0px_0_rgb(29,78,216)] active:translate-y-2 transition-all"
                  >
                    Official Website
                  </a>
                  <Link 
                    to={`/government-jobs/${job._id}`}
                    className="flex-1 text-center bg-white text-blue-700 border-2 border-blue-100 rounded-xl py-3 text-sm font-extrabold shadow-[0_6px_0_rgb(219,234,254)] hover:shadow-[0_3px_0_rgb(219,234,254)] hover:border-blue-200 hover:translate-y-1 active:shadow-[0_0px_0_rgb(219,234,254)] active:translate-y-2 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentJobs;
