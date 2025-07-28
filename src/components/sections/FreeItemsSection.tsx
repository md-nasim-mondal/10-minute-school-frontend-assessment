import Image from 'next/image';
import React from 'react';

const FreeItemsSection = () => {
    return (
        <div id="free_items">
            <div className="mb-8">
                <h2 className="my-5 text-xl font-semibold leading-[30px] text-black">
                    Free items with this products-
                </h2>
                <div 
                    className="relative w-full overflow-hidden bg-no-repeat bg-cover rounded-lg bg-[url(https://cdn.10minuteschool.com/images/banner_background_1731401239364.png)]" 
                    style={{borderRadius: "20px"}}
                >
                    <div className="text-white divide-y rounded-lg divide-dashed divide-slate-600 p-4 relative z-[1]">
                        <div className="relative flex flex-col items-start justify-between gap-1 px-6 py-6 overflow-hidden md:flex-row rounded-2xl shadow-2xl before:content-[''] before:absolute before:inset-0 before:border-[6px] before:border-t-0 before:border-b-0 before:blur-[8px] before:rounded-xl before:[border-image:conic-gradient(from_180deg_at_50%_50%,#FFE2BE_0deg,#FFA42D_36deg,#EDAE64_50.4deg,#8E9AFC_90.13deg,#67D1FF_102.6deg,#FFF_126.76deg,#FCD6F7_144deg,#F3CFFF_156.11deg,#CCA5F3_180deg,#E0CDF9_227.4deg,#472FFF_240.42deg,#479BFF_270deg,#B6E0FF_296.89deg,#FF8E75_324deg)_1] after:content-[''] after:absolute after:inset-0 after:border after:rounded-xl after:blur-[1.5px] after:mix-blend-hard-light after:[border-image:conic-gradient(from_180deg_at_50%_50%,#FFE2BE_0deg,#FFA42D_36deg,#EDAE64_50.4deg,#8E9AFC_90.13deg,#67D1FF_102.6deg,#FFF_126.76deg,#FCD6F7_144deg,#F3CFFF_156.11deg,#CCA5F3_180deg,#E0CDF9_227.4deg,#472FFF_240.42deg,#479BFF_270deg,#B6E0FF_296.89deg,#FF8E75_324deg)_1]">
                            <div className="flex flex-col items-start gap-1">
                                <h3 className="mb-2 text-base md:text-xl font-[600px] leading-[26px] text-white">
                                    ঘরে বসে IELTS প্রস্তুতি (Hardcopy Book)
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <ul className="list-disc list-inside">
                                        <li className="flex flex-row items-center gap-3 text-sm font-[400px] leading-[24px] mb-1">
                                            <span className="opacity-60">•</span>
                                            <p className="font-[400px] leading-[24px] text-[#fff] md:text-[16px]">360 পৃষ্ঠা</p>
                                        </li>
                                        <li className="flex flex-row items-center gap-3 text-sm font-[400px] leading-[24px] mb-1">
                                            <span className="opacity-60">•</span>
                                            <p className="font-[400px] leading-[24px] text-[#fff] md:text-[16px]">প্রিমিয়াম হার্ডকপি</p>
                                        </li>
                                        <li className="flex flex-row items-center gap-3 text-sm font-[400px] leading-[24px] mb-1">
                                            <span className="opacity-60">•</span>
                                            <p className="font-[400px] leading-[24px] text-[#fff] md:text-[16px]">ফ্রি ডেলিভারি</p>
                                        </li>
                                        <li className="flex flex-row items-center gap-3 text-sm font-[400px] leading-[24px] mb-1">
                                            <span className="opacity-60">•</span>
                                            <p className="font-[400px] leading-[24px] text-[#fff] md:text-[16px]">৪ কর্মদিবসের মধ্যে সারাদেশে ডেলিভারি</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="z-[1] flex w-full sm:items-center md:mr-5 md:w-fit md:items-end">
                                <div className="mx-auto opacity-0 transition-opacity duration-300 ease-in-out" style={{fontSize: "0px", opacity: 1}}>
                                    <Image 
                                        alt="IELTS Book"
                                        src="https://cdn.10minuteschool.com/images/catalog/media/Book_Image_1731924602665.png?w=120&h=150"
                                        width={120}
                                        height={150}
                                        loading="lazy"
                                        style={{color: "transparent"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeItemsSection;