import React, { useEffect, useState, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  User,
  ChevronDown,
  Star,
  Edit2,
  Save,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Quote,
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

interface Message {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

function App() {
  const [isVisible, setIsVisible] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const [about, setAbout] = useState({
    name: 'YOUR NAME',
    title: 'Aspiring Engineer | Software Developer | Tech Enthusiast',
    description:
      'Hi, I’m, a passionate engineering student currently pursuing my Bachelor of Engineering (BE) at the University of Mumbai (2022-2026). I have a strong foundation in C#, C++, and Java, and I love solving complex problems through code.',

    additionalInfo:
      "I’m always eager to explore new technologies, refine my programming skills, and take on challenges that push me to grow. Whether it's developing efficient software solutions or learning about the latest advancements in tech, I’m committed to continuous learning and innovation.",
  });

  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'PLpgsql', level: 75 },
    { name: 'Java', level: 75 },
    { name: 'JavaScript', level: 70 },
    { name: 'Python', level: 80 },
    { name: 'Node.js', level: 85 },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'Task Management App',
      description: 'A beautiful and intuitive task management application',
      image:
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80',
      link: 'https://github.com/Samarthswami1016/task-manager',
    },
    {
      title: 'AI Image Generator',
      description: 'An AI-powered image generation tool using stable diffusion',
      image:
        'https://images.unsplash.com/photo-1525373698358-041e3a460346?auto=format&fit=crop&q=80',
      link: 'https://github.com/Samarthswami1016/ai-image-gen',
    },
    {
      title: 'AI Image Generator',
      description: 'An AI-powered image generation tool using stable diffusion',
      image:
        'https://images.unsplash.com/photo-1525373698358-041e3a460346?auto=format&fit=crop&q=80',
      link: 'https://github.com/Samarthswami1016/ai-image-gen',
    },
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      name: 'Sarah Johnson',
      role: 'Tech Lead at InnovateTech',
      content:
        'An exceptional developer who consistently delivers high-quality solutions. Their technical expertise and attention to detail are truly impressive.',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at DigitalFlow',
      content:
        'Working with them was a game-changer for our project. Their ability to understand complex requirements and translate them into elegant solutions is remarkable.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO at TechStart',
      content:
        "A rare combination of technical brilliance and excellent communication skills. They've been instrumental in the success of multiple projects.",
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    },
  ]);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({
    message: '',
    type: null,
  });

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated =
        localStorage.getItem('isPortfolioOwner') === 'true';
      setIsOwner(isAuthenticated);
    };

    checkAuth();
  }, []);

  const login = () => {
    const password = prompt('Enter owner password:');
    if (password === 'admin123') {
      localStorage.setItem('isPortfolioOwner', 'true');
      setIsOwner(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('isPortfolioOwner');
    setIsOwner(false);
    setIsEditing(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: Message = {
      ...contactForm,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Log the message to console (in production, you'd send this to a server)
    console.log('New Message Received:', newMessage);

    setFormStatus({ message: 'Message sent successfully!', type: 'success' });
    setContactForm({ name: '', email: '', message: '' });

    // Show messages to owner if logged in
    if (isOwner) {
      alert(
        `New message from ${contactForm.name}!\n\nEmail: ${contactForm.email}\nMessage: ${contactForm.message}`
      );
    }

    setTimeout(() => setFormStatus({ message: '', type: null }), 3000);
  };

  const EditButton = ({ onClick }: { onClick: () => void }) =>
    isOwner ? (
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
      >
        {isEditing ? (
          <Save className="w-6 h-6" />
        ) : (
          <Edit2 className="w-6 h-6" />
        )}
      </button>
    ) : null;

  const EditableText = ({
    value,
    onChange,
    multiline = false,
  }: {
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
  }) => {
    if (!isEditing) return <>{value}</>;

    return multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white border border-blue-500 rounded p-2"
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white border border-blue-500 rounded p-2"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Auth Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-4">
        {isOwner ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={login}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Owner Login
          </button>
        )}
      </div>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5"></div>
        <div className="z-10 text-center">
          <div className="relative animate-float">
            <div className="absolute -top-12 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 hover-glow bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              <EditableText
                value={about.name}
                onChange={(value) => setAbout({ ...about, name: value })}
              />
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-300 mb-8">
            <EditableText
              value={about.title}
              onChange={(value) => setAbout({ ...about, title: value })}
            />
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-white transition-all hover:scale-110 transform"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-white transition-all hover:scale-110 transform"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:your.mail@gmail.com"
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

      {/* About Section */}
      <section id="about" className="py-20 px-4 glass-effect">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold animate-glow">About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group hexagon overflow-hidden">
              <img
                src="https://i.imgur.com/yBZFx1a.png?auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
            <div className="space-y-4">
              <div className="text-blue-300">
                <EditableText
                  value={about.description}
                  onChange={(value) =>
                    setAbout({ ...about, description: value })
                  }
                  multiline
                />
              </div>
              <div className="text-blue-300">
                <EditableText
                  value={about.additionalInfo}
                  onChange={(value) =>
                    setAbout({ ...about, additionalInfo: value })
                  }
                  multiline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-400" />
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
                    <h3 className="font-semibold mb-2 text-blue-300">
                      {skill.name}
                    </h3>
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

      {/* Projects Section */}
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
      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <Quote className="w-6 h-6 text-blue-400" />
              <h2 className="text-3xl font-bold animate-glow">Testimonials</h2>
            </div>
            {isEditing && (
              <button
                onClick={() =>
                  setTestimonials([
                    ...testimonials,
                    {
                      name: 'New Testimonial',
                      role: 'Role',
                      content: 'Testimonial content',
                      image:
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
                    },
                  ])
                }
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2"
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => {
                        const newTestimonials = [...testimonials];
                        newTestimonials[index].name = e.target.value;
                        setTestimonials(newTestimonials);
                      }}
                      className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => {
                        const newTestimonials = [...testimonials];
                        newTestimonials[index].role = e.target.value;
                        setTestimonials(newTestimonials);
                      }}
                      className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2"
                      placeholder="Role"
                    />
                    <textarea
                      value={testimonial.content}
                      onChange={(e) => {
                        const newTestimonials = [...testimonials];
                        newTestimonials[index].content = e.target.value;
                        setTestimonials(newTestimonials);
                      }}
                      className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2"
                      placeholder="Content"
                      rows={4}
                    />
                    <input
                      type="text"
                      value={testimonial.image}
                      onChange={(e) => {
                        const newTestimonials = [...testimonials];
                        newTestimonials[index].image = e.target.value;
                        setTestimonials(newTestimonials);
                      }}
                      className="w-full bg-gray-700 text-white border border-blue-500 rounded p-2"
                      placeholder="Image URL"
                    />
                    <button
                      onClick={() =>
                        setTestimonials(
                          testimonials.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      />
                      <div>
                        <h3 className="font-semibold text-blue-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">
                      {testimonial.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 glass-effect">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold animate-glow">Get in Touch</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">
                Let's Connect
              </h3>
              <p className="text-gray-300 mb-6">
                Have a project in mind or want to discuss potential
                opportunities? I'd love to hear from you.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:your.mail@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Mail</span>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Github</span>
                </a>
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-blue-500/30 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-blue-500/30 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-blue-500/30 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  rows={6}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
              {formStatus.message && (
                <div
                  className={`text-sm ${
                    formStatus.type === 'success'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>


            {/* Footer */}
      <footer className="py-8 px-4 text-center text-blue-400">
        <p className="hover:text-white transition-colors">
          © 2024 {about.name}. All rights reserved.
        </p>
      </footer>

      <EditButton onClick={() => setIsEditing(!isEditing)} />
    </div>
  );
}

export default App;
