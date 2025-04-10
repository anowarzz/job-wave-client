import {motion} from "motion/react" ;

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1 flex justify-center items-center ">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl border"
            alt="Description of the image"
          />
        </div>

        <div className="flex-1">
          <motion.h1
          animate={{ x: 50 , color: ["red" , "green"]}}
          transition={{ duration:
            1,
            delay: 0.5,
            type: "spring",
            ease: "easeInOut", repeat: 1, repeatType: "reverse"
           }}
          className="text-5xl font-bold">Latest Jobs For You !</motion.h1>
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
