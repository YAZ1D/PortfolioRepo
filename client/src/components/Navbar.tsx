import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#impact" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#top");

  useEffect(() => {
    const syncHash = () => {
      if (typeof window === "undefined") return;
      setActiveHash(window.location.hash || "#top");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setIsMenuOpen(false);
  };

  const renderNavLink = (
    link: (typeof NAV_LINKS)[number],
    mobile = false,
  ) => (
    <a
      key={link.href}
      href={link.href}
      aria-current={activeHash === link.href ? "page" : undefined}
      onClick={() => handleNavClick(link.href)}
      className={cn(
        "rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        activeHash === link.href
          ? "bg-muted text-foreground shadow-xs"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        mobile
          ? "flex w-full rounded-2xl px-4 py-3 text-base"
          : "px-3 py-2",
      )}
    >
      {link.label}
    </a>
  );

  return (
    <nav className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-6">
        <a
          href="#top"
          onClick={() => handleNavClick("#top")}
          className="flex min-w-0 flex-col rounded-xl px-1 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            className="truncate text-sm font-semibold tracking-tight text-foreground"
            data-testid="text-name"
          >
            Yazid Mouayn
          </span>
          <span className="truncate text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Data + Automation Systems
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => renderNavLink(link))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-1 xl:flex">
            <Button
              variant="ghost"
              size="icon"
              asChild
              data-testid="link-github"
            >
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              data-testid="link-linkedin"
            >
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden bg-background/70 lg:inline-flex"
            data-testid="link-resume"
          >
            <a href={LINKS.resume} target="_blank" rel="noreferrer">
              Resume
              <FileText className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border/80 lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-3">
            <div className="rounded-2xl border border-border/80 bg-card/95 p-3 shadow-lg">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => renderNavLink(link, true))}
              </div>

              <div className="mt-3 border-t border-border/80 pt-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-between bg-background/70"
                >
                  <a href={LINKS.resume} target="_blank" rel="noreferrer">
                    Resume
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button variant="ghost" asChild className="justify-center">
                    <a href={LINKS.github} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>

                  <Button variant="ghost" asChild className="justify-center">
                    <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
