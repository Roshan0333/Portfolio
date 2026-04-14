import { CertificateCard } from "../../cards/certificateCard";
import {motion} from "framer-motion";

function Certficate(){
    const certificates = [
    {
      name: "Full Stack Web Development",
      image: "https://via.placeholder.com/600x400",
      date: "2025",
      description: "Completed full stack development training using MERN stack.",
      status: true
    },
    {
      name: "Machine Learning Certification",
      image: "https://via.placeholder.com/600x400",
      date: "2024",
      description: "Learned ML algorithms and built predictive models.",
      status: true
    },
    {
      name: "Machine Learning Certification",
      image: "https://via.placeholder.com/600x400",
      date: "2024",
      description: "Learned ML algorithms and built predictive models.",
      status: true
    }
  ];

  const cardVariants  = {
    hidden:{
      opacity:0,
      y:50
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        duration:0.6,
        ease:[0.25, 0.8, 0.25, 1]
      }
    }
  }

    return (
        <motion.div
        initial = "hidden"
        whileInView = "visible"
        viewporrt = {{once: false}}
        variants = {{
          hidden:{},
          visible:{
            transition:{
              staggerChildren: 0.2
            }
          }
        }}
         className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 p-5">
            {certificates.map((item, index) => {
                return <motion.div
                key={index}
                  initial = "hidden"
                  whileInView='visible'
                  viewport={{once: false, margin: "-50px"}}
                  variants={cardVariants}
                  className="h-full"
                >
                  <CertificateCard data={item} key={index}/>
                </motion.div>
            })}
        </motion.div>
    )
}

export default Certficate;