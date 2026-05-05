import { useState } from 'react';
import { roadmap5Years } from '../data/roadmap-5-years';
import { Target, BookOpen, Clock, Trophy, ChevronLeft, ChevronRight, CheckCircle2, FlaskConical, ListOrdered, Award, Sparkles } from 'lucide-react';

/**
 * Section 3 — Lộ trình 5 năm với tab chuyển năm + tab chuyển học phần
 */
export default function Roadmap5Years() {
  const [yearIdx, setYearIdx] = useState(0);
  const [moduleIdx, setModuleIdx] = useState(0);

  const currentYear = roadmap5Years[yearIdx];
  const currentModule = currentYear.modules[moduleIdx];

  // Đổi năm — reset học phần về 0
  const handleYearChange = (idx) => {
    setYearIdx(idx);
    setModuleIdx(0);
  };

  // Điều hướng học phần
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

  // Map type buổi → icon + màu
  const typeStyle = {
    'Lý thuyết': 'bg-blue-50 text-blue-700 border-blue-200',
    'Thực hành': 'bg-orange-50 text-primary-orange border-orange-200',
    'Dự án': 'bg-purple-50 text-primary-purple border-purple-200',
    'Thi đấu': 'bg-yellow-50 text-yellow-700 border-yellow-200'
  };

  return (
    <section id="roadmap" className="section-padding bg-white">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="badge-purple mb-4">
            <Trophy className="w-4 h-4" />
            LỘ TRÌNH ĐÀO TẠO
          </div>
          <h2 className="heading-2 mb-4">
            <span className="text-gradient-orange-purple">LỘ TRÌNH ROBOTICS AI 5 NĂM</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-3xl mx-auto">
            Dành cho con từ <strong>6 đến 13 tuổi</strong> — 4 học phần mỗi năm — 12 buổi mỗi học phần.<br />
            Chương trình chuẩn quốc tế, mỗi học phần là 1 bước tiến vững chắc cho con.
          </p>
        </div>

        {/* 4 stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14 max-w-5xl mx-auto">
          {[
            { icon: '🎯', label: 'Lộ trình dài hạn', value: '5 NĂM' },
            { icon: '📚', label: '4 học phần/năm', value: '20 HP' },
            { icon: '⏰', label: '12 buổi/học phần', value: '240 BUỔI' },
            { icon: '🏆', label: 'Chuẩn quốc tế', value: 'WRC' }
          ].map((stat, idx) => (
            <div key={idx} className="card-base p-4 text-center bg-gradient-cream border border-orange-100">
              <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
              <div className="font-extrabold text-base sm:text-xl text-primary-purple mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* TAB NĂM */}
        <div className="mb-8 -mx-4 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto pb-3 px-4 sm:px-0 sm:justify-center scrollbar-hide">
            {roadmap5Years.map((y, idx) => (
              <button
                key={idx}
                onClick={() => handleYearChange(idx)}
                className={`flex-shrink-0 min-w-[140px] sm:min-w-[160px] px-3 py-3 rounded-xl border-2 transition-all
                  ${idx === yearIdx
                    ? 'border-primary-orange bg-soft-cream shadow-orange-glow scale-105'
                    : 'border-gray-200 bg-white hover:border-primary-orange/50 hover:bg-soft-cream/50'}`}
              >
                <div className={`text-xs font-bold uppercase tracking-wider mb-1
                  ${idx === yearIdx ? 'text-primary-orange' : 'text-text-muted'}`}>
                  NĂM {y.year}
                </div>
                <div className={`font-extrabold text-sm sm:text-base leading-tight mb-1
                  ${idx === yearIdx ? 'text-text-dark' : 'text-text-dark/70'}`}>
                  {y.name}
                </div>
                <div className="text-[11px] sm:text-xs text-text-muted">
                  {y.grade} · {y.ageRange}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* NĂM ĐANG CHỌN — Header */}
        <div className="bg-gradient-cream rounded-2xl p-5 sm:p-7 mb-8 border-2 border-orange-100 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3">
            <div>
              <div className="badge-orange mb-2">
                NĂM {currentYear.year} · {currentYear.ageRange}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-text-dark">
                {currentYear.name}
              </h3>
            </div>
            <div className="text-sm text-text-muted">
              {currentYear.grade}
            </div>
          </div>
          <p className="text-sm sm:text-base text-text-dark/80 leading-relaxed mb-4">
            {currentYear.description}
          </p>
          {currentYear.note && (
            <div className="text-xs sm:text-sm bg-white/70 px-3 py-2 rounded-lg inline-block border border-primary-purple/20 text-primary-purple font-semibold">
              💡 {currentYear.note}
            </div>
          )}

          {/* 3 stat */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5">
            <div className="bg-white p-3 rounded-xl text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-primary-orange">{currentYear.totalSessions}</div>
              <div className="text-[11px] sm:text-xs text-text-muted">buổi tổng</div>
            </div>
            <div className="bg-white p-3 rounded-xl text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-primary-purple">{currentYear.totalHours}</div>
              <div className="text-[11px] sm:text-xs text-text-muted">giờ học</div>
            </div>
            <div className="bg-white p-3 rounded-xl text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-success">4</div>
              <div className="text-[11px] sm:text-xs text-text-muted">học phần</div>
            </div>
          </div>
        </div>

        {/* TIMELINE 4 HỌC PHẦN */}
        <div className="mb-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto px-2">
            {currentYear.modules.map((mod, idx) => (
              <div key={mod.id} className="flex items-center flex-1 last:flex-initial">
                <button
                  onClick={() => setModuleIdx(idx)}
                  className={`flex flex-col items-center transition-all
                    ${idx === moduleIdx ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-extrabold text-sm sm:text-base
                    ${idx === moduleIdx
                      ? 'bg-primary-orange text-white shadow-orange-glow'
                      : idx < moduleIdx
                        ? 'bg-success text-white'
                        : 'bg-gray-200 text-text-muted'}`}>
                    {idx < moduleIdx ? '✓' : idx + 1}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold mt-1 text-text-dark">HP{idx + 1}</div>
                </button>
                {idx < currentYear.modules.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 sm:mx-2 ${idx < moduleIdx ? 'bg-success' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* GRID — danh sách HP bên trái + chi tiết bên phải */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* DANH SÁCH 4 HP — Desktop */}
          <div className="hidden lg:block lg:col-span-4 space-y-3">
            {currentYear.modules.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => setModuleIdx(idx)}
                className={`block w-full text-left rounded-xl p-4 border-2 transition-all
                  ${idx === moduleIdx
                    ? 'bg-soft-cream border-primary-orange shadow-orange-glow'
                    : 'bg-white border-gray-200 hover:border-primary-orange/50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`badge-orange text-xs ${idx === moduleIdx ? '' : 'opacity-70'}`}>
                    HP {idx + 1}
                  </span>
                  <span className="text-xs text-text-muted font-semibold">
                    {mod.sessions} buổi
                  </span>
                </div>
                <h4 className="font-extrabold text-text-dark leading-tight mb-2">{mod.name}</h4>
                <p className="text-xs text-text-muted line-clamp-2">{mod.description}</p>
              </button>
            ))}
          </div>

          {/* CHI TIẾT HP ĐANG CHỌN */}
          <div className="lg:col-span-8 animate-fade-in" key={`${yearIdx}-${moduleIdx}`}>
            <div className="card-base p-5 sm:p-7 border-2 border-primary-orange/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-orange">
                  <Target className="w-3 h-3" /> {currentModule.id}
                </span>
                <span className="badge-purple">
                  NĂM {currentYear.year} · {currentYear.ageRange}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-text-dark mb-3">
                {currentModule.name}
              </h4>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-5">
                {currentModule.description}
              </p>

              {/* 3 stat */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                <div className="bg-soft-cream p-3 rounded-xl text-center">
                  <BookOpen className="w-5 h-5 mx-auto text-primary-orange mb-1" />
                  <div className="font-extrabold text-base sm:text-lg text-text-dark">{currentModule.sessions}</div>
                  <div className="text-[11px] text-text-muted">Buổi học</div>
                </div>
                <div className="bg-soft-purple p-3 rounded-xl text-center">
                  <Clock className="w-5 h-5 mx-auto text-primary-purple mb-1" />
                  <div className="font-extrabold text-base sm:text-lg text-text-dark">{currentModule.hours}</div>
                  <div className="text-[11px] text-text-muted">Giờ học</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-xl text-center">
                  <FlaskConical className="w-5 h-5 mx-auto text-yellow-600 mb-1" />
                  <div className="font-extrabold text-base sm:text-lg text-text-dark">{currentModule.skills.length}</div>
                  <div className="text-[11px] text-text-muted">Kỹ năng</div>
                </div>
              </div>

              {/* SKILLS */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary-orange" />
                  <span className="font-bold text-sm sm:text-base text-text-dark">Kỹ năng đạt được</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentModule.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-soft-purple text-primary-purple text-xs sm:text-sm font-semibold rounded-full border border-primary-purple/20">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* SESSION LIST — 12 buổi */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <ListOrdered className="w-4 h-4 text-primary-orange" />
                  <span className="font-bold text-sm sm:text-base text-text-dark">Nội dung chi tiết 12 buổi</span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {currentModule.sessionList.map((s, i) => (
                    <div
                      key={s.num}
                      className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-orange/10 text-primary-orange flex items-center justify-center text-xs font-extrabold">
                        {s.num}
                      </span>
                      <span className="flex-1 text-sm text-text-dark min-w-0">{s.content}</span>
                      <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border ${typeStyle[s.type] || ''}`}>
                        {s.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACHIEVEMENT */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-yellow-800 mb-1">🏆 Sản phẩm / Thành tích cuối học phần</div>
                    <div className="text-sm text-text-dark leading-relaxed">{currentModule.achievement}</div>
                  </div>
                </div>
              </div>

              {/* NAV — Prev/Next */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-200">
                <button
                  onClick={goPrevModule}
                  disabled={yearIdx === 0 && moduleIdx === 0}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-bold text-text-dark
                    disabled:opacity-30 hover:text-primary-orange transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Học phần trước
                </button>
                <span className="text-xs text-text-muted">
                  {currentModule.id} / 4
                </span>
                <button
                  onClick={goNextModule}
                  disabled={yearIdx === 4 && moduleIdx === 3}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-bold text-primary-orange
                    disabled:opacity-30 hover:text-primary-orange-dark transition"
                >
                  Học phần tiếp theo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE — danh sách HP dạng tabs */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {currentYear.modules.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => setModuleIdx(idx)}
                  className={`p-3 rounded-xl border-2 text-left transition-all
                    ${idx === moduleIdx
                      ? 'bg-soft-cream border-primary-orange'
                      : 'bg-white border-gray-200'}`}
                >
                  <div className="text-xs font-bold text-primary-orange mb-1">HP {idx + 1}</div>
                  <div className="text-xs font-bold text-text-dark leading-tight">{mod.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
