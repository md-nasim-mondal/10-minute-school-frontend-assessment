import { CheckIcon2 } from "@/assets/icons";
import { IPointerValue, ISection } from "@/types";
import React from "react";

interface PointersSectionProps extends ISection {
  values: IPointerValue[];
}

function PointersSection({
  name,
  type,
  order_idx,
  values,
}: PointersSectionProps) {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div id={type} style={{ order: order_idx }}>
      <div className="mb-6 md:mb-10 relative bg-[#E5E7EB] py-2 md:bg-white md:py-0">
        <div className="pt-6 pb-6 bg-white md:pb-0 md:pt-0">
          <div>
            <h2 className="mb-4 text-xl font-semibold md:text-2xl">{name}</h2>
            <div className="rounded-md md:border">
              <div className="pt-2 md:p-6">
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr] md:gap-4">
                  {values.map((pointer) => (
                    <li
                      key={pointer.id}
                      className="flex items-start gap-2 mb-2"
                    >
                      <CheckIcon2 color={pointer.color} />
                      <div className="flex-1">{pointer.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointersSection;
