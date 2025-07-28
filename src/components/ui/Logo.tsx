import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`h-[27px] w-[100px] ${className}`}>
      <Image
        alt="10ms"
        src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
        width={100}
        height={27}
        priority
        style={{ color: "transparent" }}
      />
    </Link>
  );
}
