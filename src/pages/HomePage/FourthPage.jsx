import backgroundImage from '../../assets/images/Background4.png'; // Replace with the actual path to the image

const FourthPage = () => {
  return (
    <div className="px-10 py-1 bg-white flex flex-col md:flex-row items-center justify-between gap-8 mx-16">
      {/* Left Section: Text Content */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          Elevate Your Connection, Job Journey with <br />
          <span className="text-blue-600">Network_Next!</span>
        </h2>

        {/* Features Section */}
        <div className="flex flex-col md:flex-row gap-8 py-10 justify-center">
          {/* Feature 1 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-blue-600">Discover Connection</h3>
            <p className="text-gray-600 mt-2">
              Join a network of passionate traders and grow your expertise together.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block border-l border-gray-300"></div>

          {/* Feature 2 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-blue-600">Fast Service</h3>
            <p className="text-gray-600 mt-2">
              Learn from the best in the industry through expert-led live, interactive webinars.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block border-l border-gray-300"></div>

          {/* Feature 3 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-blue-600">Enhance Experience</h3>
            <p className="text-gray-600 mt-2">
              Transform your trading performance with advanced techniques and insights.
            </p>
          </div>
        </div>

        {/* Learn More Button */}
        <button className="mt-8 px-6 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition">
          Learn More
        </button>
      </div>

      {/* Right Section: Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={backgroundImage}
          alt="User working on a laptop"
          className="rounded-lg  max-w-full"
        />
      </div>
    </div>
  );
};

export default FourthPage;
