import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  internal?: boolean;
};

const storeLinks = [
  {
    href: "https://play.google.com/store/apps/details?id=com.a10minuteschool.tenminuteschool",
    src: "https://cdn.10minuteschool.com/images/google-play-icon_1695731678094.png",
    alt: "google play",
  },
  {
    href: "https://apps.apple.com/us/app/10-minute-school/id1577061772",
    src: "https://cdn.10minuteschool.com/images/ios-store-icon_1695731704002.png",
    alt: "ios download",
  },
];

const companyLinks: FooterLink[] = [
  {
    label: "Career / Recruitment",
    href: "https://app.10minuteschool.com/careers",
  },
  { label: "Join as a Teacher", href: "https://docs.google.com/forms/..." },
  {
    label: "Join as an Affiliate",
    href: "https://affiliation.10minuteschool.com/",
  },
  {
    label: "Privacy policy",
    href: "https://app.10minuteschool.com/privacy-policy",
  },
  {
    label: "Refund policy",
    href: "https://app.10minuteschool.com/refund-policy",
  },
  {
    label: "Terms & Conditions",
    href: "https://app.10minuteschool.com/terms-and-conditions",
  },
];

const otherLinks: FooterLink[] = [
  { label: "Blog", href: "https://blog.10minuteschool.com/" },
  { label: "Book Store", href: "/store/all", internal: true },
  { label: "Free Notes & Guides", href: "https://10minuteschool.com/content" },
  { label: "Job Preparation Courses", href: "/jobs-prep", internal: true },
  { label: "Verify Certificate", href: "/certificate", internal: true },
  { label: "Free Download", href: "/resource", internal: true },
];

const socialLinks = [
  {
    alt: "facebook",
    href: "https://www.facebook.com/10minuteschool/",
    src: "https://cdn.10minuteschool.com/images/facebook_1695730910971.png",
  },
  {
    alt: "instagram",
    href: "https://www.instagram.com/10ms_insta/",
    src: "https://cdn.10minuteschool.com/images/instagram_1695731442397.png",
  },
  {
    alt: "linkedin",
    href: "https://www.linkedin.com/company/10ms/",
    src: "https://cdn.10minuteschool.com/images/linkedin_1695731507042.png",
  },
  {
    alt: "youtube",
    href: "https://www.youtube.com/channel/UCL89KKkLs0tZKld-iIS3NGw",
    src: "https://cdn.10minuteschool.com/images/youtube_1695731538726.png",
  },
  {
    alt: "tiktok",
    href: "https://www.tiktok.com/@10minuteschool?lang=en",
    src: "https://cdn.10minuteschool.com/images/Tiktok_1695731564895.png",
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="w-1/2 mr-4">
      <h3 className="mb-3 text-base font-semibold md:text-xl md:font-bold">
        {title}
      </h3>
      <ul className="flex flex-col text-gray-600 md:gap-4">
        {links.map(({ label, href, internal }) => (
          <li key={label}>
            {internal ? (
              <Link
                href={href}
                className="text-sm font-medium hover:text-green md:text-base"
              >
                {label}
              </Link>
            ) : (
              <a
                href={href}
                className="text-sm font-medium hover:text-green md:text-base"
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="mx-auto mb-3 mt-5 flex w-full max-w-[256px] gap-6 md:mx-0">
      {socialLinks.map(({ alt, href, src }) => (
        <a href={href} target="_blank" rel="noreferrer" key={alt}>
          <Image alt={alt} loading="lazy" width={32} height={32} src={src} />
        </a>
      ))}
    </div>
  );
}

export default function FooterSection() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 mb-24 md:mb-0">
      <div className="flex flex-col pt-12 md:flex-row md:border-[#E4E4E4]">
        <div className="flex flex-col items-center w-full mb-7 md:items-start lg:mr-6">
          <Link href="/" className="mb-4">
            <Image
              alt="Instructor"
              loading="lazy"
              width={116}
              height={32}
              src="https://10minuteschool.com/images/logo.svg"
            />
          </Link>
          <h3 className="mb-[14px] text-base font-semibold md:font-medium">
            Download Our Mobile App
          </h3>
          <div className="flex gap-4">
            {storeLinks.map(({ href, src, alt }) => (
              <a key={alt} href={href}>
                <Image
                  alt={alt}
                  loading="lazy"
                  width={156}
                  height={49}
                  src={src}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center border-b border-[#E4E4E4] pb-8 md:border-none">
          <div className="flex w-full max-w-sm">
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Others" links={otherLinks} />
          </div>
        </div>

        <div className="flex flex-col w-full md:ml-4">
          <div className="hidden md:block">
            <h3 className="mb-3 text-base font-semibold md:text-xl md:font-bold">
              Keep up with us at
            </h3>
            <p className="mb-4 text-base font-normal">
              Call Us:{" "}
              <a className="text-green" href="tel:16910">
                16910
              </a>{" "}
              (24x7)
            </p>
            <p className="mb-4 text-base font-normal">
              WhatsApp:{" "}
              <a
                className="text-green"
                href="https://api.whatsapp.com/send?phone=+8801896016252"
              >
                +8801896016252
              </a>
            </p>
            <p className="mb-4 text-base font-normal">
              Outside Bangladesh:{" "}
              <a className="text-green" href="tel:+8809610916910">
                +8809610916910
              </a>
            </p>
            <p className="mb-2 text-base font-normal">
              Email Us:{" "}
              <span className="text-green">support@10minuteschool.com</span>
            </p>
          </div>
          <SocialIcons />
        </div>
      </div>

      <div className="pb-5 text-center">
        <p className="text-xs font-normal text-gray-600 md:text-sm">
          2015 - 2025 Copyright © 10 Minute School. All rights reserved.
        </p>
      </div>
    </div>
  );
}
