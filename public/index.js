// 🔥 Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ================= HERO ANIMATION =================

// Name animation
gsap.from(".name h1", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
});

// Tagline animation
gsap.from(".tagline h3", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

// Intro animation
gsap.from(".intro p", {
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.6
});

// Buttons animation
gsap.from(".btn button", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.9,
  stagger: 0.2
});

// ================= ABOUT SECTION =================

gsap.from(".about .a-box", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%"
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.3
});

// ================= SERVICES SECTION =================

gsap.from(".service .s-box", {
  scrollTrigger: {
    trigger: ".service",
    start: "top 80%"
  },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2
});

// ================= FOOTER =================

gsap.from(".footer", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%"
  },
  opacity: 0,
  y: 50,
  duration: 1
});

