import useCountdown from '../hooks/useCountdown';
import { formatDeadline } from '../utils/deadlines';
import { Flame, MessageCircle, ArrowRight } from 'lucide-react';

/**
 * Section 2 — Countdown ưu đãi đặc biệt (kiểu web cũ — nền tím đậm)
 */
export default function SpecialOfferCountdown() {
  const { deadline, timeLeft } = useCountdown();
  const pad = (n) => String(n).padStart(2, '0');

  const scrollToForm = () =>
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="bg-gradient-purple-dark py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <Flame className="w-4 h-4 text-orange-300 animate-pulse" />
            <span className="font-bold text-xs sm:text-sm text-orange-200 uppercase tracking-wider">
              ƯU ĐÃI ĐẶC BIỆT — CHỈ CÒN
            </span>
          </div>

          {/* H2 */}
          <h2 className="heading-2 text-white mb-4">
            Đăng ký trước{' '}
            <span className="text-yellow-300">{formatDeadline(deadline)}</span>
            <br className="hidden sm:block" /> — Tiết kiệm <span className="text-yellow-300">30%</span> học phí!
          </h2>

          <p className="text-base sm:text-lg text-purple-200 mb-10 max-w-2xl mx-auto">
            Sau ngày {formatDeadline(deadline)}, học phí trở về mức niêm yết đầy đủ.
            Đừng để con bỏ lỡ ưu đãi tốt nhất năm!
          </p>

          {/* COUNTDOWN — 4 ô lớn */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto mb-10">
            {[
              { label: 'NGÀY', value: timeLeft.days },
              { label: 'GIỜ', value: timeLeft.hours },
              { label: 'PHÚT', value: timeLeft.minutes },
              { label: 'GIÂY', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-2xl border-2 border-purple-400/30 p-3 sm:p-5 text-center">
                <div className="font-black text-3xl sm:text-5xl lg:text-6xl text-yellow-300 tabular-nums leading-none mb-1 sm:mb-2">
                  {pad(item.value)}
                </div>
                <div className="text-xs sm:text-sm text-purple-200 font-bold uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto mb-10 px-2">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.max(5, Math.min(100, (timeLeft.total / (5 * 24 * 3600 * 1000)) * 100))}%`
                }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4
                bg-success text-white font-bold rounded-xl shadow-lg hover:bg-green-600 hover:scale-105 
                transition-all duration-300 active:scale-95 text-sm sm:text-base"
            >
              <span>🎯</span>
              Đăng Ký Ngay — Nhận Ưu Đãi 30%
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://zalo.me/0818823720"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4
                bg-white/10 backdrop-blur text-white border-2 border-white/30 font-bold rounded-xl
                hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Zalo Tư Vấn Miễn Phí
            </a>
          </div>

          <button
            onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-purple-200 hover:text-white underline decoration-purple-400 transition"
          >
            Tôi cần đọc thêm thông tin trước — Để sau ↓
          </button>
        </div>
      </div>
    </section>
  );
}
