import TopCountdownBar from './components/TopCountdownBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ContestInfo from './components/ContestInfo.jsx';
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
import AgeCoursePopup from './components/AgeCoursePopup.jsx';

function App() {
  return (
    <>
      {/* ============ TOP BAR — countdown ưu đãi ============ */}
      <div className="sticky top-0 z-50 isolate">
        <div className="relative z-0">
          <TopCountdownBar />
        </div>

        {/* ============ HEADER — logo + nav ============ */}
        <div className="relative z-10">
          <Header />
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <main>
        {/* Section 1 — Hero */}
        <Hero />

        {/* Section 2 — Thông tin cuộc thi Robotics */}
        <ContestInfo />
        {/* Section 4 — Lộ trình 5 năm có tab */}
        <Roadmap5Years />
        {/* Section 3 — Countdown ưu đãi đặc biệt */}
        <SpecialOfferCountdown />

        

        {/* Section 5 — Phương pháp dạy */}
        <TeachingMethod />

        {/* Section 6 — 4 trung tâm Đà Nẵng */}
        <Locations />

        {/* Section 7 — Cam kết minh bạch */}
        <Commitment />

        {/* Section 8 — Quà tặng khi đăng ký */}
        <Gifts />

        {/* Section 9 — Giải thưởng nội bộ */}
        <InternalAwards />

        {/* Section 10 — Testimonials */}
        <Testimonials />

        {/* Section 11 — Form đăng ký */}
        <RegistrationForm />

        {/* Section 12 — FAQ */}
        <FAQ />

        {/* Section 13 — Kêu gọi cuối */}
        <FinalCTA />
      </main>

      {/* ============ FOOTER ============ */}
      <Footer />

      {/* ============ FLOATING CTA — Zalo + Đăng ký ============ */}
      <FloatingCTA />

      <AgeCoursePopup />
    </>
  );
}

export default App;
