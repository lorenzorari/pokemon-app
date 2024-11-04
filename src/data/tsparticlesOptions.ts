import { PokemonType } from 'src/models/types';
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
      images: Object.values(PokemonType).map((type) => ({
        src: `/assets/svg/pokemon-types/${type}.svg`,
        width: 100,
        height: 100,
        replaceColor: true,
        particles: {
          color: { value: '#fff' },
        },
      })),
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
