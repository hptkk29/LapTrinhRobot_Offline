import { locations } from '../data/locations';
import { MapPin, Phone, Clock, Star, MessageCircle } from 'lucide-react';

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
            <span className="text-gradient-orange-purple">4 TRUNG TÂM TẠI ĐÀ NẴNG</span><br />
            <span className="text-text-dark text-2xl sm:text-3xl">— CHỌN GẦN NHÀ NHẤT</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Bố mẹ chọn trung tâm gần nhà — con không tốn thời gian di chuyển,
            bố mẹ đưa đón thuận tiện hơn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`card-base overflow-hidden border-2 transition
                ${loc.isHQ ? 'border-primary-orange' : 'border-gray-200'}`}
            >
              {/* Header */}
              <div className={`p-4 sm:p-5 border-b border-gray-100
                ${loc.isHQ ? 'bg-soft-cream' : 'bg-gray-50'}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-5 h-5 flex-shrink-0 ${loc.isHQ ? 'text-primary-orange' : 'text-primary-purple'}`} />
                    <h3 className="font-extrabold text-base sm:text-lg text-text-dark leading-tight">
                      {loc.name}
                    </h3>
                  </div>
                  {loc.isHQ && (
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 bg-primary-orange text-white text-[10px] sm:text-xs font-bold rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      HQ
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  📍 {loc.address}
                </p>
                {loc.note && (
                  <p className="text-xs text-primary-purple mt-2 italic">
                    💡 {loc.note}
                  </p>
                )}
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary-orange flex-shrink-0" />
                    <a href={`tel:${loc.hotline.replace(/\./g, '')}`} className="text-primary-orange font-bold hover:underline">
                      {loc.hotline}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-text-muted flex-shrink-0" />
                    <span className="text-text-muted">{loc.workingHours}</span>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 aspect-video bg-gray-100">
                  <iframe
                    src={loc.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Bản đồ ${loc.name}`}
                  />
                </div>

                <button
                  onClick={() => {
                    const select = document.querySelector('select[name="center"]');
                    if (select) select.value = loc.name;
                    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-primary-orange/10 text-primary-orange font-bold text-sm rounded-lg
                    hover:bg-primary-orange hover:text-white transition"
                >
                  🎯 Chọn trung tâm này
                </button>
              </div>
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
