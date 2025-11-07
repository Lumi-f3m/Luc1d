/* particles-config.js */
particlesJS("particles-js", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: ["#a46cff", "#9f5fff", "#6e44ff"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#a46cff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.4 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});
