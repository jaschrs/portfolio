import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <div className="mx-auto max-w-[1600px]">
          <Hero />
          <About />
          <Experience />
          <Projects />
        </div>
        <Marquee items={["Systems", "Compilers", "Web", "Machine Learning", "Tools", "Open Source"]} />
        <div className="mx-auto max-w-[1600px]">
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
