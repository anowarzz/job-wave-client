import { useState } from "react";
import {
  FaBriefcase,
  FaCalculator,
  FaChartLine,
  FaCode,
  FaGraduationCap,
  FaMicrophone,
  FaPaintBrush,
  FaServer,
  FaShoppingBag,
  FaUserMd,
} from "react-icons/fa";

const JobsCategoryBrowse = () => {
  const [categories] = useState([
    {
      id: 1,
      title: "Marketing & Sales",
      icon: <FaChartLine />,
      count: 43,
      color: "#38b2ac",
    },
    {
      id: 2,
      title: "Customer Service",
      icon: <FaMicrophone />,
      count: 35,
      color: "#f6ad55",
    },
    {
      id: 3,
      title: "Web Development",
      icon: <FaCode />,
      count: 67,
      color: "#805ad5",
    },
    {
      id: 4,
      title: "Finance & Accounting",
      icon: <FaCalculator />,
      count: 28,
      color: "#e53e3e",
    },
    {
      id: 5,
      title: "Human Resource",
      icon: <FaBriefcase />,
      count: 15,
      color: "#4299e1",
    },
    {
      id: 6,
      title: "Design & Creative",
      icon: <FaPaintBrush />,
      count: 57,
      color: "#ed8936",
    },
    {
      id: 7,
      title: "Retail & Products",
      icon: <FaShoppingBag />,
      count: 32,
      color: "#48bb78",
    },
    {
      id: 8,
      title: "Education & Training",
      icon: <FaGraduationCap />,
      count: 25,
      color: "#9f7aea",
    },
    {
      id: 9,
      title: "Healthcare",
      icon: <FaUserMd />,
      count: 47,
      color: "#667eea",
    },
    {
      id: 10,
      title: "Engineering & IT",
      icon: <FaServer />,
      count: 78,
      color: "#d69e2e",
    },
  ]);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary font-medium text-lg mb-2">
            Browse By Category
          </h6>
          <h2 className="text-4xl font-bold mb-4">
            Find Jobs in Popular Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse job opportunities by categories and find the perfect role
            that matches your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group cursor-pointer"
            >
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                }}
              >
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-gray-500 text-sm">
                <span className="font-medium text-gray-700">
                  {category.count}
                </span>{" "}
                Jobs Available
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-white text-primary font-medium border border-primary hover:bg-primary hover:text-white transition-colors py-2.5 px-6 rounded-md">
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsCategoryBrowse;
