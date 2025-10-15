import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4" data-testid="text-contact-heading">
          Get In Touch
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12">
          I'm always open to discussing new opportunities, collaborations, or just connecting.
          Feel free to reach out!
        </p>
        
        <div className="space-y-6">
          <Button
            size="lg"
            variant="default"
            asChild
            className="gap-2"
            data-testid="button-email"
          >
            <a href={LINKS.email}>
              <Mail className="h-5 w-5" />
              mouayny@gmail.com
            </a>
          </Button>
          
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2"
              data-testid="button-contact-github"
            >
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2"
              data-testid="button-contact-linkedin"
            >
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
