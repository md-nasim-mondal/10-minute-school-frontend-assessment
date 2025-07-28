import { DropdownIcon } from "@/assets/icons";

type Props = {
  label: string;
  href?: string;
  dropdown?: boolean;
};

export default function MobileNavItem({ label, href = "#", dropdown }: Props) {
  return (
    <li className="list-none">
      <a
        href={href}
        className="flex items-center gap-2 text-xs font-medium text-[#4B5563] hover:text-green mt-0.5"
      >
        <div className="flex items-center">
          <p>{label}</p>
          {dropdown && <DropdownIcon />}
        </div>
      </a>
    </li>
  );
}
