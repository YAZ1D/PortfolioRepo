import { LINKS } from "@/config/links";
import useTheme from "@/hooks/useTheme";
import { Sun, Moon, Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="font-bold text-xl" data-testid="text-name">Yazid Mouayn</h1>
        
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            asChild
            data-testid="link-github"
          >
            <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            asChild
            data-testid="link-linkedin"
          >
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            asChild
            data-testid="link-resume"
          >
            <a href={LINKS.resume} target="_blank" rel="noreferrer" aria-label="Resume">
              <FileText className="h-5 w-5" />
            </a>
          </Button>
          
          <div className="w-px h-6 bg-border mx-1" />
          
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
        </div>
      </div>
    </nav>
  );
}
