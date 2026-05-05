import { gifts, totalGiftValue } from '../data/gifts';
import { Gift, Flame } from 'lucide-react';

/**
 * Section 7 — 4 Quà tặng khi đăng ký
 * Tone: BẠN THÂN — minh bạch, chân thực, không "câu kéo"
 */
export default function Gifts() {
  return (
    <section id="gifts" className="section-padding bg-white">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="badge-orange mb-4">
            <Gift className="w-4 h-4" />
            QUÀ TẶNG KHI BỐ MẸ ĐĂNG KÝ
          </div>
          <h2 className="heading-2 mb-4">
            Bộ Quà Tặng <span className="text-gradient-orange-purple">Giá Trị</span> Kèm Theo
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            Mình tặng kèm <strong>4 món quà giá trị</strong> — không phải để "câu" bố mẹ,
            mà để con có khởi đầu thuận lợi nhất ngay từ ngày đầu.
          </p>
        </div>

        {/* Grid 4 cards — 2x2 mobile, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
          {gifts.map((gift, idx) => (
            <div
              key={gift.id}
              className="relative card-base p-6 text-center hover:shadow-xl hover:-translate-y-2 transition group overflow-hidden"
            >
              {/* Decorative top stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-orange-purple"></div>

              {/* Number badge */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-soft-yellow text-primary-orange text-xs font-black flex items-center justify-center">
                {idx + 1}
              </div>

              {/* Icon */}
              <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition">
                {gift.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-base sm:text-lg text-text-dark mb-2 leading-tight min-h-[3rem]">
                {gift.title}
              </h3>

              {/* Value */}
              <div className="inline-block px-3 py-1 bg-soft-yellow rounded-full mb-3">
                <span className="text-sm font-black text-primary-orange">
                  Trị giá {gift.value}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {gift.description}
              </p>
            </div>
          ))}
        </div>

        {/* Total value box */}
        <div className="max-w-3xl mx-auto bg-gradient-orange-purple rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl mb-8 relative overflow-hidden">
          {/* Decorative emoji */}
          <div className="absolute top-2 right-4 text-6xl opacity-20 pointer-events-none">🎁</div>
          <div className="absolute bottom-2 left-4 text-6xl opacity-20 pointer-events-none">✨</div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
              <Flame className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                Tổng giá trị quà tặng
              </span>
            </div>
            <div className="text-3xl sm:text-5xl font-black mb-2">
              {totalGiftValue}
            </div>
            <p className="text-sm sm:text-base font-medium opacity-95">
              TẶNG MIỄN PHÍ khi bố mẹ đăng ký hôm nay
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#registration-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-base sm:text-lg"
          >
            🎁 ĐĂNG KÝ NHẬN QUÀ NGAY →
          </a>
          <p className="mt-3 text-xs sm:text-sm text-text-muted">
            ⏰ Quà tặng chỉ áp dụng cho phụ huynh đăng ký trong tháng này
          </p>
        </div>
      </div>
    </section>
  );
}
