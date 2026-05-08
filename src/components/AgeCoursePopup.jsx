import { useEffect, useState } from 'react';
import { Bot, CheckCircle2, X } from 'lucide-react';
import { ageCourseOptions, getCourseById, selectCourse } from '../utils/courseSelection';

const POPUP_SHOWN_KEY = 'sata-age-popup-shown';
const SELECTED_COURSE_KEY = 'sata-selected-age-course';
const REOPEN_DELAY_MS = 90000;
const ROADMAP_OPEN_DELAY_MS = 600;

const examGoalOptions = [
  {
    label: 'Luyện thi RoboSim / vòng loại',
    courseName: 'Sata1 — Robosim Master',
    productCode: 'Sata1'
  },
  {
    label: 'Luyện robot Beta cấp khu vực',
    courseName: 'Sata2 — Đấu trường Robot',
    productCode: 'Sata2'
  },
  {
    label: 'Học trọn gói luyện thi',
    courseName: 'Combo Sata1 + Sata2',
    productCode: 'Combo'
  },
  {
    label: 'Chuyên binh cam kết vượt vòng loại',
    courseName: 'Sata8 — Vé Vàng Chung Kết',
    productCode: 'Sata8'
  }
];

const durationSummary = (productCode) => {
  const course = getCourseById(productCode);
  if (!course) return '';
  return `${course.sessions} buổi · ${course.durationPerSession}/buổi · Tổng ${course.totalDuration}`;
};

export default function AgeCoursePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [goal, setGoal] = useState('exam');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [error, setError] = useState('');
  const [useFallbackMascot, setUseFallbackMascot] = useState(false);
  const [hasStartedPrompting, setHasStartedPrompting] = useState(false);

  const hasSelectedCourse = () => Boolean(sessionStorage.getItem(SELECTED_COURSE_KEY));

  const closePopup = () => {
    sessionStorage.setItem(POPUP_SHOWN_KEY, String(Date.now()));
    setIsOpen(false);
  };

  const currentOptions = goal === 'exam' ? examGoalOptions : ageCourseOptions;

  const handleConfirm = () => {
    const selected = currentOptions[selectedIdx];
    if (!selected) {
      setError(goal === 'exam' ? 'Bố/Mẹ vui lòng chọn mục tiêu luyện thi.' : 'Bố/Mẹ vui lòng chọn độ tuổi/lớp của con.');
      return;
    }

    selectCourse(selected.productCode, {
      yearIndex: selected.yearIndex,
      goal
    });
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
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/50 p-5 sm:p-7 animate-slide-up"
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
                Bố/Mẹ muốn con học theo mục tiêu nào?
              </h2>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                Chọn mục tiêu luyện thi hoặc học chuyên sâu dài hạn để Sata Robo gợi ý khóa phù hợp.
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

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            { id: 'exam', title: 'Mục tiêu luyện thi', text: 'RoboSim, robot Beta, Combo hoặc Vé Vàng' },
            { id: 'deep', title: 'Học chuyên sâu dài hạn', text: 'Chọn theo lớp/tuổi cho Sata3–Sata7' }
          ].map((item) => {
            const active = goal === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setGoal(item.id);
                  setSelectedIdx(null);
                  setError('');
                }}
                className={`text-left rounded-2xl border-2 p-4 transition-all ${
                  active ? 'border-primary-orange bg-soft-cream shadow-orange-glow' : 'border-gray-200 bg-white hover:border-primary-orange/50'
                }`}
              >
                <div className="font-black text-text-dark">{item.title}</div>
                <div className="text-xs text-text-muted mt-1">{item.text}</div>
              </button>
            );
          })}
        </div>

        <div className={`grid gap-3 ${goal === 'exam' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-5'}`}>
          {currentOptions.map((option, idx) => {
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
                {option.grade && <div className="text-xs font-bold text-primary-purple mb-2">{option.grade}</div>}
                <div className="text-xs text-text-muted leading-relaxed">{option.courseName}</div>
                <div className="mt-2 text-[11px] font-bold text-primary-orange">
                  {option.durationSummary ?? durationSummary(option.productCode)}
                </div>
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
            Chọn khóa phù hợp cho con
          </button>
        </div>
      </div>
    </div>
  );
}
