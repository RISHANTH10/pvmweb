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

const activities = [
    {
        name: "Cricket",
        classes: "IV to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Yoga",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Chess",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Hindi – Parichaya",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Hindi – Prathamic",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Hindi – Madhyama",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Hindi – Rashtrabhasha",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Hindi – Praveshika",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "School Band",
        classes: "III to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Thirukkural",
        classes: "V to VIII",
        days: "Mon & Wed",
    },
    {
        name: "Archery",
        classes: "III to VIII",
        days: "Tue & Thurs",
    },
    {
        name: "Boxing",
        classes: "I to VIII",
        days: "Tue & Thurs",
    },
    {
        name: "Classical Dance",
        classes: "III to VIII",
        days: "Tue & Thurs",
    },
    {
        name: "Keyboard",
        classes: "III to VIII",
        days: "Tue & Thurs",
    },
    {
        name: "Karate",
        classes: "III to VIII",
        days: "Tue & Thurs",
    },
    {
        name: "Music",
        classes: "III to VIII",
        days: "Tue & Thurs",
    },
    {
        name: "Silambam",
        classes: "III to VIII",
        days: "Tue & Thurs",
    },
];

export default function AfterSchoolActivities() {
    return (
        <section
            className={`${sora.variable} ${comfortaa.variable} w-full bg-white px-6 py-16 md:px-10 md:py-24`}
        >
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-10 md:mb-12">

                    <p className="font-[family-name:var(--font-label)] text-[15px] font-bold uppercase text-[#C08829]">
                        2026 – 2027
                    </p>

                    <h2 className="mt-3 font-[family-name:var(--font-body)] text-3xl font-light leading-tight text-[#1C1E21] md:text-5xl">
                        After School Activities
                    </h2>

                    <div className="mt-5 inline-flex items-center gap-3 rounded-full px-4 py-2">
                 

                        <span className="font-[family-name:var(--font-body)] text-lg font-medium text-black">
                            Timings: 3.30 to 4.30 p.m.
                        </span>
                    </div>

                </div>

                {/* ECA Table */}
                <div className="overflow-hidden bg-white">

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] border border-gray-100 border-collapse">

                            <thead>
                                <tr className="bg-black/80">

                                    <th className="w-20 border-b border-[#E1DFD6] px-6 py-5 text-center font-[family-name:var(--font-label)] text-[15px] font-semibold  text-white">
                                        No.
                                    </th>

                                    <th className="border-b border-[#E1DFD6] px-7 py-5 text-left font-[family-name:var(--font-label)] text-[15px] font-semibold  text-white">
                                        Name of ECA
                                    </th>

                                    <th className="border-b border-[#E1DFD6] px-7 py-5 text-left font-[family-name:var(--font-label)] text-[15px] font-semibold  text-white">
                                        Classes
                                    </th>

                                    <th className="border-b border-[#E1DFD6] px-7 py-5 text-left font-[family-name:var(--font-label)] text-[15px] font-semibold  text-white">
                                        Days Scheduled
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {activities.map((activity, index) => (
                                    <tr
                                        key={activity.name}
                                        className="group border-b border-[#E7E5DD] last:border-b-0 transition-colors duration-200 hover:bg-[#F8F7F2]"
                                    >

                                        <td className="px-6 py-5 text-center">
                                            <span className="font-[family-name:var(--font-label)] text-[10px] font-semibold text-[#C9C7BE]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </td>

                                        <td className="px-7 py-5">
                                            <span className="font-[family-name:var(--font-body)] text-sm font-light text-[#1C1E21]">
                                                {activity.name}
                                            </span>
                                        </td>

                                        <td className="px-7 py-5">
                                            <span className="inline-flex rounded-full  px-3 py-1.5 font-[family-name:var(--font-body)] text-xs font-medium text-[#5F5E5A]">
                                                {activity.classes}
                                            </span>
                                        </td>

                                        <td className="px-7 py-5">
                                            <span className="inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-sm font-semibold text-gray-800">
                                                
                                                {activity.days}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        </section>
    );
}