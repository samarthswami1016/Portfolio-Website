import React from 'react';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <footer className="py-8 px-4 text-center text-blue-400">
      <p className="hover:text-white transition-colors">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;