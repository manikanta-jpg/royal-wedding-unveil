import { useLenis } from "@/hooks/useLenis";
import { SlideIntro } from "@/components/wedding/SlideIntro";
import { PersonSlide } from "@/components/wedding/PersonSlide";
import { SlideCouple } from "@/components/wedding/SlideCouple";
import { SlideEnvelope } from "@/components/wedding/SlideEnvelope";
import groomImg from "@/assets/groom.jpg";
import brideImg from "@/assets/bride.jpg";
import { useEffect } from "react";

const Index = () => {
  useLenis();

  useEffect(() => {
    document.title = "Aarav & Ananya — A Wedding Invitation";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "A divine invitation to the wedding of Aarav & Ananya. Scroll through our story.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <h1 className="sr-only">Aarav & Ananya — Wedding Invitation</h1>

      <SlideIntro />

      <PersonSlide
        side="left"
        image={groomImg}
        title="The Groom"
        name="Aarav Sharma"
        intro="Son of Mr. Rajesh & Mrs. Priya Sharma. An architect by trade, a dreamer by heart — finding poetry in still mornings and quiet music."
        meta="Bengaluru · 1995"
        bg="cream"
      />

      <PersonSlide
        side="right"
        image={brideImg}
        title="The Bride"
        name="Ananya Iyer"
        intro="Daughter of Mr. Suresh & Mrs. Lakshmi Iyer. A classical dancer and storyteller, who finds magic in the smallest moments of life."
        meta="Chennai · 1997"
        bg="royal"
      />

      <SlideCouple />

      <SlideEnvelope />
    </main>
  );
};

export default Index;
