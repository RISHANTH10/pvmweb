"use client";

import { useEffect, useRef, useState } from "react";

interface ButterflyProps {
  x: number;
  y: number;
  angle: number;
  wingPhase: number;
}

const Butterfly = ({ x, y, angle, wingPhase }: ButterflyProps) => {
  const wingOpen = Math.abs(Math.sin(wingPhase));
  const wingSkew = (1 - wingOpen) * 40; // degrees of perspective skew

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        transition: "transform 0.1s ease-out",
        willChange: "left, top, transform",
      }}
    >
      <svg
        width="58"
        height="58"
        viewBox="0 0 38 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Left upper wing */}
        <ellipse
          cx="10"
          cy="10"
          rx="10"
          ry="8"
          fill="url(#leftWingGrad)"
          opacity="0.92"
          style={{
            transformOrigin: "19px 16px",
            transform: `scaleX(${-wingOpen}) skewY(${wingSkew}deg)`,
          }}
        />
        {/* Left lower wing */}
        <ellipse
          cx="11"
          cy="22"
          rx="8"
          ry="6"
          fill="url(#leftLowerGrad)"
          opacity="0.85"
          style={{
            transformOrigin: "19px 16px",
            transform: `scaleX(${-wingOpen}) skewY(${wingSkew * 0.6}deg)`,
          }}
        />
        {/* Right upper wing */}
        <ellipse
          cx="28"
          cy="10"
          rx="10"
          ry="8"
          fill="url(#rightWingGrad)"
          opacity="0.92"
          style={{
            transformOrigin: "19px 16px",
            transform: `scaleX(${wingOpen}) skewY(${-wingSkew}deg)`,
          }}
        />
        {/* Right lower wing */}
        <ellipse
          cx="27"
          cy="22"
          rx="8"
          ry="6"
          fill="url(#rightLowerGrad)"
          opacity="0.85"
          style={{
            transformOrigin: "19px 16px",
            transform: `scaleX(${wingOpen}) skewY(${-wingSkew * 0.6}deg)`,
          }}
        />

        {/* Wing shimmer details — left */}
        <ellipse
          cx="10"
          cy="10"
          rx="5"
          ry="4"
          fill="url(#shimmerLeft)"
          opacity="0.45"
          style={{
            transformOrigin: "19px 16px",
            transform: `scaleX(${-wingOpen})`,
          }}
        />
        {/* Wing shimmer details — right */}
        <ellipse
          cx="28"
          cy="10"
          rx="5"
          ry="4"
          fill="url(#shimmerRight)"
          opacity="0.45"
          style={{
            transformOrigin: "19px 16px",
            transform: `scaleX(${wingOpen})`,
          }}
        />

        {/* Body */}
        <ellipse cx="19" cy="16" rx="1.5" ry="7" fill="#1e3a5f" opacity="0.9" />
        {/* Head */}
        <circle cx="19" cy="8" r="1.8" fill="#1e3a5f" opacity="0.9" />
        {/* Antennae */}
        <line
          x1="19"
          y1="7"
          x2="15"
          y2="3"
          stroke="#1e3a5f"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <line
          x1="19"
          y1="7"
          x2="23"
          y2="3"
          stroke="#1e3a5f"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="15" cy="2.5" r="1" fill="#f63be6" opacity="0.9" />
        <circle cx="23" cy="2.5" r="1" fill="#3b82f6" opacity="0.9" />

        <defs>
          <radialGradient id="leftWingGrad" cx="60%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="40%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>
          <radialGradient id="leftLowerGrad" cx="60%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>
          <radialGradient id="rightWingGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="40%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>
          <radialGradient id="rightLowerGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>
          <radialGradient id="shimmerLeft" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shimmerRight" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function BlueButterflyTrail() {
  const [butterfly, setButterfly] = useState<ButterflyProps>({
    x: -100,
    y: -100,
    angle: 0,
    wingPhase: 0,
  });

  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);
  const wingPhaseRef = useRef(0);
  const prevPositionRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const lerpFactor = 0.09; // smoothness of following
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * lerpFactor;
      currentRef.current.y += dy * lerpFactor;

      // Wing flap speed based on movement speed
      const speed = Math.sqrt(dx * dx + dy * dy);
      const flapSpeed = Math.min(0.18, 0.04 + speed * 0.003);
      wingPhaseRef.current += flapSpeed;

      // Rotation angle based on movement direction
      const moveDx = currentRef.current.x - prevPositionRef.current.x;
      const moveDy = currentRef.current.y - prevPositionRef.current.y;
      let angle = 0;
      if (Math.abs(moveDx) > 0.1 || Math.abs(moveDy) > 0.1) {
        angle = (Math.atan2(moveDy, moveDx) * 180) / Math.PI + 90;
      }

      prevPositionRef.current = { ...currentRef.current };

      setButterfly({
        x: currentRef.current.x,
        y: currentRef.current.y,
        angle,
        wingPhase: wingPhaseRef.current,
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <Butterfly
      x={butterfly.x}
      y={butterfly.y}
      angle={butterfly.angle}
      wingPhase={butterfly.wingPhase}
    />
  );
}