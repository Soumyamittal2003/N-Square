import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import React from "react";
import { FaUsers, FaGraduationCap, FaChalkboardTeacher, FaCalendarAlt, FaCalendarCheck } from "react-icons/fa"; // Importing icons for tabs

// Define API URL
const organizationId = "6759c089b5a83a2e1a350761";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("students");
  const [studentsData, setStudentsData] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [alumniData, setAlumniData] = useState([]);
  const [facultyData, setFacultyData] = useState([]); // Assuming faculty data will be added in the future
  const [loading, setLoading] = useState(true);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/organizations/dashboard/${organizationId}`
        );
        setStudentsData(response.data.data.student);
        setAlumniData(response.data.data.alumni);
        setFacultyData(response.data.data.faculty);
        setUpcomingEvents(response.data.data.upcomingEvents);
        setPastEvents(response.data.data.pastEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle expansion of row to show more data
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpansion = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id]
    }));
  };

  // Function to safely join array values
  const safeJoin = (arr) => (arr && Array.isArray(arr) ? arr.join(', ') : 'N/A');

  // Function to render the list based on selected tab
  const renderList = () => {
    switch (selectedTab) {
      case "students":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Phone Number</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student) => (
                  <React.Fragment key={student._id}>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4 text-sm text-gray-800">{`${student.firstName} ${student.lastName}`}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{student.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        <span
                          className={`bg-green-100 text-green-500 p-1 rounded-full text-xs`}>
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{student.phone}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <button
                          className="text-blue-500"
                          onClick={() => toggleRowExpansion(student._id)}
                        >
                          {expandedRows[student._id] ? "Hide Details" : "Show Details"}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[student._id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="py-4 px-6 text-sm text-gray-700">
                          <div>
                            <p><strong>Address:</strong> {student.address || 'N/A'}</p>
                            <p><strong>Courses:</strong> {safeJoin(student.courses)}</p>
                            <p><strong>Skills:</strong> {safeJoin(student.skills)}</p>
                            <p><strong>Joined:</strong> {student.joinedDate || 'N/A'}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "alumni":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Phone Number</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alumniData.map((alumni) => (
                  <React.Fragment key={alumni._id}>
                    <tr className="border-t border-gray-200">
                      <td className="py-3 px-4 text-sm text-gray-800">{`${alumni.firstName} ${alumni.lastName}`}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{alumni.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        <span
                          className={`bg-green-100 text-green-500 p-1 rounded-full text-xs`}>
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{alumni.phoneNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <button
                          className="text-blue-500"
                          onClick={() => toggleRowExpansion(alumni._id)}
                        >
                          {expandedRows[alumni._id] ? "Hide Details" : "Show Details"}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[alumni._id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="py-4 px-6 text-sm text-gray-700">
                          <div>
                            <p><strong>Graduation Year:</strong> {alumni.graduationYear || 'N/A'}</p>
                            <p><strong>Job Title:</strong> {alumni.jobTitle || 'N/A'}</p>
                            <p><strong>Company:</strong> {alumni.company || 'N/A'}</p>
                            <p><strong>Skills:</strong> {safeJoin(alumni.skills)}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "faculty":
        return (
          <div className="overflow-x-auto">
            {facultyData.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Phone Number</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyData.map((faculty) => (
                    <React.Fragment key={faculty._id}>
                      <tr className="border-t border-gray-200">
                        <td className="py-3 px-4 text-sm text-gray-800">{`${faculty.firstName} ${faculty.lastName}`}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{faculty.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          <span
                            className={`bg-green-100 text-green-500 p-1 rounded-full text-xs`}>
                            Active
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{faculty.phoneNumber}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          <button
                            className="text-blue-500"
                            onClick={() => toggleRowExpansion(faculty._id)}
                          >
                            {expandedRows[faculty._id] ? "Hide Details" : "Show Details"}
                          </button>
                        </td>
                      </tr>
                      {expandedRows[faculty._id] && (
                        <tr className="bg-gray-50">
                          <td colSpan="5" className="py-4 px-6 text-sm text-gray-700">
                            <div>
                              <p><strong>Department:</strong> {faculty.department || 'N/A'}</p>
                              <p><strong>Courses:</strong> {safeJoin(faculty.courses)}</p>
                              <p><strong>Office Location:</strong> {faculty.officeLocation || 'N/A'}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No faculty data available.</p>
            )}
          </div>
        );
      case "pastEvents":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Event Title</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Speaker</th>
                </tr>
              </thead>
              <tbody>
                {pastEvents.length > 0 ? (
                  pastEvents.map((event) => (
                    <tr key={event._id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-sm text-gray-800">{event.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{event.date} at {event.time}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{event.speaker}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-3 px-4 text-sm text-gray-500">No past events available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      case "upcomingEvents":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Event Title</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Speaker</th>
                </tr>
              </thead>
              <tbody>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <tr key={event._id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-sm text-gray-800">{event.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{event.date} at {event.time}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{event.speaker}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-3 px-4 text-sm text-gray-500">No upcoming events available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50">
      <div className="flex justify-between space-x-4 w-full">
        {/* Tab selection */}
        <div
          onClick={() => setSelectedTab("students")}
          className={`flex-1 p-4 cursor-pointer text-center rounded-xl transition-all duration-300 ${
            selectedTab === "students"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xl"
              : "bg-white text-gray-600 hover:shadow-lg"
          }`}
        >
          <FaUsers className="mx-auto text-2xl mb-2" />
          <h3 className="font-semibold">Students</h3>
          <p>{studentsData.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("alumni")}
          className={`flex-1 p-4 cursor-pointer text-center rounded-xl transition-all duration-300 ${
            selectedTab === "alumni"
              ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-xl"
              : "bg-white text-gray-600 hover:shadow-lg"
          }`}
        >
          <FaGraduationCap className="mx-auto text-2xl mb-2" />
          <h3 className="font-semibold">Alumni</h3>
          <p>{alumniData.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("faculty")}
          className={`flex-1 p-4 cursor-pointer text-center rounded-xl transition-all duration-300 ${
            selectedTab === "faculty"
              ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl"
              : "bg-white text-gray-600 hover:shadow-lg"
          }`}
        >
          <FaChalkboardTeacher className="mx-auto text-2xl mb-2" />
          <h3 className="font-semibold">Faculty</h3>
          <p>{facultyData.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("pastEvents")}
          className={`flex-1 p-4 cursor-pointer text-center rounded-xl transition-all duration-300 ${
            selectedTab === "pastEvents"
              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl"
              : "bg-white text-gray-600 hover:shadow-lg"
          }`}
        >
          <FaCalendarCheck className="mx-auto text-2xl mb-2" />
          <h3 className="font-semibold">Past Event</h3>
          <p>{pastEvents.length}</p>
        </div>
        <div
          onClick={() => setSelectedTab("upcomingEvents")}
          className={`flex-1 p-4 cursor-pointer text-center rounded-xl transition-all duration-300 ${
            selectedTab === "upcomingEvents"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl"
              : "bg-white text-gray-600 hover:shadow-lg"
          }`}
        >
          <FaCalendarAlt className="mx-auto text-2xl mb-2" />
          <h3 className="font-semibold">Upcoming Event</h3>
          <p>{upcomingEvents.length}</p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="text-xl text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="mt-6">{renderList()}</div>
      )}
    </div>
  );
};

export default DashboardPage;
