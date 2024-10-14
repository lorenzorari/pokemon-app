import { ISourceOptions } from 'tsparticles';

const tsparticlesOptions: ISourceOptions = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    line_linked: {
      enable: false,
    },
    shape: {
      type: 'image',
      images: [
        {
          src: '/assets/svg/pokemon-types/bug.svg',
          width: 100,
          height: 100,
          fill: true,
        },
        {
          src: '/assets/svg/pokemon-types/dark.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/dragon.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/electric.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/fairy.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/fighting.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/fire.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/flying.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/ghost.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/grass.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/ground.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/ice.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/normal.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/poison.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/psychic.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/rock.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/steel.svg',
          width: 100,
          height: 100,
        },
        {
          src: '/assets/svg/pokemon-types/water.svg',
          width: 100,
          height: 100,
        },
      ],
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 50,
      random: true,
      anim: {
        enable: false,
      },
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'top-right',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
    rotate: {
      random: {
        enable: true,
        minimumValue: 0,
      },
      direction: 'random',
      value: 0,
      animation: {
        enable: true,
        speed: 1,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'repulse',
      },
      resize: true,
    },
  },
  retina_detect: true,
};

export default tsparticlesOptions;
