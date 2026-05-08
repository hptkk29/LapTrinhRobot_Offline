import { useEffect, useState } from 'react';
import { Bot, CheckCircle2, GraduationCap, Target, X } from 'lucide-react';
import { ageCourseOptions, getCourseById, selectCourse } from '../utils/courseSelection';

const POPUP_SHOWN_KEY = 'sata-age-popup-shown';
const SELECTED_COURSE_KEY = 'sata-selected-age-course';
const REOPEN_DELAY_MS = 90000;
const ROADMAP_OPEN_DELAY_MS = 600;

const examGoalOptions = [
  {
    label: 'Luyện thi RoboSim / vòng loại',
    courseName: 'Sata1 - Robosim Master',
    productCode: 'Sata1'
  },
  {
    label: 'Luyện robot Beta cấp khu vực',
    courseName: 'Sata2 - Đấu trường Robot',
    productCode: 'Sata2'
  },
  {
    label: 'Học trọn gói luyện thi',
    courseName: 'Combo Sata1 + Sata2',
    productCode: 'Combo'
  },
  {
    label: 'Cam kết Vé Vàng',
    courseName: 'Sata8 - Vé Vàng Chung Kết',
    productCode: 'Sata8'
  }
];

const durationSummary = (productCode) => {
  const course = getCourseById(productCode);
  if (!course) return '';
  return `${course.sessions} buổi - ${course.durationPerSession}/buổi - Tổng ${course.totalDuration}`;
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
      setError(goal === 'exam' ? 'Bố/Mẹ vui lòng chọn mục tiêu luyện thi.' : 'Bố/Mẹ vui lòng chọn lớp của con.');
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      onClick={closePopup}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl animate-slide-up overflow-y-auto rounded-3xl border border-white/50 bg-white p-5 shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-course-popup-title"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-primary-orange/20 bg-gradient-cream sm:h-24 sm:w-24">
              {useFallbackMascot ? (
                <Bot className="h-12 w-12 text-primary-purple" />
              ) : (
                <img
                  src="/image/LinhVat.png"
                  alt="Linh vật Sata Robo"
                  className="h-full w-full object-contain p-1"
                  onError={() => setUseFallbackMascot(true)}
                />
              )}
            </div>
            <div>
              <div className="badge-orange mb-2">Chọn lộ trình</div>
              <h2 id="age-course-popup-title" className="text-xl font-black leading-tight text-text-dark sm:text-2xl">
                Bố/Mẹ muốn con học theo mục tiêu nào?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                Chọn mục tiêu luyện thi hoặc lớp hiện tại để Sata Robo gợi ý khóa phù hợp.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closePopup}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
            aria-label="Đóng popup"
          >
            <X className="h-4 w-4 text-text-dark" />
          </button>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          {[
            { id: 'exam', title: 'Mục tiêu luyện thi', text: 'RoboSim, robot Beta, Combo hoặc Vé Vàng', Icon: Target },
            { id: 'deep', title: 'Học chuyên sâu dài hạn', text: 'Chọn theo lớp cho Sata3-Sata7', Icon: GraduationCap }
          ].map((item) => {
            const active = goal === item.id;
            const Icon = item.Icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setGoal(item.id);
                  setSelectedIdx(null);
                  setError('');
                }}
                className={`group rounded-3xl border-2 p-4 text-left transition-all sm:p-5 ${
                  active
                    ? 'border-primary-purple bg-gradient-to-br from-primary-purple to-primary-orange text-white shadow-purple-glow'
                    : 'border-gray-200 bg-gray-50 text-text-dark hover:border-primary-purple/50 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl ${
                    active ? 'bg-white/20 text-white' : 'bg-white text-primary-purple shadow-sm group-hover:text-primary-orange'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className={`block font-black ${active ? 'text-white' : 'text-text-dark'}`}>{item.title}</span>
                    <span className={`mt-1 block text-xs ${active ? 'text-white/85' : 'text-text-muted'}`}>{item.text}</span>
                  </span>
                </div>
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
                className={`rounded-2xl border-2 p-4 text-left transition-all active:scale-95 ${
                  active
                    ? 'border-primary-orange bg-soft-cream shadow-orange-glow'
                    : 'border-gray-200 bg-white hover:border-primary-orange/50 hover:bg-soft-cream/40'
                }`}
              >
                <div className="mb-3 flex min-h-4 items-center justify-end">
                  {active && <CheckCircle2 className="h-4 w-4 text-success" />}
                </div>
                <div className="mb-1 text-base font-black text-text-dark">{option.label}</div>
                {option.grade && <div className="mb-2 text-sm font-black text-primary-purple">{option.grade}</div>}
                <div className="text-xs leading-relaxed text-text-muted">{option.courseName}</div>
                {goal === 'exam' && (
                  <div className="mt-2 text-[11px] font-bold text-primary-orange">
                    {durationSummary(option.productCode)}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p className="mt-3 text-sm font-semibold text-urgent">{error}</p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={closePopup} className="btn-outline sm:py-3">
            Để sau
          </button>
          <button type="button" onClick={handleConfirm} className="btn-primary sm:py-3">
            Chọn khóa phù hợp cho con
          </button>
        </div>
      </div>
    </div>
  );
}
