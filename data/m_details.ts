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
      { "Sl. No.": 1, Information: "Total Campus Area", Details: "8,134.18 sq. m." },
      { "Sl. No.": 2, Information: "No. & Size of Classrooms", Details: "46 rooms · 500 sq. m. each" },
      { "Sl. No.": 3, Information: "No. & Size of Laboratories (incl. Computer Labs)", Details: "7 labs · 1,200 sq. m. total" },
      { "Sl. No.": 4, Information: "Library Area", Details: "92.90 sq. m." },
      { "Sl. No.": 5, Information: "Internet Facility", Details: "Yes" },
      { "Sl. No.": 6, Information: "No. of Girls Toilets", Details: "37" },
      { "Sl. No.": 7, Information: "No. of Boys Toilets", Details: "72" },
      { "Sl. No.": 8, Information: "No. of CWSN Toilets", Details: "5" },
      { "Sl. No.": 9, Information: "YouTube Infrastructure Inspection Video", Details: "Prasan Vidya Mandir IC 2019–20" },
    ],
  },
  {
    id: "land",
    title: "Certificate of Land",
    color: "#F0F9FF",
    columns: ["Sl. No.", "Information", "Details"],
    rows: [
      { "Sl. No.": 1, Information: "CERTIFICATE OF LAND",Upload: { name: "Fees 26-27", url: "/documents/fee-structure-26-27.pdf" }  },
    ],
  },
];
