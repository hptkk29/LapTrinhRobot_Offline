import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Youtube,
  MessageCircle
} from 'lucide-react';
import { locations } from '../data/locations';

/**
 * Footer — đồng bộ với luyenthirobosim.vn
 * 3 cột: Về Học Viện · Chương Trình · Liên Hệ
 */
export default function Footer() {
  const hqLocation = locations.find((l) => l.isHQ) || locations[0];

  return (
    <footer className="bg-text-dark text-white pt-14 pb-6">
      <div className="container-site">
        {/* ============ TOP SECTION ============ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Cột 1: LOGO + Slogan */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-orange-purple flex items-center justify-center text-xl font-black shadow-md">
                SR
              </div>
              <div>
                <div className="font-black text-lg leading-tight">SATA ROBO</div>
                <div className="text-xs text-gray-400">Học viện Robotics Đà Nẵng</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 italic mb-4 leading-relaxed">
              "Khơi Nguồn Sáng Tạo
              <br />
              Chắp Cánh Tương Lai"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Công ty Cổ phần Công nghệ Giáo dục Sata Robo. Tiên phong Robotics
              giáo dục tại Đà Nẵng.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
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

          {/* Cột 2: VỀ HỌC VIỆN */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-primary-orange mb-4">
              Về Học Viện
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Triết Lý Đào Tạo
                </a>
              </li>
              <li>
                <a href="#teaching-method" className="hover:text-primary-orange transition">
                  Phương Pháp Giảng Dạy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-orange transition">
                  Đội Ngũ Giảng Viên
                </a>
              </li>
              <li>
                <a href="#commitment" className="hover:text-primary-orange transition">
                  Cam Kết Minh Bạch
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary-orange transition">
                  Phụ Huynh Nói Gì
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: CHƯƠNG TRÌNH */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-primary-orange mb-4">
              Chương Trình
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="#roadmap" className="hover:text-primary-orange transition">
                  Lộ Trình 5 Năm
                </a>
              </li>
              <li>
                <a
                  href="https://luyenthirobosim.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-orange transition"
                >
                  Khoá Luyện Thi RoboSim →
                </a>
              </li>
              <li>
                <a href="#awards" className="hover:text-primary-orange transition">
                  Sata Robo Championship
                </a>
              </li>
              <li>
                <a href="#gifts" className="hover:text-primary-orange transition">
                  Học Bổng & Quà Tặng
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-primary-orange transition">
                  4 Trung Tâm Đà Nẵng
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: LIÊN HỆ */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-primary-orange mb-4">
              Liên Hệ
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                <a href="tel:0818823720" className="hover:text-primary-orange transition">
                  Zalo / Hotline: 0818.823.720
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary-orange flex-shrink-0 mt-0.5" />
                <a href="mailto:satarobo@gmail.com" className="hover:text-primary-orange transition">
                  satarobo@gmail.com
                </a>
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

        {/* ============ MAP TRỤ SỞ ============ */}
        <div className="bg-white/5 rounded-2xl p-4 mb-8">
          <div className="text-xs uppercase tracking-wider font-bold text-primary-orange mb-2 px-2">
            📍 Trụ sở chính
          </div>
          <iframe
            src={hqLocation.mapEmbed}
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: '0.75rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sata Robo HQ"
          ></iframe>
        </div>

        {/* ============ COPYRIGHT ============ */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            © 2026{' '}
            <strong className="text-white">Công ty Cổ phần Công nghệ Giáo dục Sata Robo</strong>.
            All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-orange transition">
              Chính Sách Bảo Mật
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary-orange transition">
              Điều Khoản Sử Dụng
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          SP2 — Sata Robo Offline · Đà Nẵng
        </div>
      </div>
    </footer>
  );
}
