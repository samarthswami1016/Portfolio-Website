import React from 'react';
import { User } from 'lucide-react';

interface AboutProps {
  about: {
    description: string;
    additionalInfo: string;
  };
  isEditing: boolean;
  onEditChange: (value: string, field: string) => void;
}

const About: React.FC<AboutProps> = ({ about, isEditing, onEditChange }) => {
  const EditableText = ({
    value,
    field,
    multiline = false,
  }: {
    value: string;
    field: string;
    multiline?: boolean;
  }) => {
    if (!isEditing) return <>{value}</>;

    return multiline ? (
      <textarea
        value={value}
        onChange={(e) => onEditChange(e.target.value, field)}
        className="w-full bg-gray-800 text-white border border-blue-500 rounded p-2"
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onEditChange(e.target.value, field)}
        className="w-full bg-gray-800 text-white border border-blue-500 rounded p-2"
      />
    );
  };

  return (
    <section id="about" className="py-20 px-4 glass-effect">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <User className="w-6 h-6 text-blue-400" />
          <h2 className="text-3xl font-bold animate-glow">About Me</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group hexagon overflow-hidden">
            <img
              src="https://i.imgur.com/ajdVO3B.jpeg?auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
          </div>
          <div className="space-y-4">
            <div className="text-blue-300">
              <EditableText
                value={about.description}
                field="description"
                multiline
              />
            </div>
            <div className="text-blue-300">
              <EditableText
                value={about.additionalInfo}
                field="additionalInfo"
                multiline
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
