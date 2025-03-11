import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Twitter,
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';

interface ContactProps {
  isOwner: boolean;
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
  setContactForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      message: string;
    }>
  >;
  formStatus: {
    message: string;
    type: 'success' | 'error' | null;
  };
  handleContactSubmit: (e: React.FormEvent) => void;
}

const Contact: React.FC<ContactProps> = ({
  isOwner,
  contactForm,
  setContactForm,
  formStatus,
  handleContactSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert the message into Supabase
      const { error: supabaseError } = await supabase.from('messages').insert([
        {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        },
      ]);

      if (supabaseError) {
        throw supabaseError;
      }

      // Send email notification using custom template
      await emailjs.send(
        'service_7z5zv5d',
        'template_7z5zv5d',
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          to_name: 'Name',
          reply_to: contactForm.email,
          date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        'dvajddnljva'
      );

      // Call the original handler to update local state
      handleContactSubmit(e);
    } catch (error) {
      console.error('Error submitting message:', error);
      setFormStatus({
        message: 'Failed to send message. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  return (
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
              Have a project in mind or want to discuss potential opportunities?
              I'd love to hear from you.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:yourmail1@gmail.com"
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
                href="https://leetcode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <SiLeetcode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LeetCode</span>
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
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>X</span>
              </a>
            </div>
          </div>

          <form onSubmit={submitContactForm} className="space-y-6">
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
              disabled={isSubmitting}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
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
  );
};

export default Contact;
