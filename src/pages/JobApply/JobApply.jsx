import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCheck,
  FaEnvelope,
  FaLink,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
const JobApply = () => {
  const { id } = useParams();
  const job = useLoaderData();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Generate skills based only on job requirements
  const generateSkillOptions = () => {
    let jobSkills = [];

    // Extract skills from job requirements if available
    if (job?.requirements && Array.isArray(job.requirements)) {
      jobSkills = [...job.requirements];
    }

    // If no requirements, check skills array
    if (jobSkills.length === 0 && job?.skills && Array.isArray(job.skills)) {
      jobSkills = [...job.skills];
    }

    return jobSkills;
  };

  // Destructure job data for easier access
  const { title, company, company_logo, location, jobType, type, deadline } =
    job || {};

  // Generate skill options based on job requirements
  const skillOptions = generateSkillOptions();

  // State for form fields
  const [formData, setFormData] = useState({
    education: "",
    experience: "",
    selectedSkills: [],
    coverLetter: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Handle skill selection
  const handleSkillToggle = (skill) => {
    const currentSkills = [...formData.selectedSkills];

    if (currentSkills.includes(skill)) {
      const updatedSkills = currentSkills.filter((item) => item !== skill);
      setFormData({
        ...formData,
        selectedSkills: updatedSkills,
      });
    } else {
      setFormData({
        ...formData,
        selectedSkills: [...currentSkills, skill],
      });
    }

    // Clear error if any skills are selected
    if (errors.selectedSkills) {
      setErrors({
        ...errors,
        selectedSkills: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.education) {
      newErrors.education = "Education level is required";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience level is required";
    }

    // Only validate cover letter if it's provided (now optional)
    if (
      formData.coverLetter.trim() &&
      formData.coverLetter.trim().length < 50
    ) {
      newErrors.coverLetter = "Cover letter should be at least 50 characters";
    }

    if (!formData.resumeUrl.trim()) {
      newErrors.resumeUrl = "Resume URL is required";
    } else if (!isValidUrl(formData.resumeUrl)) {
      newErrors.resumeUrl = "Please enter a valid URL";
    }

    // Validate GitHub URL if provided (optional)
    if (formData.githubUrl.trim() && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = "Please enter a valid GitHub URL";
    }

    // Validate LinkedIn URL if provided (optional)
    if (formData.linkedinUrl.trim() && !isValidUrl(formData.linkedinUrl)) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
    }

    return newErrors;
  };

  // Validate URL format
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      job_title: title,
      deadline: deadline,
      education: formData.education,
      experience: formData.experience,
      skills: formData.selectedSkills,
      cover_letter: formData.coverLetter,
      resume_url: formData.resumeUrl,
      github_url: formData.githubUrl,
      linkedin_url: formData.linkedinUrl,
      status: "pending",
    };

    setIsSubmitting(true);

    // Submit application to backend
    fetch("http://localhost:5000/job-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobApplication),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit application");
        }
        return response.json();
      })
      .then((data) => {
        // Set success state to true after successful submission
        setSubmitSuccess(true);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
        // Handle submission error (optional)
        setErrors({
          submission: "Failed to submit application. Please try again.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If application submitted successfully, show success message
  if (submitSuccess) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center py-16 px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`max-w-md w-full p-8 rounded-xl text-center ${
            isDarkMode
              ? "bg-gray-800 shadow-lg shadow-purple-900/20"
              : "bg-white shadow-lg shadow-gray-200/50"
          }`}
        >
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${
              isDarkMode ? "bg-purple-600/20" : "bg-primary/10"
            }`}
          >
            <FaCheck
              size={40}
              className={isDarkMode ? "text-purple-400" : "text-primary"}
            />
          </div>
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Application Submitted!
          </h2>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Thank you for applying to {title} at {company}. We'll review your
            application and get back to you soon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/">
              <button
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Back to Home
              </button>
            </Link>
            <Link to="/my-applications">
              <button
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                My Applications
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-grid-pattern"></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-br from-primary to-blue-500 dark:from-purple-600 dark:to-blue-700 blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-tr from-purple-500 to-pink-500 dark:from-indigo-700 dark:to-purple-800 blur-3xl z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to={`/jobs/${id}`}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:text-purple-400"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            <FaArrowLeft size={14} /> Back to job details
          </Link>
        </div>

        {/* Page header */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Apply for Position
          </motion.h1>
          <motion.p
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Complete the simple form below to apply for the {title} position at{" "}
            {company}
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Job summary card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mb-8 p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800/90 shadow-md shadow-gray-900/50"
                : "bg-white shadow-md shadow-gray-200/50"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div
                className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {company_logo ? (
                  <img
                    src={company_logo}
                    alt={company}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <FaBuilding
                    className={`text-2xl ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1">
                <h2
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {title || "Job Position"}
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div
                    className={`flex items-center gap-1.5 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <FaBuilding
                      className={
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }
                      size={14}
                    />
                    {company || "Company"}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <FaMapMarkerAlt
                      className={
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }
                      size={14}
                    />
                    {location || "Location"}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <FaBriefcase
                      className={
                        isDarkMode ? "text-purple-400" : "text-primary"
                      }
                      size={14}
                    />
                    {jobType || type || "Job Type"}
                  </div>
                </div>
              </div>
              {deadline && (
                <div
                  className={`text-sm font-medium px-4 py-2 rounded-full ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Deadline: {new Date(deadline).toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.div>

          {/* Application form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-6 md:p-8 rounded-xl ${
              isDarkMode
                ? "bg-gray-800/90 shadow-lg shadow-gray-900/30"
                : "bg-white shadow-lg shadow-gray-200/50"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Application Form
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Skills section - Selectable skills */}
              <div className="mb-6">
                <label
                  className={`block mb-2 text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Relevant Skills
                </label>
                <div
                  className={`p-4 border rounded-lg ${
                    errors.selectedSkills
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600 bg-gray-700/50"
                      : "border-gray-200 bg-gray-50/50"
                  }`}
                >
                  {skillOptions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skillOptions.map((skill, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                            formData.selectedSkills.includes(skill)
                              ? isDarkMode
                                ? "bg-purple-600 text-white"
                                : "bg-primary text-white"
                              : isDarkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No specific skills found for this job. Feel free to
                      describe your relevant skills in the cover letter.
                    </p>
                  )}
                </div>
                {errors.selectedSkills ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.selectedSkills}
                  </p>
                ) : (
                  <p
                    className={`mt-1 text-xs italic ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Click to select skills relevant to this position
                  </p>
                )}

                {formData.selectedSkills.length > 0 && (
                  <div className="mt-2">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Selected: {formData.selectedSkills.join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Application Materials section */}
              <div className="mb-6">
                <h4
                  className={`text-lg font-medium mb-4 flex items-center gap-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <FaEnvelope
                    className={isDarkMode ? "text-purple-400" : "text-primary"}
                    size={16}
                  />
                  Application Materials
                </h4>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label
                      htmlFor="resumeUrl"
                      className={`block mb-2 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Resume URL *
                    </label>
                    <div className="flex">
                      <span
                        className={`inline-flex items-center px-3 border border-r-0 rounded-l-lg ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300 border-gray-600"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                      >
                        <FaLink size={14} />
                      </span>
                      <input
                        type="url"
                        id="resumeUrl"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-r-lg border ${
                          errors.resumeUrl
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                            : "border-gray-200 focus:border-primary focus:ring-primary"
                        } transition-colors focus:ring-2 outline-none`}
                        placeholder="https://drive.google.com/your-resume-url"
                      />
                    </div>
                    {errors.resumeUrl ? (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.resumeUrl}
                      </p>
                    ) : (
                      <p
                        className={`mt-1 text-xs italic ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Provide a link to your resume (Google Drive, Dropbox,
                        etc.)
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="githubUrl"
                      className={`block mb-2 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      GitHub URL (Optional)
                    </label>
                    <div className="flex">
                      <span
                        className={`inline-flex items-center px-3 border border-r-0 rounded-l-lg ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300 border-gray-600"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                      >
                        <FaLink size={14} />
                      </span>
                      <input
                        type="url"
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-r-lg border ${
                          errors.githubUrl
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                            : "border-gray-200 focus:border-primary focus:ring-primary"
                        } transition-colors focus:ring-2 outline-none`}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    {errors.githubUrl ? (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.githubUrl}
                      </p>
                    ) : (
                      <p
                        className={`mt-1 text-xs italic ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Provide a link to your GitHub profile
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="linkedinUrl"
                      className={`block mb-2 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      LinkedIn URL (Optional)
                    </label>
                    <div className="flex">
                      <span
                        className={`inline-flex items-center px-3 border border-r-0 rounded-l-lg ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300 border-gray-600"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                      >
                        <FaLink size={14} />
                      </span>
                      <input
                        type="url"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-r-lg border ${
                          errors.linkedinUrl
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                            : "border-gray-200 focus:border-primary focus:ring-primary"
                        } transition-colors focus:ring-2 outline-none`}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    {errors.linkedinUrl ? (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.linkedinUrl}
                      </p>
                    ) : (
                      <p
                        className={`mt-1 text-xs italic ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Provide a link to your LinkedIn profile
                      </p>
                    )}
                  </div>

                  {/* Education & Experience section moved after URLs */}
                  <div>
                    <label
                      htmlFor="education"
                      className={`block mb-2 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Education Level *
                    </label>
                    <select
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.education
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                          : "border-gray-200 focus:border-primary focus:ring-primary"
                      } transition-colors focus:ring-2 outline-none`}
                    >
                      <option value="">Select your education level</option>
                      <option value="ssc">SSC/O Level</option>
                      <option value="hsc">HSC/A Level</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.education && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.education}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className={`block mb-2 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Experience Level *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.experience
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                          : "border-gray-200 focus:border-primary focus:ring-primary"
                      } transition-colors focus:ring-2 outline-none`}
                    >
                      <option value="">Select your experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="junior">Junior (2-3 years)</option>
                      <option value="mid">Mid-Level (3-5 years)</option>
                      <option value="senior">Senior (5+ years)</option>
                      <option value="lead">Lead/Manager (7+ years)</option>
                    </select>
                    {errors.experience && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* Cover Letter moved to the end */}
                  <div>
                    <label
                      htmlFor="coverLetter"
                      className={`block mb-2 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.coverLetter
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                          : "border-gray-200 focus:border-primary focus:ring-primary"
                      } transition-colors focus:ring-2 outline-none`}
                      placeholder="Briefly explain why you're interested in this position and your qualifications"
                    ></textarea>
                    {errors.coverLetter ? (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.coverLetter}
                      </p>
                    ) : (
                      <p
                        className={`mt-1 text-xs italic ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Share why you're a good fit for this position (minimum
                        50 characters if provided)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Privacy & Consent Notice */}
              <div
                className={`p-4 mb-6 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700/50 border border-gray-600"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  By submitting this application, you agree that we may process
                  your personal information for recruitment-related purposes.
                </p>
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting
                      ? isDarkMode
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                      : isDarkMode
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-600/30"
                      : "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:shadow-primary/30"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
