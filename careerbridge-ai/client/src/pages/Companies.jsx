import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Building, Globe, CheckCircle } from 'lucide-react';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get('/companies');
        const data = res.data.data || res.data;
        setCompanies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-zinc-50 overflow-hidden py-12">
      {/* Professional Subtle 3D Decorative Background */}
      <div className="absolute top-0 left-[-5%] w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-zinc-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm mb-4">
            Top Hiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">Companies</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Browse 50+ verified MNCs and top startups with direct links to their official career portals.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium text-lg animate-pulse">Loading top companies...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {companies.map((company) => (
              <div 
                key={company._id} 
                className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 p-6 flex flex-col h-full relative overflow-hidden"
              >
                {/* Subtle corner gradient for depth on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-8 -mt-8"></div>

                <div className="flex flex-col items-center text-center mb-6 relative z-10">
                  <div className="h-16 w-16 bg-gradient-to-br from-white to-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.05)] border border-slate-100 mb-4 transform group-hover:rotate-3 transition-transform duration-300">
                    <Building className="h-7 w-7 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight group-hover:text-slate-700 transition-colors">{company.name}</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">{company.industry}</p>
                </div>

                <div className="flex flex-col items-center flex-1 justify-center relative z-10">
                  {company.isVerified ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5" /> Verified Careers URL
                    </div>
                  ) : (
                    <div className="h-8"></div> // Spacer to keep card heights aligned if not verified
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex-none relative z-10">
                  <a 
                    href={company.careersUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-b from-slate-800 to-slate-900 text-white rounded-xl py-3 text-sm font-bold shadow-[0_5px_0_rgb(15,23,42),0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_3px_0_rgb(15,23,42),0_5px_10px_-2px_rgba(0,0,0,0.1)] hover:translate-y-[2px] active:shadow-[0_0px_0_rgb(15,23,42)] active:translate-y-[5px] transition-all"
                  >
                    <Globe className="h-4 w-4 text-slate-300" /> Official Careers Page
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
