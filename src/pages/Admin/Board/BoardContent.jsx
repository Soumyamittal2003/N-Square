import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";

// Define API URL
const organizationId = "6759c089b5a83a2e1a350761";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("students");
  const [studentsData, setStudentsData] = useState([]);
  const [pastEvents, setpastEvents] = useState([]);
  const [upcomingEvents, setupcomingEvents] = useState([]);
  const [alumniData, setAlumniData] = useState([]);
  const [facultyData, setFacultyData] = useState([]); // Assuming faculty data will be added in the future
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    console.log(upcomingEvents);
  }, 2000);
  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/organizations/dashboard/${organizationId}`
        );
        // Assuming the API returns a 'data' object containing students, alumni, and faculty
        setStudentsData(response.data.data.student);
        setAlumniData(response.data.data.alumni);
        setFacultyData(response.data.data.faculty); // You can update this if faculty data is added
        setupcomingEvents(response.data.data.upcomingEvents); // You can update this if faculty data is added
        setpastEvents(response.data.data.pastEvents); // You can update this if faculty data is added
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to render the list based on selected tab
  const renderList = () => {
    switch (selectedTab) {
      case "students":
        return (
          <div className="space-y-4">
            {studentsData.map((student) => (
              <div
                key={student._id}
                className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
              >
                <img
                  src={student.profileimageUrl}
                  alt="profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{`${student.firstName} ${student.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{student.tagLine}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case "alumni":
        return (
          <div className="space-y-4">
            {alumniData.map((alumni) => (
              <div
                key={alumni._id}
                className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
              >
                <img
                  src={alumni.profileimageUrl}
                  alt="profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{`${alumni.firstName} ${alumni.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{alumni.tagLine}</p>
                  <p className="text-sm text-gray-500">{alumni.email}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case "faculty":
        return (
          <div className="space-y-4">
            {facultyData.length > 0 ? (
              facultyData.map((faculty) => (
                <div
                  key={faculty._id}
                  className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
                >
                  <img
                    src={faculty.profileimageUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{`${faculty.firstName} ${faculty.lastName}`}</h3>
                    <p className="text-sm text-gray-500">{faculty.tagLine}</p>
                    <p className="text-sm text-gray-500">{faculty.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No faculty data available.</p>
            )}
          </div>
        );
      case "pastEvents":
        return (
          <div className="space-y-4">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
                >
                  <img
                    src={event.eventphoto}
                    alt="event"
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {event.eventDescription}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.date} at {event.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      Speaker: {event.speaker}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No past events available.</p>
            )}
          </div>
        );
      case "upcomingEvents":
        return (
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"
                >
                  <img
                    src={event.eventphoto}
                    alt="event"
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {event.eventDescription}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.date} at {event.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      Speaker: {event.speaker}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming events available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex space-x-6">
        {/* Tab selection */}
        <div
          onClick={() => setSelectedTab("students")}
          className={`p-4 cursor-pointer text-center rounded-lg ${
            selectedTab === "students"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          <h3 className="font-semibold">Students</h3>
          <p>{studentsData.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("alumni")}
          className={`p-4 cursor-pointer text-center rounded-lg ${
            selectedTab === "alumni"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          <h3 className="font-semibold">Alumni</h3>
          <p>{alumniData.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("faculty")}
          className={`p-4 cursor-pointer text-center rounded-lg ${
            selectedTab === "faculty"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          <h3 className="font-semibold">Faculty</h3>
          <p>{facultyData.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("pastEvents")}
          className={`p-4 cursor-pointer text-center rounded-lg ${
            selectedTab === "pastEvents"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          <h3 className="font-semibold">Past Event</h3>
          <p>{pastEvents.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("upcomingEvents")}
          className={`p-4 cursor-pointer text-center rounded-lg ${
            selectedTab === "upcomingEvents"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          <h3 className="font-semibold">upcoming Event</h3>
          <p>{upcomingEvents.length}</p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="text-xl text-gray-500">Loading...</span>
        </div>
      ) : (
        // Render the list based on selected tab
        <div className="mt-6">{renderList()}</div>
      )}
    </div>
  );
};

export default DashboardPage;
