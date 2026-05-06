import { useEffect, useState } from 'react';
import { Bot, CheckCircle2, X } from 'lucide-react';
import { ageCourseOptions } from '../utils/courseSelection';

const POPUP_SHOWN_KEY = 'sata-age-popup-shown';
const SELECTED_COURSE_KEY = 'sata-selected-age-course';
const REOPEN_DELAY_MS = 90000;
const ROADMAP_OPEN_DELAY_MS = 600;

export default function AgeCoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [error, setError] = useState('');
  const [useFallbackMascot, setUseFallbackMascot] = useState(false);
  const [hasStartedPrompting, setHasStartedPrompting] = useState(false);

  const hasSelectedCourse = () => Boolean(sessionStorage.getItem(SELECTED_COURSE_KEY));

  const closePopup = () => {
    sessionStorage.setItem(POPUP_SHOWN_KEY, String(Date.now()));
    setIsOpen(false);
  };

  const handleConfirm = () => {
    const selected = ageCourseOptions[selectedIdx];
    if (!selected) {
      setError('Bố/Mẹ vui lòng chọn độ tuổi của con.');
      return;
    }

    const payload = {
      yearIndex: selected.yearIndex,
      productCode: selected.productCode,
      courseValue: selected.courseValue
    };

    sessionStorage.setItem(SELECTED_COURSE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('sata-course-selected', { detail: payload }));
    setIsOpen(false);
  };

  useEffect(() => {
    if (hasSelectedCourse()) return;

    sessionStorage.removeItem(POPUP_SHOWN_KEY);

    const roadmapEl = document.getElementById('roadmap');
    if (!roadmapEl) return;

    let timer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasSelectedCourse()) return;

        timer = setTimeout(() => {
          if (hasSelectedCourse()) return;
          sessionStorage.setItem(POPUP_SHOWN_KEY, String(Date.now()));
          setHasStartedPrompting(true);
          setIsOpen(true);
        }, ROADMAP_OPEN_DELAY_MS);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(roadmapEl);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStartedPrompting || hasSelectedCourse()) return;

    const interval = setInterval(() => {
      if (hasSelectedCourse()) {
        clearInterval(interval);
        return;
      }

      sessionStorage.setItem(POPUP_SHOWN_KEY, String(Date.now()));
      setIsOpen(true);
    }, REOPEN_DELAY_MS);

    return () => clearInterval(interval);
  }, [hasStartedPrompting]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePopup();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closePopup}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/50 p-5 sm:p-7 animate-slide-up"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-course-popup-title"
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-cream border border-primary-orange/20 overflow-hidden flex items-center justify-center flex-shrink-0">
              {useFallbackMascot ? (
                <Bot className="w-12 h-12 text-primary-purple" />
              ) : (
                <img
                  src="/image/LinhVat.png"
                  alt="Linh vật Sata Robo"
                  className="w-full h-full object-contain p-1"
                  onError={() => setUseFallbackMascot(true)}
                />
              )}
            </div>
            <div>
              <div className="badge-orange mb-2">AI chọn lộ trình</div>
              <h2 id="age-course-popup-title" className="text-xl sm:text-2xl font-black text-text-dark leading-tight">
                Hiện tại con của Bố/Mẹ bao nhiêu tuổi?
              </h2>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                AI sẽ giúp Bố/Mẹ chọn khóa học hợp lý.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closePopup}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition flex-shrink-0"
            aria-label="Đóng popup"
          >
            <X className="w-4 h-4 text-text-dark" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ageCourseOptions.map((option, idx) => {
            const active = selectedIdx === idx;
            return (
              <button
                key={option.courseName}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setError('');
                }}
                className={`text-left rounded-2xl border-2 p-4 transition-all active:scale-95
                  ${active
                    ? 'border-primary-orange bg-soft-cream shadow-orange-glow'
                    : 'border-gray-200 bg-white hover:border-primary-orange/50 hover:bg-soft-cream/40'}`}
              >
                <div className="flex items-center justify-end mb-3 min-h-4">
                  {active && <CheckCircle2 className="w-4 h-4 text-success" />}
                </div>
                <div className="font-black text-text-dark text-base mb-1">{option.label}</div>
                <div className="text-xs font-bold text-primary-purple mb-2">{option.grade}</div>
                <div className="text-xs text-text-muted leading-relaxed">{option.courseName}</div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-3 text-sm text-urgent font-semibold">{error}</p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={closePopup}
            className="btn-outline sm:py-3"
          >
            Để sau
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn-primary sm:py-3"
          >
            AI chọn lộ trình cho con
          </button>
        </div>
      </div>
    </div>
  );
}
