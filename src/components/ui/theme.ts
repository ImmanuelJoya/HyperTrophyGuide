// components/ui/theme.ts
export const cyberpunkTheme = {
    colors: {
        neon: {
            cyan: '#00f3ff',
            magenta: '#ff00ff',
            yellow: '#ffff00',
            lime: '#39ff14',
        },
        dark: {
            bg: '#0a0a0f',
            card: '#12121a',
            border: '#1e1e2e',
        }
    },
    animations: {
        glow: '0 0 10px rgba(0, 243, 255, 0.5), 0 0 20px rgba(0, 243, 255, 0.3)',
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 3s infinite',
    }
}

// Tailwind config extension
// tailwind.config.ts
export default {
    theme: {
        extend: {
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            backgroundImage: {
                'cyber-grid': 'linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)',
            }
        }
    }
}