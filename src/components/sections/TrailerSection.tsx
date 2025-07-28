"use client";

import { LeftArrowSvg, PlayButtonSvg, RightArrowSvg } from "@/assets/icons";
import { IMedia } from "@/types";
import Image from "next/image";
import React, { useState, useRef, useEffect, JSX } from "react";

interface TrailerSectionProps {
  mediaItems: IMedia[];
}

const MAIN_PLAYER_WIDTH = 867;
const MAIN_PLAYER_HEIGHT = 480;
const PAGINATION_THUMB_WIDTH = 55;
const PAGINATION_THUMB_HEIGHT = 33;

function TrailerSection({ mediaItems }: TrailerSectionProps): JSX.Element | null {
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const paginationRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (paginationRef.current && thumbnailRefs.current[currentMediaIndex]) {
      thumbnailRefs.current[currentMediaIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentMediaIndex]);

  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  const currentMedia = mediaItems[currentMediaIndex];

  const handleThumbnailClick = (index: number) => {
    setCurrentMediaIndex(index);
    setIsPlaying(false);
  };

  const handleMainPlayClick = () => {
    if (currentMedia.resource_type === "video") {
      setIsPlaying(true);
    }
  };

  const goToPrevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const goToNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  return (
    <>
      {/* Main Player */}
      <div className="relative overflow-hidden bg-black youtube-video aspect-video">
        <div className="relative w-full h-full">
          {currentMedia.resource_type === "video" && !isPlaying && (
            <>
              <div className="absolute inset-0 bg-black opacity-40 z-[1]" />
              <span
                className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleMainPlayClick}
              >
                {/* Play button SVG */}
                <PlayButtonSvg />
              </span>
            </>
          )}

          <div className="thumb-wrap w-full h-full">
            {currentMedia.resource_type === "video" && isPlaying ? (
              <iframe
                className="w-full h-full absolute inset-0"
                src={`https://www.youtube.com/embed/${currentMedia.resource_value}?autoplay=1&rel=0`}
                title={currentMedia.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                className="w-full h-full transition-opacity duration-300 ease-in-out"
                style={{ opacity: 1 }}
              >
                <Image
                  alt={currentMedia.name}
                  src={
                    currentMedia.resource_type === "video"
                      ? currentMedia.thumbnail_url ||
                        `https://img.youtube.com/vi/${currentMedia.resource_value}/hqdefault.jpg`
                      : currentMedia.resource_value
                  }
                  width={MAIN_PLAYER_WIDTH}
                  height={MAIN_PLAYER_HEIGHT}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Arrows */}
        {mediaItems.length > 1 && (
          <>
            <div
              className="absolute left-[10px] top-1/2 -translate-y-1/2 z-[4] h-[25px] w-[25px] cursor-pointer"
              onClick={goToPrevMedia}
            >
              {/* Left arrow */}
              <LeftArrowSvg />
            </div>
            <div
              className="absolute right-[10px] top-1/2 -translate-y-1/2 z-[4] h-[25px] w-[25px] cursor-pointer"
              onClick={goToNextMedia}
            >
              {/* Right arrow */}
              <RightArrowSvg />
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-4 p-4 overflow-x-auto hideScrollbar"
        ref={paginationRef}
      >
        {mediaItems.map((item, index) => (
          <div
            key={`${item.resource_value}-${index}`}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
          >
            <div
              className={`relative rounded cursor-pointer overflow-hidden outline-[2px] ${
                index === currentMediaIndex
                  ? "outline-[#1CAB55]"
                  : "border border-gray-300 outline-white"
              }`}
              style={{
                width: PAGINATION_THUMB_WIDTH,
                height: PAGINATION_THUMB_HEIGHT,
                flexShrink: 0,
              }}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                alt={item.name}
                src={
                  item.resource_type === "video"
                    ? item.thumbnail_url ||
                      `https://img.youtube.com/vi/${item.resource_value}/default.jpg`
                    : item.resource_value
                }
                width={PAGINATION_THUMB_WIDTH}
                height={PAGINATION_THUMB_HEIGHT}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {item.resource_type === "video" && (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <Image
                    alt="Play The Video"
                    src="https://10minuteschool.com/images/annual_exam/play_icon_2.svg"
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TrailerSection;
