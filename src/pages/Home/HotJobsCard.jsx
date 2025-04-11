import {
  FaBuilding,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaRegBookmark,
} from "react-icons/fa";

const HotJobsCard = ({ job, darkMode }) => {
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 
      group cursor-pointer hover:shadow-xl relative overflow-hidden
      ${
        darkMode
          ? "bg-gray-800/70 border-0 shadow-lg shadow-gray-900/30 hover:shadow-gray-900/40 backdrop-blur-sm"
          : "bg-white/80 border-0 shadow-md shadow-gray-300/20 hover:shadow-gray-300/30 backdrop-blur-sm"
      }`}
    >
      {/* Featured badge with improved styling */}
      {job.featured && (
        <div
          className={`absolute top-0 right-0 px-3 py-1.5 text-xs font-semibold 
          ${
            darkMode
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              : "bg-gradient-to-r from-primary to-blue-600 text-white"
          }`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
          }}
        >
          Featured
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Header with company logo and bookmark */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-md flex items-center justify-center mr-3 
              ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
            >
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <FaBuilding
                  className={`text-xl ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              )}
            </div>
            <div>
              <h3
                className={`font-semibold text-lg mb-1 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {job.title}
              </h3>
              <div className="flex items-center">
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {job.company}
                </span>
              </div>
            </div>
          </div>
          <button
            className={`p-2 rounded-full transition-all duration-300
            ${
              darkMode
                ? "text-gray-400 hover:text-purple-400 hover:bg-gray-700"
                : "text-gray-500 hover:text-primary hover:bg-gray-100"
            }`}
          >
            <FaRegBookmark />
          </button>
        </div>

        {/* Key skills badges */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {job.skills.map((skill, index) => (
              <div
                key={index}
                className={`text-xs font-medium px-2 py-1 rounded-md
                  ${
                    darkMode
                      ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                      : "bg-primary/10 text-primary border border-primary/30"
                  }`}
              >
                {skill}
              </div>
            ))}
          </div>
        )}

        {/* Job details */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div
            className={`flex items-center text-sm px-3 py-1 rounded-full
            ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaMapMarkerAlt className="mr-1 text-xs" />
            {job.location}
          </div>
          <div
            className={`flex items-center text-sm px-3 py-1 rounded-full
            ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaClock className="mr-1 text-xs" />
            {job.type}
          </div>
          <div
            className={`flex items-center text-sm px-3 py-1 rounded-full
            ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <FaDollarSign className="mr-1 text-xs" />
            {job.salary}
          </div>
        </div>

        {/* Job description */}
        <p
          className={`text-sm mb-5 flex-grow ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {job.description}
        </p>

        {/* Footer with apply button */}
        <div className="flex justify-between items-center mt-auto">
          <div
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {job.postedTime}
          </div>
          <button
            className={`text-sm font-medium py-1.5 px-4 rounded-full transition-all duration-300
            ${
              darkMode
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;
