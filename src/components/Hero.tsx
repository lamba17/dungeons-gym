import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* BG Image */}
      <img
        src="/assets/hero-gym-CVmL6RnH.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        alt=""
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/90" />

      {/* Red radial glow right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsl(358_95%_45%/0.12),transparent_70%)]" />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-20
                      grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-0
                      min-h-screen py-24">

        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center"
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]
                         font-bold uppercase leading-[1.05] tracking-tight mb-10
                         max-w-[600px] mx-auto lg:mx-0">
            TRAIN LIKE<br />
            A BEAST.<br />
            <span className="text-gradient">RISE</span> FROM<br />
            THE{' '}
            <span className="text-gradient">DUNGEON.</span>
          </h1>

          <p className="text-foreground/70 text-base md:text-lg mb-10 max-w-md mx-auto lg:mx-0 font-body leading-relaxed">
            Where champions are forged in iron and fire. From beginner to beast,
            experience workouts designed to push your limits.
          </p>

          <div className="flex flex-row gap-5 justify-center lg:justify-start flex-wrap">
            <a
              href="#contact"
              className="btn-primary-premium text-base px-10 py-4"
            >
              Join Now
            </a>
            <a
              href="#about"
              className="btn-outline-premium text-base px-10 py-4"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right — athlete image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-1 lg:order-2 flex items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(358_95%_45%/0.18),transparent_65%)]" />
          <img
            src="/assets/hero-athlete-DvGk-Szu.png"
            className="w-[320px] md:w-[400px] lg:w-[500px] xl:w-[560px] h-auto object-contain
                       drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative z-10 lg:-ml-20"
            alt="Dungeon Gym Athlete"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-background/80 blur-2xl rounded-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
}
