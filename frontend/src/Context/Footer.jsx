import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 w-full">
      <div className="flex justify-around">
        <a href="#home" className="hover:underline text-3xl">🏠</a> {/* Increased emoji size */}
        <a href="#project-summary" className="hover:underline text-3xl">📋</a> {/* Increased emoji size */}
        <a href="#project-statistics" className="hover:underline text-3xl">📊</a> {/* Increased emoji size */}
        <a href="#profile" className="hover:underline text-3xl">👤</a> {/* Increased emoji size */}
      </div>
    </footer>
  );
};

export default Footer;
