import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

interface HeaderProps {
  about: {
    name: string;
    title: string;
  };
  isEditing: boolean;
  onEditChange: (value: string, field: string) => void;
}

const Header: React.FC<HeaderProps> = ({ about, isEditing, onEditChange }) => {
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
    <header className="min-h-screen flex flex-col items-center justify-center relative px-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5"></div>
      <div className="z-10 text-center">
        <div className="relative">
          <div className="absolute -top-12 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute -top-8 -right-8 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-text-shimmer">
            <EditableText value={about.name} field="name" />
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-blue-300 mb-8">
          <EditableText value={about.title} field="title" />
        </p>
        <div className="flex gap-4 justify-center mb-12">
          <a
            href="https://github.com/Samarthswami1016"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition-all hover:scale-110 transform"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://leetcode.com/Samarthswami1016/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition-all hover:scale-110 transform"
          >
            <SiLeetcode className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/samarthswami"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition-all hover:scale-110 transform"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:Samarth.works1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white transition-all hover:scale-110 transform"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <a
          href="#about"
          className="animate-bounce inline-block text-blue-400 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </header>
  );
};

export default Header;