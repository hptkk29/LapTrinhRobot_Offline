/* Mobile carousel — swipe left/right, hold to pause, dot indicators */
import { useState, useEffect, useRef, useCallback } from 'react';

const SWIPE_THRESHOLD = 40; // px tối thiểu để tính là vuốt

export default function MobileCarousel({ children, autoInterval = 3500, accentColor = '#F97316', isPaused = false }) {
  const slides = Array.isArray(children) ? children : [children];
  const n = slides.length;
  const [cur, setCur] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const timerRef    = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  /* ── Auto-advance — dừng khi isPaused ── */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (isPaused) return;
    timerRef.current = setInterval(() => setCur(c => (c + 1) % n), autoInterval);
  }, [n, autoInterval, isPaused]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(timerRef.current);
      return;
    }
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer, isPaused]);

  const goTo = useCallback((idx) => {
    setCur(((idx % n) + n) % n);
    setDragOffset(0);
    startTimer();
  }, [n, startTimer]);

  /* ── Touch handlers ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
    clearInterval(timerRef.current); // giữ → dừng auto
  };

  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Chỉ kéo ngang khi dx > dy (không can thiệp scroll dọc)
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      setDragOffset(dx);
    }
  };

  const onTouchEnd = (e) => {
    setIsDragging(false);
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      goTo(dx < 0 ? cur + 1 : cur - 1); // vuốt trái → next, phải → prev
    } else {
      setDragOffset(0);
      startTimer(); // thả tay → tiếp tục auto
    }
  };

  const trackStyle = {
    display: 'flex',
    alignItems: 'stretch',
    willChange: 'transform',
    transition: isDragging ? 'none' : 'transform 0.38s cubic-bezier(0.4,0,0.2,1)',
    transform: `translateX(calc(-${cur * 100}% + ${dragOffset}px))`,
  };

  return (
    <div className="mc-wrap">

      {/* Slide track — full width, touch events */}
      <div
        className="mc-track-outer"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="mc-track-inner" style={trackStyle}>
          {slides.map((slide, i) => (
            <div key={i} className="mc-slide">{slide}</div>
          ))}
        </div>
      </div>

      {/* Dot indicators — thanh gạch ngang nổi bật */}
      <div className="mc-dots" role="tablist" aria-label="Chọn slide">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === cur}
            aria-label={`Slide ${i + 1}`}
            className={`mc-dot${i === cur ? ' mc-dot--active' : ''}`}
            onClick={() => goTo(i)}
            style={{ '--accent': accentColor }}
          />
        ))}
      </div>

      <style>{`
        .mc-wrap { width: 100%; user-select: none; }

        /* Track overflow */
        .mc-track-outer {
          overflow: hidden !important;
          width: 100% !important;
          cursor: grab;
          touch-action: pan-y; /* cho phép scroll dọc, bắt ngang qua JS */
        }
        .mc-track-outer:active { cursor: grabbing; }

        /* Flex row slides */
        .mc-track-inner {
          display: flex !important;
          align-items: stretch !important;
        }

        /* Mỗi slide chiếm full width và stretch đều nhau */
        .mc-slide {
          min-width: 100% !important;
          width: 100% !important;
          flex-shrink: 0 !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
        }
        .mc-slide > * {
          flex: 1 !important;
          min-height: 0 !important;
        }

        /* Dot container — nổi bật */
        .mc-dots {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 6px !important;
          margin-top: 16px !important;
          margin-bottom: 12px !important;
          padding: 8px 16px !important;
          background: rgba(0,0,0,0.04) !important;
          border-radius: 100px !important;
          width: fit-content !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        /* Thanh gạch ngang dot */
        .mc-dot {
          all: unset !important;
          box-sizing: border-box !important;
          display: block !important;
          height: 5px !important;
          width: 20px !important;
          border-radius: 3px !important;
          background: rgba(0,0,0,0.18) !important;
          cursor: pointer !important;
          transition: width 0.3s ease, background 0.3s ease, opacity 0.3s ease !important;
          opacity: 0.5 !important;
        }

        /* Dot đang active — rộng hơn, màu accent, đậm */
        .mc-dot--active {
          width: 36px !important;
          background: var(--accent, #F97316) !important;
          opacity: 1 !important;
          box-shadow: 0 1px 6px rgba(0,0,0,0.20) !important;
        }
      `}</style>
    </div>
  );
}
