import useCountdown from '../hooks/useCountdown';
import useScrollPosition from '../hooks/useScrollPosition';
import { Flame } from 'lucide-react';

/**
 * Top bar đếm ngược — fixed top, gradient cam→tím
 * Ẩn khi scroll xuống quá 150px
 */
export default function TopCountdownBar() {
  const { timeLeft } = useCountdown();
  const scrollY = useScrollPosition();
  const isHidden = scrollY > 150;

  // Format số 2 chữ số
  const pad = (n) => String(n).padStart(2, '0');

  // Scroll xuống form đăng ký
  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-orange-purple text-white shadow-lg
        transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container-site py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Trái — text + countdown */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-pulse" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold min-w-0">
              <span className="hidden sm:inline whitespace-nowrap">
                ƯU ĐÃI HỌC PHÍ 30% KẾT THÚC SAU:
              </span>
              <span className="sm:hidden whitespace-nowrap">ƯU ĐÃI 30%:</span>
              <span className="font-black text-yellow-200 whitespace-nowrap">
                {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
              </span>
            </div>
          </div>

          {/* Phải — CTA */}
          <button
            onClick={scrollToForm}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 bg-white text-primary-orange 
              font-bold text-sm rounded-lg hover:scale-105 transition-transform whitespace-nowrap"
          >
            Đăng ký ngay →
          </button>
          <button
            onClick={scrollToForm}
            className="sm:hidden px-3 py-1 bg-white text-primary-orange font-bold text-xs rounded-md whitespace-nowrap"
          >
            Đăng ký →
          </button>
        </div>
      </div>
    </div>
  );
}
