import { useState, useEffect } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  User,
  GraduationCap,
  MapPin,
  Sparkles
} from 'lucide-react';
import { roadmap5Years } from '../data/roadmap-5-years';
import { locations } from '../data/locations';
import {
  handleLeadSubmission,
  validateVietnamPhone,
  validateEmail,
  trackPixelEvent,
  trackGA4Event
} from '../utils/tracking';

/**
 * Section 10 — Form đăng ký tư vấn miễn phí
 *
 * KPI quan trọng nhất của trang. Tracking đầy đủ:
 * - Submit → POST Google Sheet (Apps Script)
 * - Meta Pixel: fbq('track', 'Lead')
 * - GA4: gtag('event', 'generate_lead')
 * - Success popup → countdown → redirect Zalo group
 */

// Link nhóm Zalo redirect sau khi submit thành công
const ZALO_GROUP_LINK = 'https://zalo.me/g/ovma9qgjuedypjy8mnxc';
// Link Zalo cá nhân fallback (nếu nhóm chưa có link)
const ZALO_FALLBACK = 'https://zalo.me/0818823720';

export default function RegistrationForm() {
  // ============ STATE ============
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    center: '',
    sataMath: null,
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [shouldRedirectToZalo, setShouldRedirectToZalo] = useState(true);

  // ============ COUNTDOWN AUTO-REDIRECT SAU SUBMIT ============
  useEffect(() => {
    if (!isSuccess || !shouldRedirectToZalo) return;
    if (redirectCountdown <= 0) {
      window.location.href = ZALO_GROUP_LINK;
      return;
    }
    const timer = setTimeout(() => {
      setRedirectCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isSuccess, shouldRedirectToZalo, redirectCountdown]);

  // ============ HANDLERS ============
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error khi user sửa lại
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate toàn form
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Bố mẹ vui lòng nhập họ tên';
    else if (formData.name.trim().length < 2) e.name = 'Họ tên quá ngắn';

    if (!formData.phone.trim()) e.phone = 'Bố mẹ vui lòng nhập số điện thoại';
    else if (!validateVietnamPhone(formData.phone))
      e.phone = 'Số điện thoại chưa đúng định dạng Việt Nam';

    if (formData.email && !validateEmail(formData.email))
      e.email = 'Email chưa đúng định dạng';

    if (!formData.course) e.course = 'Bố mẹ vui lòng chọn khoá học';
    if (!formData.center) e.center = 'Bố mẹ vui lòng chọn trung tâm';
    if (!formData.sataMath) e.sataMath = 'Bố mẹ vui lòng trả lời câu hỏi này';
    if (!formData.consent) e.consent = 'Bố mẹ vui lòng đồng ý điều khoản';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Track click submit (intent)
    trackPixelEvent('FormSubmitClick', { source: 'registration-form' });
    trackGA4Event('form_submit_attempt', { source: 'registration-form' });

    if (!validate()) {
      // Scroll đến lỗi đầu tiên
      const firstErrorField = document.querySelector('.input-error');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Tổng hợp: gửi Sheet + track Pixel Lead + track GA4 generate_lead
      await handleLeadSubmission({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        course: formData.course,
        center: formData.center,
        satamath: formData.sataMath === 'yes' ? 'Có' : formData.sataMath === 'no' ? 'Không' : 'Không trả lời'
      });
      // Hiển thị popup thành công rồi tự chuyển sang nhóm Zalo
      setIsSuccess(true);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Có lỗi xảy ra, bố mẹ thử lại hoặc liên hệ Zalo 0818.823.720 nhé!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ RENDER SUCCESS POPUP ============
  if (isSuccess) {
    return (
      <section id="registration-form" className="section-padding bg-gradient-orange-purple relative overflow-hidden">
        <div className="container-site min-h-[34rem] flex items-center justify-center">
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-7 sm:p-10 text-center shadow-2xl animate-fade-in border-4 border-white/40">
            <div className="inline-flex w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-success/10 items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-success" strokeWidth={2.5} />
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-text-dark mb-4">
              Đăng ký thành công!
            </h2>

            <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-6">
              Học viện <strong>Sata Robo</strong> đã nhận được thông tin của bố mẹ.
              <br />
              Tư vấn viên sẽ gọi cho bố mẹ trong vòng <strong className="text-primary-orange">24h</strong> để xếp lịch buổi Test miễn phí.
            </p>

            <div className="bg-soft-cream rounded-2xl p-5 sm:p-6 mb-6 text-left">
              <h3 className="font-bold text-base sm:text-lg text-text-dark mb-2 flex items-center gap-2">
                Bước tiếp theo
              </h3>
              <p className="text-sm sm:text-base text-text-muted">
                Vui lòng tham gia <strong>Nhóm Zalo phụ huynh Sata Robo</strong> để cập nhật
                thông tin lớp học, lịch khai giảng và tài liệu STEM miễn phí.
              </p>
            </div>

            {shouldRedirectToZalo ? (
              <div className="bg-soft-yellow rounded-xl p-4 mb-6 inline-flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-primary-orange animate-spin" />
                <span className="text-sm sm:text-base text-text-dark">
                  Tự động chuyển sang nhóm Zalo trong{' '}
                  <strong className="text-primary-orange text-lg">{redirectCountdown}s</strong>
                </span>
              </div>
            ) : (
              <div className="bg-soft-cream rounded-xl p-4 mb-6 inline-flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm sm:text-base text-text-dark">
                  Bố mẹ đang ở lại trang này. Thông tin đã được gửi thành công.
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={ZALO_GROUP_LINK}
                className="btn-primary"
              >
                Tham gia nhóm Zalo ngay
              </a>
              <a
                href={ZALO_FALLBACK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Zalo cá nhân: 0818.823.720
              </a>
              {shouldRedirectToZalo && (
                <button
                  type="button"
                  onClick={() => setShouldRedirectToZalo(false)}
                  className="btn-outline"
                >
                  Ở lại trang
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ============ RENDER FORM ============
  return (
    <section id="registration-form" className="section-padding bg-gradient-orange-purple relative overflow-hidden">
      {/* Decorative bubbles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-site relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <ClipboardList className="w-4 h-4" />
            ĐĂNG KÝ BUỔI TEST MIỄN PHÍ
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Bắt Đầu <span className="text-soft-yellow">Hành Trình</span>
            <br />
            Của Con Ngay Hôm Nay
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Bố mẹ điền 4 thông tin dưới đây — Sata Robo gọi tư vấn trong{' '}
            <strong>24h</strong> để xếp lịch buổi Test miễn phí cho con!
          </p>
        </div>

        {/* Form card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-text-dark mb-1 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-orange" />
              Thông Tin Đăng Ký
            </h3>
            <p className="text-xs sm:text-sm text-text-muted">
              Buổi Test miễn phí · Không ràng buộc · Hoàn tiền 100% sau 2 buổi đầu nếu không hài lòng
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* HỌ TÊN */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-text-dark mb-1.5">
                <User className="inline w-4 h-4 mr-1 text-primary-orange" />
                Họ và tên phụ huynh <span className="text-urgent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyễn Thị Lan"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-sm sm:text-base ${
                  errors.name
                    ? 'input-error border-urgent animate-shake'
                    : 'border-gray-200 focus:border-primary-orange'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-urgent flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SDT */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-text-dark mb-1.5">
                  <Phone className="inline w-4 h-4 mr-1 text-primary-orange" />
                  Số điện thoại <span className="text-urgent">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912 345 678"
                  inputMode="tel"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-sm sm:text-base ${
                    errors.phone
                      ? 'input-error border-urgent animate-shake'
                      : 'border-gray-200 focus:border-primary-orange'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-urgent flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* EMAIL — không bắt buộc */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-text-dark mb-1.5">
                  <Mail className="inline w-4 h-4 mr-1 text-primary-orange" />
                  Email <span className="text-text-muted text-xs font-normal">(không bắt buộc)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@gmail.com"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-sm sm:text-base ${
                    errors.email
                      ? 'input-error border-urgent animate-shake'
                      : 'border-gray-200 focus:border-primary-orange'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-urgent flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* KHOÁ HỌC */}
              <div>
                <label htmlFor="course" className="block text-sm font-bold text-text-dark mb-1.5">
                  <GraduationCap className="inline w-4 h-4 mr-1 text-primary-orange" />
                  Khoá học quan tâm <span className="text-urgent">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-sm sm:text-base bg-white ${
                    errors.course
                      ? 'input-error border-urgent animate-shake'
                      : 'border-gray-200 focus:border-primary-orange'
                  }`}
                >
                  <option value="">-- Chọn khoá học --</option>
                  {roadmap5Years.map((y) => (
                    <option key={y.year} value={`Năm ${y.year} — ${y.name} (${y.grade})`}>
                      Năm {y.year} — {y.name} ({y.grade})
                    </option>
                  ))}
                  <option value="Chưa biết — Cần tư vấn">
                    Chưa biết — Cần tư vấn
                  </option>
                </select>
                {errors.course && (
                  <p className="mt-1 text-xs text-urgent flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.course}
                  </p>
                )}
              </div>

              {/* CƠ SỞ */}
              <div>
                <label htmlFor="center" className="block text-sm font-bold text-text-dark mb-1.5">
                  <MapPin className="inline w-4 h-4 mr-1 text-primary-orange" />
                  Chọn cơ sở học <span className="text-urgent">*</span>
                </label>
                <select
                  id="center"
                  name="center"
                  value={formData.center}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-sm sm:text-base bg-white ${
                    errors.center
                      ? 'input-error border-urgent animate-shake'
                      : 'border-gray-200 focus:border-primary-orange'
                  }`}
                >
                  <option value="">-- Chọn địa chỉ cơ sở --</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.address}>
                      {loc.address}
                    </option>
                  ))}
                  <option value="Tư vấn cơ sở gần nhà nhất">
                    Tư vấn cơ sở gần nhà nhất
                  </option>
                </select>
                {errors.center && (
                  <p className="mt-1 text-xs text-urgent flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.center}
                  </p>
                )}
              </div>
            </div>

            {/* SATAMATH QUESTION */}
            <div className={`rounded-xl border-2 bg-soft-cream p-4 transition ${errors.sataMath ? 'border-urgent' : 'border-gray-100'}`}>
              <p className="text-sm font-bold text-text-dark mb-3">
                Con của Bố/Mẹ đang học ở hệ thống{' '}
                <span className="text-primary-orange">SataMath</span>?{' '}
                <span className="text-urgent">*</span>
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, sataMath: 'yes' }));
                    setErrors((prev) => ({ ...prev, sataMath: '' }));
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition active:scale-95
                    ${formData.sataMath === 'yes'
                      ? 'bg-primary-orange text-white border-primary-orange shadow-orange-glow'
                      : 'bg-white text-text-dark border-gray-200 hover:border-primary-orange hover:text-primary-orange'}`}
                >
                  ✅ Có
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, sataMath: 'no' }));
                    setErrors((prev) => ({ ...prev, sataMath: '' }));
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition active:scale-95
                    ${formData.sataMath === 'no'
                      ? 'bg-primary-purple text-white border-primary-purple'
                      : 'bg-white text-text-dark border-gray-200 hover:border-primary-purple hover:text-primary-purple'}`}
                >
                  ❌ Không
                </button>
              </div>
              {errors.sataMath && (
                <p className="mt-2 text-xs text-urgent flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.sataMath}
                </p>
              )}
              {formData.sataMath === 'yes' && (
                <p className="mt-2 text-xs text-success font-semibold">
                  🎉 Báo với tư vấn viên để nhận ưu đãi đặc biệt dành cho gia đình SataMath!
                </p>
              )}
            </div>

            {/* CONSENT CHECKBOX */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 accent-primary-orange flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  Tôi đồng ý nhận tin tư vấn từ <strong>Sata Robo</strong> qua điện thoại / Zalo
                  và đồng ý với{' '}
                  <a href="#" className="text-primary-purple underline">
                    chính sách bảo mật
                  </a>{' '}
                  của Học viện.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-urgent flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.consent}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-orange-purple text-white font-black text-base sm:text-lg rounded-xl
                shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed
                disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang gửi thông tin...
                </span>
              ) : (
                '🚀 ĐĂNG KÝ NHẬN TƯ VẤN MIỄN PHÍ →'
              )}
            </button>

            {/* Trust footer */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <div className="text-xs text-text-muted">✓ Gọi trong 24h</div>
              <div className="text-xs text-text-muted">✓ 100% miễn phí</div>
              <div className="text-xs text-text-muted">✓ Không spam</div>
            </div>

            <p className="text-xs text-text-muted text-center pt-2 border-t border-gray-100">
              🔒 Thông tin của bạn được bảo mật tuyệt đối. Sata Robo cam kết không chia sẻ
              dữ liệu với bên thứ ba.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
