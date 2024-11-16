
// import badgeWorking from "../../../assets/icons/working.svg";
// import contributorsIcon from "../../../assets/icons/contribution.svg";

const PopularProjectCard = () => {
    const popularProjects = [
      { title: "E-Krishak", contributors: 4, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e" },
      { title: "E-Krishak", contributors: 4, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e81c517f54a0c55c41aa688a1daba197f0cba53ce78048976c28add4509f955?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e" }
    ];
  
    return (
      <div className="w-[380px] flex flex-col  text-black max-md:mt-5.5">
        <button className="gap-2 self-end px-4 py-1.5 text-sm font-semibold tracking-normal leading-none text-black rounded-2xl border border-black border-solid max-md:mr-1.5">
          Create Project
        </button>
        <h2 className="self-start mt-7 text-lg font-bold tracking-wide leading-none">
          Popular Project
        </h2>
        {popularProjects.map((project, index) => (
          <div key={index} className="flex overflow-hidden flex-col py-2 pr-2.5 pl-0.5 mt-4 w-full bg-white rounded-xl border border-solid border-stone-300">
            <div className="flex gap-5 self-start text-xl font-semibold tracking-wide leading-none whitespace-nowrap">
              <img loading="lazy" src={project.image} alt={project.title} className="object-contain shrink-2 rounded-none aspect-[0.9] w-[81px]" />
              <h3 className="my-auto">{project.title}</h3>
            </div>
            <div className="flex gap-10 mt-3.5 item-start">
              <div className="flex gap-1.5 flex-1 item-start text-xs tracking-normal leading-none text-center mt-2 w-full">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/360478af2e11a65ef64ea0a1f4449e2fc431d304538dfb727a8958a10ee3b561?placeholderIfAbsent=true&apiKey=2b6398d7743249e49e60a2c281a1ae3e" alt="Contributors" className="object-contain self-center rounded-none aspect-[2.5] w-[30px]" />
                <p>+{project.contributors} Contributor</p>
              </div>
              <button className="text-xs font-bold tracking-normal leading-loose">
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
  );
};

export default PopularProjectCard;
