import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Bookmark, MapPin, Briefcase, Trash2 } from 'lucide-react';

const SavedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get('/jobs/saved');
        const data = res.data.data || res.data;
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    if (user) fetchSaved();
    else setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-20">
        <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Please log in to see your saved jobs.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <Bookmark className="h-8 w-8 text-green-600" /> Saved Jobs
      </h1>
      <p className="text-gray-600 mb-8">Jobs you've bookmarked for quick access.</p>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading saved jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
          <Bookmark className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No saved jobs yet</h3>
          <p className="text-gray-500 mb-6">Browse jobs and click "Save Job" to bookmark them here.</p>
          <Link to="/jobs" className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-500">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex justify-between items-center hover:shadow-md transition">
              <div>
                <Link to={`/jobs/${job._id}`} className="text-lg font-bold text-gray-900 hover:text-green-600">
                  {job.title}
                </Link>
                <p className="text-gray-600 font-medium">{job.company}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.jobType}</span>
                </div>
              </div>
              <Link to={`/jobs/${job._id}`} className="bg-green-50 text-green-600 border border-green-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-100">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
