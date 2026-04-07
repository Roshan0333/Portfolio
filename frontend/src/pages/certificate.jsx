import { CertificateCard } from "../cards/certificateCard";

export function Certficate(){
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
    }
  ];
    return (
        <div className="grid grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(4,1fr)] gap-2 overflow-hidden p-5">
            {certificates.map((item, index) => {
                return <CertificateCard data={item} key={index}/>
            })}
        </div>
    )
}