"use client";

import { useState } from "react";
import { faqsData } from "@/data/faqdata";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-[300px_1fr]">
        {/* Left Side */}
        <div>
          <span className="text-xs font-semibold uppercase text-orange-600">
            FAQ
          </span>

          <h2
            className="mt-3 text-4xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>

          <p
            className="mt-4 text-gray-600 leading-relaxed"
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            Everything you need to know about Prasan Vidya Mandir.
          </p>
        </div>

        {/* FAQ List */}
        <div className="border-t border-gray-200">
          {faqsData.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span
                  className="text-base font-semibold text-gray-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.q}
                </span>

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                    open === index
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {open === index ? "−" : "+"}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === index
                    ? "max-h-40 pb-6"
                    : "max-h-0"
                }`}
              >
                <p
                  className="max-w-2xl text-sm leading-7 text-gray-600"
                  style={{ fontFamily: "'Comfortaa', cursive" }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}