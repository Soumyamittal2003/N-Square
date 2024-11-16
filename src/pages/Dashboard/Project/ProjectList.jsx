
import ProjectCard from './ProjectCard';
import PopularProjects from './PopularProjectCard';

const ProjectList = () => {
    const projects = [
        {
          title: "E-Krishak",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
          creator: "Soumya Mittal",
          contributors: 4,
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
        },
        {
          title: "E-Krishak",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
          creator: "Soumya Mittal",
          contributors: 4,
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
        },
        {
          title: "E-Krishak",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
          creator: "Soumya Mittal",
          contributors: 4,
          image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e"
        }
      ];
    
      return (
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[77%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-start w-full text-black max-md:mt-3 max-md:max-w-full">
              {/* <ProjectFilter /> */}
              <h2 className="mt-7 text-lg font-bold tracking-wide leading-none">Projects</h2>
              <div className="flex flex-col self-stretch mt-3.5 w-full max-md:max-w-full">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-10 ml-5 w-[30%] max-md:ml-0 max-md:w-full">
            <PopularProjects />
          </div>
        </div>
  );
};

export default ProjectList;
