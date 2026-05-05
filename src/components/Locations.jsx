import { locations } from '../data/locations';
import { ArrowRight, MapPin, MessageCircle, Star } from 'lucide-react';

export default function Locations() {
  return (
    <section id="locations" className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <div className="badge-purple mb-4">
            <MapPin className="w-4 h-4" />
            ĐỊA ĐIỂM HỌC
          </div>
          <h2 className="heading-2 mb-4">
            <span className="text-gradient-orange-purple">4 ĐỊA CHỈ HỌC TẠI ĐÀ NẴNG</span><br />
            <span className="text-text-dark text-2xl sm:text-3xl">— CHỌN GẦN NHÀ NHẤT</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Bố mẹ chọn trung tâm gần nhà — con không tốn thời gian di chuyển,
            bố mẹ đưa đón thuận tiện hơn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`card-base p-4 border-2 transition flex flex-col
                ${loc.isHQ ? 'border-primary-orange' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${loc.isHQ ? 'bg-primary-orange text-white' : 'bg-soft-purple text-primary-purple'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                {loc.isHQ && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-orange text-white text-[10px] sm:text-xs font-bold rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Trụ sở
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-base sm:text-lg text-text-dark leading-snug mb-2">
                {loc.address}
              </h3>
              {loc.note && (
                <p className="text-xs sm:text-sm text-primary-purple mb-4 flex-1">
                  {loc.note}
                </p>
              )}

              <button
                onClick={() => {
                  const select = document.querySelector('select[name="center"]');
                  if (select) {
                    select.value = loc.address;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                  document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-primary-orange/10 text-primary-orange font-bold text-sm rounded-lg
                  hover:bg-primary-orange hover:text-white transition inline-flex items-center justify-center gap-2"
              >
                Chọn địa chỉ này
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Tip phía dưới */}
        <div className="max-w-3xl mx-auto bg-soft-purple rounded-2xl p-5 text-center border-2 border-primary-purple/20">
          <p className="text-sm sm:text-base text-text-dark mb-3">
            💡 <strong>Bố mẹ chưa chắc trung tâm nào thuận tiện?</strong>
          </p>
          <p className="text-xs sm:text-sm text-text-muted mb-4">
            Inbox Zalo — Sata Robo gợi ý trung tâm gần nhà nhất theo địa chỉ bố mẹ cho.
          </p>
          <a
            href="https://zalo.me/0818823720"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-purple text-white font-bold text-sm rounded-lg
              hover:bg-primary-purple-dark transition"
          >
            <MessageCircle className="w-4 h-4" />
            Chat Zalo gợi ý trung tâm
          </a>
        </div>
      </div>
    </section>
  );
}
