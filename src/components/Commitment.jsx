import { commitments } from '../data/commitments';
import { ShieldCheck, FileCheck2, RotateCcw, FileText } from 'lucide-react';

/**
 * Section 6 — 6 Cam kết minh bạch
 * Tone: HỌC VIỆN trang trọng — đo được, có cơ chế đảm bảo
 */
export default function Commitment() {
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

        {/* Grid 6 cam kết — 2 cols mobile, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {commitments.map((c) => (
            <div
              key={c.id}
              className="card-base p-6 hover:shadow-xl hover:-translate-y-1 transition group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-orange-purple flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
                {c.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg sm:text-xl text-text-dark mb-2 leading-snug">
                <span className="text-primary-orange mr-1">✓</span>
                {c.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-3">
                {c.description}
              </p>

              {/* Measurable badge */}
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
          <div className="badge-green text-sm">
            <RotateCcw className="w-4 h-4" />
            Hoàn tiền 100% nếu không hài lòng
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
