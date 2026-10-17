import { humane, spaceGrotesk
    } from "../../lib/font";

interface HouseCardProps {
  name: string;
  baseText: string;
  hoverText: string;
  hoverBg?: string;
  wipe?: boolean;
}

function HouseCard({ name, baseText, hoverText, hoverBg, wipe = true }: HouseCardProps) {
  return (
    <div className="group relative h-40 md:h-82 w-full overflow-hidden border border-black bg-white flex items-center justify-center">
      {/* wipe layer */}
      {wipe && (
        <div
          className={`absolute inset-0 ${hoverBg} scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100`}
        />
      )}

      <span
        className={`relative z-10 ${humane.className} text-2xl md:text-[260px] tracking-[2px] transition-colors duration-500 ease-in-out ${baseText} ${hoverText}`}
      >
        {name}
      </span>
    </div>
  );
}

export default function Houses() {
  return (
    <section className="py-16 px-4">
      <h2 className={`${spaceGrotesk.className} text-black text-center text-3xl md:text-7xl mb-10`}>
        Houses
      </h2>

      <div className="grid grid-cols-2 gap-6 max-w-8xl mx-auto">
        <HouseCard
          name="AHIMSA"
          baseText="text-black"
          hoverText="group-hover:text-red-600"
          wipe={false}
        />
        <HouseCard
          name="DHARMA"
          baseText="text-orange-500"
          hoverBg="bg-orange-500"
          hoverText="group-hover:text-[#0B3D2E]"
        />
        <HouseCard
          name="SATYA"
          baseText="text-yellow-500"
          hoverBg="bg-yellow-400"
          hoverText="group-hover:text-green-600"
        />
        <HouseCard
          name="KARUNA"
          baseText="text-green-600"
          hoverBg="bg-green-600"
          hoverText="group-hover:text-white"
        />
      </div>
    </section>
  );
}