import { testimonials } from '../data/testimonials';
import { MessageCircle, Star, Quote } from 'lucide-react';

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
            Cảm nhận thực tế từ phụ huynh và học sinh đã trải qua hành trình
            cùng Học viện Sata Robo.
          </p>
        </div>

        {/* Grid 3 cols on desktop, 1 col mobile, 2 cols tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t) => (
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
