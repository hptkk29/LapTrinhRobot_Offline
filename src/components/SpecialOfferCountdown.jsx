import useCountdown from '../hooks/useCountdown';
import { formatDeadline } from '../utils/deadlines';
import { promotions } from '../data/promotions';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Flame,
  Gift,
  Sparkles,
  Trophy,
  Users
} from 'lucide-react';

const iconMap = {
  CreditCard,
  Flame,
  Gift,
  Sparkles,
  Trophy,
  Users
};

export default function SpecialOfferCountdown() {
  const { deadline, timeLeft } = useCountdown();
  const pad = (n) => String(n).padStart(2, '0');

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const countdownItems = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds }
  ];

  return (
    <section id="special-offer" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-soft-cream via-white to-soft-purple/50 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-orange/30 to-transparent" />

      <div className="container-site relative">
        <div className="max-w-4xl mx-auto text-center mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white border border-primary-orange/25 shadow-card text-primary-orange">
            <Flame className="w-4 h-4 animate-pulse" />
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider">
              Áp dụng từ 01/05 đến {formatDeadline(deadline)}
            </span>
          </div>

          <h2 className="heading-2 text-text-dark mb-4">
            Ưu đãi khai trương tháng 5
          </h2>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mx-auto">
            Đăng ký sớm để giữ học phí tốt cho Sata1–Sata7. Sata8 là gói riêng, giá cố định.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xl mx-auto mb-7 sm:mb-9">
          {countdownItems.map((item) => (
            <div key={item.label} className="bg-white/90 rounded-2xl border border-primary-purple/10 shadow-card p-3 sm:p-4 text-center">
              <div className="font-black text-2xl sm:text-4xl text-primary-purple tabular-nums leading-none">
                {pad(item.value)}
              </div>
              <div className="text-[10px] sm:text-xs text-text-muted font-bold uppercase tracking-wider mt-1.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-5 sm:mb-6">
          {promotions.primary.map((promo) => {
            const Icon = iconMap[promo.icon] ?? Flame;

            return (
              <article
                key={promo.id}
                className={`rounded-3xl bg-white p-5 sm:p-6 border shadow-card hover:shadow-card-hover transition-all flex flex-col ${
                  promo.featured
                    ? 'border-primary-orange/40 bg-gradient-to-br from-white via-white to-soft-cream'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-soft-cream border border-primary-orange/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-text-dark">{promo.title}</h3>
                    <div className="text-3xl font-black text-primary-orange leading-tight mt-1">
                      {promo.highlight}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {promo.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {promo.details.slice(0, 3).map((detail) => (
                    <li key={detail} className="grid grid-cols-[1.25rem_1fr] gap-2 text-xs text-text-dark leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollTo(promo.target)}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary-orange/30 bg-white px-4 py-2.5 text-sm font-black text-primary-orange transition hover:bg-primary-orange hover:text-white"
                >
                  {promo.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </article>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-7">
          {promotions.secondary.map((promo) => {
            const Icon = iconMap[promo.icon] ?? Gift;

            return (
              <article
                key={promo.id}
                className="rounded-3xl bg-white p-5 border border-gray-100 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-soft-cream border border-primary-orange/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-orange" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-text-dark">{promo.title}</h3>
                    <div className="text-xl font-black text-primary-orange leading-tight mt-1">
                      {promo.highlight}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-3">
                  {promo.description}
                </p>

                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-3">
                  <p className="text-xs text-text-muted leading-relaxed">{promo.condition}</p>
                  <p className="mt-2 text-xs font-semibold text-primary-orange leading-relaxed">{promo.note}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-3xl border border-primary-orange/20 bg-soft-cream p-4 sm:p-5 mb-7 shadow-card">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
            <div className="w-11 h-11 rounded-2xl bg-white border border-primary-orange/20 flex items-center justify-center flex-shrink-0">
              <Clock3 className="w-5 h-5 text-primary-orange" />
            </div>
            <p className="text-sm text-text-dark leading-relaxed">
              <strong>Lưu ý:</strong> Các ưu đãi trên không áp dụng cho Sata8 — Vé Vàng Chung Kết.
              Sata8 là gói cam kết độc lập, giá cố định <strong>2.500.000đ</strong> và có chính sách
              hoàn tiền 100% theo điều kiện cam kết.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button onClick={() => scrollTo('registration-form')} className="btn-primary w-full sm:w-auto">
            Đăng ký nhận ưu đãi
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => scrollTo('roadmap')} className="btn-outline w-full sm:w-auto">
            Tư vấn khóa phù hợp
          </button>
        </div>
      </div>
    </section>
  );
}
