import { commitments } from '../data/commitments';
import {
  BadgeDollarSign,
  CheckCircle2,
  FileCheck2,
  Gift,
  Plane,
  Presentation,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

const iconMap = {
  BadgeDollarSign,
  Gift,
  Plane,
  Presentation,
  ShieldCheck,
  Users
};

const toneClasses = [
  'bg-orange-50 text-primary-orange border-orange-200',
  'bg-purple-50 text-primary-purple border-purple-200',
  'bg-green-50 text-success border-green-200'
];

export default function Commitment() {
  const standardCommitments = commitments.filter((commitment) => commitment.id !== 6);

  return (
    <section id="commitment" className="section-padding bg-soft-cream">
      <div className="container-site">
        <div className="mb-10 text-center sm:mb-14">
          <div className="badge-purple mb-4">
            <ShieldCheck className="h-4 w-4" />
            CAM KẾT MINH BẠCH
          </div>
          <h2 className="heading-2 mb-4 text-text-dark">
            Cam kết của <span className="text-gradient-orange-purple">Sata Robo</span> với phụ huynh
          </h2>
          <p className="mx-auto max-w-2xl text-base text-text-muted sm:text-lg">
            Minh bạch về chất lượng học, kết quả đầu ra và quyền lợi của học viên.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {standardCommitments.map((commitment, index) => {
            const Icon = iconMap[commitment.icon] ?? ShieldCheck;
            const tone = toneClasses[index % toneClasses.length];

            return (
              <article
                key={commitment.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${tone}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-primary-purple/15">
                    {String(commitment.id).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-black leading-tight text-text-dark">
                  {commitment.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {commitment.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mb-10 max-w-4xl rounded-3xl border-2 border-primary-orange/35 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-5 shadow-card sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-primary-orange shadow-sm">
                <Gift className="h-4 w-4" />
                0đ
              </div>
              <h3 className="mb-3 text-2xl font-black leading-tight text-text-dark sm:text-3xl">
                Học thử 90 phút - miễn phí hoàn toàn
              </h3>
              <p className="text-base font-semibold leading-relaxed text-text-dark">
                Bố mẹ không cần quyết định ngay. Hãy để con trải nghiệm robot thật trước.
              </p>
            </div>

            <div>
              <div className="mb-5 grid gap-2 sm:grid-cols-2">
                {[
                  '01 buổi học thử 90 phút',
                  'Nhóm tối đa 12 học sinh',
                  'Không thu phí',
                  'Không ràng buộc',
                  'Phụ huynh quan sát được mức độ hứng thú và sự phù hợp của con'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl bg-white/85 px-3 py-2 text-sm text-text-dark">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="#registration-form"
                className="btn-primary w-full sm:w-auto"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles className="h-5 w-5" />
                Đăng ký học thử miễn phí
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary-purple/20 bg-white p-6 text-center shadow-md sm:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-success">
            <FileCheck2 className="h-4 w-4" />
            Cam kết rõ ràng trước khi phụ huynh ra quyết định
          </div>
          <h3 className="mb-2 text-lg font-black text-text-dark sm:text-xl">
            Học thử trước, nhìn kết quả thật, rồi mới chọn lộ trình phù hợp.
          </h3>
          <p className="mb-5 text-sm text-text-muted sm:text-base">
            Sata Robo ưu tiên sự minh bạch: lớp nhỏ, học thử miễn phí, quyền lợi học viên và các mốc thuyết trình đều được nói rõ ngay từ đầu.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#registration-form"
              className="btn-primary"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Đăng ký học thử miễn phí
            </a>
            <a href="https://zalo.me/0818823720" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Hỏi thêm qua Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
