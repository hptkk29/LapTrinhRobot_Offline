import { Flame } from 'lucide-react';
import useCountdown from '../hooks/useCountdown';
import useScrollPosition from '../hooks/useScrollPosition';

export default function TopCountdownBar() {
  const { timeLeft } = useCountdown();
  const scrollY = useScrollPosition();
  const isHidden = scrollY > 150;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      className={`overflow-hidden transition-[max-height] duration-300
        ${isHidden ? 'max-h-0' : 'max-h-16'}`}
    >
      <div className="bg-gradient-orange-purple text-white">
        <div className="container-site py-2 sm:py-2.5">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-pulse" />
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold min-w-0 text-center">
                <span className="hidden sm:inline whitespace-nowrap">
                  EARLY BIRD KHÓA OFFLINE KẾT THÚC SAU:
                </span>
                <span className="sm:hidden whitespace-nowrap">EARLY BIRD:</span>
                <span className="font-black text-yellow-200 whitespace-nowrap">
                  {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
