/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import HotJobsCard from "./HotJobsCard";
import { useEffect } from "react";

const HotJobs = () => {
  const { isDarkMode } = useTheme();

const [jobs, setJobs] = useState([]);


useEffect(() => {
fetch("http://localhost:5000/jobs")
.then(res => res.json())
.then(data => setJobs(data))
.catch(err => console.error("Error fetching jobs:", err));  

}, [])


  const [localJobs] = useState([
    {
      id: 1,
      title: "Senior UI/UX Designer",
      company: "Figma Design Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$70K-$90K",
      description:
        "We're looking for an experienced UI/UX designer to create amazing user experiences for our products. You'll work with a team of talented designers and developers.",
      postedTime: "Posted 2 days ago",
      featured: true,
      companyLogo: "https://i.ibb.co/xqrFHr4/figma.png",
      skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
    },
    {
      id: 2,
      title: "Frontend React Developer",
      company: "TechFlow Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "$65K-$85K",
      description:
        "Join our engineering team to build modern web applications using React, Redux, and other cutting-edge technologies. You'll work on exciting projects with global impact.",
      postedTime: "Posted 3 days ago",
      featured: true,
      companyLogo: "https://i.ibb.co/mFh3kJZ/tech-flow.png",
      skills: ["React", "TypeScript", "Redux", "Tailwind CSS"],
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "InnovateHub",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90K-$120K",
      description:
        "We're seeking a skilled full-stack developer to join our growing team. You'll be responsible for developing and maintaining web applications from front to back.",
      postedTime: "Posted 1 week ago",
      featured: false,
      companyLogo: "https://i.ibb.co/YQjkqBL/innovate.png",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Gradient Ventures",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$85K-$110K",
      description:
        "We're looking for a product manager to lead our product development efforts. You'll work closely with design, engineering, and marketing teams to deliver exceptional products.",
      postedTime: "Posted 5 days ago",
      featured: false,
      companyLogo: "https://i.ibb.co/VScLWTB/gradient.png",
      skills: ["Agile", "Product Strategy", "Roadmapping", "User Research"],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudNative Systems",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$80K-$100K",
      description:
        "Join our team to build and maintain our cloud infrastructure. You'll work with technologies like AWS, Docker, Kubernetes, and CI/CD pipelines to ensure smooth operations.",
      postedTime: "Posted 2 weeks ago",
      featured: true,
      companyLogo: "https://i.ibb.co/kmCsVJp/cloud.png",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD"],
    },
    {
      id: 6,
      title: "Marketing Specialist",
      company: "GrowthFuel Marketing",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$60K-$75K",
      description:
        "We're looking for a creative marketing specialist to help drive our campaigns. You'll work with our marketing team to develop and execute strategies for our clients.",
      postedTime: "Posted 1 week ago",
      featured: false,
      companyLogo: "https://i.ibb.co/q9Vkv2d/growth.png",
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
    },
  ]);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background with improved dark mode pattern */}
      <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-gray-900/95" : "bg-gray-50/90"
        }`}
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-grid-pattern"></div>
      </div>

      {/* Decorative elements with enhanced dark mode styling */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-br from-primary to-blue-500 dark:from-purple-600 dark:to-blue-700 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-tr from-purple-500 to-pink-500 dark:from-indigo-700 dark:to-purple-800 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Section title with icon */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-purple-600/20" : "bg-primary/20"
              }`}
            >
              <FaFire
                className={`text-xl ${
                  isDarkMode ? "text-purple-400" : "text-primary"
                }`}
              />
            </div>
            <h2
              className={`text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              } transition-colors`}
            >
              Hot Jobs{" "}
              <span
                className={`${isDarkMode ? "text-purple-400" : "text-primary"}`}
              >
                Today
              </span>
            </h2>
          </div>
          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } transition-colors`}
          >
            Discover the most sought-after positions currently available. These
            opportunities are in high demand and won't last long!
          </p>
        </div>

        {/* Jobs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {jobs?.map((job) => (
            <HotJobsCard key={job?._id} job={job} />
          ))}
        </div>

        {/* View all jobs button */}
        <div className="text-center mt-12">
          <button
            className={`font-medium py-3 px-10 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30"
                : "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:shadow-primary/30"
            }`}
          >
            View All Job Openings
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotJobs;
