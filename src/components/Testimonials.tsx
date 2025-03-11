import React from 'react';
import { Quote, Plus, X } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  isEditing: boolean;
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, isEditing, setTestimonials }) => {
  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
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
  );
};

export default Testimonials;