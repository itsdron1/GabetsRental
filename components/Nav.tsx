"use client";

import { useLocale, useTranslations } from "next-intl";
import { type MouseEvent, useEffect, useState } from "react";
import BookingTrigger from "@/components/BookingTrigger";
import { useBooking } from "@/components/BookingContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { scrollToId } from "@/lib/scroll";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "#fleet", label: t("fleet") },
    { href: "#why", label: t("whyUs") },
    { href: "/tour-packages", label: t("tours") },
    { href: "#booking", label: t("book") },
  ];

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 60);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleMobileNav = (href: string, trigger?: HTMLElement) => {
    closeMenu();
    if (href === "#booking") {
      setTimeout(() => openBooking({ trigger }), 200);
      return;
    }
    if (href.startsWith("#") && isHomePage) {
      const id = href.replace("#", "");
      setTimeout(() => scrollToId(id), 200);
    }
  };

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return isHomePage ? href : `/${href}`;
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/tour-packages") return pathname === "/tour-packages";
    return false;
  };

  const linkClassName = (active: boolean) =>
    `text-[0.8rem] font-medium tracking-[0.12em] uppercase transition-colors ${
      active ? "text-cream" : "text-muted hover:text-cream"
    }`;

  const mobileLinkClassName = (active: boolean) =>
    `border-b border-border py-3.5 font-head text-xl font-bold transition-colors ${
      active ? "text-gold" : "text-muted hover:text-gold"
    }`;

  const handleInlineAnchor = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#booking") {
      e.preventDefault();
      openBooking({ trigger: e.currentTarget });
      return;
    }
    if (!href.startsWith("#") || !isHomePage) return;
    e.preventDefault();
    scrollToId(href.replace("#", ""));
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
          {t("brand")} <span className="text-gold">{t("brandAccent")}</span> {t("brandPlace")}
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={resolveHref(link.href)}
                onClick={(e) => handleInlineAnchor(e, link.href)}
                className={linkClassName(isActiveLink(link.href))}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <BookingTrigger className="btn-nav">{t("bookNow")}</BookingTrigger>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1.5 border-none bg-transparent"
            aria-label={t("menu")}
          >
            <span className="block h-0.5 w-6 rounded-sm bg-cream" />
            <span className="block h-0.5 w-6 rounded-sm bg-cream" />
            <span className="block h-0.5 w-6 rounded-sm bg-cream" />
          </button>
        </div>
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
          <Link
            key={link.href}
            href={resolveHref(link.href)}
            onClick={(e) => {
              if (link.href === "#booking" || (link.href.startsWith("#") && isHomePage)) {
                e.preventDefault();
              }
              handleMobileNav(link.href, e.currentTarget);
            }}
            className={mobileLinkClassName(isActiveLink(link.href))}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-6">
          <LanguageSwitcher />
        </div>
        <span className="sr-only">{locale}</span>
      </div>
    </>
  );
}
