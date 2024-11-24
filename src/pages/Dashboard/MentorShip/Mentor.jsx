import  { useState } from 'react';
import MentorContent from './MentorContent';
import FindGroup from './FindGroup';

const Mentor = () => {
  const [showFindGroup, setShowFindGroup] = useState(false);

  return (
    <div className="h-screen bg-white-100 flex justify-center items-center">
      {showFindGroup ? (
        <FindGroup />
      ) : (
        <MentorContent onFindGroupClick={() => setShowFindGroup(true)} />
      )}
    </div>
  );
};

export default Mentor;
