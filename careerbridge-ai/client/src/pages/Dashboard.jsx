import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { UserCircle, Briefcase, Zap, Compass, Bookmark } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 overflow-hidden py-10 w-full">
      {/* 3D Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[0%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-10 drop-shadow-sm">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{user?.name}!</span>
        </h1>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Profile Card */}
          <div className="group bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 -mr-10 -mt-10"></div>
            <div className="p-8 flex-1 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner group-hover:rotate-6 transition-transform">
                  <UserCircle className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-indigo-700 transition-colors">Your Profile</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">Keep your profile updated for better AI recommendations and matching accuracy.</p>
              <div className="mt-6">
                <span className="inline-flex items-center gap-x-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 shadow-sm">
                  <svg className="h-2 w-2 fill-indigo-500 animate-pulse" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                  {user?.skills?.length || 0} Skills Added
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-t border-white p-4 relative z-10">
              <Link to="/profile" className="block w-full text-center py-3 bg-white text-indigo-700 font-extrabold rounded-xl shadow-[0_4px_0_rgb(224,231,255)] hover:shadow-[0_2px_0_rgb(224,231,255)] hover:translate-y-1 active:shadow-none active:translate-y-2 border border-indigo-100 transition-all">
                Edit Profile &rarr;
              </Link>
            </div>
          </div>

          {/* AI Career Advisor Card */}
          <div className="group bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 -mr-10 -mt-10"></div>
            <div className="p-8 flex-1 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner group-hover:rotate-6 transition-transform">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-purple-700 transition-colors">AI Career Advisor</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">Chat with our intelligent AI to get personalized guidance, resume tips, and discover skill gaps.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-t border-white p-4 relative z-10">
              <Link to="/ai-advisor" className="block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold rounded-xl shadow-[0_4px_0_rgb(88,28,135)] hover:shadow-[0_2px_0_rgb(88,28,135)] hover:translate-y-1 active:shadow-none active:translate-y-2 transition-all">
                Ask AI &rarr;
              </Link>
            </div>
          </div>
          
          {/* Career Roadmap Card */}
          <div className="group bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 -mr-10 -mt-10"></div>
            <div className="p-8 flex-1 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 shadow-inner group-hover:rotate-6 transition-transform">
                  <Compass className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-cyan-700 transition-colors">Career Roadmap</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">Generate a customized, step-by-step monthly timeline to achieve your specific career goals.</p>
            </div>
            <div className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-t border-white p-4 relative z-10">
              <Link to="/roadmap" className="block w-full text-center py-3 bg-white text-cyan-700 font-extrabold rounded-xl shadow-[0_4px_0_rgb(207,250,254)] hover:shadow-[0_2px_0_rgb(207,250,254)] hover:translate-y-1 active:shadow-none active:translate-y-2 border border-cyan-100 transition-all">
                View Roadmap &rarr;
              </Link>
            </div>
          </div>

          {/* Job Matches Card */}
          <div className="group bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 -mr-10 -mt-10"></div>
            <div className="p-8 flex-1 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-inner group-hover:rotate-6 transition-transform">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-green-700 transition-colors">Job Matches</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">View open positions and verified opportunities specifically matched to your unique profile.</p>
            </div>
            <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-t border-white p-4 relative z-10">
              <Link to="/jobs" className="block w-full text-center py-3 bg-white text-green-700 font-extrabold rounded-xl shadow-[0_4px_0_rgb(209,250,229)] hover:shadow-[0_2px_0_rgb(209,250,229)] hover:translate-y-1 active:shadow-none active:translate-y-2 border border-green-100 transition-all">
                Browse Jobs &rarr;
              </Link>
            </div>
          </div>

          {/* Saved Jobs Card */}
          <div className="group bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 rounded-3xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-transparent rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 -mr-10 -mt-10"></div>
            <div className="p-8 flex-1 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 shadow-inner group-hover:-rotate-6 transition-transform">
                  <Bookmark className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-pink-700 transition-colors">Saved Jobs</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 font-medium leading-relaxed">Review all the private and government jobs you've bookmarked for later application.</p>
            </div>
            <div className="bg-gradient-to-r from-pink-50/50 to-rose-50/50 border-t border-white p-4 relative z-10">
              <Link to="/saved-jobs" className="block w-full text-center py-3 bg-white text-pink-700 font-extrabold rounded-xl shadow-[0_4px_0_rgb(252,231,243)] hover:shadow-[0_2px_0_rgb(252,231,243)] hover:translate-y-1 active:shadow-none active:translate-y-2 border border-pink-100 transition-all">
                View Saved &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
