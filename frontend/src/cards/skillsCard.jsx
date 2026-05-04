import defaultImage from "../assets/default.webp";

function SkillCard({ skills }) {
  const title = skills.category;
  const skillList = skills.items;

  return (
    <div className="w-full bg-[#14072F] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">

      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.08]">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/45 bg-white/[0.06] border border-white/10 rounded-md px-3 py-1 max-w-full truncate">
          {title}
        </span>
      </div>

      {/* Grid */}
      <div
        className="grid gap-3 p-4"
        style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
      >
        {skillList.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/5 border border-white/[0.08] rounded-xl px-3 py-2 hover:bg-white/10 transition duration-300 min-w-0"
          >
            <img
              src={item.icon || defaultImage}
              alt={item.name}
              className="h-8 w-8 object-contain flex-shrink-0"
            />
            <p className="text-sm text-white font-medium leading-tight break-words min-w-0 w-full">
              {item.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SkillCard;