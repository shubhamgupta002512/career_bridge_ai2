import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Briefcase, Book, Award, Edit2 } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div className="text-center py-20">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-gray-500 shadow-md">
              <User className="h-12 w-12" />
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit2 className="h-4 w-4" /> {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{user.name || 'User'}</h1>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4" /> {user.email}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Professional Details */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" /> Professional
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Current Role</label>
                  <p className="font-medium text-gray-900">Not specified</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Experience</label>
                  <p className="font-medium text-gray-900">Fresher / 0 years</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Skills</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">React</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Node.js</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">Add more +</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Details */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Book className="h-5 w-5 text-blue-600" /> Education
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Highest Qualification</label>
                  <p className="font-medium text-gray-900">Not specified</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">University / College</label>
                  <p className="font-medium text-gray-900">Not specified</p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-blue-600" /> Government Exam Prep
                  </h3>
                  <p className="text-sm text-gray-600">You haven't added any targeted government exams yet.</p>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 bg-amber-50 p-4 rounded-md border border-amber-200 text-amber-800 text-sm">
              Profile editing functionality is currently in development. You will soon be able to update your skills, education, and target exams here!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
