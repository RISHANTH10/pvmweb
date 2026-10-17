"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const PVM_POINTS = [
  {
    title: "The Campus",
    text: "Stands erect the inviting PRASAN VIDYA MANDIR near the Historic Palur river in Mamandur.",
    bg: "/images/history/1.png",
  },
  {
    title: "Our Founder",
    text: "Founded by Sri. Prasannamal — education uncovers knowledge hidden by ignorance.",
    bg: "/images/history/2.png",
  },
  {
    title: "The Trust",
    text: "Managed by K C Prasannamal Memorial Educational Trust.",
    bg: "/images/history/1.png",
  },
  {
    title: "Our Beginning",
    text: "Inception in 2009 in Chengalpattu, moved to Mamandur G S T Road campus within three years.",
    bg: "/images/history/4.png",
  },
  {
    title: "Learn to Lead",
    text: "3-acre campus carrying the motto \"Learn to Lead\" for lifelong learners.",
    bg: "/images/history/5.png",
  },
  {
    title: "Serving Mamandur",
    text: "The one and only school at Mamandur, serving a 30 km diameter locality.",
    bg: "/images/history/6.png",
  },
  {
    title: "CBSE Curriculum",
    text: "Co-educational English medium school following the CBSE syllabus.",
    bg: "/images/history/7.png",
  },
  {
    title: "17 Years Strong",
    text: "Completing 17 glorious years in the academic year 2025–2026.",
    bg: "/images/history/8.png",
  },
  {
    title: "NABET Accredited",
    text: "Accredited by NABET — National Accreditation Board for Education and Training.",
    bg: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80",
  },
  {
    title: "Getting to School",
    text: "Students commute by school bus and private vehicles from across the region.",
    bg: "/images/history/5.png",
  },
  {
    title: "Teaching Philosophy",
    text: "Teachers' priority: reach students first, then teach — the USB of the institution.",
    bg: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&q=80",
  },
  {
    title: "Always Learning",
    text: "Continuous Professional Development proves PVM is a true Learning Organization.",
    bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  },
  {
    title: "Our Stakeholders",
    text: "PVM values all stakeholders for holistic development of the institution.",
    bg: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80",
  },
  {
    title: "The School Calendar",
    text: "School calendar planned comprehensively for holistic education — every event matters.",
    bg: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=900&q=80",
  },
  {
    title: "Together We Care",
    text: "Theme 2026–27: \"Together We Care\" — kindness, empathy, responsibility & teamwork.",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
  },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function PVMHistory() {
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const current = useRef<number[]>(PVM_POINTS.map(() => 0));
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const vh = window.innerHeight;

      frameRefs.current.forEach((frame, i) => {
        const img = imgRefs.current[i];
        if (!frame || !img) return;

        const rect = frame.getBoundingClientRect();
        // 0 -> frame just entering from bottom, 1 -> frame fully passed top
        const total = rect.height + vh;
        const progress = clamp((vh - rect.top) / total, 0, 1);

        const maxShift = img.offsetHeight - rect.height; // extra height to travel
        const target = -progress * Math.max(maxShift, 0);

        current.current[i] = lerp(current.current[i], target, 0.08);
        gsap.set(img, { y: current.current[i] });
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className={`pvm-history ${sora.className}`}>
      <div className="pvm-inner">
        <div className="pvm-heading">
          <span className="pvm-eyebrow">Est. 2009 · Mamandur, Tamil Nadu</span>
          <h2>History of PVM</h2>
        </div>

        {PVM_POINTS.map((point, i) => (
          <div className="pvm-row" key={i}>
            <div
              className="pvm-frame"
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
            >
              <div
                className="pvm-frame-img"
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                style={{ backgroundImage: `url(${point.bg})` }}
              />
            </div>

            <div className="pvm-info">
              <div className="pvm-index">
                <span>PVM</span>
                <span className="pvm-index-pill">
                  {String(i + 1).padStart(2, "0")}/15
                </span>
              </div>

              <h3>{point.title}</h3>
              <p>{point.text}</p>

              <div className="pvm-stat">
                <span className="pvm-stat-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pvm-stat-label">
                  Milestone in our
                  <br/>
                  17-year journey
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .pvm-history {
          background: #f0efe8;
        }
        .pvm-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 40px;
        }
        .pvm-heading {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
        }
        .pvm-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8c8c94;
          margin-bottom: 12px;
        }
       
        .pvm-heading h2 {
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #16161c;
  margin: 0;
}

        .pvm-row {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 64px;
          align-items: start;
          padding: 56px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .pvm-row:last-child {
          border-bottom: none;
        }

        .pvm-frame {
          position: relative;
          overflow: hidden;
          height: clamp(320px, 42vw, 200px);
          background: #ddd;
        }
        .pvm-frame-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 135%;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }

        .pvm-info {
          display: flex;
          flex-direction: column;
          padding-top: 8px;
        }
        .pvm-index {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #6b6b76;
          margin-bottom: 18px;
        }
        .pvm-index-pill {
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          padding: 2px 7px;
          font-size: 10px;
        }
        .pvm-info h3 {
  font-size: clamp(28px, 2.8vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #16161c;
  margin: 0 0 16px;
}
        .pvm-info p {
  font-size: 17px;
  line-height: 1.8;
  color: #6f6f7a;
  max-width: 460px;
  margin: 0 0 40px;
}

        .pvm-stat {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .pvm-stat-number {
          background: #e3e1d7;
          color: #16161c;
          font-weight: 700;
          font-size: 15px;
          padding: 8px 12px;
          border-radius: 4px;
        }
        .pvm-stat-label {
          font-size: 13px;
          line-height: 1.4;
          color: #16161c;
          font-weight: 500;
        }

        @media (max-width: 860px) {
          .pvm-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .pvm-frame {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}