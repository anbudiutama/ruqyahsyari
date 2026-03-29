"use client";

import { useState } from "react";
import RevealSection from "@/components/RevealSection";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-white" id="faq">
      <div className="max-w-[1100px] mx-auto">
        <RevealSection>
          <p className="text-xs font-bold tracking-[2px] uppercase text-gold-500 mb-3">
            Pertanyaan Umum
          </p>
          <h2 className="font-amiri text-[40px] leading-[1.25] mb-4">
            Yang Sering Ditanyakan
          </h2>
        </RevealSection>

        <div className="mt-12 max-w-[780px]">
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-black/[.08]">
              <button
                className="w-full bg-transparent border-none py-6 flex items-center justify-between cursor-pointer text-left text-base font-semibold text-slate-800 font-jakarta hover:text-emerald-700 transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                {f.q}
                <span
                  className={`text-xl text-emerald-600 transition-transform duration-300 ml-4 shrink-0 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className="faq-answer"
                style={{ maxHeight: openIdx === i ? 300 : 0 }}
              >
                <p className="text-sm text-slate-500 leading-[1.8] pb-6">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
