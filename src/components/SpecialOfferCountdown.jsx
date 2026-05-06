import useCountdown from '../hooks/useCountdown';
import { formatDeadline } from '../utils/deadlines';
import { ArrowRight, CheckCircle2, Clock3, Flame, Gift, ShieldCheck, Sparkles, Users } from 'lucide-react';

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

  const perks = [
    {
      icon: Gift,
      title: 'Referral',
      text: 'Người giới thiệu nhận 300.000đ, người được giới thiệu giảm 300.000đ.'
    },
    {
      icon: Users,
      title: 'Gói Anh/Chị/Em',
      text: 'Con thứ 2 giảm thêm 15%.'
    },
    {
      icon: Sparkles,
      title: 'Gói đội thi 2 HV',
      text: 'Cả 2 giảm thêm 10%, không cộng dồn với Referral.'
    },
    {
      icon: Clock3,
      title: 'Trả góp 0%',
      text: 'Áp dụng cho Sata3–Sata7, các khóa chuyên sâu 48 buổi.'
    }
  ];

  return (
    <section id="special-offer" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-soft-cream to-soft-purple/70 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-orange/30 to-transparent" />

      <div className="container-site relative">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white border border-primary-orange/25 shadow-card text-primary-orange">
            <Flame className="w-4 h-4 animate-pulse" />
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider">
              Ưu đãi khai trương — đến hết {formatDeadline(deadline)}
            </span>
          </div>

          <h2 className="heading-2 text-text-dark mb-4">
            Chọn đúng khóa học Robotics cho con
            <br className="hidden sm:block" />
            <span className="text-gradient-orange-purple"> và giữ mức học phí tốt nhất tháng này</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
            Early Bird áp dụng cho Sata1–Sata7. Riêng Sata8 là gói cam kết độc lập,
            giá cố định <strong className="text-text-dark">2.500.000đ</strong> và hoàn 100% nếu học viên đủ điều kiện nhưng không vượt vòng loại.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto mb-8 sm:mb-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
          <article className="bg-white rounded-3xl p-5 sm:p-6 border border-primary-orange/20 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-11 h-11 rounded-2xl bg-soft-cream flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-primary-orange" />
            </div>
            <h3 className="text-xl font-black text-text-dark mb-3">Early Bird Sata1–Sata7</h3>
            <ul className="space-y-2.5 text-sm text-text-muted mb-5">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />HV SataMath: giảm 25%</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />HV ngoài: giảm 15%</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />Áp dụng đến hết 31/05/2026</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />Không gia hạn sau thời gian ưu đãi</li>
            </ul>
            <div className="rounded-2xl bg-gradient-cream border border-primary-orange/20 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-primary-orange mb-1">Điểm nổi bật</div>
              <p className="font-black text-text-dark">Từ 7.920.000đ cho khóa chuyên sâu 48 buổi Sata3</p>
            </div>
          </article>

          <article className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-primary-orange shadow-card-hover relative overflow-hidden">
            <div className="absolute right-4 top-4 text-[10px] font-black text-white bg-primary-orange px-3 py-1 rounded-full">
              GÓI ĐỀ XUẤT
            </div>
            <div className="w-11 h-11 rounded-2xl bg-soft-purple flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary-purple" />
            </div>
            <h3 className="text-xl font-black text-text-dark mb-3">Combo Sata1 + Sata2</h3>
            <div className="space-y-2.5 text-sm text-text-muted">
              <div className="flex justify-between gap-3"><span>32 buổi luyện thi</span><strong className="text-text-dark">Robosim + Beta</strong></div>
              <div className="flex justify-between gap-3"><span>Giá niêm yết</span><span className="line-through">5.440.000đ</span></div>
              <div className="flex justify-between gap-3 items-baseline"><span>Giá combo</span><strong className="text-2xl text-primary-orange">3.808.000đ</strong></div>
              <div className="flex justify-between gap-3"><span>Tiết kiệm</span><strong className="text-success">1.632.000đ</strong></div>
              <div className="flex justify-between gap-3"><span>Giá/buổi Insider</span><strong className="text-primary-purple">119.000đ/buổi</strong></div>
            </div>
          </article>

          <article className="bg-white rounded-3xl p-5 sm:p-6 border border-primary-purple/20 shadow-card hover:shadow-card-hover transition-all md:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary-purple bg-soft-purple px-3 py-1 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              CAM KẾT HOÀN TIỀN 100%
            </div>
            <h3 className="text-xl font-black text-text-dark mb-3">Sata8 — Vé Vàng Chung Kết</h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary-purple mt-0.5 flex-shrink-0" />5 buổi chuyên binh</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary-purple mt-0.5 flex-shrink-0" />Giá cố định: 2.500.000đ</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary-purple mt-0.5 flex-shrink-0" />Không áp dụng giảm giá</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-primary-purple mt-0.5 flex-shrink-0" />Hoàn 100% nếu đủ điều kiện nhưng không vượt vòng loại</li>
            </ul>
          </article>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white/85 rounded-2xl p-4 border border-gray-100 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-primary-orange" />
                <h4 className="font-black text-sm text-text-dark">{title}</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-text-muted mb-7">
          Ưu đãi phụ không áp dụng cho Sata8. Gói đội thi không cộng dồn với Referral.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button onClick={() => scrollTo('registration-form')} className="btn-primary">
            Đăng ký giữ ưu đãi
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => scrollTo('roadmap')} className="btn-outline">
            Xem lộ trình phù hợp
          </button>
        </div>
      </div>
    </section>
  );
}
