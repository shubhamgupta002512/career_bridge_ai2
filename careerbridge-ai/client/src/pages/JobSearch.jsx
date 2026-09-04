import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Briefcase } from 'lucide-react';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ title: '', location: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchParams.title) query.append('title', searchParams.title);
      if (searchParams.location) query.append('location', searchParams.location);
      
      const res = await api.get(`/jobs?${query.toString()}`);
      setJobs(res.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 overflow-hidden py-10">
      {/* 3D Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glassmorphism Search Bar */}
        <div className="bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 rounded-2xl p-6 mb-10 transform hover:scale-[1.01] transition-transform duration-300">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                placeholder="Job title, skills, or company"
                value={searchParams.title}
                onChange={(e) => setSearchParams({...searchParams, title: e.target.value})}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-inner"
              />
            </div>
            <div className="md:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                placeholder="City, state, or Remote"
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-[0_6px_0_rgb(5,150,105)] hover:shadow-[0_3px_0_rgb(5,150,105)] hover:translate-y-1 active:shadow-[0_0px_0_rgb(5,150,105)] active:translate-y-2 transition-all"
            >
              Search Jobs
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-20 text-green-800 font-medium text-lg animate-pulse">Loading amazing jobs...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job._id} className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 p-6 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-green-700 transition-colors">{job.title}</h3>
                  <p className="text-gray-600 font-semibold mt-1">{job.company}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 text-green-500" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="h-4 w-4 mr-2 text-green-500" />
                      {job.experience}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.skills?.slice(0, 4).map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                        {skill}
                      </span>
                    ))}
                    {job.skills?.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-50 text-gray-500 border border-gray-100">
                        +{job.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100/50 flex-none relative z-10">
                  <Link 
                    to={`/jobs/${job._id}`}
                    className="block w-full bg-green-50 text-green-700 border border-green-200 rounded-xl py-3 text-sm font-bold text-center hover:bg-green-600 hover:text-white hover:border-green-600 shadow-sm hover:shadow-md transition-all"
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

export default JobSearch;
