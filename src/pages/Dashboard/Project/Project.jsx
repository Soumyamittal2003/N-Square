
import ProjectList from './ProjectList';
// import PopularProjectCard from './PopularProjectCard';

const Project = () => {
  

  return (
    <div className="p-4 flex">
      {/* Main Content */}
      <div className="w-2/3 pr-4">
        <ProjectList />
      </div>

      {/* Sidebar: Popular Projects */}
      {/* <div className="w-1/3">
        <h2 className="text-lg font-bold mb-4">Popular Project</h2>
        {popularProjects.map((project, index) => (
          <PopularProjectCard key={index} {...project} />
        ))}
      </div> */}
    </div>
  );
};

export default Project;
