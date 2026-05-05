import { ArrowRight, GraduationCap, MapPin, Users } from 'lucide-react';
import { trackPixelEvent, trackGA4Event } from '../utils/tracking';

/**
 * Hero Section — Câu chuyện gửi gắm cảm xúc cho phụ huynh Đà Nẵng
 */
export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    trackPixelEvent('HeroCTAClick', { target: id });
    trackGA4Event('hero_cta_click', { target: id });
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-purple-50 pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-20 overflow-hidden">
      <div className="container-site relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white shadow-card rounded-full">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-sm sm:text-base text-primary-purple">
              HỌC VIỆN ROBOTICS UY TÍN HÀNG ĐẦU TẠI ĐÀ NẴNG
            </span>
          </div>

          {/* H1 */}
          <h1 className="heading-1 text-text-dark mb-6">
            Bố mẹ <span className="text-gradient-orange-purple">Đà Nẵng</span> đang tìm chỗ học{' '}
            <span className="text-gradient-orange-purple">Robotics</span><br className="hidden sm:block" />
            chất lượng cho con?
          </h1>

          {/* Sub đoạn 1 — bạn thân, ấm */}
          <p className="text-base sm:text-lg lg:text-xl text-text-muted leading-relaxed mb-4 max-w-3xl mx-auto lg:mx-0">
            Mỗi sáng cuối tuần, hàng trăm phụ huynh Đà Nẵng đưa con đi học thêm.<br />
            Toán, Tiếng Anh, Năng khiếu… mọi nơi đều có.
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-text-dark font-semibold leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0">
            Còn <span className="text-primary-orange">Robotics</span> — ngành sẽ định hình tương lai 10 năm tới —{' '}
            <span className="underline decoration-primary-purple decoration-2">
              bố mẹ đang gửi con ở đâu?
            </span>
          </p>

          {/* Box highlight */}
          <div className="max-w-3xl mx-auto lg:mx-0 mb-8 bg-white rounded-2xl border-2 border-primary-orange/30 p-5 sm:p-7 shadow-card text-left">
            <p className="text-sm sm:text-base lg:text-lg text-text-dark leading-relaxed mb-3">
              <strong className="text-primary-purple">Học viện Sata Robo</strong> có mặt tại Đà Nẵng —
              <strong className="text-primary-orange"> 4 trung tâm chuẩn quốc tế</strong>, lộ trình{' '}
              <strong>5 năm bài bản</strong> cho con từ lớp 1 đến lớp 8.
            </p>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Mình không vẽ ra "kỹ sư AI tương lai" xa vời. Mình giúp con bố mẹ{' '}
              <strong className="text-text-dark">HỌC NGAY — TỪ HÔM NAY</strong> tại trung tâm gần nhà nhất.
            </p>
          </div>

          {/* 3 Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto lg:mx-0">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-orange/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-orange" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-text-dark">5 năm — 20 học phần</div>
                <div className="text-xs text-text-muted">Chuẩn quốc tế</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-purple/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-purple" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-text-dark">4 trung tâm Đà Nẵng</div>
                <div className="text-xs text-text-muted">Gần khu nhà bố mẹ</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-text-dark">Giảng viên kỳ cựu</div>
                <div className="text-xs text-text-muted">Đào tạo HS đoạt giải QG/QT</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
            <button onClick={() => scrollTo('registration-form')} className="btn-primary group text-base">
              <span>🎯</span>
              ĐĂNG KÝ TƯ VẤN MIỄN PHÍ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollTo('roadmap')} className="btn-outline text-base">
              <span>📋</span>
              XEM LỘ TRÌNH 5 NĂM
            </button>
          </div>

          {/* Trust footer */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="text-success font-bold">✓</span> Tư vấn viên gọi trong 24h
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-success font-bold">✓</span> 100% miễn phí buổi tư vấn
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-success font-bold">✓</span> 4 trung tâm — chọn gần nhà
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-success font-bold">✓</span> Học bổng đến 50%
            </span>
          </div>
        </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-gradient-orange-purple shadow-2xl overflow-hidden px-6 pt-8 sm:px-10 sm:pt-10">
              <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] flex items-end justify-center">
                <div className="absolute top-6 left-4 sm:left-8 rounded-2xl bg-white/15 px-4 py-3 text-white backdrop-blur">
                  <div className="text-xs font-bold uppercase text-white/75">Sata Robo</div>
                  <div className="text-lg sm:text-xl font-black">Robotics AI</div>
                </div>
                <img
                  src="/image/LinhVat.png"
                  alt="Linh vật Sata Robo"
                  className="relative z-10 w-[76%] max-w-[360px] object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>

            <div className="relative z-20 mx-4 -mt-6 rounded-[1.5rem] bg-white/95 backdrop-blur p-4 sm:p-5 shadow-xl border border-white">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-primary-orange">5</div>
                  <div className="text-[11px] sm:text-xs font-bold text-text-muted">năm lộ trình</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-primary-purple">20</div>
                  <div className="text-[11px] sm:text-xs font-bold text-text-muted">học phần</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-success">4</div>
                  <div className="text-[11px] sm:text-xs font-bold text-text-muted">cơ sở</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
