import Link from "next/link";
import { DropdownIcon } from "@/assets/icons";

type Props = {
  label: string;
  href: string;
  dropdown?: boolean;
};

export default function NavItem({ label, href, dropdown }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-0.5 text-sm font-medium text-[#4B5563] hover:text-green"
    >
      <p>{label}</p>
      {dropdown && <DropdownIcon />}
    </Link>
  );
}
