/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        black: 'var(--color-black)',
        bug: {
          1: 'var(--color-bug-1)',
          2: 'var(--color-bug-2)',
        },
        dark: {
          1: 'var(--color-dark-1)',
          2: 'var(--color-dark-2)',
        },
        dragon: {
          1: 'var(--color-dragon-1)',
          2: 'var(--color-dragon-2)',
        },
        electric: {
          1: 'var(--color-electric-1)',
          2: 'var(--color-electric-2)',
        },
        fairy: {
          1: 'var(--color-fairy-1)',
          2: 'var(--color-fairy-2)',
        },
        fighting: {
          1: 'var(--color-fighting-1)',
          2: 'var(--color-fighting-2)',
        },
        fire: {
          1: 'var(--color-fire-1)',
          2: 'var(--color-fire-2)',
        },
        flying: {
          1: 'var(--color-flying-1)',
          2: 'var(--color-flying-2)',
        },
        ghost: {
          1: 'var(--color-ghost-1)',
          2: 'var(--color-ghost-2)',
        },
        grass: {
          1: 'var(--color-grass-1)',
          2: 'var(--color-grass-2)',
        },
        ground: {
          1: 'var(--color-ground-1)',
          2: 'var(--color-ground-2)',
        },
        ice: {
          1: 'var(--color-ice-1)',
          2: 'var(--color-ice-2)',
        },
        normal: {
          1: 'var(--color-normal-1)',
          2: 'var(--color-normal-2)',
        },
        poison: {
          1: 'var(--color-poison-1)',
          2: 'var(--color-poison-2)',
        },
        psychic: {
          1: 'var(--color-psychic-1)',
          2: 'var(--color-psychic-2)',
        },
        rock: {
          1: 'var(--color-rock-1)',
          2: 'var(--color-rock-2)',
        },
        steel: {
          1: 'var(--color-steel-1)',
          2: 'var(--color-steel-2)',
        },
        water: {
          1: 'var(--color-water-1)',
          2: 'var(--color-water-2)',
        },
      },
      keyframes: {
        levitate: {
          '0%, 100%': {
            transform: 'translateY(-6px)',
          },
          '50%': {
            transform: 'translateY(6px)',
          },
        },
        scaleUp: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        slideFromTop: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        levitate: 'levitate 4s ease-in-out infinite',
        scaleUp: 'scaleUp 0.5s forwards',
        slideFromTop: 'slideFromTop 0.5s forwards',
        fadeIn: 'fadeIn 0.5s forwards',
        wiggle: 'wiggle .3s ease-in-out forwards',
      },
      screens: {
        '3xl': '1792px',
      },
    },
  },
  plugins: [],
};
