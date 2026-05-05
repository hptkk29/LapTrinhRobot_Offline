import { Clock, Facebook, Mail, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { locations } from '../data/locations';

export default function Footer() {
  const hqLocation = locations.find((l) => l.isHQ) || locations[0];

  return (
    <footer className="bg-text-dark text-white pt-10 pb-5 sm:pt-14 sm:pb-6">
      <div className="container-site">
        {/* ============ TOP SECTION ============ */}

        {/* Mobile: compact 2-section layout */}
        <div className="sm:hidden mb-8">
          {/* Logo + socials row */}
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/10">
            <div>
              <img
                src="/image/LogoSataROBO.png"
                alt="Sata Robo"
                className="h-10 w-auto object-contain bg-white rounded-lg p-1.5"
              />
              <p className="text-xs text-gray-400 italic mt-1.5">"Khơi Nguồn Sáng Tạo"</p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://facebook.com/Satarobo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-orange flex items-center justify-center transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@SataRobo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-orange flex items-center justify-center transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://zalo.me/0818823720"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-purple flex items-center justify-center transition"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2-col links + contact */}
          <div className="grid grid-cols-2 gap-6 mb-5">
            <div>
              <h4 className="font-black text-xs uppercase tracking-wider text-primary-orange mb-3">
                Chương Trình
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><a href="#roadmap" className="hover:text-primary-orange transition">Lộ Trình 5 Năm</a></li>
                <li><a href="#awards" className="hover:text-primary-orange transition">Sata Robo Championship</a></li>
                <li><a href="#gifts" className="hover:text-primary-orange transition">Học Bổng & Quà Tặng</a></li>
                <li>
                  <a href="https://luyenthirobosim.vn" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition">
                    Luyện Thi RoboSim →
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-wider text-primary-orange mb-3">
                Liên Hệ
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-primary-orange flex-shrink-0" />
                  <a href="tel:0818823720" className="hover:text-primary-orange transition">0818.823.720</a>
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-primary-orange flex-shrink-0" />
                  <a href="mailto:satarobo@gmail.com" className="hover:text-primary-orange transition text-[10px]">satarobo@gmail.com</a>
                </li>
                <li className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-primary-orange flex-shrink-0 mt-0.5" />
                  <span className="text-[10px] leading-tight">258 Lê Thanh Nghị, Đà Nẵng</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-primary-orange flex-shrink-0" />
                  <span>T2–T7: 8:00–20:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop: original 4-column layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Cột 1: LOGO + Slogan */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/image/LogoSataROBO.png"
                alt="Sata Robo"
                className="h-14 w-auto object-contain bg-white rounded-xl p-2"
              />
            </div>
            <p className="text-sm text-gray-300 italic mb-4 leading-relaxed">
              "Khơi Nguồn Sáng Tạo<br />Chắp Cánh Tương Lai"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Công ty Cổ phần Công nghệ Giáo dục Sata Robo. Tiên phong Robotics
              giáo dục tại Đà Nẵng.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://facebook.com/Satarobo" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-orange flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@SataRobo" target="_blank" rel="noopener noreferrer" aria-label="Youtube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-orange flex items-center justify-center transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://zalo.me/0818823720" target="_blank" rel="noopener noreferrer" aria-label="Zalo"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-purple flex items-center justify-center transition">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Cột 2: VỀ HỌC VIỆN */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-primary-orange mb-4">Về Học Viện</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="#" className="hover:text-primary-orange transition">Triết Lý Đào Tạo</a></li>
              <li><a href="#teaching-method" className="hover:text-primary-orange transition">Phương Pháp Giảng Dạy</a></li>
              <li><a href="#" className="hover:text-primary-orange transition">Đội Ngũ Giảng Viên</a></li>
              <li><a href="#commitment" className="hover:text-primary-orange transition">Cam Kết Minh Bạch</a></li>
              <li><a href="#testimonials" className="hover:text-primary-orange transition">Phụ Huynh Nói Gì</a></li>
            </ul>
          </div>

          {/* Cột 3: CHƯƠNG TRÌNH */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-primary-orange mb-4">Chương Trình</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="#roadmap" className="hover:text-primary-orange transition">Lộ Trình 5 Năm</a></li>
              <li>
                <a href="https://luyenthirobosim.vn" target="_blank" rel="noopener noreferrer" className="hover:text-primary-orange transition">
                  Khoá Luyện Thi RoboSim →
                </a>
              </li>
              <li><a href="#awards" className="hover:text-primary-orange transition">Sata Robo Championship</a></li>
              <li><a href="#gifts" className="hover:text-primary-orange transition">Học Bổng & Quà Tặng</a></li>
              <li><a href="#locations" className="hover:text-primary-orange transition">4 Trung Tâm Đà Nẵng</a></li>
            </ul>
          </div>

          {/* Cột 4: LIÊN HỆ */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-primary-orange mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                <a href="tel:0818823720" className="hover:text-primary-orange transition">Zalo / Hotline: 0818.823.720</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                <a href="mailto:satarobo@gmail.com" className="hover:text-primary-orange transition">satarobo@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                <span>{hqLocation.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                <span>T2 – T7: 8:00 – 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ============ COPYRIGHT ============ */}
        <div className="border-t border-white/10 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <div>
            © 2026{' '}
            <strong className="text-white">Công ty CP Công nghệ Giáo dục Sata Robo</strong>.
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-primary-orange transition">Bảo Mật</a>
            <span>|</span>
            <a href="#" className="hover:text-primary-orange transition">Điều Khoản</a>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-3">
          SP2 — Sata Robo Offline · Đà Nẵng
        </div>
      </div>
    </footer>
  );
}
