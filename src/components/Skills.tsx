import React from 'react';
import { Plus, X } from 'lucide-react';
import { 
  FaReact, 
  FaJava, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaPython 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiCplusplus, 
  SiJavascript, 
  SiPostgresql 
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

interface Skill {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

interface SkillsProps {
  skills: Skill[];
  isEditing: boolean;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const Skills: React.FC<SkillsProps> = ({ skills, isEditing, setSkills }) => {
  // Map skill names to their respective icons
  const getSkillIcon = (name: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'React': <FaReact className="text-blue-400 mr-2" />,
      'TypeScript': <SiTypescript className="text-blue-600 mr-2" />,
      'PLpgsql': <SiPostgresql className="text-blue-500 mr-2" />,
      'C#': <TbBrandCSharp className="text-green-500 mr-2" />,
      'C++': <SiCplusplus className="text-blue-700 mr-2" />,
      'Java': <FaJava className="text-red-500 mr-2" />,
      'JavaScript': <SiJavascript className="text-yellow-400 mr-2" />,
      'Python': <FaPython className="text-blue-500 mr-2" />,
      'Node.js': <FaNodeJs className="text-green-600 mr-2" />,
      'Html': <FaHtml5 className="text-orange-500 mr-2" />,
      'Css': <FaCss3Alt className="text-blue-400 mr-2" />,
    };
    
    return iconMap[name] || null;
  };

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
      <div className="max-w-4xl mx-auto relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FaReact className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold animate-glow">Skills</h2>
          </div>
          {isEditing && (
            <button
              onClick={() =>
                setSkills([...skills, { name: 'New Skill', level: 50 }])
              }
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-blue-500/30 animate-pulse-border hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2"
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...skills];
                      newSkills[index].name = e.target.value;
                      setSkills(newSkills);
                    }}
                    className="w-full bg-gray-800 text-white border border-blue-500 rounded p-2 mb-2"
                  />
                  <input
                    type="range"
                    value={skill.level}
                    onChange={(e) => {
                      const newSkills = [...skills];
                      newSkills[index].level = parseInt(e.target.value);
                      setSkills(newSkills);
                    }}
                    className="w-full"
                    min="0"
                    max="100"
                  />
                  <button
                    onClick={() =>
                      setSkills(skills.filter((_, i) => i !== index))
                    }
                    className="text-red-400 hover:text-red-300 mt-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center font-semibold mb-2 text-blue-300">
                    {getSkillIcon(skill.name)}
                    <span>{skill.name}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;