import { IFeatureValue, ISection } from "@/types";
import Image from "next/image";
import React from "react";

interface FeaturesSectionProps extends ISection {
  values: IFeatureValue[];
}

function FeaturesSection({
  name,
  type,
  order_idx,
  values,
}: FeaturesSectionProps) {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div id={type} style={{ order: order_idx }}>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold leading-[30px] text-black">
          {name}
        </h2>
        <div className="mb-16 grid grid-cols-1 gap-4 rounded-md border bg-[#111827] p-6 md:grid-cols-2 md:gap-8">
          {values.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-row items-start gap-3 m-1"
            >
              <div>
                <div
                  className="mb-4 mx-auto opacity-0 transition-opacity duration-300 ease-in-out"
                  style={{ fontSize: "0px", opacity: 1 }}
                >
                  <Image
                    alt={feature.title}
                    loading="lazy"
                    width={36}
                    height={36}
                    style={{ color: "transparent" }}
                    src={feature.icon}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <h2 className="text-[18px] font-[500px] leading-[26px] text-white">
                  {feature.title}
                </h2>
                <h2 className="text-[14px] font-[400px] leading-[22px] text-[#9CA3AF]">
                  {feature.subtitle}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
