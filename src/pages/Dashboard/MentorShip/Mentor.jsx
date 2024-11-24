// import React from 'react';
import Mentorcard from './Mentorcard';
import MentorContent from './MentorContent';

const Mentor = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-8 bg-white shadow-lg rounded-lg">
      <Mentorcard />
      <MentorContent />
    </div>
  );
};

export default Mentor;
