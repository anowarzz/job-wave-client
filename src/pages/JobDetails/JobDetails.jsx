import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCloudDownloadAlt,
  FaCoins,
  FaEnvelope,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaRegBookmark,
  FaUsers,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        // Fetch job data from API based on ID
        const response = await fetch(`http://localhost:5000/jobs/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Format salary range
  const formatSalary = (salaryRange) => {
    if (!salaryRange) return "Negotiable";

    if (typeof salaryRange === "string") {
      return salaryRange;
    }

    const { min, max, currency } = salaryRange;
    const currencySymbol = currency === "usd" ? "$" : "৳";

    return `${currencySymbol} ${min?.toLocaleString()} - ${max?.toLocaleString()}`;
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="animate-pulse flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } mb-5`}
          ></div>
          <div
            className={`h-5 w-40 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } rounded mb-3`}
          ></div>
          <div
            className={`h-3 w-64 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } rounded`}
          ></div>
          <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            Loading job details...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md">
          <div className="text-red-500 dark:text-red-400 text-4xl mb-3">❌</div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error Loading Job
          </h3>
          <p className="text-red-600/70 dark:text-red-300/70 mb-4">{error}</p>
          <Link
            to="/"
            className={`inline-block px-4 py-2 rounded-full text-white ${
              isDarkMode
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-primary hover:bg-primary/90"
            } transition-colors`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12">
      {/* Background with gradient and pattern */}
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-grid-pattern"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-br from-primary to-blue-500 dark:from-purple-600 dark:to-blue-700 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-tr from-purple-500 to-pink-500 dark:from-indigo-700 dark:to-purple-800 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:text-purple-400"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            <FaArrowLeft size={14} /> Back to jobs
          </Link>
        </div>

        {/* Main content card */}
        <div
          className={`rounded-xl overflow-hidden ${
            isDarkMode
              ? "bg-gray-800/80 shadow-lg shadow-gray-900/30"
              : "bg-white/90 shadow-lg shadow-gray-200/50"
          } backdrop-blur-sm transition-all duration-300 mb-8`}
        >
          {/* Header section with decorative line */}
          <div className="relative">
            {/* Decorative top colorful line */}
            <div
              className={`h-2 w-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-purple-600 via-indigo-500 to-blue-600"
                  : "from-primary via-amber-500 to-blue-500"
              }`}
            ></div>

            {/* Featured badge if applicable */}
            {job?.featured && (
              <div
                className={`absolute top-2 right-4 px-3 py-1.5 text-xs font-semibold text-white ${
                  isDarkMode
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                    : "bg-gradient-to-r from-primary to-blue-600"
                }`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
                }}
              >
                Featured
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Job title and save button */}
              <div className="flex justify-between items-start mb-6">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`text-3xl md:text-4xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {job?.title || "Job Title"}
                </motion.h1>
                <button
                  className={`p-2.5 rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? "text-gray-400 bg-gray-700/50 hover:text-purple-400 hover:bg-gray-700"
                      : "text-gray-500 bg-gray-100/80 hover:text-primary hover:bg-gray-200"
                  }`}
                  aria-label="Save job"
                >
                  <FaRegBookmark size={18} />
                </button>
              </div>

              {/* Company info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {job?.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job?.company}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <FaBuilding
                      className={`text-3xl ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {job?.company || "Company Name"}
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {job?.postedTime || "Posted recently"}
                  </p>
                </div>
              </motion.div>

              {/* Job highlight badges */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaMapMarkerAlt
                    className={isDarkMode ? "text-purple-400" : "text-primary"}
                  />
                  {job?.location || "Location"}
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaBriefcase
                    className={isDarkMode ? "text-purple-400" : "text-primary"}
                  />
                  {job?.jobType || job?.type || "Job Type"}
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaCoins
                    className={isDarkMode ? "text-purple-400" : "text-primary"}
                  />
                  {job?.salaryRange
                    ? formatSalary(job.salaryRange)
                    : job?.salary || "Salary Negotiable"}
                </div>
                {job?.experience && (
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FaUsers
                      className={
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }
                    />
                    {job.experience}
                  </div>
                )}
                {job?.deadline && (
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FaCalendarAlt
                      className={
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }
                    />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Job description and details */}
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-3xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Job Description
                </h3>
                <div
                  className={`prose max-w-none mb-8 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <p>{job?.description || "No description available."}</p>
                </div>
              </motion.div>

              {/* Requirements section */}
              {(job?.requirements || job?.skills) && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-8"
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Requirements & Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(job?.requirements || job?.skills)?.map((skill, index) => (
                      <div
                        key={index}
                        className={`text-sm font-medium px-3 py-1.5 rounded-md
                          ${
                            isDarkMode
                              ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                              : "bg-primary/10 text-primary border border-primary/30"
                          }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Educational requirements if available */}
              {job?.educationalRequirements && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-8"
                >
                  <h3
                    className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    <FaGraduationCap
                      className={
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }
                    />
                    Educational Requirements
                  </h3>
                  <div
                    className={`prose max-w-none ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <p>{job.educationalRequirements}</p>
                  </div>
                </motion.div>
              )}

              {/* Job responsibilities if available */}
              {job?.responsibilities && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-8"
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Responsibilities
                  </h3>
                  <ul
                    className={`list-disc pl-5 space-y-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {Array.isArray(job.responsibilities) ? (
                      job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>{job.responsibilities}</li>
                    )}
                  </ul>
                </motion.div>
              )}

              {/* Benefits if available */}
              {job?.benefits && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Benefits
                  </h3>
                  <ul
                    className={`list-disc pl-5 space-y-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {Array.isArray(job.benefits) ? (
                      job.benefits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>{job.benefits}</li>
                    )}
                  </ul>
                </motion.div>
              )}

              {/* HR Contact Information */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-8"
              >
                <h3
                  className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  <FaEnvelope
                    className={isDarkMode ? "text-purple-400" : "text-primary"}
                  />
                  HR Contact Information
                </h3>
                <div
                  className={`p-5 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700/30 border-gray-700 text-gray-300"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  <p className="mb-2">
                    <span className="font-medium">Contact Person:</span>{" "}
                    {job?.hr_name || "HR Department"}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href={`mailto:${
                        job?.hr_email ||
                        "hr@" +
                          job?.company?.toLowerCase().replace(/\s+/g, "") +
                          ".com"
                      }`}
                      className={`underline transition hover:${
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }`}
                    >
                      {job?.hr_email ||
                        `hr@${job?.company
                          ?.toLowerCase()
                          .replace(/\s+/g, "")}.com`}
                    </a>
                  </p>
                  <div
                    className={`text-sm mt-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <p className="italic">
                      Please mention the job reference number ({id}) in your
                      application.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Personal note to applicants - relatable content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className={`mb-8 p-5 rounded-lg border-l-4 ${
                  isDarkMode
                    ? "bg-gray-700/20 border-purple-500 text-gray-300"
                    : "bg-amber-50 border-primary text-gray-700"
                }`}
              >
                <h4
                  className={`font-semibold mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  A Note From Our Team
                </h4>
                <p className="mb-2">
                  We understand job hunting can be stressful! We review every
                  application and will get back to you within 7 working days.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Apply section */}
          <div
            className={`p-6 md:p-8 border-t ${
              isDarkMode
                ? "border-gray-700 bg-gray-800/50"
                : "border-gray-200 bg-gray-50/70"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Interested in this position?
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Apply now to join our amazing team and start your next
                  adventure!
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm ${
                    isDarkMode
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-600/30"
                      : "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:shadow-primary/30"
                  } transition-all duration-300`}
                >
                  <FaPaperPlane /> Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <FaCloudDownloadAlt /> Save Job
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Related jobs section placeholder - can be expanded upon */}
        <div className="text-center mt-12 mb-8">
          <h3
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Similar{" "}
            <span className={isDarkMode ? "text-purple-400" : "text-primary"}>
              Job Openings
            </span>
          </h3>
          <p
            className={`max-w-2xl mx-auto mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore more opportunities that match your skills and interests
          </p>
          <Link to="/jobs">
            <button
              className={`font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-purple-900/20"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20"
              }`}
            >
              Browse All Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
