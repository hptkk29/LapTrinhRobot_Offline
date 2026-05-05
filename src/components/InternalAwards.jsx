import { internalAwards, externalAchievements } from '../data/awards';
import { Trophy, Award, Medal } from 'lucide-react';

export default function InternalAwards() {
  const levelStyle = {
    bronze: 'from-orange-50 to-amber-50 border-orange-200',
    silver: 'from-gray-50 to-slate-100 border-gray-300',
    gold: 'from-yellow-50 to-amber-100 border-yellow-300'
  };

  return (
    <section id="awards" className="section-padding bg-soft-cream">
      <div className="container-site">
        {/* ============ HEADING ============ */}
        <div className="text-center mb-8 sm:mb-14">
          <div className="badge-orange mb-4">
            <Trophy className="w-4 h-4" />
            GIẢI THƯỞNG NỘI BỘ
          </div>
          <h2 className="heading-2 mb-4">
            🏆 Sata Robo Championship
            <br className="hidden sm:block" />
            <span className="text-gradient-orange-purple">36.000.000đ Giải Thưởng Mỗi Năm</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            {internalAwards.description}
          </p>
        </div>

        {/* ============ TOTAL PRIZE BOX ============ */}
        <div className="max-w-2xl mx-auto bg-gradient-orange-purple rounded-2xl p-5 sm:p-10 text-center text-white mb-8 sm:mb-10 shadow-xl">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-90 mb-1 sm:mb-2">
            Tổng giá trị giải thưởng / năm
          </div>
          <div className="text-3xl sm:text-6xl font-black mb-1 sm:mb-2 drop-shadow">
            36.000.000 VNĐ
          </div>
          <div className="text-xs sm:text-base opacity-95">
            12 kỳ × 3.000.000đ / kỳ — dành riêng cho học viên Sata Robo
          </div>
        </div>

        {/* ============ TABLE 4 PRIZE TIERS ============ */}
        <div className="max-w-4xl mx-auto card-base overflow-hidden mb-10 sm:mb-14">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-soft-yellow border-b-2 border-primary-orange/20">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-black uppercase text-xs sm:text-sm text-text-dark">
                    Hạng Mục
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-black uppercase text-xs sm:text-sm text-text-dark">
                    Giải Thưởng
                  </th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left font-black uppercase text-xs sm:text-sm text-text-dark">
                    Ghi Chú
                  </th>
                </tr>
              </thead>
              <tbody>
                {internalAwards.prizes.map((p, idx) => (
                  <tr
                    key={p.rank}
                    className={`border-b border-gray-100 hover:bg-soft-cream transition ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-3xl">{p.icon}</span>
                        <span className="font-bold text-text-dark text-xs sm:text-base">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="font-black text-primary-orange text-sm sm:text-lg">
                        {p.reward}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-xs sm:text-sm text-text-muted">
                      {p.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============ EXTERNAL ACHIEVEMENTS ============ */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="badge-purple mb-3">
            <Award className="w-4 h-4" />
            THÀNH TÍCH BÊN NGOÀI
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-text-dark mb-2">
            HỌC VIÊN SATA ROBO —{' '}
            <span className="text-gradient-orange-purple">Những Nhà Vô Địch Nhỏ</span>
          </h3>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto">
            Thành tích các con tại các kỳ thi cấp thành phố — quốc gia.
          </p>
        </div>

        {/* Mobile: compact 3-column badges / Desktop: large cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-10">
          {externalAchievements.map((a) => (
            <div
              key={a.level}
              className={`bg-gradient-to-br ${levelStyle[a.level]} border-2 rounded-xl p-3 sm:p-8 text-center hover:shadow-xl hover:-translate-y-1 transition`}
            >
              <div className="text-3xl sm:text-7xl mb-1 sm:mb-3">{a.icon}</div>
              <div className="text-2xl sm:text-5xl font-black text-text-dark mb-0.5 sm:mb-1">
                {a.count}
              </div>
              <h4 className="font-black text-[10px] sm:text-lg text-text-dark mb-1 sm:mb-2 uppercase tracking-wide leading-tight">
                {a.title}
              </h4>
              <p className="hidden sm:block text-xs sm:text-sm text-text-muted leading-relaxed">
                {a.description}
              </p>
            </div>
          ))}
        </div>

        {/* ============ CLOSING MESSAGE ============ */}
        <div className="max-w-3xl mx-auto bg-white border-l-4 border-primary-orange rounded-xl p-5 sm:p-8 shadow-md">
          <div className="flex items-start gap-3">
            <Medal className="w-6 h-6 text-primary-orange flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm sm:text-base text-text-dark leading-relaxed mb-2">
                Các giải thưởng này <strong>KHÔNG phải để khoe</strong>.
              </p>
              <p className="text-sm sm:text-base text-text-dark leading-relaxed">
                Đây là <strong className="text-primary-orange">MINH CHỨNG</strong> — cho thấy lộ trình
                đào tạo Sata Robo đưa con đến đâu — nếu con đi đủ 5 năm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
