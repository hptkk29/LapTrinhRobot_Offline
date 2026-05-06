import { useState, useEffect, useRef } from 'react';
import { commitments } from '../data/commitments';
import { ShieldCheck, FileCheck2, RotateCcw, FileText } from 'lucide-react';

export default function Commitment() {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % commitments.length);
    }, 3000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setActiveIdx((i) => (i + 1) % commitments.length);
      else setActiveIdx((i) => (i - 1 + commitments.length) % commitments.length);
      startAuto();
    }
    touchStartX.current = null;
  };

  return (
    <section id="commitment" className="section-padding bg-soft-cream">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="badge-purple mb-4">
            <ShieldCheck className="w-4 h-4" />
            CAM KẾT MINH BẠCH — ĐO ĐƯỢC — BẢO ĐẢM
          </div>
          <h2 className="heading-2 mb-4">
            6 Cam Kết Minh Bạch{' '}
            <span className="text-gradient-orange-purple">Của Sata Robo</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            Mình hiểu — gửi gắm con đi học là quyết định lớn của bố mẹ.
            Vì vậy, Học viện Sata Robo cam kết minh bạch <strong>6 điều</strong> — bằng văn bản,
            có giá trị suốt khoá học.
          </p>
        </div>

        {/* Mobile: auto-slide carousel */}
        <div
          className="md:hidden mb-8 relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIdx * 100}%)` }}
          >
            {commitments.map((c) => (
              <div key={c.id} className="min-w-full px-1">
                <div className="card-base p-6 hover:shadow-xl transition group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-orange-purple flex items-center justify-center text-3xl mb-4">
                    {c.icon}
                  </div>
                  <h3 className="font-bold text-lg text-text-dark mb-2 leading-snug">
                    <span className="text-primary-orange mr-1">✓</span>
                    {c.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">
                    {c.description}
                  </p>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-success font-semibold flex items-start gap-1.5">
                      <FileCheck2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{c.measurable}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {commitments.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveIdx(idx); startAuto(); }}
                className={`h-2 rounded-full transition-all duration-300
                  ${idx === activeIdx ? 'w-6 bg-primary-orange' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop/Tablet: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {commitments.map((c) => (
            <div
              key={c.id}
              className="card-base p-6 hover:shadow-xl hover:-translate-y-1 transition group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-orange-purple flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
                {c.icon}
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-text-dark mb-2 leading-snug">
                <span className="text-primary-orange mr-1">✓</span>
                {c.title}
              </h3>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-3">
                {c.description}
              </p>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-success font-semibold flex items-start gap-1.5">
                  <FileCheck2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{c.measurable}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 trust badges row */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="badge-green text-sm">
            <FileText className="w-4 h-4" />
            Cam kết bằng văn bản
          </div>
          <div className="badge-green text-sm">
            <FileCheck2 className="w-4 h-4" />
            Đo được sau mỗi 12 buổi
          </div>
        </div>

        {/* Soft CTA */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 text-center border-2 border-primary-purple/20 shadow-md">
          <h3 className="font-bold text-lg sm:text-xl text-text-dark mb-2">
            🎯 6 Cam Kết = 6 Lý Do Bố Mẹ Tin Tưởng Sata Robo
          </h3>
          <p className="text-sm sm:text-base text-text-muted mb-5">
            Không cần đặt cọc, không cần ký hợp đồng ngay. Đăng ký buổi Test miễn phí
            trải nghiệm trực tiếp trước khi quyết định.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#registration-form"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              🚀 Đăng Ký Test Miễn Phí →
            </a>
            <a
              href="https://zalo.me/0818823720"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              💬 Hỏi Thêm Qua Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
