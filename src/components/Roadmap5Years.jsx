import { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskConical,
  GraduationCap,
  Layers,
  ListOrdered,
  Sparkles,
  Target,
  Trophy
} from 'lucide-react';
import { roadmap5Years } from '../data/roadmap-5-years';
import { examRoadmap } from '../data/exam-roadmap';
import { courseGroups } from '../data/courses-pricing';
import { readStoredCourseSelection, selectCourse } from '../utils/courseSelection';

const fmt = (n) => n ? `${n.toLocaleString('vi-VN')}đ` : '—';

const allCourses = courseGroups.flatMap((group) => group.courses);
const getCourse = (id) => allCourses.find((course) => course.id === id);

const scrollToForm = () => {
  document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function chooseCourse(productCode, extra = {}) {
  selectCourse(productCode, extra);
  setTimeout(scrollToForm, 50);
}

function PriceLine({ label, value, muted = false }) {
  return (
    <div className={`flex items-center justify-between gap-3 text-sm ${muted ? 'text-text-muted line-through' : 'text-text-dark'}`}>
      <span>{label}</span>
      <strong className={muted ? '' : 'text-primary-purple'}>{value}</strong>
    </div>
  );
}

function ExamCourseCard({ item, course, isOpen, onToggle }) {
  const isCombo = course.id === 'Combo';
  const isSata8 = course.id === 'Sata8';

  return (
    <article
      className={`rounded-2xl border-2 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover ${
        isSata8
          ? 'border-success/30 ring-1 ring-success/10'
          : isCombo
            ? 'border-primary-orange/40 ring-1 ring-primary-orange/10'
            : 'border-gray-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
            isSata8 ? 'bg-green-50 text-success' : isCombo ? 'bg-soft-cream text-primary-orange' : 'bg-soft-purple text-primary-purple'
          }`}>
            {course.id}
          </span>
          <h3 className="mt-3 text-xl font-black text-text-dark leading-tight">{course.displayName}</h3>
        </div>
        {course.badge && (
          <span className="rounded-full bg-gradient-orange-purple px-3 py-1 text-[11px] font-bold text-white">
            {course.badge}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <GraduationCap className="mx-auto mb-1 h-4 w-4 text-primary-orange" />
          <div className="text-xs font-bold text-text-dark">{course.grade}</div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <Clock className="mx-auto mb-1 h-4 w-4 text-primary-purple" />
          <div className="text-xs font-bold text-text-dark">{course.sessions} buổi</div>
        </div>
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <FlaskConical className="mx-auto mb-1 h-4 w-4 text-success" />
          <div className="text-xs font-bold text-text-dark line-clamp-2">{course.device}</div>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-text-muted">{item.description}</p>

      <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
        <PriceLine label="Giá niêm yết" value={fmt(course.listPrice)} muted={!isSata8} />
        {isCombo && (
          <>
            <PriceLine label="Giá combo" value={fmt(course.comboPrice)} />
            <PriceLine label="Tiết kiệm" value={fmt(course.savedAmount)} />
          </>
        )}
        {isSata8 && (
          <>
            <PriceLine label="Giá cố định" value={fmt(course.fixedPrice)} />
            <div className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-success">
              Cam kết hoàn tiền 100% · Không áp dụng giảm giá
            </div>
          </>
        )}
        {!isCombo && !isSata8 && (
          <>
            <PriceLine label="HV SataMath" value={fmt(course.earlyBirdSataMath)} />
            <PriceLine label="HV ngoài" value={fmt(course.earlyBirdOutside)} />
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button type="button" onClick={() => chooseCourse(course.id)} className="btn-primary flex-1 px-4 py-3 text-sm">
          Chọn khóa này
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="btn-outline flex-1 px-4 py-3 text-sm"
          aria-expanded={isOpen}
        >
          {isOpen ? 'Thu gọn' : 'Xem nội dung'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 rounded-xl border border-primary-orange/20 bg-soft-cream/70 p-4 animate-fade-in">
          <div className="mb-3 flex items-center gap-2 font-black text-text-dark">
            <ListOrdered className="h-4 w-4 text-primary-orange" />
            Nội dung chi tiết
          </div>
          {item.lessons ? (
            <div className="grid sm:grid-cols-2 gap-2">
              {item.lessons.map((lesson, index) => (
                <div key={lesson} className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-sm text-text-dark">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-orange/10 text-xs font-black text-primary-orange">
                    {index + 1}
                  </span>
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2">
              {item.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-text-dark">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default function Roadmap5Years() {
  const [activeTrack, setActiveTrack] = useState('exam');
  const [openExamId, setOpenExamId] = useState('Sata1');
  const [yearIdx, setYearIdx] = useState(0);
  const [moduleIdx, setModuleIdx] = useState(0);

  const currentYear = roadmap5Years[yearIdx];
  const currentModule = currentYear.modules[moduleIdx];
  const currentCourse = getCourse(currentYear.productCode);

  const examItems = useMemo(
    () => examRoadmap.map((item) => ({ ...item, course: getCourse(item.id) })).filter((item) => item.course),
    []
  );

  useEffect(() => {
    const stored = readStoredCourseSelection();
    if (Number.isInteger(stored?.yearIndex)) {
      setActiveTrack('deep');
      setYearIdx(stored.yearIndex);
      setModuleIdx(0);
    }

    const handleCourseSelected = (event) => {
      const productCode = event.detail?.productCode;
      const yearIndex = event.detail?.yearIndex;

      if (Number.isInteger(yearIndex) && yearIndex >= 0 && yearIndex < roadmap5Years.length) {
        setActiveTrack('deep');
        setYearIdx(yearIndex);
        setModuleIdx(0);
        return;
      }

      if (productCode && examRoadmap.some((course) => course.id === productCode)) {
        setActiveTrack('exam');
        setOpenExamId(productCode);
      }
    };

    window.addEventListener('sata-course-selected', handleCourseSelected);
    return () => window.removeEventListener('sata-course-selected', handleCourseSelected);
  }, []);

  const goPrevModule = () => {
    if (moduleIdx > 0) setModuleIdx(moduleIdx - 1);
    else if (yearIdx > 0) {
      setYearIdx(yearIdx - 1);
      setModuleIdx(roadmap5Years[yearIdx - 1].modules.length - 1);
    }
  };

  const goNextModule = () => {
    if (moduleIdx < currentYear.modules.length - 1) setModuleIdx(moduleIdx + 1);
    else if (yearIdx < roadmap5Years.length - 1) {
      setYearIdx(yearIdx + 1);
      setModuleIdx(0);
    }
  };

  return (
    <section id="roadmap" className="section-padding bg-white">
      <div className="container-site">
        <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
          <div className="badge-purple mb-4">
            <Trophy className="h-4 w-4" />
            LỘ TRÌNH ĐÀO TẠO
          </div>
          <h2 className="heading-2 mb-4 text-text-dark">
            Lộ trình học Robotics tại <span className="text-gradient-orange-purple">Sata Robo</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
            Phụ huynh có thể chọn khóa luyện thi ngắn hạn theo mục tiêu cuộc thi hoặc lộ trình chuyên sâu 48 buổi theo độ tuổi của con.
          </p>
        </div>

        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-3 rounded-2xl bg-gray-50 p-2 sm:grid-cols-2">
          {[
            { id: 'exam', title: 'Khóa luyện thi', subtitle: 'RoboSim, Beta, Combo, Vé Vàng' },
            { id: 'deep', title: 'Khóa chuyên sâu 48 buổi', subtitle: 'Lộ trình 5 năm Sata3–Sata7' }
          ].map((tab) => {
            const active = activeTrack === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTrack(tab.id)}
                className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                  active
                    ? 'border-primary-orange bg-gradient-orange-purple text-white shadow-orange-glow'
                    : 'border-transparent bg-white text-text-dark hover:border-primary-orange/40'
                }`}
              >
                <div className="text-base font-black">{tab.title}</div>
                <div className={`text-xs font-semibold ${active ? 'text-white/85' : 'text-text-muted'}`}>{tab.subtitle}</div>
              </button>
            );
          })}
        </div>

        {activeTrack === 'exam' && (
          <div className="animate-fade-in">
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Sata1–Sata2', 'Luyện thi ngắn hạn'],
                ['Combo', '32 buổi trọn lộ trình'],
                ['Sata8', 'Cam kết hoàn tiền 100%'],
                ['31/05/2026', 'Hạn Early Bird']
              ].map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-orange-100 bg-gradient-cream p-4 text-center">
                  <div className="text-xl font-black text-primary-orange">{value}</div>
                  <div className="text-xs font-semibold text-text-muted">{label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {examItems.map((item) => (
                <ExamCourseCard
                  key={item.id}
                  item={item}
                  course={item.course}
                  isOpen={openExamId === item.id}
                  onToggle={() => setOpenExamId((current) => current === item.id ? '' : item.id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTrack === 'deep' && (
          <div className="animate-fade-in">
            <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { icon: BookOpen, value: '48 buổi', label: 'mỗi khóa chuyên sâu' },
                { icon: Layers, value: '4 học phần', label: '12 buổi/học phần' },
                { icon: Trophy, value: '5 năm', label: 'Sata3 đến Sata7' },
                { icon: Sparkles, value: '0%', label: 'trả góp Sata3–Sata7' }
              ].map(({ icon: Icon, value, label }) => (
                <div key={value} className="rounded-2xl border border-primary-purple/10 bg-soft-purple/60 p-4 text-center">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary-purple" />
                  <div className="text-xl font-black text-primary-purple">{value}</div>
                  <div className="text-xs font-semibold text-text-muted">{label}</div>
                </div>
              ))}
            </div>

            <div className="mb-8 hidden gap-3 overflow-x-auto py-2 sm:flex">
              {roadmap5Years.map((year, idx) => (
                <button
                  key={year.productCode}
                  type="button"
                  onClick={() => {
                    setYearIdx(idx);
                    setModuleIdx(0);
                  }}
                  className={`min-w-[160px] rounded-xl border-2 p-3 text-left transition ${
                    idx === yearIdx
                      ? 'border-primary-orange bg-soft-cream shadow-orange-glow'
                      : 'border-gray-200 bg-white hover:border-primary-orange/50'
                  }`}
                >
                  <div className="mb-1 text-xs font-black uppercase text-primary-orange">Năm {year.year}</div>
                  <div className="text-sm font-black leading-tight text-text-dark">{year.productName}</div>
                  <div className="mt-1 text-xs text-text-muted">{year.grade}</div>
                </button>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-5 gap-2 sm:hidden">
              {roadmap5Years.map((year, idx) => (
                <button
                  key={year.productCode}
                  type="button"
                  onClick={() => {
                    setYearIdx(idx);
                    setModuleIdx(0);
                  }}
                  className={`rounded-xl border p-2 text-center text-xs font-black ${
                    idx === yearIdx ? 'border-primary-orange bg-primary-orange text-white' : 'border-gray-200 bg-white text-text-muted'
                  }`}
                >
                  N{year.year}
                </button>
              ))}
            </div>

            <div className="mb-8 rounded-3xl border-2 border-primary-orange/20 bg-gradient-to-br from-white via-soft-cream to-soft-purple/60 p-5 shadow-card sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="badge-orange">Sata{currentYear.year + 2}</span>
                    <span className="text-sm font-semibold text-text-muted">{currentYear.grade} · {currentYear.ageRange}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-black leading-tight text-text-dark sm:text-3xl">
                    {currentYear.productName}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-text-dark/80 sm:text-base">{currentYear.description}</p>

                  <div className="mb-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-primary-orange/20 bg-white/90 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary-orange">
                        <FlaskConical className="h-4 w-4" />
                        Thiết bị học cụ
                      </div>
                      <p className="text-sm leading-relaxed text-text-dark">{currentYear.device}</p>
                    </div>
                    <div className="rounded-2xl border border-primary-purple/20 bg-white/90 p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary-purple">
                        <Sparkles className="h-4 w-4" />
                        Sứ mệnh khóa học
                      </div>
                      <p className="text-sm leading-relaxed text-text-dark">{currentYear.mission}</p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary-orange" />
                      <span className="text-sm font-black text-text-dark sm:text-base">Kỹ năng con đạt được sau năm học</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentYear.yearSkills.map((skill) => (
                        <span key={skill} className="rounded-full border border-primary-purple/20 bg-white px-3 py-1.5 text-xs font-bold text-primary-purple shadow-sm sm:text-sm">
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => chooseCourse(currentYear.productCode, { yearIndex: yearIdx })}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Chọn khóa này
                  </button>
                </div>

                <aside className="h-fit rounded-3xl border border-primary-purple/20 bg-white/95 p-5 shadow-card lg:col-span-4">
                  <div className="mb-4 text-xs font-black uppercase tracking-wider text-primary-purple">Học phí Early Bird</div>
                  <div className="space-y-2 rounded-2xl bg-gray-50 p-4">
                    <PriceLine label="Giá niêm yết" value={fmt(currentCourse?.listPrice)} muted />
                    <PriceLine label="HV SataMath" value={fmt(currentCourse?.earlyBirdSataMath)} />
                    <PriceLine label="HV ngoài" value={fmt(currentCourse?.earlyBirdOutside)} />
                  </div>
                  <div className="mt-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm">
                    <div className="font-black text-success">Trả góp 0%</div>
                    <div className="mt-1 text-text-dark">
                      HV SataMath: <strong>{fmt(currentCourse?.installmentSataMath)}/tháng</strong>
                    </div>
                    <div className="text-text-dark">
                      HV ngoài: <strong>{fmt(currentCourse?.installmentOutside)}/tháng</strong>
                    </div>
                  </div>
                  {currentYear.note && (
                    <p className="mt-3 rounded-2xl border border-primary-orange/20 bg-soft-cream p-3 text-xs leading-relaxed text-text-muted">
                      {currentYear.note}
                    </p>
                  )}
                </aside>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between px-2">
              {currentYear.modules.map((mod, idx) => (
                <div key={mod.id} className="flex flex-1 items-center last:flex-initial">
                  <button
                    type="button"
                    onClick={() => setModuleIdx(idx)}
                    className={`flex flex-col items-center transition ${idx === moduleIdx ? 'scale-110' : 'opacity-65 hover:opacity-100'}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black sm:h-12 sm:w-12 ${
                      idx === moduleIdx ? 'bg-primary-orange text-white shadow-orange-glow' : idx < moduleIdx ? 'bg-success text-white' : 'bg-gray-200 text-text-muted'
                    }`}>
                      {idx < moduleIdx ? '✓' : idx + 1}
                    </div>
                    <div className="mt-1 text-[11px] font-bold text-text-dark sm:text-xs">HP{idx + 1}</div>
                  </button>
                  {idx < currentYear.modules.length - 1 && (
                    <div className={`mx-1 h-0.5 flex-1 sm:mx-2 ${idx < moduleIdx ? 'bg-success' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="hidden space-y-3 lg:col-span-4 lg:block">
                {currentYear.modules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setModuleIdx(idx)}
                    className={`block w-full rounded-xl border-2 p-4 text-left transition ${
                      idx === moduleIdx ? 'border-primary-orange bg-soft-cream shadow-orange-glow' : 'border-gray-200 bg-white hover:border-primary-orange/50'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="badge-orange text-xs">HP {idx + 1}</span>
                      <span className="text-xs font-semibold text-text-muted">{mod.sessions} buổi</span>
                    </div>
                    <h4 className="mb-2 font-black leading-tight text-text-dark">{mod.name}</h4>
                    <p className="line-clamp-2 text-xs text-text-muted">{mod.description}</p>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-8" key={`${yearIdx}-${moduleIdx}`}>
                <div className="card-base border-2 border-primary-orange/20 p-5 sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="badge-orange">
                      <Target className="h-3 w-3" /> {currentModule.id}
                    </span>
                    <span className="badge-purple">Năm {currentYear.year} · {currentYear.ageRange}</span>
                  </div>
                  <h4 className="mb-3 text-xl font-black text-text-dark sm:text-2xl">{currentModule.name}</h4>
                  <p className="mb-5 text-sm leading-relaxed text-text-muted sm:text-base">{currentModule.description}</p>

                  <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="rounded-xl bg-soft-cream p-3 text-center">
                      <BookOpen className="mx-auto mb-1 h-5 w-5 text-primary-orange" />
                      <div className="text-base font-black text-text-dark sm:text-lg">{currentModule.sessions}</div>
                      <div className="text-[11px] text-text-muted">Buổi học</div>
                    </div>
                    <div className="rounded-xl bg-soft-purple p-3 text-center">
                      <Clock className="mx-auto mb-1 h-5 w-5 text-primary-purple" />
                      <div className="text-base font-black text-text-dark sm:text-lg">{currentModule.hours}</div>
                      <div className="text-[11px] text-text-muted">Giờ học</div>
                    </div>
                    <div className="rounded-xl bg-yellow-50 p-3 text-center">
                      <FlaskConical className="mx-auto mb-1 h-5 w-5 text-yellow-600" />
                      <div className="text-base font-black text-text-dark sm:text-lg">1</div>
                      <div className="text-[11px] text-text-muted">Sản phẩm</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                      <ListOrdered className="h-4 w-4 text-primary-orange" />
                      <span className="text-sm font-bold text-text-dark sm:text-base">Nội dung chi tiết 12 buổi</span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {currentModule.sessionList.map((session, index) => (
                        <div key={`${session.num}-${session.content}`} className={`flex items-center gap-3 px-3 py-2.5 sm:px-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-orange/10 text-xs font-black text-primary-orange">
                            {session.num}
                          </span>
                          <span className="min-w-0 flex-1 text-sm text-text-dark">{session.content}</span>
                          <span className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-bold text-text-muted sm:text-xs">
                            {session.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="mb-1 text-sm font-bold text-yellow-800">Sản phẩm / thành tích cuối học phần</div>
                        <div className="text-sm leading-relaxed text-text-dark">{currentModule.achievement}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2 border-t border-gray-200 pt-5">
                    <button
                      type="button"
                      onClick={goPrevModule}
                      disabled={yearIdx === 0 && moduleIdx === 0}
                      className="inline-flex items-center gap-1.5 rounded-xl border-2 border-gray-200 bg-soft-cream px-4 py-2.5 text-sm font-bold text-text-dark transition hover:border-primary-orange hover:text-primary-orange disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Trước
                    </button>
                    <span className="px-2 text-xs font-semibold text-text-muted">HP {moduleIdx + 1} / 4</span>
                    <button
                      type="button"
                      onClick={goNextModule}
                      disabled={yearIdx === 4 && moduleIdx === 3}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary-orange px-4 py-2.5 text-sm font-bold text-white shadow-orange-glow transition hover:bg-primary-orange-dark disabled:opacity-30"
                    >
                      Tiếp theo
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
