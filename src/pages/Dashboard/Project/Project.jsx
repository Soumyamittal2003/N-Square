
import ProjectList from './ProjectList';
import PopularProjectCard from './PopularProjectCard';

const Project = () => {
  

  return (
    <div className="p-0 flex ml-1 ">
      {/* Main Content */}
      <div className="w-2/3 pr-0 p-3">
        <ProjectList />
      </div>

      {/* Sidebar: Popular Projects */}
      <div className="p-5 flex w-1/3">
        <PopularProjectCard />
      </div>
    </div>
  );
};

export default Project;
