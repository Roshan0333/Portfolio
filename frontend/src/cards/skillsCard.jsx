import defaultImage from "../assets/default.webp";

function SkillCard({ skills }) {

  const title = skills.category;
  const skillList = skills.items;

  return (
    <div className=" w-full bg-[#14072F] backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">

      <h2 className="text-xl md:text-2xl font-bold mb-6 text-white">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {skillList.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-1 py-2 hover:bg-white/10 transition duration-300"
          >
            <img
              src={item.icon || defaultImage}
              alt={item.name}
              className="h-8 w-8 md:h-10 md:w-10  object-contain"
            />

            <p className="text-sm md:text-base text-white font-medium">
              {item.name}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default SkillCard;