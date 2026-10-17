"use client";

export default function MandatoryDisclosureHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#c4b2103c", minHeight: "52vh" }}
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ghost lettering */}
      <div
        className="absolute right-0 bottom-0 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)",
          fontSize: "clamp(120px, 22vw, 320px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.06)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          transform: "translateX(4%)",
        }}
        aria-hidden
      >
        PVM
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Title */}
        <h1
          className="font-black leading-none"
          style={{
            fontFamily: "var(--font-sora, 'comfortaa', sans-serif)",
            fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            maxWidth: "16ch",
          }}
        >
          Mandatory{" "}
          <span style={{ color: "#E03E1A" }}>Public</span>{" "}
          Disclosure
        </h1>

        {/* Divider */}
        <div
          className="my-8"
          style={{ height: "1px", background: "rgba(255,255,255,0.1)", maxWidth: "480px" }}
        />

        {/* Sub-copy */}
        <p
          className="max-w-md leading-relaxed"
          style={{
            fontFamily: "var(--font-comfortaa, 'Comfortaa', cursive)",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          As required under CBSE Affiliation By-Laws. All information is self-attested
          by the Chairman / Manager / Secretary and Principal of{" "}
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Prasan Vidya Mandir</span>,
          Mamandur, Tamil Nadu.
        </p>

      </div>
    </section>
  );
}