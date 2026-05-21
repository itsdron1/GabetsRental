"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";

const navLinks = [
  { href: "#fleet", label: "Fleet" },
  { href: "#delivery", label: "Delivery" },
  { href: "#why", label: "Why Us" },
  { href: "#booking", label: "Book" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleMobileNav = (href: string) => {
    closeMenu();
    const id = href.replace("#", "");
    setTimeout(() => scrollToId(id), 200);
  };

  return (
    <>
      <nav
        className={`nav-bar fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-5 py-4 md:px-8 ${
          scrolled ? "border-b border-border bg-bg/92 backdrop-blur-xl" : "nav-bar-hero"
        }`}
      >
        <Link
          href="/"
          className="font-head text-xl font-extrabold tracking-[0.06em] text-cream"
        >
          G-BIKE <span className="text-gold">Rental</span> Bali
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.8rem] font-medium tracking-[0.12em] text-muted uppercase transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => scrollToId("booking")} className="btn-nav hidden lg:block">
          Book Now
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1.5 border-none bg-transparent lg:hidden"
          aria-label="Menu"
        >
          <span className="block h-0.5 w-6 rounded-sm bg-cream" />
          <span className="block h-0.5 w-6 rounded-sm bg-cream" />
          <span className="block h-0.5 w-6 rounded-sm bg-cream" />
        </button>
      </nav>

      <div
        role="presentation"
        onClick={closeMenu}
        className={`menu-overlay fixed inset-0 z-[140] bg-black/70 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`mobile-menu-panel fixed top-0 right-0 bottom-0 z-[150] flex w-[min(320px,85vw)] flex-col gap-2 border-l border-border bg-surface px-8 pt-20 pb-10 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleMobileNav(link.href);
            }}
            className="border-b border-border py-3.5 font-head text-xl font-bold text-muted transition-colors hover:text-gold"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#booking"
          onClick={(e) => {
            e.preventDefault();
            handleMobileNav("#booking");
          }}
          className="border-b border-border py-3.5 font-head text-xl font-bold text-muted transition-colors hover:text-gold"
        >
          Book Now
        </a>
      </div>
    </>
  );
}
