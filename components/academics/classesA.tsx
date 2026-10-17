"use client";

import { Space_Grotesk, Comfortaa } from "next/font/google";

const spacegrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});
const comfortaa = Comfortaa({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

interface AcademicStage {
    id: string;
    stage: string;
    classRange: string;
    ageRange: string;
    heading: string;
    subheading: string;
    points: string[];
}

const stages: AcademicStage[] = [
    {
        id: "kg",
        stage: "STAGE 01",
        classRange: "Nursery – UKG",
        ageRange: "Ages 3 – 6",
        heading: "Kindergarten",
        subheading: "Where curiosity takes its first steps",
        points: [
            "Play-based learning that develops language, numeracy, and social skills through joyful exploration.",
            "Activity-based classrooms with storytelling, music, dance, art, and sensory experiences.",
            "Focus on fine and gross motor skill development through structured play and movement activities.",
            "Safe, caring environment that nurtures confidence, independence, and emotional well-being.",
            "Interactive learning with phonics, early mathematics, and hands-on discovery.",
            "Regular parent engagement to support every child's developmental milestones.",
        ],
    },
    {
        id: "primary",
        stage: "STAGE 02",
        classRange: "Class I – V",
        ageRange: "Ages 6 – 11",
        heading: "Primary School",
        subheading: "Building the foundation for lifelong learning",
        points: [
            "CBSE-aligned curriculum strengthening literacy, numeracy, environmental awareness, and communication.",
            "Experiential learning through classroom activities, projects, and collaborative tasks.",
            "Development of reading habits, creative writing, and effective communication skills.",
            "Introduction to computer education, art, music, sports, and value-based learning.",
            "Continuous assessments with constructive feedback to encourage steady academic growth.",
            "Individual attention that builds confidence, curiosity, and independent thinking.",
        ],
    },
    {
        id: "middle",
        stage: "STAGE 03",
        classRange: "Class VI – VIII",
        ageRange: "Ages 11 – 14",
        heading: "Middle School",
        subheading: "Sharpening minds, widening horizons",
        points: [
            "Specialized subject teaching in Science, Mathematics, Social Science, and Languages.",
            "Well-equipped laboratory sessions to strengthen practical understanding and scientific inquiry.",
            "Project-based learning that develops analytical thinking and problem-solving abilities.",
            "Digital literacy, coding basics, and technology integration for future-ready learning.",
            "Leadership opportunities through clubs, competitions, house activities, and community service.",
            "Career awareness, life skills, and personality development programs to build confidence.",
        ],
    },
    {
        id: "higher-secondary",
        stage: "STAGE 04",
        classRange: "Class IX – XII",
        ageRange: "Ages 14 – 18",
        heading: "Higher Secondary",
        subheading: "Preparing for board exams and beyond",
        points: [
            "Comprehensive CBSE curriculum with Science, Commerce, and Humanities streams.",
            "Experienced faculty providing concept-focused teaching and personalized academic guidance.",
            "Regular board exam practice through unit tests, mock examinations, and revision sessions.",
            "Advanced laboratory work, research projects, and practical-based learning experiences.",
            "Career counselling, aptitude guidance, and college admission support for higher education.",
            "Training in communication, leadership, critical thinking, and life skills for future success.",
        ],
    },
];

export default function AcademicsSection() {
    return (
        <section className="bg-white py-24 px-6 md:px-12">
            {/* <div className="max-w-6xl mx-auto mb-16 text-center">
        <p className={`${comfortaa.className} text-black/60 text-sm mb-4`}>
          Academic Programmes
        </p>
        <h2 className={`${spacegrotesk.className} font-bold text-black text-4xl md:text-7xl`}>
          A Journey Through Every Stage
        </h2>
      </div> */}

            <div className="max-w-9xl mx-auto flex flex-col gap-5">
                {stages.map((s) => (
                    <div
                        key={s.id}
                        className="relative rounded-2xl bg-white text-black overflow-hidden flex flex-col border p-6 md:p-8"
                    >
                        {/* 1. Video — sits in its own box, not stretched full-bleed */}
                        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden mb-8">
                            <video
                                src="/videos/arts.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* 2. Content / points */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                {/* <span className={`${comfortaa.className} text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-black`}>
                                    {s.stage}
                                </span> */}
                                <span className={`${comfortaa.className} text-yellow-600 text-sm`}>
                                    from {s.classRange} · {s.ageRange}
                                </span>
                            </div>

                            <h3 className={`${spacegrotesk.className} font-bold text-black text-5xl md:text-7xl mb-3 leading-none`}>
                                {s.heading}
                            </h3>
                            <p className={`${comfortaa.className} text-black/60 text-xl mb-10`}>
                                {s.subheading}
                            </p>

                            <div className="grid md:grid-cols-3 gap-8">
                                {s.points.map((point, i) => (
                                    <p
                                        key={i}
                                        className={`${comfortaa.className} text-black/80 text-sm leading-relaxed underline underline-offset-4`}
                                    >
                                        {point}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* 3. Apply for Admission button */}
                        <div className="flex justify-end pt-10">
                            <button
                                className={`bg-black text-white ${comfortaa.className} font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-black/80 transition-colors`}
                            >
                                Apply for Admission
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}