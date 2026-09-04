import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, GraduationCap, ChevronRight, Target, Users, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-1 overflow-hidden bg-gray-50">
      {/* 3D Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
        
        {/* Animated 3D Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium mb-8 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span>Next-Gen Career Guidance Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 tracking-tight mb-6 drop-shadow-2xl">
            Design Your Future <br/> With AI Precision
          </h1>
          
          <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto mb-10 text-shadow-sm">
            Discover jobs, prepare for government exams, and get a personalized AI roadmap tailored exactly to your skills.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/jobs" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-indigo-900 bg-white rounded-xl shadow-[0_8px_0_rgb(209,213,219)] hover:shadow-[0_4px_0_rgb(209,213,219)] hover:translate-y-1 active:shadow-[0_0px_0_rgb(209,213,219)] active:translate-y-2 transition-all"
            >
              Explore Private Jobs
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/government-jobs" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-[0_8px_0_rgb(2,132,199)] hover:shadow-[0_4px_0_rgb(2,132,199)] hover:translate-y-1 active:shadow-[0_0px_0_rgb(2,132,199)] active:translate-y-2 transition-all border border-blue-400"
            >
              Government Exams
              <GraduationCap className="ml-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3D Floating Element overlay */}
        <div className="hidden lg:block absolute bottom-10 right-20 transform rotate-12 hover:rotate-0 transition-transform duration-500">
          <div className="w-48 h-48 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[20px_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <Target className="h-20 w-20 text-cyan-300" />
          </div>
        </div>
      </div>

      {/* 3D Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Everything you need to succeed</h2>
            <p className="mt-4 text-xl text-gray-500">Powered by advanced Artificial Intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl shadow-lg flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <Search className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Job Matching</h3>
                <p className="text-gray-600">Our AI analyzes your skills and education to find the absolute best private and government job opportunities.</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Career Advisor</h3>
                <p className="text-gray-600">Chat with our intelligent AI to get interview tips, resume reviews, and personalized career strategies 24/7.</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl shadow-lg flex items-center justify-center mb-6 transform group-hover:-rotate-6 transition-transform">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Gov Exam Roadmaps</h3>
                <p className="text-gray-600">Access verified syllabuses, exam patterns, and generate customized month-by-month study plans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Call to Action */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(67,56,202,0.4)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            Ready to Accelerate Your Career?
          </h2>
          <p className="relative z-10 text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students and professionals using CareerBridge AI to find their dream jobs.
          </p>
          <Link 
            to="/register" 
            className="relative z-10 inline-flex items-center justify-center px-10 py-5 text-xl font-extrabold text-blue-700 bg-white rounded-2xl shadow-[0_10px_0_rgb(209,213,219)] hover:shadow-[0_5px_0_rgb(209,213,219)] hover:translate-y-1 active:shadow-[0_0px_0_rgb(209,213,219)] active:translate-y-2 transition-all"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
