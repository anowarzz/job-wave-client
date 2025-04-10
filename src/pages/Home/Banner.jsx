import { motion } from "motion/react";
import team1Img from "../../assets/team/team1.jpg";
import team2Img from "../../assets/team/team2.jpg";

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1 fle-col justify-center items-center ">
          <motion.img
            src={team1Img}
            animate={{ y: [20, 60, 20] }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="max-w-sm w-64 rounded-t-[35px] rounded-br-[35px] border-l-4 border-b-4 border-teal-600 shadow-2xl "
            alt="Team celebrating image"
          />
          <motion.img
            src={team2Img}
            animate={{ x: [100, 150, 100] }}
            transition={{
              duration: 10,
              delay: 5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="max-w-sm w-64 rounded-t-[35px] rounded-br-[35px] border-l-4 border-b-4 border-amber-900 shadow-2xl "
            alt="Team celebrating image"
          />
        </div>

        <div className="flex-1 my-6 lg:my-0">
          <motion.h1
            initial={{ x: -12, color: "#bb1065" }}
            animate={{ x: 12 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              ease: "easeInOut",
              repeat: 1,
              repeatType: "reverse",
            }}
            className="text-5xl mt-12 lg:mt-0 font-bold"
          >
            Latest{" "}
            <motion.span
              initial={{ color: "#3ef208" }}
              animate={{ color: "#3ef208" }}
            >
              Jobs{" "}
            </motion.span>{" "}
            For You !
          </motion.h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
