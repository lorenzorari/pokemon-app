import { ISourceOptions } from 'tsparticles';

const particlesOptions: ISourceOptions = {
  particles: {
    number: {
      value: 24,
      density: {
        enable: true,
        value_area: 800,
      },
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
          src: '/assets/svg/pokemon-types/fightning.svg',
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
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 24.035957792858095,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        size_min: 0.1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
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
  retina_detect: true,
};

export default particlesOptions;
