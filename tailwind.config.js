/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Portal
        'pt-serif': ['"Instrument Serif"', 'Georgia', 'serif'],
        'pt-sans': ['Inter', 'system-ui', 'sans-serif'],
        // Demo 1 — Refined Corporate Classic
        'd1-serif': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'd1-sans': ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        // Demo 2 — Modern Industrial Powerhouse
        'd2-display': ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
        'd2-sans': ['Barlow', 'system-ui', 'sans-serif'],
        'd2-mono': ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        // Demo 3 — Contemporary Editorial Luxury
        'd3-serif': ['Fraunces', 'Georgia', 'serif'],
        'd3-sans': ['Manrope', 'system-ui', 'sans-serif'],
        // Demo 4 — Next-Generation Technology Group
        'd4-display': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        'd4-sans': ['Inter', 'system-ui', 'sans-serif'],
        'd4-mono': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // Demo 5 — Human-Centered Global Enterprise
        'd5-sans': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        'd5-serif': ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        d1: {
          navy: '#0f2340',
          ink: '#1b2433',
          ivory: '#f7f5f0',
          stone: '#e8e4dc',
          gold: '#a8844f',
          goldlight: '#c9ab7a',
          muted: '#5d6675',
        },
        d2: {
          graphite: '#121519',
          steel: '#1d232b',
          navy: '#0b1f3a',
          plate: '#eceff2',
          line: '#d3d8de',
          slate: '#8a96a3',
          signal: '#ff5a1f',
          signaldark: '#d9440f',
        },
        d3: {
          paper: '#f4efe6',
          cream: '#faf7f1',
          ink: '#1c1a17',
          sand: '#d9cdb8',
          oxblood: '#6e2a20',
          taupe: '#6f665a',
          rule: '#cfc4b1',
        },
        d4: {
          void: '#080c18',
          deep: '#0d1326',
          panel: '#121a33',
          edge: '#24304f',
          indigo: '#6170ff',
          teal: '#2fc9b4',
          mist: '#f4f6fb',
          haze: '#a9b3cc',
        },
        d5: {
          teal: '#0f766e',
          tealdark: '#0b5a54',
          coral: '#e8664a',
          sun: '#f4b740',
          sky: '#e7f3f1',
          sand: '#fbf7f1',
          ink: '#14302d',
          mute: '#55706c',
        },
      },
      keyframes: {
        'd4-dash': { to: { strokeDashoffset: '-40' } },
        'd2-ticker': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        'd4-dash': 'd4-dash 3s linear infinite',
        'd2-ticker': 'd2-ticker 40s linear infinite',
      },
    },
  },
  plugins: [],
};
