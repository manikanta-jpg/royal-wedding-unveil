import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Ornament } from "./Ornament";

interface PersonSlideProps {
  side: "left" | "right";
  image: string;
  title: string;
  name: string;
  intro: string;
  meta: string;
  bg?: "cream" | "royal";
}

export const PersonSlide = ({
  side,
  image,
  title,
  name,
  intro,
  meta,
  bg = "cream",
}: PersonSlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The card slides in from its side as the section enters
  const cardX = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    side === "left" ? ["-30%", "0%", "0%", "-8%"] : ["30%", "0%", "0%", "8%"]
  );
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "left" ? [-6, 0, -2] : [6, 0, 2]
  );

  // text fade
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.55, 0.85, 1], [0, 1, 1, 0.3]);
  const textY = useTransform(scrollYProgress, [0.25, 0.55], [40, 0]);

  // Whole-section card-stack out
  const sectionScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.92]);
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.2]);

  const bgClass =
    bg === "royal"
      ? "bg-gradient-to-br from-royal-deep via-royal to-royal-deep text-cream"
      : "bg-gradient-to-br from-cream via-cream-soft to-cream-deep text-royal";

  const accentText = bg === "royal" ? "text-gold-bright" : "text-gold-deep";
  const mutedText = bg === "royal" ? "text-cream/70" : "text-royal/65";

  return (
    <section ref={ref} className="relative h-[180vh]">
      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className={`sticky top-0 h-screen w-full overflow-hidden ${bgClass}`}
      >
        {/* faint pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px), radial-gradient(circle at 80% 80%, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className={`relative h-full grid grid-cols-1 md:grid-cols-2 ${
            side === "right" ? "md:[direction:rtl]" : ""
          }`}
        >
          {/* IMAGE CARD */}
          <div className="relative flex items-center justify-center p-6 md:p-12 [direction:ltr]">
            <motion.div
              style={{ x: cardX, rotate: cardRotate }}
              className="relative w-[78%] max-w-md aspect-[3/4]"
            >
              {/* gold frame */}
              <div className="absolute -inset-3 border border-gold/60" />
              <div className="absolute -inset-1.5 border border-gold/30" />
              <div className="relative w-full h-full overflow-hidden shadow-elegant">
                <img
                  src={image}
                  alt={name}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/40 via-transparent to-transparent" />
              </div>
              {/* corner notches */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
                (p) => (
                  <span
                    key={p}
                    className={`absolute ${p} w-3 h-3 bg-gold -translate-x-1/2 -translate-y-1/2 first:translate-x-0 rotate-45`}
                    style={{ transform: "translate(-50%, -50%) rotate(45deg)" }}
                  />
                )
              )}
            </motion.div>
          </div>

          {/* TEXT */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative flex items-center justify-center p-8 md:p-16 [direction:ltr]"
          >
            <div className={`max-w-md ${side === "right" ? "md:text-right" : "md:text-left"} text-center`}>
              <p className={`font-sans-clean tracking-luxury text-[10px] uppercase ${accentText} mb-4`}>
                {title}
              </p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-2">
                {name.split(" ")[0]}
              </h2>
              <h2 className="font-display italic text-3xl md:text-5xl leading-tight gradient-gold-text mb-6">
                {name.split(" ").slice(1).join(" ")}
              </h2>
              <Ornament className={`mb-6 ${side === "right" ? "md:justify-end" : "md:justify-start"}`} />
              <p className={`font-serif-soft text-lg md:text-xl leading-relaxed ${mutedText}`}>
                {intro}
              </p>
              <p className={`mt-6 font-sans-clean tracking-[0.3em] text-[10px] uppercase ${accentText}`}>
                {meta}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
