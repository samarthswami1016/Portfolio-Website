import React, { useRef, useEffect, useState } from 'react';
import { Briefcase, ChevronLeft, ChevronRight, ExternalLink, Plus, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
  isEditing: boolean;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const Projects: React.FC<ProjectsProps> = ({ projects, isEditing, setProjects }) => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (projectsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = projectsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const projectsElement = projectsRef.current;
    if (projectsElement) {
      projectsElement.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => {
      if (projectsElement) {
        projectsElement.removeEventListener('scroll', checkScroll);
      }
    };
  }, [projects]);

  const scroll = (direction: 'left' | 'right') => {
    if (projectsRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      projectsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="py-20 px-4 glass-effect relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold animate-glow">Projects</h2>
          </div>
          {isEditing && (
            <button
              onClick={() =>
                setProjects([
                  ...projects,
                  {
                    title: 'New Project',
                    description: 'Project description',
                    image:
                      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
                    link: '#',
                  },
                ])
              }
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-900/80 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-900/80 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            ref={projectsRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {projects.map((project, index) => (
              <div key={index} className="min-w-[400px] snap-start">
                <div className="group relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 border border-blue-500/30 animate-pulse-border h-[300px]">
                  {isEditing ? (
                    <div className="p-6 bg-gray-800 h-full">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index].title = e.target.value;
                          setProjects(newProjects);
                        }}
                        className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2 mb-2"
                      />
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index].description = e.target.value;
                          setProjects(newProjects);
                        }}
                        className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2 mb-2"
                      />
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index].image = e.target.value;
                          setProjects(newProjects);
                        }}
                        className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2 mb-2"
                        placeholder="Image URL"
                      />
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index].link = e.target.value;
                          setProjects(newProjects);
                        }}
                        className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2 mb-2"
                        placeholder="Project URL"
                      />
                      <button
                        onClick={() =>
                          setProjects(projects.filter((_, i) => i !== index))
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="absolute bottom-0 p-6">
                        <h3 className="text-xl font-bold mb-2 text-blue-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group-hover:underline"
                        >
                          View Project <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;