import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import useScrollPosition from '../hooks/useScrollPosition';

/**
 * Header — logo + navigation
 * Hiện sau khi top bar ẩn (>150px scroll)
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isAfterTopBar = scrollY > 150;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky z-40 bg-white shadow-sm border-b border-gray-100
        transition-all duration-300 ${isAfterTopBar ? 'top-0' : 'top-10 sm:top-11'}`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 no-tap-highlight">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-orange-purple flex items-center justify-center font-black text-white text-lg sm:text-xl">
              SR
            </div>
            <div className="hidden sm:block">
              <div className="font-extrabold text-base sm:text-lg leading-tight text-text-dark">
                SATA ROBO
              </div>
              <div className="text-xs text-text-muted">Robotics Đà Nẵng</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => scrollTo('roadmap')}
              className="text-sm font-semibold text-text-dark hover:text-primary-orange transition"
            >
              Lộ trình 5 năm
            </button>
            <button
              onClick={() => scrollTo('locations')}
              className="text-sm font-semibold text-text-dark hover:text-primary-orange transition"
            >
              4 cơ sở
            </button>
            <button
              onClick={() => scrollTo('commitment')}
              className="text-sm font-semibold text-text-dark hover:text-primary-orange transition"
            >
              Cam kết
            </button>
            <button
              onClick={() => scrollTo('gifts')}
              className="text-sm font-semibold text-text-dark hover:text-primary-orange transition"
            >
              Quà tặng
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-sm font-semibold text-text-dark hover:text-primary-orange transition"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://zalo.me/0818823720"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-primary-purple 
                border-2 border-primary-purple rounded-lg hover:bg-primary-purple hover:text-white transition"
            >
              <MessageCircle className="w-4 h-4" />
              Zalo
            </a>
            <button
              onClick={() => scrollTo('registration-form')}
              className="px-4 py-2 bg-primary-orange text-white text-sm font-bold rounded-lg
                hover:bg-primary-orange-dark transition"
            >
              Đăng ký miễn phí →
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-text-dark"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => scrollTo('roadmap')}
                className="text-left px-2 py-3 text-sm font-semibold text-text-dark hover:bg-soft-cream rounded-lg"
              >
                Lộ trình 5 năm
              </button>
              <button
                onClick={() => scrollTo('locations')}
                className="text-left px-2 py-3 text-sm font-semibold text-text-dark hover:bg-soft-cream rounded-lg"
              >
                4 cơ sở
              </button>
              <button
                onClick={() => scrollTo('commitment')}
                className="text-left px-2 py-3 text-sm font-semibold text-text-dark hover:bg-soft-cream rounded-lg"
              >
                Cam kết minh bạch
              </button>
              <button
                onClick={() => scrollTo('gifts')}
                className="text-left px-2 py-3 text-sm font-semibold text-text-dark hover:bg-soft-cream rounded-lg"
              >
                Quà tặng
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="text-left px-2 py-3 text-sm font-semibold text-text-dark hover:bg-soft-cream rounded-lg"
              >
                FAQ
              </button>
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
                <a
                  href="https://zalo.me/0818823720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-center text-sm font-bold text-primary-purple 
                    border-2 border-primary-purple rounded-lg"
                >
                  💬 Chat Zalo
                </a>
                <button
                  onClick={() => scrollTo('registration-form')}
                  className="px-4 py-3 bg-primary-orange text-white text-sm font-bold rounded-lg"
                >
                  🎯 Đăng ký miễn phí →
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
