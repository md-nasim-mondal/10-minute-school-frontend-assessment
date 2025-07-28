import React from "react";
import Image from "next/image";

interface ChecklistItem {
  id: string;
  icon: string;
  text: string;
  list_page_visibility: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
}

function Checklist({ items }: ChecklistProps) {
  return (
    <div className="grid py-2 md:p-4">
      <p className="mb-4 text-xl font-semibold">এই কোর্সে যা থাকছে</p>
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex items-center mb-3 leading-5">
            <div
              className="inline-block h-[20px] w-[20px] opacity-0 transition-opacity duration-300 ease-in-out"
              style={{ fontSize: "0px", opacity: 1 }}
            >
              <Image
                alt="icon"
                loading="lazy"
                width={20}
                height={20}
                style={{ color: "transparent" }}
                src={item.icon}
              />
            </div>
            <h4 className="mb-0 inline-block pl-4 tracking-[0.005em] text-[#111827]">
              {item.text}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Checklist;
