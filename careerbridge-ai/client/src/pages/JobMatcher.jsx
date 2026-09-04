import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Search, Target, MapPin, Briefcase, GraduationCap, X, Plus, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';

const allSkillSuggestions = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'HTML', 'CSS',
  'TypeScript', 'MongoDB', 'Express.js', 'Angular', 'Vue.js', 'Docker', 'Kubernetes',
  'Git', 'Linux', 'C++', 'C#', '.NET', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
  'Machine Learning', 'Data Science', 'AI', 'Deep Learning', 'TensorFlow', 'PyTorch',
  'Excel', 'Power BI', 'Tableau', 'Communication', 'Leadership', 'Problem Solving'
];

const educationOptions = [
  'Any Graduation',
  '10th Pass',
  '12th Pass',
  'Diploma',
  'B.Tech / B.E.',
  'B.Sc',
  'B.Com',
  'BCA',
  'BBA',
  'M.Tech / M.E.',
  'M.Sc',
  'MCA',
  'MBA',
  'Ph.D',
  'Other'
];

const JobMatcher = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [education, setEducation] = useState('');
  const [allJobs, setAllJobs] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch all jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        const data = res.data.data || res.data;
        setAllJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      }
    };
    fetchJobs();
  }, []);

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
    setSuggestions([]);
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSkillInput = (value) => {
    setSkillInput(value);
    if (value.length > 0) {
      const filtered = allSkillSuggestions.filter(
        s => s.toLowerCase().includes(value.toLowerCase()) && !skills.includes(s)
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput.trim()) addSkill(skillInput);
    }
  };

  const findMatches = () => {
    if (skills.length === 0) return;
    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      const scored = allJobs.map(job => {
        let score = 0;
        let matchedSkills = [];
        let missingSkills = [];

        // Parse job skills (could be comma-separated string or array)
        const jobSkills = typeof job.skills === 'string'
          ? job.skills.split(/[,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean)
          : (job.skills || []).map(s => s.toLowerCase());

        const userSkillsLower = skills.map(s => s.toLowerCase());

        // Skill matching
        userSkillsLower.forEach(us => {
          if (jobSkills.some(js => js.includes(us) || us.includes(js))) {
            score += 30;
            matchedSkills.push(us);
          }
        });

        // Check what job needs that user doesn't have
        jobSkills.forEach(js => {
          if (!userSkillsLower.some(us => us.includes(js) || js.includes(us))) {
            missingSkills.push(js);
          }
        });

        // Education matching bonus
        if (education && job.education) {
          const jobEdu = job.education.toLowerCase();
          const userEdu = education.toLowerCase();
          if (jobEdu.includes('any') || jobEdu.includes(userEdu) || userEdu.includes('m.tech') || userEdu.includes('ph.d')) {
            score += 20;
          }
        }

        // Cap at 100
        const matchPercent = Math.min(Math.round(score), 100);

        return { ...job, matchPercent, matchedSkills, missingSkills };
      });

      // Sort by match percentage descending, filter out 0% matches
      const filtered = scored
        .filter(j => j.matchPercent > 0)
        .sort((a, b) => b.matchPercent - a.matchPercent);

      setMatchedJobs(filtered);
      setLoading(false);
    }, 800);
  };

  const getMatchColor = (percent) => {
    if (percent >= 70) return 'text-green-600 bg-green-50 border-green-200';
    if (percent >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Smart Job Matcher</h1>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Enter your skills and education — we will find the best matching jobs for you along with a match percentage!
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        {/* Skills Input */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-green-600" /> Your Skills
          </label>
          
          {/* Added Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill) => (
              <span key={skill} className="bg-green-100 text-green-800 font-medium pl-3 pr-1 py-1.5 rounded-full text-sm flex items-center gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-1 hover:bg-green-200 rounded-full p-0.5">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Skill Text Input */}
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => handleSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a skill (e.g. React, Python, SQL) and press Enter"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => addSkill(s)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 flex items-center gap-2 border-b border-gray-50 last:border-0"
                  >
                    <Plus className="h-4 w-4 text-green-500" /> {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Education Dropdown */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-green-600" /> Your Education
          </label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="">Select your highest education</option>
            {educationOptions.map((edu) => (
              <option key={edu} value={edu}>{edu}</option>
            ))}
          </select>
        </div>

        {/* Find Button */}
        <button
          onClick={findMatches}
          disabled={skills.length === 0 || loading}
          className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg hover:bg-green-500 disabled:bg-gray-400 flex justify-center items-center gap-2 text-lg transition"
        >
          {loading ? (
            <>Matching Jobs...</>
          ) : (
            <><Search className="h-5 w-5" /> Find Matching Jobs</>
          )}
        </button>
      </div>

      {/* Results */}
      {searched && !loading && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {matchedJobs.length > 0 ? `${matchedJobs.length} Jobs Matched!` : 'No Matches Found'}
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            {matchedJobs.length > 0 
              ? 'Sorted by best match. Green = great fit, Yellow = partial fit.'
              : 'Try adding more skills or changing your education level.'
            }
          </p>

          <div className="space-y-4">
            {matchedJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      {job.isDemo && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Demo
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.experience}</span>
                      <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{job.education}</span>
                    </div>

                    {/* Matched & Missing Skills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.matchedSkills.map((s, i) => (
                        <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> {s}
                        </span>
                      ))}
                      {job.missingSkills.slice(0, 3).map((s, i) => (
                        <span key={i} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Match Percentage Badge */}
                  <div className={`text-center px-4 py-3 rounded-lg border font-bold ml-4 shrink-0 ${getMatchColor(job.matchPercent)}`}>
                    <div className="text-2xl">{job.matchPercent}%</div>
                    <div className="text-xs mt-0.5">Match</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex-1 text-center bg-green-50 text-green-600 border border-green-200 rounded-md py-2 text-sm font-medium hover:bg-green-100"
                  >
                    View Details
                  </Link>
                  <a
                    href={job.applicationUrl || job.sourceUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800"
                  >
                    Apply on Official Site
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatcher;
