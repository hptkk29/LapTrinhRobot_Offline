import { testimonials } from '../data/testimonials';
import { MessageCircle, PlayCircle, Quote, Star } from 'lucide-react';

const videos = [
  {
    id: 'bqB2c7AlSfE',
  },
  {
    id: '9MJFC4v8cbU',
  },
  {
    id: 'anInoYFGrF0',
  }
];

/**
 * Section 9 — Phụ huynh & học sinh nói gì
 * Tone: HỌC VIỆN — chân thực, lấy nguyên văn từ phụ huynh
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-site">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="badge-purple mb-4">
            <MessageCircle className="w-4 h-4" />
            PHỤ HUYNH & HỌC SINH NÓI GÌ
          </div>
          <h2 className="heading-2 mb-4">
            Hàng trăm học sinh đã tham gia khoá học
            <br className="hidden sm:block" />
            <span className="text-gradient-orange-purple">và hào hứng làm được bài tập thực tế</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            Một vài phản hồi ngắn gọn từ phụ huynh, kèm video cảm nhận của học viên có thể xem trực tiếp trên website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="card-base p-6 sm:p-7 relative hover:shadow-xl hover:-translate-y-1 transition group"
            >
              {/* Quote decorative */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-primary-orange/10 group-hover:text-primary-orange/20 transition" />

              {/* 5-star rating */}
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm sm:text-base text-text-dark italic leading-relaxed mb-5 min-h-[8rem]">
                "{t.content}"
              </p>

              {/* Avatar + Name + Role */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${t.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md`}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm sm:text-base text-text-dark truncate">
                    {t.name}
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted truncate">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-center gap-2 mb-5">
            <PlayCircle className="w-5 h-5 text-primary-orange" />
            <h3 className="text-lg sm:text-2xl font-black text-text-dark">
              Bài thuyết trình dự án của học viên sau mỗi buổi học
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {videos.map((video) => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-card border border-gray-100 bg-white">
                <div className="aspect-video bg-gray-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-text-muted italic">
            * Toàn bộ phản hồi được phụ huynh đồng ý chia sẻ công khai trên website Sata Robo.
          </p>
        </div>
      </div>
    </section>
  );
}
