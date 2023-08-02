"use client";
import { useState, useEffect } from "react";
import NavItem from "@/components/NavItem";
import GooseButton from "@/components/GooseButton";
import name from "../../../public/name.svg";
import Image from "next/image";
import Link from "next/link";
import { useViewportWidth } from "@/hooks";

export default function AppHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e: any) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", closeDropdownOnOutsideClick);
    }

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const isMobile = useViewportWidth();

  return (
    <header className="sticky top-0">
      <div className="topnav inner flex justify-between items-center">
        <Link className="" href="/">
          <Image src={name} alt="" />
        </Link>

        <div className="flex">
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">
              Menu
            </button>
            <div
              className="dropdown-content flex flex-row"
              style={{
                display: isMobile
                  ? isDropdownOpen
                    ? "block"
                    : "none"
                  : "flex",
              }}
            >
              <NavItem href="/" label="About Me" onClick={toggleDropdown} />
              <NavItem
                href="/experience"
                label="Experience"
                onClick={toggleDropdown}
              />
              {/* <NavItem href="/volunteering" label="Volunteering" /> */}
              <NavItem href="/resume" label="Resume" onClick={toggleDropdown} />
              <GooseButton className="mobile-goose" />
            </div>
          </div>
        </div>
        <GooseButton className="desktop-goose" />
      </div>
    </header>
  );
}