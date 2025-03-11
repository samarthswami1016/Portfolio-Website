import React, { useEffect, useState } from 'react';
import { Edit2, Save, Download } from 'lucide-react';
import { supabase } from './lib/supabase';

// Components
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  const [messages, setMessages] = useState<Message[]>([]);

  const [about, setAbout] = useState({
    name: 'your name',
    title: 'Aspiring Engineer | Software Developer | Tech Enthusiast',
    description:
      "Hi, I'm your name, a passionate engineering student currently pursuing my Bachelor of Engineering (BE) at the XYZ University (0000 - 0000). I have a strong foundation in C, C++, and Java, and I love solving complex problems through code.",
    additionalInfo:
      "I'm always eager to explore new technologies, refine my programming skills, and take on challenges that push me to grow. Whether it's developing efficient software solutions or learning about the latest advancements in tech, I'm committed to continuous learning and innovation.",
  });

  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'PLpgsql', level: 75 },
    { name: 'C#', level: 80 },
    { name: 'C++', level: 80 },
    { name: 'Java', level: 75 },
    { name: 'JavaScript', level: 70 },
    { name: 'Python', level: 80 },
    { name: 'Node.js', level: 85 },
    { name: 'Html', level: 95 },
    { name: 'Css', level: 88 },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'YOUR PROJECT NAME',
      description: 'A full-stack Web application with TypeScript and PLpgsql',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      link: 'https://google.in/',
    },
    // {
    //   title: 'YOUR PROJECT NAME',
    //   description: 'A full-stack Web application with TypeScript and PLpgsql',
    //   image:
    //     'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    //   link: 'https://google.in/',
    // },
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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

  // Fetch messages if user is owner
  useEffect(() => {
    if (isOwner) {
      fetchMessages();
    }
  }, [isOwner]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setMessages(
          data.map((msg) => ({
            name: msg.name,
            email: msg.email,
            message: msg.message,
            timestamp: msg.created_at,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const downloadResume = () => {
    // Create a link element
    const link = document.createElement('a');

    // Set the file path to the resume
    link.href = '/resume.docx';

    // Set the download attribute with the desired filename
    link.download = 'Samarth-Resume.docx';

    // Append to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
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

  const handleEditChange = (value: string, field: string) => {
    setAbout((prev) => ({ ...prev, [field]: value }));
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
            onClick={downloadResume}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        )}
      </div>

      {/* Components */}
      <Header
        about={{ name: about.name, title: about.title }}
        isEditing={isEditing}
        onEditChange={handleEditChange}
      />

      <About
        about={{
          description: about.description,
          additionalInfo: about.additionalInfo,
        }}
        isEditing={isEditing}
        onEditChange={handleEditChange}
      />

      <Skills skills={skills} isEditing={isEditing} setSkills={setSkills} />

      <Projects
        projects={projects}
        isEditing={isEditing}
        setProjects={setProjects}
      />

      <Testimonials
        testimonials={testimonials}
        isEditing={isEditing}
        setTestimonials={setTestimonials}
      />

      <Contact
        isOwner={isOwner}
        contactForm={contactForm}
        setContactForm={setContactForm}
        formStatus={formStatus}
        handleContactSubmit={handleContactSubmit}
      />

      <Footer name={about.name} />

      <EditButton onClick={() => setIsEditing(!isEditing)} />
    </div>
  );
}

export default App;
