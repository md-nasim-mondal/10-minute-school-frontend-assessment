import { IAboutValue, ISection } from "@/types";
import React from "react";

interface AboutCourseSectionProps extends ISection {
  values: IAboutValue[];
}

function AboutCourseSection({ type, order_idx, name, values }: AboutCourseSectionProps) {
  return (
    <div id={type} style={{ order: order_idx }}>
      <div className="mb-6 md:mb-10 mt-4 max-w-[900px] md:mt-[42px]">
        <div className="mt-10 md:mt-0">
          <h2 className="text-xl font-semibold md:mb-4 md:text-2xl">
            {name || "Course details"}{" "}
          </h2>
          <div className="rounded-lg py-2 md:border md:px-5">
            {values.map((item) => (
              <details
                key={item.id}
                className="mb-0 border-b border-dashed last:border-none"
              >
                <summary className="py-4 cursor-pointer accordion-header">
                  <div className="max-w-[90%] font-medium md:text-base mx-lg:text-sm">
                    <h2>
                      {<b dangerouslySetInnerHTML={{ __html: item.title }}></b>}
                    </h2>
                  </div>
                </summary>
                <div className="px-0 pb-2 text-gray-500">
                  <div
                    className="prose prose-ul:pl-4"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCourseSection;
