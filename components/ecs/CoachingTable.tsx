"use client";

import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
});

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-label",
});

const sports = [
    {
        sport: "Volleyball",
        category: "Boys & Girls",
        classes: "Std IV – XII",
        days: "Mon & Wed",
    },
    {
        sport: "Basketball",
        category: "Boys & Girls",
        classes: "Std IV – XII",
        days: "Mon & Wed",
    },
    {
        sport: "Athletics",
        category: "Boys & Girls",
        classes: "Std IV – XII",
        days: "Mon & Wed",
    },
    {
        sport: "Football",
        category: "Boys & Girls",
        classes: "Std IV – XII",
        days: "Mon & Wed",
    },
];

export default function SportsCoachingTable() {
    return (
        <section
            className={`${sora.variable} ${comfortaa.variable} w-full bg-white px-6 py-16 md:px-10 md:py-24`}
        >
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-10 max-w-2xl md:mb-14">
                    {/* <p className="font-[family-name:var(--font-label)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C08829]">
                        Sports & Activities
                    </p> */}

                    <h2 className="mt-15 font-[family-name:var(--font-body)] text-3xl font-light leading-tight text-[#1C1E21] md:text-5xl">
                        Sports Coaching Classes
                    </h2>

                    {/* <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#5F5E5A] md:text-base">
                        Structured coaching sessions designed to encourage fitness,
                        teamwork, discipline, and sporting excellence.
                    </p> */}
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-2xl border border-[#E7E5DD] bg-white md:block">

                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="border-b border-[#E7E5DD] bg-[#F3F1EA]">

                                <th className="px-7 py-5 text-left font-[family-name:var(--font-label)] text-[10px] font-semibold uppercase text-[#77756D]">
                                    Sport
                                </th>

                                <th className="px-7 py-5 text-left font-[family-name:var(--font-label)] text-[10px] font-semibold uppercase text-[#77756D]">
                                    Category
                                </th>

                                <th className="px-7 py-5 text-left font-[family-name:var(--font-label)] text-[10px] font-semibold uppercase text-[#77756D]">
                                    Classes
                                </th>

                                <th className="px-7 py-5 text-left font-[family-name:var(--font-label)] text-[10px] font-semibold uppercase text-[#77756D]">
                                    Days Scheduled
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            {sports.map((item, index) => (
                                <tr
                                    key={item.sport}
                                    className={`group transition-colors duration-300 hover:bg-[#F8F7F2] ${
                                        index !== sports.length - 1
                                            ? "border-b border-[#E7E5DD]"
                                            : ""
                                    }`}
                                >

                                    {/* Sport */}
                                    <td className="px-7 py-6">

                                        <div className="flex items-center gap-4">

                                            {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF2EE] font-[family-name:var(--font-label)] text-xs font-semibold text-[#0F6E56] transition-transform duration-300 group-hover:scale-110">
                                                0{index + 1}
                                            </div> */}

                                            <span className="font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#1C1E21]">
                                                {item.sport}
                                            </span>

                                        </div>

                                    </td>

                                    {/* Category */}
                                    <td className="px-7 py-6">
                                        <span className="font-[family-name:var(--font-body)] text-sm text-[#5F5E5A]">
                                            {item.category}
                                        </span>
                                    </td>

                                    {/* Classes */}
                                    <td className="px-7 py-6">
                                        <span className="inline-flex rounded-full px-3 py-1.5 font-[family-name:var(--font-body)] text-xs font-medium text-[#5F5E5A]">
                                            {item.classes}
                                        </span>
                                    </td>

                                    {/* Days */}
                                    <td className="px-7 py-6">
                                        <span className="inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-sm font-semibold text-gray-800">
                                           
                                            {item.days}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Mobile */}
                <div className="grid gap-4 md:hidden">

                    {sports.map((item, index) => (
                        <div
                            key={item.sport}
                            className="rounded-2xl border border-[#E7E5DD] bg-white p-5 transition-all duration-300 hover:border-[#0F6E56]/30"
                        >

                            {/* Top */}
                            <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF2EE] font-[family-name:var(--font-label)] text-xs font-semibold text-[#0F6E56]">
                                    0{index + 1}
                                </div>

                                <div>
                                    <h3 className="font-[family-name:var(--font-body)] text-lg font-semibold text-[#1C1E21]">
                                        {item.sport}
                                    </h3>

                                    <p className="mt-1 font-[family-name:var(--font-body)] text-xs text-[#77756D]">
                                        {item.category}
                                    </p>
                                </div>

                            </div>

                            {/* Details */}
                            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#E7E5DD] pt-4">

                                <div>
                                    <p className="font-[family-name:var(--font-label)] text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9A988F]">
                                        Classes
                                    </p>

                                    <p className="mt-1.5 font-[family-name:var(--font-body)] text-sm font-medium text-[#44443F]">
                                        {item.classes}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-[family-name:var(--font-label)] text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9A988F]">
                                        Schedule
                                    </p>

                                    <p className="mt-1.5 flex items-center gap-2 font-[family-name:var(--font-body)] text-sm font-semibold text-[#0F6E56]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#C08829]" />
                                        {item.days}
                                    </p>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}