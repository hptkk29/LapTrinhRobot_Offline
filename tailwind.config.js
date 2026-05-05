/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== Bộ màu chính theo design system =====
        'primary-orange': '#F97316',     // Cam chủ đạo
        'primary-orange-dark': '#EA580C',
        'primary-purple': '#7C3AED',     // Tím phụ
        'primary-purple-dark': '#6B21A8',
        'soft-yellow': '#FEF3C7',        // Nền vàng nhạt
        'soft-cream': '#FFF7ED',         // Nền cream
        'soft-purple': '#F3E8FF',        // Nền tím nhạt
        'urgent': '#DC2626',             // Đỏ urgency
        'success': '#10B981',            // Xanh xác nhận
        'text-dark': '#1F2937',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        }
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 32px rgba(0,0,0,0.12)',
        'orange-glow': '0 4px 20px rgba(249,115,22,0.3)',
        'purple-glow': '0 4px 20px rgba(124,58,237,0.3)',
      },
    },
  },
  plugins: [],
}
