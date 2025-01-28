import React, { useState } from 'react';
import { GraduationCap, BookOpen, Briefcase, ChevronRight, Search, Building2, MapPin } from 'lucide-react';

type Education = '10th' | 'intermediate' | 'btech';
type Skill = string;

interface JobOpportunity {
  company: string;
  role: string;
  location: string;
  requiredSkills: string[];
  experience: string;
  salary: string;
}

function App() {
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showJobOpportunities, setShowJobOpportunities] = useState(false);

  const skillsByEducation: Record<Education, string[]> = {
    '10th': ['Computer Basics', 'Communication', 'Basic Math', 'Language Skills', 'Problem Solving'],
    'intermediate': ['Programming Basics', 'Web Basics', 'Advanced Math', 'Science', 'Data Analysis'],
    'btech': ['React', 'Node.js', 'Python', 'Java', 'Machine Learning', 'Cloud Computing', 'DevOps', 'Data Science']
  };

  const jobOpportunities: JobOpportunity[] = [
    {
      company: 'TechCorp',
      role: 'Junior Software Developer',
      location: 'Hyderabad',
      requiredSkills: ['React', 'Node.js'],
      experience: '0-2 years',
      salary: '5-8 LPA'
    },
    {
      company: 'DataTech Solutions',
      role: 'Data Scientist',
      location: 'Bangalore',
      requiredSkills: ['Python', 'Machine Learning'],
      experience: '1-3 years',
      salary: '8-12 LPA'
    },
    {
      company: 'CloudServe',
      role: 'Cloud Engineer',
      location: 'Mumbai',
      requiredSkills: ['Cloud Computing', 'DevOps'],
      experience: '0-2 years',
      salary: '6-10 LPA'
    }
  ];

  const matchingJobs = jobOpportunities.filter(job =>
    selectedSkills.some(skill => job.requiredSkills.includes(skill))
  );

  const handleEducationSelect = (education: Education) => {
    setSelectedEducation(education);
    setSelectedSkills([]);
    setShowJobOpportunities(false);
  };

  const handleSkillToggle = (skill: Skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI-Driven Career Mentor</h1>
            </div>
            <nav className="flex gap-6">
              <button className="text-gray-600 hover:text-indigo-600">About</button>
              <button className="text-gray-600 hover:text-indigo-600">Contact</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!selectedEducation ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Select Your Education Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['10th', 'intermediate', 'btech'] as Education[]).map((education) => (
                <button
                  key={education}
                  onClick={() => handleEducationSelect(education)}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center gap-4">
                    {education === '10th' && <BookOpen className="w-12 h-12 text-indigo-600" />}
                    {education === 'intermediate' && <GraduationCap className="w-12 h-12 text-indigo-600" />}
                    {education === 'btech' && <Briefcase className="w-12 h-12 text-indigo-600" />}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {education === '10th' && '10th Standard'}
                      {education === 'intermediate' && 'Intermediate'}
                      {education === 'btech' && 'B.Tech Graduate'}
                    </h3>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => handleEducationSelect(selectedEducation)}
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
            >
              <ChevronRight className="w-5 h-5" />
              Back to education selection
            </button>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skillsByEducation[selectedEducation].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`p-3 rounded-lg border transition-colors duration-200 ${
                      selectedSkills.includes(skill)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setShowJobOpportunities(true)}
                  className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Show Career Opportunities
                </button>
              )}
            </div>

            {showJobOpportunities && selectedSkills.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Matching Job Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchingJobs.map((job, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
                          <div className="flex items-center gap-2 mt-2 text-gray-600">
                            <Building2 className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <span className="text-indigo-600 font-semibold">{job.salary}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.requiredSkills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedSkills.includes(skill)
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                        <span>Experience: {job.experience}</span>
                        <button className="text-indigo-600 hover:text-indigo-800">
                          Apply Now →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;