import TopCountdownBar from './components/TopCountdownBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SpecialOfferCountdown from './components/SpecialOfferCountdown.jsx';
import Roadmap5Years from './components/Roadmap5Years.jsx';
import TeachingMethod from './components/TeachingMethod.jsx';
import Locations from './components/Locations.jsx';
import Commitment from './components/Commitment.jsx';
import Gifts from './components/Gifts.jsx';
import InternalAwards from './components/InternalAwards.jsx';
import Testimonials from './components/Testimonials.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import FAQ from './components/FAQ.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import FloatingCTA from './components/FloatingCTA.jsx';

function App() {
  return (
    <>
      {/* ============ TOP BAR — countdown ưu đãi ============ */}
      <TopCountdownBar />

      {/* ============ HEADER — logo + nav ============ */}
      <Header />

      {/* ============ MAIN CONTENT ============ */}
      <main>
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — Countdown ưu đãi đặc biệt */}
        <SpecialOfferCountdown />

        {/* Section 3 — Lộ trình 5 năm có tab */}
        <Roadmap5Years />

        {/* Section 4 — Phương pháp dạy */}
        <TeachingMethod />

        {/* Section 5 — 4 trung tâm Đà Nẵng */}
        <Locations />

        {/* Section 6 — Cam kết minh bạch */}
        <Commitment />

        {/* Section 7 — Quà tặng khi đăng ký */}
        <Gifts />

        {/* Section 8 — Giải thưởng nội bộ */}
        <InternalAwards />

        {/* Section 9 — Testimonials */}
        <Testimonials />

        {/* Section 10 — Form đăng ký */}
        <RegistrationForm />

        {/* Section 11 — FAQ */}
        <FAQ />

        {/* Section 12 — Kêu gọi cuối */}
        <FinalCTA />
      </main>

      {/* ============ FOOTER ============ */}
      <Footer />

      {/* ============ FLOATING CTA — Zalo + Đăng ký ============ */}
      <FloatingCTA />
    </>
  );
}

export default App;
