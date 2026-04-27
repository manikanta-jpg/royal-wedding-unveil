import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Ornament } from "./Ornament";
import vinayaka from "@/assets/vinayaka.png";

export const SlideIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Card-stack: scale + fade out as next slide rises
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative h-[100vh]">
      <motion.div
        style={{ scale, opacity, y }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-cream-soft via-cream to-cream-deep flex flex-col items-center justify-center"
      >
        {/* corner ornaments */}
        <CornerOrnaments />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-sans-clean tracking-luxury text-[10px] md:text-xs uppercase text-royal/60 mb-8"
        >
          ॥ Shubh Vivah ॥
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <img
            src={vinayaka}
            alt="Lord Vinayaka"
            width={400}
            height={400}
            className="w-[260px] md:w-[380px] h-auto animate-breathe select-none"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="font-display italic text-lg md:text-2xl text-royal/80 max-w-md px-6 leading-relaxed">
            Vakratunda Mahakaya
            <br />
            Suryakoti Samaprabha
          </p>
          <Ornament className="mt-8" />
          <p className="mt-6 font-sans-clean tracking-[0.4em] text-[10px] uppercase text-royal/50">
            Scroll to begin
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

const CornerOrnaments = () => (
  <>
    {[
      "top-6 left-6 rotate-0",
      "top-6 right-6 rotate-90",
      "bottom-6 right-6 rotate-180",
      "bottom-6 left-6 -rotate-90",
    ].map((pos) => (
      <svg
        key={pos}
        className={`absolute ${pos} w-16 h-16 md:w-20 md:h-20 text-gold/50`}
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M5 5 L40 5 M5 5 L5 40 M5 5 Q25 5 25 25 Q25 5 45 5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="5" cy="5" r="2" fill="currentColor" />
      </svg>
    ))}
  </>
);
