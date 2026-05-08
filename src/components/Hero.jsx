import { ArrowRight, Building2, Home, MapPin } from 'lucide-react';
import { trackPixelEvent, trackGA4Event } from '../utils/tracking';

const centers = [
  {
    icon: MapPin,
    name: 'Cơ sở 1 - Hải Châu',
    address: '60 Lê Lợi, Hải Châu, Đà Nẵng'
  },
  {
    icon: Building2,
    name: 'Cơ sở 2 - Hòa Cường',
    address: '258 Lê Thanh Nghị, Hòa Cường, Hải Châu'
  },
  {
    icon: MapPin,
    name: 'Cơ sở 3 - Thanh Khê',
    address: '269 Điện Biên Phủ, Thanh Khê, Đà Nẵng'
  },
  {
    icon: Home,
    name: 'Cơ sở 4 - Hòa Khê',
    address: '232 Nguyễn Phước Lan, Hòa Khê, Đà Nẵng'
  }
];

function Highlight({ children, tone = 'orange' }) {
  return (
    <span className={tone === 'purple' ? 'font-bold text-primary-purple' : 'font-bold text-primary-orange'}>
      {children}
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    trackPixelEvent('HeroCTAClick', { target: id });
    trackGA4Event('hero_cta_click', { target: id });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50 pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20 [&_*]:min-w-0">
      <div className="container-site relative">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start xl:gap-12">
          <div className="hero-mobile-bound mx-auto min-w-0 text-center lg:max-w-none lg:text-left">
            <div className="hero-mobile-bound mb-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-card sm:w-auto sm:rounded-full">
              <span className="text-2xl">🏆</span>
              <span className="min-w-0 whitespace-normal text-center text-xs font-bold leading-tight text-primary-purple sm:text-base">
                HỌC VIỆN ROBOTICS TẠI ĐÀ NẴNG
              </span>
            </div>

            <h1 className="heading-1 mb-6 break-words text-text-dark">
              <span className="block sm:inline">Bố mẹ <span className="text-gradient-orange-purple">Đà Nẵng</span></span>{' '}
              <span className="block sm:inline">đang tìm chỗ học</span>{' '}
              <span className="block sm:inline"><span className="text-gradient-orange-purple">Robotics</span></span>{' '}
              <br className="hidden sm:block" />
              <span className="block sm:inline">chất lượng</span>{' '}
              <span className="block sm:inline">cho con?</span>
            </h1>

            <p className="hero-mobile-bound mx-auto mb-4 text-sm leading-relaxed text-text-muted sm:max-w-3xl sm:text-lg lg:mx-0 lg:text-xl">
              Mỗi sáng cuối tuần, hàng trăm phụ huynh Đà Nẵng đưa con đi học thêm.
              Toán, Tiếng Anh, năng khiếu... mọi nơi đều có.
            </p>
            <p className="hero-mobile-bound mx-auto mb-7 text-sm font-semibold leading-relaxed text-text-dark sm:max-w-3xl sm:text-lg lg:mx-0 lg:text-xl">
              Còn <span className="text-primary-orange">Robotics</span> - ngành sẽ định hình tương lai 10 năm tới -{' '}
              <span className="underline decoration-primary-purple decoration-2">
                bố mẹ đang gửi con ở đâu?
              </span>
            </p>

            <div className="hero-mobile-bound mx-auto mb-8 w-full overflow-hidden rounded-2xl border-2 border-primary-orange/25 bg-white p-5 text-left shadow-card sm:max-w-[760px] sm:p-7 lg:mx-0">
              <div className="space-y-4 break-words text-xs leading-relaxed text-text-dark sm:text-base lg:text-lg">
                <p>
                  <Highlight>10 năm</Highlight> xây một <Highlight tone="purple">hệ sinh thái Giáo dục</Highlight> giúp phát triển tư duy cho thế hệ trẻ Việt Nam.
                  Hành trình bắt đầu từ <Highlight>Satamath</Highlight> - nơi hàng nghìn trẻ em Đà Nẵng học cách <Highlight tone="purple">tư duy toán học</Highlight>.
                </p>
                <p>
                  Và hôm nay, <Highlight>Học viện Sata Robo</Highlight> tiếp nối mạch tư duy đó - nâng con lên tầng tiếp theo với{' '}
                  <Highlight tone="purple">tư duy công nghệ</Highlight>: <Highlight>lập trình, robotics</Highlight>, làm chủ công cụ của tương lai.
                </p>
                <div className="rounded-2xl border border-primary-purple/20 bg-soft-purple/60 px-4 py-3 font-black text-primary-purple">
                  Toán học rèn tư duy. Công nghệ mở thế giới.
                </div>
                <p>
                  Cùng nhau, Sata chuẩn bị hành trang trọn vẹn cho thế hệ trẻ Việt Nam. Học viện Sata Robo có mặt tại Đà Nẵng -{' '}
                  <Highlight>4 trung tâm</Highlight> với các chương trình đào tạo và thiết bị đảm bảo học sinh học và thi{' '}
                  <Highlight tone="purple">Robotics 2026</Highlight> hiệu quả, <Highlight>lộ trình 5 năm</Highlight> bài bản cho con từ lớp 1 đến lớp 8.
                </p>
                <p className="text-text-muted">
                  Mình không vẽ ra "kỹ sư AI tương lai" xa vời. Mình giúp con bố mẹ{' '}
                  <Highlight tone="purple">HỌC NGAY - TỪ HÔM NAY</Highlight> tại trung tâm gần nhà nhất.
                </p>
              </div>
            </div>

            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <button onClick={() => scrollTo('registration-form')} className="btn-primary group text-base">
                <span>🎯</span>
                ĐĂNG KÝ TƯ VẤN MIỄN PHÍ
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => scrollTo('roadmap')} className="btn-outline text-base">
                <span>📋</span>
                XEM CÁC LỘ TRÌNH ĐÀO TẠO
              </button>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-7 gap-y-2 text-xs text-text-muted sm:grid-cols-2 sm:text-sm lg:mx-0">
              {[
                'Tư vấn viên gọi trong 24h',
                '100% miễn phí buổi tư vấn',
                'Chọn cơ sở thuận tiện cho gia đình',
                'Ưu đãi Early Bird đến 31/05'
              ].map((item) => (
                <span key={item} className="grid grid-cols-[1rem_1fr] items-start gap-2 text-left">
                  <span className="text-center font-bold leading-5 text-success">✓</span>
                  <span className="leading-5">{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 lg:pt-3">
            <div className="overflow-hidden rounded-[2rem] bg-gradient-orange-purple px-5 pt-5 shadow-2xl sm:px-8 sm:pt-7">
              <div className="relative flex min-h-[220px] items-end justify-center sm:min-h-[300px] lg:min-h-[350px]">
                <div className="absolute left-4 top-4 z-20 rounded-2xl bg-white/15 px-4 py-3 text-white backdrop-blur sm:left-7">
                  <div className="text-xs font-bold uppercase text-white/75">Sata Robo</div>
                  <div className="text-lg font-black sm:text-xl">Robotics AI</div>
                </div>
                <img
                  src="/image/LinhVat.png"
                  alt="Linh vật Sata Robo"
                  className="relative z-10 w-[72%] max-w-[340px] object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>

            <div className="relative z-20 mx-2 -mt-5 rounded-[1.35rem] border border-primary-orange/20 bg-white/95 p-4 shadow-xl backdrop-blur sm:mx-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-primary-orange">4 trung tâm tại Đà Nẵng</div>
                  <div className="text-sm font-semibold text-text-muted">Chọn cơ sở thuận tiện cho lịch học của con</div>
                </div>
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary-purple" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {centers.map(({ icon: Icon, name, address }) => (
                  <div key={name} className="rounded-2xl border border-primary-orange/20 bg-orange-50/45 p-3 shadow-sm">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white text-primary-orange shadow-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-black leading-tight text-text-dark">{name}</span>
                    </div>
                    <p className="pl-10 text-xs font-semibold leading-relaxed text-text-muted">{address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
