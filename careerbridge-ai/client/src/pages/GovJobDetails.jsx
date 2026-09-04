import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Building, MapPin, GraduationCap, Users, Calendar, ShieldCheck, ExternalLink, AlertTriangle } from 'lucide-react';

const GovJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGovJob = async () => {
      try {
        const res = await api.get(`/government-jobs/${id}`);
        setJob(res.data.data || res.data);
      } catch (err) {
        setError('Government opportunity not found or failed to load.');
      }
      
      try {
        const sylRes = await api.get(`/exam-preparation/${id}`);
        setSyllabus(sylRes.data.data || sylRes.data);
      } catch (err) {
        // It's okay if syllabus doesn't exist
        console.log('No syllabus found for this exam.');
      }
      
      setLoading(false);
    };
    fetchGovJob();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-600">Loading details...</div>;
  if (error || !job) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        
        {/* Header Section */}
        <div className="border-b pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">{job.title}</h1>
              <p className="text-xl text-gray-600 mt-2 font-medium flex items-center gap-2">
                <Building className="h-5 w-5" /> {job.organization}
              </p>
            </div>
            {job.isDemo ? (
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Demo Listing
              </span>
            ) : job.isVerified ? (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Official Source
              </span>
            ) : null}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div>
            <p className="text-blue-600 text-sm flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Qualification</p>
            <p className="font-bold text-gray-900 mt-1">{job.qualification}</p>
          </div>
          <div>
            <p className="text-blue-600 text-sm flex items-center gap-2"><Users className="h-4 w-4" /> Age Limit</p>
            <p className="font-bold text-gray-900 mt-1">{job.ageLimit}</p>
          </div>
          <div>
            <p className="text-blue-600 text-sm flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</p>
            <p className="font-bold text-gray-900 mt-1">{job.location}</p>
          </div>
          <div>
            <p className="text-blue-600 text-sm flex items-center gap-2"><Calendar className="h-4 w-4" /> Apply By</p>
            <p className="font-bold text-gray-900 mt-1">
              {job.applicationLastDate ? new Date(job.applicationLastDate).toLocaleDateString() : 'Not Announced'}
            </p>
          </div>
          <div>
            <p className="text-blue-600 text-sm flex items-center gap-2">Status</p>
            <p className="font-bold text-gray-900 mt-1">{job.status}</p>
          </div>
          <div>
            <p className="text-blue-600 text-sm flex items-center gap-2">Vacancies</p>
            <p className="font-bold text-gray-900 mt-1">{job.vacancies || 'Not specified'}</p>
          </div>
        </div>

        {/* Selection Process & Syllabus */}
        {syllabus && (
          <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Selection Process & Exam Pattern</h3>
            
            {syllabus.selectionStages && syllabus.selectionStages.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" /> Selection Stages
                </h4>
                <div className="flex flex-wrap gap-3">
                  {syllabus.selectionStages.map((stage, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-md">
                      {idx + 1}. {stage}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Exam Overview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mode</p>
                  <p className="font-semibold text-gray-900">{syllabus.examMode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{syllabus.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Marks</p>
                  <p className="font-semibold text-gray-900">{syllabus.totalMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Negative Marking</p>
                  <p className="font-semibold text-gray-900">{syllabus.negativeMarking}</p>
                </div>
              </div>
              {syllabus.examPattern && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Pattern Description</p>
                  <p className="font-medium text-gray-900 mt-1">{syllabus.examPattern}</p>
                </div>
              )}
            </div>

            {syllabus.sections && syllabus.sections.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Syllabus Topics</h4>
                <div className="space-y-4">
                  {syllabus.sections.map((section, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 font-bold text-gray-800">
                        {section.name}
                      </div>
                      <div className="p-4 bg-white">
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {section.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Official Links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 border-t pt-8">
          {job.applicationUrl && (
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-center py-3 rounded-md font-bold text-lg flex items-center justify-center gap-2 transition"
            >
              Apply Officially <ExternalLink className="h-5 w-5" />
            </a>
          )}
          
          <a
            href={job.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-3 rounded-md font-bold text-lg flex items-center justify-center gap-2 transition"
          >
            Visit Official Website <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GovJobDetails;
