import useCountdown from '../hooks/useCountdown';
import { formatDeadline } from '../utils/deadlines';
import { ArrowRight, Clock3, Flame, Gift, Sparkles, Users } from 'lucide-react';

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

  const offerCards = [
    {
      icon: Flame,
      title: 'HV SataMath',
      value: 'Giảm 25%',
      text: 'Từ 7.920.000đ cho khóa Ươm Mầm Tài Năng'
    },
    {
      icon: Sparkles,
      title: 'HV ngoài hệ thống',
      value: 'Giảm 15%',
      text: 'Từ 8.976.000đ cho khóa Ươm Mầm Tài Năng'
    },
    {
      icon: Clock3,
      title: 'Trả góp 0%',
      value: 'Lộ trình 48 buổi',
      text: 'Ví dụ: Ươm Mầm Tài Năng từ 660.000đ/tháng'
    }
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
      text: 'Cả 2 giảm thêm 10%.'
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
            Giữ học phí tốt nhất cho lộ trình
            <br className="hidden sm:block" />
            <span className="text-gradient-orange-purple"> Robotics 48 buổi của con</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
            Ưu đãi Early Bird áp dụng cho các khóa chuyên sâu Robotics offline từ Lớp 1 đến Lớp 8.
            Phụ huynh đang học tại hệ thống SataMath nhận mức ưu đãi tốt hơn.
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

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {offerCards.map(({ icon: Icon, title, value, text }) => (
            <article key={title} className="bg-white rounded-3xl p-5 sm:p-6 border border-primary-orange/20 shadow-card hover:shadow-card-hover transition-all">
              <div className="w-11 h-11 rounded-2xl bg-soft-cream flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-orange" />
              </div>
              <h3 className="text-lg font-black text-text-dark mb-2">{title}</h3>
              <div className="text-3xl font-black text-primary-orange mb-3">{value}</div>
              <p className="text-sm text-text-muted leading-relaxed">{text}</p>
            </article>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
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
