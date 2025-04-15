import {
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const MyApplicationCard = ({ application }) => {
  const { isDarkMode } = useTheme();

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className={`rounded-lg shadow overflow-hidden transition-all ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-purple-900/20"
          : "bg-white hover:shadow-indigo-200/50"
      }`}
    >
      {/* Compact single-row layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left side with logo and status */}
        <div
          className={`p-4 flex flex-row md:flex-col md:w-auto items-center md:items-start justify-between md:justify-center md:border-r ${
            isDarkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-md flex items-center justify-center ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              } shadow-sm`}
            >
              {application.jobDetails?.company_logo ? (
                <img
                  src={application.jobDetails.company_logo}
                  alt={application.company_name}
                  className="w-9 h-9 object-contain"
                />
              ) : (
                <FaBuilding
                  className={`text-xl ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              )}
            </div>
            <div className="md:hidden">
              <h3
                className={`text-base font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {application.job_title}
              </h3>
              <div
                className={`text-xs ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {application.company_name}
              </div>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              application.status === "accepted"
                ? "bg-green-100 text-green-800"
                : application.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {application.status?.charAt(0).toUpperCase() +
              application.status?.slice(1) || "Pending"}
          </span>
        </div>

        {/* Middle: Job details */}
        <div className="flex-1 p-4">
          <div className="hidden md:block">
            <h3
              className={`text-base font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {application.job_title}
            </h3>
            <div className="flex items-center gap-1 text-xs mb-2">
              <FaBuilding
                className={isDarkMode ? "text-purple-400" : "text-indigo-500"}
                size={12}
              />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {application.company_name}
              </span>
              {application.jobDetails?.location && (
                <>
                  <span className="mx-1">•</span>
                  <FaMapMarkerAlt
                    className={
                      isDarkMode ? "text-purple-400" : "text-indigo-500"
                    }
                    size={12}
                  />
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    {application.jobDetails.location}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Compact job details in a row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {application.jobDetails?.jobType && (
              <div className="flex items-center gap-1.5">
                <FaBriefcase
                  className={isDarkMode ? "text-purple-400" : "text-indigo-500"}
                  size={12}
                />
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {application.jobDetails.jobType}
                </span>
              </div>
            )}

            {application.jobDetails?.category && (
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3 w-3 ${
                    isDarkMode ? "text-purple-400" : "text-indigo-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 012 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {application.jobDetails.category}
                </span>
              </div>
            )}

            {application.jobDetails?.salaryRange && (
              <div className="flex items-center gap-1.5">
                <FaMoneyBillWave
                  className={isDarkMode ? "text-purple-400" : "text-indigo-500"}
                  size={12}
                />
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {application.jobDetails.salaryRange.min.toLocaleString()} -{" "}
                  {application.jobDetails.salaryRange.max.toLocaleString()}{" "}
                  {application.jobDetails.salaryRange.currency.toUpperCase()}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <FaClock
                className={isDarkMode ? "text-purple-400" : "text-indigo-500"}
                size={12}
              />
              <span
                className={`text-xs ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Applied: {formatDate(application.application_date)}
              </span>
            </div>
          </div>

          {/* Skills as inline badges */}
          {application.skills && application.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {application.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right side: Action button */}
        <div
          className={`flex items-center justify-end p-4 ${
            isDarkMode
              ? "border-t md:border-t-0 md:border-l border-gray-700"
              : "border-t md:border-t-0 md:border-l border-gray-100"
          }`}
        >
          <Link
            to={`/jobs/${application.job_id}`}
            className={`px-3 py-1.5 rounded text-xs font-medium ${
              isDarkMode
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            } transition-colors whitespace-nowrap`}
          >
            View Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyApplicationCard;
