import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Yazid Mouayn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
