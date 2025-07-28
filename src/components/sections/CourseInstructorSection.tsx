import { LeftArrow2 } from "@/assets/icons";
import { InstructorValue, Section } from "@/types";
import Image from "next/image";
import React from "react";

interface CourseInstructorSectionProps extends Section {
  values: InstructorValue[];
}

function CourseInstructorSection({
  values,
  type,
  name,
  order_idx,
}: CourseInstructorSectionProps) {
  return (
    <div id={type} style={{ order: order_idx }}>
      <div className="mb-7 xs:bg-[#EEF2F4] xs:pt-2">
        <div className="pt-4 pb-2 bg-white">
          <h2 className="mb-4 text-xl font-semibold md:text-2xl">{name}</h2>
          {values.map((instructor) => (
            <div
              key={instructor.slug}
              className="flex items-center md:rounded-md md:border md:p-5 mb-4 last:mb-0"
            >
              <div>
                <div
                  className="rounded-[50%] overflow-hidden opacity-0 transition-opacity duration-300 ease-in-out"
                  style={{ fontSize: "0px", opacity: 1 }}
                >
                  <Image
                    alt={`Instructor ${instructor.name}`}
                    loading="lazy"
                    width={73}
                    height={73}
                    style={{ color: "transparent" }}
                    src={instructor.image}
                  />
                </div>
              </div>
              <div className="flex-1 ml-4">
                <h3 className="text-lg">
                  {instructor.has_instructor_page ? ( // Only link if has_instructor_page is true
                    <a
                      className="flex items-center hover:text-green"
                      href={`/skills/instructors/${instructor.slug}/`}
                    >
                      {instructor.name}
                      <span className="ml-2 pb-[2px]">
                        <LeftArrow2 />
                      </span>
                    </a>
                  ) : (
                    instructor.name // Just display name if no instructor page
                  )}
                </h3>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: instructor.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseInstructorSection;
