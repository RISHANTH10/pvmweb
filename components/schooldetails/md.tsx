"use client";

import React, { useState } from "react";
import { Sora, Comfortaa } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type FileValue = { name: string; url: string };
type Row = { [key: string]: string | number | FileValue };

interface TableSection {
  id: string;
  title: string;
  color: string;
  columns: string[];
  rows: Row[];
}

const sections: TableSection[] = [
  {
    id: "general",
    title: "General Information",
    color: "#EBF5FF",
    columns: ["Sl. No.", "Information", "Details"],
    rows: [
      { "Sl. No.": 1, Information: "Name of the School", Details: "Prasan Vidya Mandir" },
      { "Sl. No.": 2, Information: "Affiliation No.", Details: "1930528" },
      { "Sl. No.": 3, Information: "School Code", Details: "55492" },
      { "Sl. No.": 4, Information: "Complete Address with Pin Code", Details: "GST Road, Vadapathy, Mamandur – 603111" },
      { "Sl. No.": 5, Information: "Principal Name & Qualification", Details: "A. Lakshmiprabha — M.A., M.Phil., B.Ed., D.S.M" },
      { "Sl. No.": 6, Information: "School Email ID", Details: "prasanvidyamandir@yahoo.com · 55492@cbseshiksha.in" },
      { "Sl. No.": 7, Information: "Contact Details", Details: "9841097789 · 044-27565601" },
    ],
  },
  {
    id: "documents",
    title: "Documents & Information",
    color: "#FFF0EB",
    columns: ["Sl. No.", "Document / Information", "File"],
    rows: [
      { "Sl. No.": 1, "Document / Information": "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT  EXTENSION OF AFFILIATION, IF ANY", File: { name: "SARAS Affiliation Grant", url: "/documents/Letter SARAS  Affiliation grant 4.0 (2).pdf" } },
      { "Sl. No.": 2, "Document / Information": "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE", File: { name: "Trust Deed", url: "/documents/Trust Deed .pdf" } },
      { "Sl. No.": 3, "Document / Information": "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT", File: { name: "NOC", url: "/documents/NOC.pdf" } },
      { "Sl. No.": 4, "Document / Information": "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT’S RENEWAL IF APPLICABLE", File: { name: "Recognition Copy (valid till 2028)", url: "/documents/Recognition copy _2028_Scannned.pdf" } },
      { "Sl. No.": 5, "Document / Information": "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE", File: { name: "Form ABC (renewed till 2028)", url: "/documents/building-safety.pdf" } },
      { "Sl. No.": 6, "Document / Information": "Valid Fire Safety Certificate", File: { name: "Fire Certificate (renewed 2025–28)", url: "/documents/fire-safety.pdf" } },
      { "Sl. No.": 7, "Document / Information": "DEO Certificate / Self Certification", File: { name: "SARAS Affiliation Grant", url: "/documents/deo-certificate.pdf" } },
      { "Sl. No.": 8, "Document / Information": "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES", File: { name: "Sanitary Certificate 2025", url: "/documents/Sanitary certificate  _ Appx VIII _CBSE.pdf" } },
      { "Sl. No.": 9, "Document / Information": "Form D", File: { name: "Form D (valid till 2028)", url: "/documents/form-d.pdf" } },
    ],
  },
  {
    id: "academics",
    title: "Result & Academics",
    color: "#F0FFF4",
    columns: ["Sl. No.", "Document / Information", "Upload"],
    rows: [
      { "Sl. No.": 1, "Document / Information": "Fee Structure of the School", Upload: { name: "Fees 26-27", url: "/documents/fee-structure-26-27.pdf" } },
      { "Sl. No.": 2, "Document / Information": "ANNUAL ACADEMIC CALENDAR.", Upload: { name: "PVM Academic Planner 26-27", url: "/documents/PVM Academic Planner - 26-27.pdf" } },
      { "Sl. No.": 3, "Document / Information": "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)", Upload: { name: "SMC Member Details 2026-27", url: "/documents/_SMC Member details 2026-27.xlsx - Sheet1.pdf" } },
      { "Sl. No.": 4, "Document / Information": "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS", Upload: { name: "PTM 26-27", url: "/documents/PTM_26-27.pdf" } },
      { "Sl. No.": 5, "Document / Information": "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION", Upload: { name: "Results", url: "/documents/Results.jpg" } },
    ],
  },
  {
    id: "staff",
    title: "Staff (Teaching)",
    color: "#FFFBEB",
    columns: ["Sl. No.", "Information", "Details"],
    rows: [
      { "Sl. No.": 1, Information: "Principal", Details: "Lakshmiprabha A." },
      { "Sl. No.": 2, Information: "Total No. of Teachers", Details: "81" },
      { "Sl. No.": 3, Information: "PGT", Details: "13" },
      { "Sl. No.": 4, Information: "TGT", Details: "33" },
      { "Sl. No.": 5, Information: "PRT", Details: "34" },
      { "Sl. No.": 6, Information: "KGT", Details: "1" },
      { "Sl. No.": 7, Information: "Teacher–Section Ratio", Details: "40 : 1" },
      { "Sl. No.": 8, Information: "Special Educator", Details: "Indumathi R." },
      { "Sl. No.": 9, Information: "Counsellor & Wellness Teacher", Details: "Shankari · Anitha Raj" },
    ],
  },
  {
    id: "results-x",
    title: "Board Results — Class X",
    color: "#F5F0FF",
    columns: ["Sl. No.", "Year", "Registered", "Passed", "Pass %", "Remarks"],
    rows: [
      { "Sl. No.": 1, Year: 2017, Registered: 24, Passed: 24, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 2, Year: 2018, Registered: 25, Passed: 25, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 3, Year: 2019, Registered: 30, Passed: 30, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 4, Year: 2020, Registered: 32, Passed: 32, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 5, Year: 2021, Registered: 43, Passed: 43, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 6, Year: 2022, Registered: 49, Passed: 49, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 7, Year: 2023, Registered: 65, Passed: 65, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 8, Year: 2024, Registered: 82, Passed: 82, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 9, Year: 2025, Registered: 107, Passed: 107, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 10, Year: 2026, Registered: 120, Passed: 120, "Pass %": "100%", Remarks: "—" },
    ],
  },
  {
    id: "results-xii",
    title: "Board Results — Class XII",
    color: "#FFF0F5",
    columns: ["Sl. No.", "Year", "Registered", "Passed", "Pass %", "Remarks"],
    rows: [
      { "Sl. No.": 1, Year: "2018–19", Registered: 12, Passed: 9, "Pass %": "75%", Remarks: "—" },
      { "Sl. No.": 2, Year: "2019–20", Registered: 17, Passed: 17, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 3, Year: "2020–21", Registered: 17, Passed: 17, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 4, Year: "2021–22", Registered: 36, Passed: 35, "Pass %": "97.22%", Remarks: "—" },
      { "Sl. No.": 5, Year: "2022–23", Registered: 31, Passed: 31, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 6, Year: "2023–24", Registered: 67, Passed: 67, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 7, Year: "2024–25", Registered: 69, Passed: 69, "Pass %": "100%", Remarks: "—" },
      { "Sl. No.": 8, Year: "2025–26", Registered: 84, Passed: "—", "Pass %": "Awaited", Remarks: "—" },
    ],
  },
  {
    id: "infrastructure",
    title: "School Infrastructure",
    color: "#F0F9FF",
    columns: ["Sl. No.", "Information", "Details"],
    rows: [
      { "Sl. No.": 1, Information: "Total Campus Area", Details: "8,134.181 sq. m." },
      { "Sl. No.": 2, Information: "No. & Size of Classrooms", Details: "46 rooms · 500 sq. m. each" },
      { "Sl. No.": 3, Information: "No. & Size of Laboratories (incl. Computer Labs)", Details: "7 labs · 1,200 sq. m. total" },
      { "Sl. No.": 4, Information: "Library Area", Details: "92.90 sq. m." },
      { "Sl. No.": 5, Information: "Internet Facility", Details: "Yes" },
      { "Sl. No.": 6, Information: "No. of Girls Toilets", Details: "37" },
      { "Sl. No.": 7, Information: "No. of Boys Toilets", Details: "72" },
      { "Sl. No.": 8, Information: "No. of CWSN Toilets", Details: "5" },
      { "Sl. No.": 9, Information: "YouTube Infrastructure Inspection Video", Details: "https://www.youtube.com/watch?v=2rRVp8L-Cz4" },
    ],
  },
  {
    id: "land",
    title: "Certificate of Land",
    color: "#F0F9FF",
    columns: ["Sl. No.", "Document / Information", "Upload"],
    rows: [
      { "Sl. No.": 1, "Document / Information": "Fee Structure of the School", Upload: { name: "Fees 26-27", url: "/documents/fee-structure-26-27.pdf" } },
    ],
  },
];

function PassBadge({ value }: { value: string | number }) {
  const str = String(value);
  if (str === "Awaited") {
    return (
      <span className={`${comfortaa.className} inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full`}
        style={{ background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0" }}>
        Awaited
      </span>
    );
  }
  return (
    <span className={`${sora.className} inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full`}
      style={{ background: "#0B1628", color: "#ffffff" }}>
      {str}
    </span>
  );
}

function FileChip({ value }: { value: FileValue }) {
  return (
    <a
      href={value.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${comfortaa.className} inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-colors hover:bg-slate-200`}
      style={{ background: "#F1F5F9", color: "#334155", border: "1px solid #E2E8F0" }}
    >
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
        <path d="M1 1h5l3 3v7H1V1z" stroke="#94A3B8" strokeWidth="1.2" fill="none" />
        <path d="M6 1v3h3" stroke="#94A3B8" strokeWidth="1.2" />
      </svg>
      {value.name}
    </a>
  );
}

function DataTable({ section }: { section: TableSection }) {
  const isDocuments =
    section.id === "documents" ||
    section.id === "academics" ||
    section.id === "land";
  const isResults = section.id.startsWith("results");

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {section.columns.map((col) => (
              <th key={col} className={`${comfortaa.className} px-4 py-3 text-left`}
                style={{
                  fontSize: "0.7rem", fontWeight: 700, color: "#000000",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  whiteSpace: "nowrap", background: section.color,
                }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
              {section.columns.map((col) => {
                const val = row[col] ?? "—";
                const isSlNo = col === "Sl. No.";
                const isPassPct = col === "Pass %";
                const isFileCol = (col === "File" || col === "Upload") && isDocuments;
                const isYear = col === "Year" && isResults;
                const isNum = (col === "Registered" || col === "Passed") && isResults;

                return (
                  <td key={col} className="px-4 py-3.5 align-middle"
                    style={{ background: i % 2 === 0 ? "#ffffff" : "#FAFAFA" }}>
                    {isSlNo ? (
                      <span className={`${sora.className} inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold`}
                        style={{ background: "#ffffff", color: "#000000" }}>
                        {String(val)}.
                      </span>
                    ) : isPassPct ? (
                      <PassBadge value={val as string | number} />
                    ) : isFileCol ? (
                      <FileChip value={val as FileValue} />
                    ) : isYear ? (
                      <span className={sora.className} style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0B1628" }}>
                        {String(val)}
                      </span>
                    ) : isNum ? (
                      <span className={sora.className} style={{ fontWeight: 600, fontSize: "0.875rem", color: "#334155" }}>
                        {String(val)}
                      </span>
                    ) : typeof val === "string" &&
                      (val.startsWith("http://") || val.startsWith("https://")) ? (
                      <a
                        href={val}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${comfortaa.className} text-blue-600 hover:text-blue-800 underline transition-colors`}
                      >
                        Open Link
                      </a>
                    ) : (
                      <span
                        className={comfortaa.className}
                        style={{
                          fontSize: "0.875rem",
                          color: "#374151",
                          lineHeight: 1.5,
                        }}
                      >
                        {String(val)}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MandatoryDisclosureContent() {
  const [active, setActive] = useState<string>("general");
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = sections.find((s) => s.id === active)!;

  function selectSection(id: string) {
    setActive(id);
    setMobileOpen(false);
  }

  return (
    <section className={`${sora.className} bg-white py-0`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">

          {/* ── Mobile dropdown ── */}
          <div className="lg:hidden px-4 pt-6 pb-2">
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium"
              style={{
                background: activeSection.color,
                border: "1px solid #E5E7EB",
                color: "#0B1628",
              }}
            >
              <span>{activeSection.title}</span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <path d="M4 6l4 4 4-4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileOpen && (
              <div className="mt-1 rounded-xl overflow-hidden"
                style={{ border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectSection(s.id)}
                    className="w-full text-left px-4 py-3 text-sm transition-colors"
                    style={{
                      background: active === s.id ? s.color : "#ffffff",
                      color: active === s.id ? "#0B1628" : "#6B7280",
                      fontWeight: active === s.id ? 600 : 400,
                      borderBottom: "1px solid #F1F5F9",
                    }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Desktop sidebar ── */}
          <aside
            className="hidden lg:block lg:w-64 shrink-0 lg:sticky lg:top-0 lg:self-start"
            style={{ borderRight: "1px solid #F1F5F9", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
          >
            <div className="flex flex-col gap-1 px-4">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className="flex items-center gap-3 text-left rounded-xl px-3 py-2.5 transition-all duration-150 w-full"
                    style={{
                      background: isActive ? s.color : "transparent",
                      border: isActive ? `1px solid ${s.color}` : "1px solid transparent",
                    }}
                  >
                    {/* Colour dot */}
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: isActive ? "#0B1628" : "#D1D5DB" }}
                    />
                    <span
                      className="text-sm leading-tight"
                      style={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#0B1628" : "#6B7280",
                      }}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mx-4 mt-8 p-4 rounded-xl"
              style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}>
              <p className={comfortaa.className} style={{ fontSize: "0.7rem", color: "#92400E", lineHeight: 1.6 }}>
                All documents are self-attested by the Chairman / Manager / Secretary and Principal.
              </p>
            </div>
          </aside>

          {/* ── Content panel ── */}
          <main className="flex-1 min-w-0 px-4 lg:px-10 py-8">

            {/* Section header */}
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 text-lg font-semibold"
                style={{ color: "#0B1628" }}
              >
                {activeSection.title}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 8px rgba(193, 173, 173, 0.05)" }}>
              <DataTable section={activeSection} />
            </div>

            <p className={comfortaa.className + " mt-3 text-right"}
              style={{ fontSize: "0.7rem", color: "#CBD5E1", letterSpacing: "0.06em" }}>
              {activeSection.rows.length} {activeSection.rows.length === 1 ? "entry" : "entries"}
            </p>
          </main>
        </div>
      </div>
    </section>
  );
}