import React from "react";
import { MenuToggleIcon, CallIcon, CallIconMobile } from "@/assets/icons";
import SearchBar from "../ui/SearchBar";
import Logo from "../ui/Logo";
import NavItem from "../ui/NavLink";
import LanguageToggle from "../ui/LanguageToggle";
import MobileNavItem from "../ui/MobileNavItem";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b bg-white md:h-[65px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex justify-between items-center gap-3 px-4 py-3 md:px-7">
          <div className="flex gap-2">
            <button className="xl:hidden" type="button">
              <MenuToggleIcon />
            </button>
            <div className="md:hidden">
              <Logo />
            </div>
          </div>

          <div className="items-center hidden md:flex">
            <Logo />
          </div>

          <div className="hidden md:block flex-1 pr-4">
            <SearchBar />
          </div>

          <nav className="hidden xl:block mr-4">
            <ul className="flex items-center gap-4">
              <NavItem label="Class 6-12" href="/academic/" dropdown />
              <NavItem label="Skills" href="/skills/" dropdown />
              <NavItem label="Admission" href="/admission/" />
              <NavItem label="Online Batch" href="/online-batch/" dropdown />
              <NavItem
                label="English Centre"
                href="/english-centre/"
                dropdown
              />
              <NavItem label="More" href="#" dropdown />
            </ul>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="tel:16910"
              className="hidden md:flex items-center gap-1 text-green"
            >
              <CallIcon />
              <span>16910</span>
            </Link>
            <Link href="tel:16910" className="md:hidden text-black">
              <CallIconMobile />
            </Link>

            <LanguageToggle />

            <Link
              className="bg-green text-white rounded-md px-3 py-1 md:px-6"
              href="/auth/login/?returnUrl=%2Fen%2Fproduct%2Fielts-course%2F"
            >
              <span className="text-[12px] font-semibold md:text-[16px] md:font-medium">
                লগ-ইন
              </span>
            </Link>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex justify-between px-4 py-3 max-w-[350px] mx-auto">
            <MobileNavItem label="Class 6-12" dropdown />
            <MobileNavItem label="Skills" dropdown />
            <MobileNavItem label="Admission" href="/admission" />
            <MobileNavItem label="More" dropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
