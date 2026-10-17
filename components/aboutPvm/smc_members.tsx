"use client";
import { Space_Grotesk, Poppins } from "next/font/google";

interface Member {
  id: number;
  name: string;
  role: string;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const members: Member[] = [
  { id: 1,  name: "Mrs Lakshmi",  role: "Principal" },
  { id: 2,  name: "Mr Surendra",  role: "Correspondent" },
  { id: 3,  name: "Mrs Priya",    role: "Vice Principal" },
  { id: 4,  name: "Mr Ramesh",    role: "Treasurer" },
  { id: 5,  name: "Mrs Kavitha",  role: "Secretary" },
  { id: 6,  name: "Mr Arun",      role: "Member" },
  { id: 7,  name: "Mrs Sunitha",  role: "Member" },
  { id: 8,  name: "Mr Dinesh",    role: "Member" },
  { id: 9,  name: "Mrs Meena",    role: "Member" },
  { id: 10, name: "Mr Vijay",     role: "Member" },
  { id: 11, name: "Mrs Anitha",   role: "Parent Rep" },
  { id: 12, name: "Mr Karthik",   role: "Parent Rep" },
  { id: 13, name: "Mrs Deepa",    role: "Teacher Rep" },
  { id: 14, name: "Mr Sathish",   role: "Teacher Rep" },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex items-center group cursor-pointer select-none">
      <div
        className="relative flex-1 min-w-0 rounded-2xl bg-white
          border border-black/10
          shadow-[0_4px_16px_rgba(0,0,0,0.08)]
          transition-all duration-300
          group-hover:bg-black
          group-hover:border-black
          group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]
          px-6 py-4"
      >
        <p
          className={`${spaceGrotesk.className} text-[1.1rem] leading-none font-semibold truncate text-black transition-colors duration-300 group-hover:text-white`}
        >
          {member.name}
        </p>
        <p
          className={`${spaceGrotesk.className} text-[10px] mt-1 font-medium tracking-[0.15em] uppercase truncate text-black/60 transition-colors duration-300 group-hover:text-white/70`}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default function SMCMembers() {
  return (
    <section className="w-full bg-white">
      <div className="relative z-10 py-16 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2
            className={`${spaceGrotesk.className} text-6xl sm:text-7xl md:text-8xl text-black leading-none`}
          >
            SMC Members
          </h2>
          <p
            className={`${poppins.className} mt-4 text-black/60 text-sm sm:text-base tracking-widest uppercase font-medium`}
          >
            School Management Committee
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {members.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>

        
      </div>
    </section>
  );
}