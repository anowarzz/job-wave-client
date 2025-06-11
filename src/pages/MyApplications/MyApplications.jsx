import { useEffect, useState } from "react";
import { FaBriefcase, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import MyApplicationCard from "./MyApplicationCard";

const MyApplications = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected

  // fetching jobs using user email
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://job-wave-server-khaki.vercel.app/job-applications/user?email=${user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user.email]);

  // Filter applications based on status
  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status?.toLowerCase() === filter;
  });

  // Handle status change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div
          className={`text-center p-8 rounded-xl shadow-xl ${
            isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
          }`}
        >
          <div
            className="inline-block w-16 h-16 border-4 border-t-transparent border-b-transparent rounded-full animate-spin mb-4"
            style={{
              borderColor: isDarkMode
                ? "rgba(139, 92, 246, 0.3)"
                : "rgba(79, 70, 229, 0.3)",
              borderTopColor: isDarkMode ? "#8b5cf6" : "#4f46e5",
              borderBottomColor: isDarkMode ? "#8b5cf6" : "#4f46e5",
            }}
          ></div>
          <p className="mt-2 text-lg font-medium">
            Loading your applications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div
          className={`text-center p-8 rounded-xl shadow-xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-bold ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            Error
          </h3>
          <p
            className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl z-0"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #8b5cf6 100%)"
              : "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)",
            transform: "translate(25%, -25%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl z-0"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)"
              : "linear-gradient(135deg, #4f46e5 0%, #818cf8 50%, #93c5fd 100%)",
            transform: "translate(-25%, 25%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className={`mb-8 p-6 rounded-2xl shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-900 shadow-gray-900/70"
              : "bg-gradient-to-r from-white to-gray-50 shadow-gray-200/70"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                My Job Applications
              </h2>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Track and manage your job applications
              </p>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-sm`}
            >
              <FaFilter
                className={isDarkMode ? "text-purple-400" : "text-indigo-500"}
              />
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className={`p-2 rounded-md border focus:outline-none focus:ring-2 transition-all ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500"
                    : "bg-white border-gray-200 text-gray-800 focus:ring-indigo-500"
                }`}
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {applications.length === 0 ? (
          <div
            className={`text-center py-16 px-6 rounded-2xl shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <FaBriefcase
                className={`text-5xl ${
                  isDarkMode ? "text-gray-700" : "text-gray-400"
                }`}
              />
            </div>
            <h3
              className={`text-2xl font-bold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              No applications found
            </h3>
            <p
              className={`mb-6 max-w-md mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              You haven't applied to any jobs yet. Browse available positions
              and submit your first application.
            </p>
            <Link
              to="/"
              className={`inline-block px-6 py-3 rounded-lg font-medium ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              } transition-all shadow-lg hover:shadow-xl`}
            >
              Browse Jobs
            </Link>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div
            className={`text-center py-12 px-6 rounded-2xl shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <FaBriefcase
                className={`text-4xl ${
                  isDarkMode ? "text-gray-700" : "text-gray-400"
                }`}
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              No {filter} applications
            </h3>
            <p
              className={`mb-5 max-w-md mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              You don't have any applications with "{filter}" status.
            </p>
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-lg font-medium ${
                isDarkMode
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              } transition-all`}
            >
              Show all applications
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredApplications.map((application) => (
              <MyApplicationCard
                key={application._id}
                application={application}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
