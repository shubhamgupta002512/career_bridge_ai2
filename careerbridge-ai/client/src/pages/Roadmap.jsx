import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Map, Target, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const Roadmap = () => {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRoadmap = async (e) => {
    e.preventDefault();
    if (!targetRole) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Mocking the API response in case the AI endpoint isn't fully integrated yet
      // const res = await api.post('/ai/roadmap', { targetRole });
      // setRoadmapData(res.data.data || res.data);
      
      // Simulating a delay
      setTimeout(() => {
        setRoadmapData({
          role: targetRole,
          steps: [
            { title: 'Foundation & Basics', description: `Learn the core concepts required for ${targetRole}. Focus on fundamentals.`, duration: 'Month 1-2' },
            { title: 'Advanced Concepts', description: `Deep dive into advanced topics and industry standard practices.`, duration: 'Month 3-4' },
            { title: 'Portfolio Projects', description: `Build 2-3 production-ready projects to showcase your skills.`, duration: 'Month 5' },
            { title: 'Interview Prep', description: `Focus on mock interviews, resume building, and applying to jobs.`, duration: 'Month 6' }
          ]
        });
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <Map className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">AI Career Roadmap</h1>
        <p className="mt-2 text-gray-600">Enter your dream job role and our AI will generate a step-by-step learning path for you.</p>
      </div>

      {!roadmapData ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={generateRoadmap}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Job Role</label>
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack Developer, Data Scientist"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !targetRole}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-500 disabled:bg-gray-400 flex justify-center items-center gap-2"
            >
              {loading ? 'Generating Roadmap...' : 'Generate Roadmap'}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
            {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Roadmap to {roadmapData.role}</h2>
            <button 
              onClick={() => setRoadmapData(null)}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Create New
            </button>
          </div>
          
          <div className="space-y-6">
            {roadmapData.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  {idx !== roadmapData.steps.length - 1 && (
                    <div className="h-full w-0.5 bg-blue-100 my-1"></div>
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-green-50 p-4 rounded-md border border-green-200 flex gap-3">
            <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
            <p className="text-green-800 text-sm font-medium">
              Save this roadmap to your dashboard to track your progress step-by-step!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
