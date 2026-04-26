import { useEffect, useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzL_pQgB0NivwwVl9Dz8EJv5CTkRFhI7v_F9zKg5lZiBFSO0jqgo4ylqWXpNgotzSdX/exec'
const ZALO_GROUP = 'https://zalo.me/g/ovma9qgjuedypjy8mnxc'
const FACEBOOK_PIXEL_ID = '2157352735031955'
const GA4_MEASUREMENT_ID = 'G-0K2CW1DQK1'
const SALE_END_DATE = new Date('2026-05-31T23:59:59+07:00')
const LOGO_SRC = '/image/LogoSataROBO.png'
const TESTI_VIDEO_IDS = [
  'anInoYFGrF0',
  'bqB2c7AlSfE',
  '9MJFC4v8cbU',
]

function TestiVideo({ videoId }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      className={`tv-ph${playing ? ' playing' : ''}`}
      onClick={() => !playing && setPlaying(true)}
    >
      {playing ? (
        <iframe
          className="tv-iframe"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Video cảm nhận phụ huynh"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            className="tv-thumb"
            alt="Thumbnail video cảm nhận"
            onError={e => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
          />
          <div className="tv-overlay" />
          <div className="tplay">▶</div>
          <p>Bấm để xem</p>
        </>
      )}
    </div>
  )
}

export default function OfflinePage() {
  const [countdown, setCountdown] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const [popupVisible, setPopupVisible] = useState(false)
  const [floatVisible, setFloatVisible] = useState(false)
  const [thankYouVisible, setThankYouVisible] = useState(false)
  const [tyCount, setTyCount] = useState(5)
  const [modalThi, setModalThi] = useState(false)
  const [modalDaihan, setModalDaihan] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', center: '', course: '' })
  const [formLoading, setFormLoading] = useState(false)

  // Tracking injection
  useEffect(() => {
    if (!window.fbq) {
      const script = document.createElement('script')
      script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');window.fbq('init','${FACEBOOK_PIXEL_ID}');window.fbq('track','PageView');`
      document.head.appendChild(script)
    } else {
      window.fbq('track', 'PageView')
    }
    if (!window.gtag) {
      const gtagScript = document.createElement('script')
      gtagScript.async = true
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
      document.head.appendChild(gtagScript)
      const gtagInit = document.createElement('script')
      gtagInit.innerHTML = `window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${GA4_MEASUREMENT_ID}',{page_title:document.title,page_location:window.location.href});`
      document.head.appendChild(gtagInit)
    } else {
      window.gtag('config', GA4_MEASUREMENT_ID, { page_title: document.title, page_location: window.location.href })
    }
  }, [])

  // Countdown
  useEffect(() => {
    const pad = n => String(n).padStart(2, '0')
    const update = () => {
      const diff = SALE_END_DATE - new Date()
      if (diff <= 0) return
      const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5),
        m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3)
      setCountdown({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  // Popup (60s + scroll 72%)
  useEffect(() => {
    let shown = false
    const showPopup = () => { if (!shown) { shown = true; setPopupVisible(true) } }
    const timer = setTimeout(showPopup, 60000)
    const onScroll = () => {
      if ((window.scrollY + window.innerHeight) / document.body.scrollHeight > 0.72) showPopup()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll) }
  }, [])

  // Float panel
  useEffect(() => {
    const onScroll = () => setFloatVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Thank you countdown
  useEffect(() => {
    if (!thankYouVisible) return
    setTyCount(5)
    const id = setInterval(() => {
      setTyCount(c => {
        if (c <= 1) { clearInterval(id); window.location.href = ZALO_GROUP; return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [thankYouVisible])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.07 })
    document.querySelectorAll('.anim').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ESC key closes modals/popup
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        setModalThi(false); setModalDaihan(false); setPopupVisible(false)
        document.body.style.overflow = ''
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Circuit canvas animation
  useEffect(() => {
    const canvas = document.getElementById('circuit-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    let animId, nodes = [], traces = [], leds = []
    function Node(x, y) { this.x = x; this.y = y; this.r = Math.random() * 1.5 + 0.5; this.alpha = Math.random() * 0.4 + 0.1 }
    function Trace(x1, y1, x2, y2, col) {
      this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2
      this.col = col || 'rgba(168,85,247,'; this.alpha = Math.random() * 0.25 + 0.06; this.width = Math.random() > 0.7 ? 1.5 : 0.7
    }
    function LED(trace) {
      this.trace = trace; this.t = Math.random()
      this.speed = (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1)
      var cols = ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(245,158,11,', 'rgba(16,185,129,']
      this.col = cols[Math.floor(Math.random() * cols.length)]; this.size = Math.random() * 3 + 1.5
    }
    LED.prototype.update = function () { this.t += this.speed; if (this.t > 1) this.t = 0; if (this.t < 0) this.t = 1 }
    LED.prototype.draw = function () {
      var tr = this.trace, x = tr.x1 + (tr.x2 - tr.x1) * this.t, y = tr.y1 + (tr.y2 - tr.y1) * this.t
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.col + '1)'; ctx.shadowColor = this.col + '1)'; ctx.shadowBlur = 12; ctx.fill(); ctx.restore()
    }
    function build() {
      var W = canvas.width, H = canvas.height; nodes = []; traces = []; leds = []
      var GRID = 80, cols = Math.ceil(W / GRID) + 1, rows = Math.ceil(H / GRID) + 1, pts = []
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) if (Math.random() < 0.72) pts.push({ x: c * GRID + (Math.random() * 20 - 10), y: r * GRID + (Math.random() * 20 - 10) })
      var used = new Set()
      pts.forEach(function (p, i) {
        pts.forEach(function (q, j) {
          if (i >= j) return; var key = i + '_' + j; if (used.has(key)) return
          var dx = Math.abs(p.x - q.x), dy = Math.abs(p.y - q.y)
          if ((dx < GRID * 1.4 && dy < 12) || (dy < GRID * 1.4 && dx < 12)) { used.add(key); traces.push(new Trace(p.x, p.y, q.x, q.y, Math.random() > 0.6 ? 'rgba(6,182,212,' : 'rgba(168,85,247,')) }
        })
        nodes.push(new Node(p.x, p.y))
      })
      traces.forEach(function (tr) { if (Math.random() < 0.18) leds.push(new LED(tr)) })
      while (leds.length > 80) leds.splice(Math.floor(Math.random() * leds.length), 1)
    }
    var tick = 0
    function draw() {
      tick++; ctx.clearRect(0, 0, canvas.width, canvas.height)
      traces.forEach(function (tr) {
        ctx.beginPath(); ctx.moveTo(tr.x1, tr.y1); ctx.lineTo(tr.x2, tr.y2); ctx.strokeStyle = tr.col + tr.alpha + ')'; ctx.lineWidth = tr.width
        if (tick % 120 === 0 && Math.random() > 0.8) tr.alpha = Math.min(0.5, tr.alpha + 0.15)
        else tr.alpha = Math.max(0.05, tr.alpha - 0.0005); ctx.stroke()
      })
      nodes.forEach(function (n) {
        var a = n.alpha + Math.sin(tick * 0.02 + n.x * 0.05) * 0.05
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(168,85,247,' + a + ')'; ctx.shadowColor = 'rgba(168,85,247,.5)'; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0
      })
      leds.forEach(function (led) { led.update(); led.draw() })
      animId = requestAnimationFrame(draw)
    }
    build(); draw()
    const onResize = () => { resize(); build() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, phone, center, course } = formData
    if (!name || !phone || !center || !course) { alert('Vui long dien day du thong tin bat buoc (co dau *)!'); return }
    if (!/^[0-9]{9,11}$/.test(phone.replace(/\s/g, ''))) { alert('So dien thoai khong hop le. Vui long nhap lai!'); return }
    setFormLoading(true)
    const payload = {
      ...formData,
      source: 'offline_landing',
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      timestamp: new Date().toLocaleString('vi-VN')
    }
    try {
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } catch (err) { console.error('[Sata Robo] Sheets error:', err) }
    if (window.fbq) window.fbq('track', 'Lead', { content_name: formData.course, content_category: formData.center })
    if (window.gtag) window.gtag('event', 'generate_lead', { course_name: formData.course, center: formData.center, method: 'registration_form' })
    setTimeout(() => {
      setFormLoading(false); setFormData({ name: '', phone: '', email: '', center: '', course: '' })
      setThankYouVisible(true); document.body.style.overflow = 'hidden'
    }, 1400)
  }

  const openModalThi = () => { setModalThi(true); document.body.style.overflow = 'hidden' }
  const closeModalThi = () => { setModalThi(false); document.body.style.overflow = '' }
  const openModalDaihan = () => { setModalDaihan(true); document.body.style.overflow = 'hidden' }
  const closeModalDaihan = () => { setModalDaihan(false); document.body.style.overflow = '' }
  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx)
  const goToZalo = () => { window.location.href = ZALO_GROUP }
  const closeTY = () => { setThankYouVisible(false); document.body.style.overflow = ''; window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const faqItems = [
    { q: 'Con chua bao gio hoc Robotics, co theo kip khong?', a: 'Hoan toan duoc! Do chinh xac la ly do buoi Test Nang Luc mien phi - de phan loai va xep con vao dung cap do. Lo trinh bat dau tu so 0 voi cau truc Dai cuong - Chuyen sau - Du an, dam bao moi hoc sinh deu co the theo kip va phat trien tot.' },
    { q: 'Lop hoc co dong khong? Con co duoc chu y rieng khong?', a: 'Cam ket cung: Toi da 12 hoc sinh/lop. Voi 12 hoc sinh, moi thay co tuong tac 1-1 voi tung con trong moi buoi hoc, theo doi tien do va dieu chinh phuong phap phu hop tung hoc sinh.' },
    { q: 'Hoc phi co the dong tung dot khong?', a: 'Hoan toan co the! Phu huynh dang ky tung hoc phan (12 buoi) va nang len bat ky luc nao - phan da dong duoc tru vao gia moi. Uu dai truoc 31/05/2026: 30% so voi gia niem yet. Sata Robo cung ho tro tra gop cho goi Full 48 buoi.' },
    { q: 'Neu khong hai long sau khi hoc, co hoan tien khong?', a: 'Cam ket hoan tien 100% sau 2 buoi dau tien neu khong hai long - khong can giai thich ly do. Buoi 1 la Test Nang Luc mien phi. Buoi 2 la buoi hoc chinh thuc dau tien. Cam ket bang van ban.' },
    { q: 'Phu huynh nhan duoc thong tin gi ve qua trinh hoc cua con?', a: 'Moi thang: Bao cao Phat trien qua Zalo gom tien do hoc tap, diem manh, diem can cai thien, anh va video thuc hanh. Sau moi 12 buoi: bai kiem tra nang luc + bao cao chi tiet. Phu huynh duoc moi du Buoi Thuyet trinh Ky Su Nhi cuoi moi hoc phan.' },
    { q: 'Khoa 16 buoi co du de thi cuoc thi TW Doan khong?', a: 'Khoa Robosim Master 2026 (16 buoi) tap trung chuyen sau ky nang thi RoboSim - du de tu tin buoc vao phong thi. Neu con chua co nen tang Robotics, lien he Zalo 0818.823.720 de duoc tu van lo trinh ket hop phu hop nhat.' },
    { q: 'Muon tu van them truoc khi quyet dinh, lien he o dau?', a: 'Nhan Zalo 0818.823.720 - phan hoi trong 2 gio. Khong co cau hoi nao la khong quan trong. Hoac den truc tiep 1 trong 4 trung tam de tham quan phong Lab va gap giang vien.' }
  ]

  const faqItemsVi = [
    {
      q: 'Con chưa bao giờ học Robotics, có theo kịp không?',
      a: 'Hoàn toàn được! Đó chính xác là lý do buổi Test Năng Lực miễn phí — để phân loại và xếp con vào đúng cấp độ. Lộ trình bắt đầu từ số 0 với cấu trúc Đại cương → Chuyên sâu → Dự án, đảm bảo mọi học sinh đều có thể theo kịp và phát triển tốt.'
    },
    {
      q: 'Lớp học có đông không? Con có được chú ý riêng không?',
      a: 'Cam kết cứng: Tối đa 12 học sinh/lớp. Với 12 học sinh, mỗi thầy cô tương tác 1-1 với từng con trong mỗi buổi học, theo dõi tiến độ và điều chỉnh phương pháp phù hợp từng học sinh.'
    },
    {
      q: 'Học phí có thể đóng từng đợt không?',
      a: 'Hoàn toàn có thể! Phụ huynh đăng ký từng học phần (12 buổi) và nâng lên bất kỳ lúc nào — phần đã đóng được trừ vào giá mới. Ưu đãi trước 31/05/2026: 30% so với giá niêm yết. Sata Robo cũng hỗ trợ trả góp cho gói Full 48 buổi.'
    },
    {
      q: 'Nếu không hài lòng sau khi học, có hoàn tiền không?',
      a: 'Cam kết hoàn tiền 100% sau 2 buổi đầu tiên nếu không hài lòng — không cần giải thích lý do. Buổi 1 là Test Năng Lực miễn phí. Buổi 2 là buổi học chính thức đầu tiên. Cam kết bằng văn bản.'
    },
    {
      q: 'Phụ huynh nhận được thông tin gì về quá trình học của con?',
      a: 'Mỗi tháng: “Báo cáo Phát triển” qua Zalo gồm tiến độ học tập, điểm mạnh, điểm cần cải thiện, ảnh và video thực hành. Sau mỗi 12 buổi: bài kiểm tra năng lực + báo cáo chi tiết. Phụ huynh được mời dự Buổi Thuyết trình Kỹ Sư Nhí cuối mỗi học phần.'
    },
    {
      q: 'Khóa 16 buổi có đủ để thi cuộc thi TW Đoàn không?',
      a: 'Khóa Robosim Master 2026 (16 buổi) tập trung chuyên sâu kỹ năng thi RoboSim — đủ để tự tin bước vào phòng thi. Nếu con chưa có nền tảng Robotics, liên hệ Zalo 0818.823.720 để được tư vấn lộ trình kết hợp phù hợp nhất.'
    },
    {
      q: 'Muốn tư vấn thêm trước khi quyết định, liên hệ ở đâu?',
      a: 'Nhắn Zalo 0818.823.720 — phản hồi trong 2 giờ. Không có câu hỏi nào là không quan trọng. Hoặc đến trực tiếp 1 trong 4 trung tâm để tham quan phòng Lab và gặp giảng viên.'
    }
  ]

  return (
    <>
      <style>{OFFLINE_PAGE_STYLES}</style>
      <canvas id="circuit-canvas"></canvas>

      {/* SALE BAR */}
      <div id="sale-bar">
        <span style={{ color: '#fff' }}>🔥 ƯU ĐÃI ĐĂNG KÝ SỚM — Kết thúc sau:
          <span className="sb-cd">
            <span className="cd-u"><span className="cd-n">{countdown.d}</span><span className="cd-l">ngày</span></span>
            <span className="cd-sep">:</span>
            <span className="cd-u"><span className="cd-n">{countdown.h}</span><span className="cd-l">giờ</span></span>
            <span className="cd-sep">:</span>
            <span className="cd-u"><span className="cd-n">{countdown.m}</span><span className="cd-l">phút</span></span>
            <span className="cd-sep">:</span>
            <span className="cd-u"><span className="cd-n">{countdown.s}</span><span className="cd-l">giây</span></span>
          </span>
        </span>
        <span style={{ color: '#fca5a5', fontSize: '11px' }}>| Sau 31/05/2026 học phí trở về mức niêm yết</span>
      </div>

      {/* NAVBAR */}
      <nav>
        <div className="nav-in">
          <div className="nav-brand">
            <img src={LOGO_SRC} className="nav-logo-img" alt="Sata Robo" />
            <div className="nav-brand-text">
              <div className="nav-sl">Khơi Nguồn Sáng Tạo</div>
              <div className="nav-sl">Chắp Cánh Tương Lai</div>
            </div>
          </div>
          <div className="nav-links">
            <a href="#products">Khóa học</a>
            <a href="#locations">Cơ sở</a>
            <a href="#countdown-urgency">Ưu đãi</a>
            <a href="#register">Đăng ký</a>
          </div>
          <a href="#register" className="nav-cta btn">🚀 Đăng Ký Test Miễn Phí</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="circuit-bg">
        <div className="cl-wrap">
          <div className="cl cl-h cl-p" style={{ top: '18%', left: 0, right: 0, animationDelay: '0s' }}></div>
          <div className="cl cl-h cl-p" style={{ top: '68%', left: 0, right: 0, animationDelay: '1.5s' }}></div>
          <div className="cl cl-v cl-p" style={{ left: '12%', top: 0, bottom: 0, animationDelay: '.7s' }}></div>
          <div className="cl cl-v cl-p" style={{ left: '85%', top: 0, bottom: 0, animationDelay: '2s' }}></div>
          <div className="cdot" style={{ top: '18%', left: '12%', animationDelay: '0s' }}></div>
          <div className="cdot" style={{ top: '68%', left: '85%', animationDelay: '1.5s' }}></div>
        </div>
        <div className="container z1">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-proof">
                <span className="hero-proof-badge">✓ 4 Cơ Sở Đà Nẵng</span>
                <span className="hero-proof-badge">✓ Lớp 1 → Lớp 8</span>
                <span className="hero-proof-badge">✓ Test Miễn Phí</span>
                <span className="hero-proof-badge">✓ Hoàn Tiền 100%</span>
              </div>
              <div className="hook">⚡ Ba mẹ ơi — Có một nơi ở Đà Nẵng, con được tự tay lắp robot, lập trình và thi đấu thật sự mỗi tuần!</div>
              <h1 className="hero-h1">Trang bị cho con<br /><em>hành&nbsp;trang&nbsp;công&nbsp;nghệ</em><br />từ đam mê đầu đời<br />đến thi đấu quốc tế</h1>
              <p className="ssub">Hàng trăm học sinh Đà Nẵng đang chọn học lý thuyết khô khan — trong khi con có thể thực hành với robot thật, thầy thật, phòng Lab thật tại 4 trung tâm Sata Robo.</p>
              <div className="hero-btns">
                <div className="hero-row">
                  <a href="#products" className="btn btn-r1">🏆 Xem Khóa Thi Đấu</a>
                  <a href="#products" className="btn btn-r2">🚀 Xem Lộ Trình Dài Hạn</a>
                </div>
                <div className="hero-row">
                  <a href="#register" className="btn btn-test">🎯 Đăng Ký Test Miễn Phí →</a>
                  <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo">💬 Zalo Tư Vấn</a>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-card">
                <div className="hc-header">
                  <div className="hc-icon-wrap"><span>📍</span></div>
                  <div>
                    <div className="hero-card-title">4 CƠ SỞ TẠI ĐÀ NẴNG</div>
                    <div className="hc-subtitle">Gần nhà — Phòng Lab hiện đại</div>
                  </div>
                </div>
                <div className="hero-loc">
                  <div className="loc-row">
                    <div className="loc-num-badge">01</div>
                    <div className="loc-info"><div className="loc-name">60 Lê Lợi</div><div className="loc-dist">P. Hải Châu</div></div>
                    <div className="loc-active"></div>
                  </div>
                  <div className="loc-row">
                    <div className="loc-num-badge">02</div>
                    <div className="loc-info"><div className="loc-name">258 Lê Thanh Nghị</div><div className="loc-dist">P. Hoà Cường</div></div>
                    <div className="loc-active"></div>
                  </div>
                  <div className="loc-row">
                    <div className="loc-num-badge">03</div>
                    <div className="loc-info"><div className="loc-name">232 Nguyễn Phước Lan</div><div className="loc-dist">P. Cẩm Lệ</div></div>
                    <div className="loc-active"></div>
                  </div>
                  <div className="loc-row">
                    <div className="loc-num-badge">04</div>
                    <div className="loc-info"><div className="loc-name">269 Điện Biên Phủ</div><div className="loc-dist">P. Hoà Khê</div></div>
                    <div className="loc-active"></div>
                  </div>
                </div>
                <div className="hc-divider"></div>
                <div className="hero-stats">
                  <div className="hstat"><div className="hstat-n">5</div><div className="hstat-l">Khóa dài hạn</div></div>
                  <div className="hstat"><div className="hstat-n">2</div><div className="hstat-l">Khóa thi đấu</div></div>
                  <div className="hstat"><div className="hstat-n">48</div><div className="hstat-l">Buổi/module</div></div>
                  <div className="hstat"><div className="hstat-n">36M</div><div className="hstat-l">Giải thưởng/năm</div></div>
                </div>
                <a href="#register" className="hc-cta-btn">🎯 Đăng Ký Test Miễn Phí →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LARGE COUNTDOWN */}
      <section id="countdown-urgency" className="circuit-bg">
        <div className="cl-wrap">
          <div className="cl cl-h cl-p" style={{ top: '30%', left: 0, right: 0, animationDelay: '.3s' }}></div>
          <div className="cdot" style={{ top: '30%', left: '50%', animationDelay: '.3s' }}></div>
        </div>
        <div className="container z1 text-center">
          <div className="lc-badge"><span className="fire">🔥</span> ƯU ĐÃI ĐẶC BIỆT — CHỈ CÒN</div>
          <h2 className="st" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>
            Đăng ký trước <span className="gold">31/05/2026</span> — Tiết kiệm <span className="acc">30%</span> học phí!
          </h2>
          <p className="lc-sub">Sau ngày 31/05, học phí trở về mức niêm yết đầy đủ. Đừng để con bỏ lỡ ưu đãi tốt nhất năm!</p>
          <div className="lc-units">
            <div className="lc-unit"><div className="lc-num">{countdown.d}</div><div className="lc-lbl">Ngày</div></div>
            <div className="lc-sep">:</div>
            <div className="lc-unit"><div className="lc-num">{countdown.h}</div><div className="lc-lbl">Giờ</div></div>
            <div className="lc-sep">:</div>
            <div className="lc-unit"><div className="lc-num">{countdown.m}</div><div className="lc-lbl">Phút</div></div>
            <div className="lc-sep">:</div>
            <div className="lc-unit"><div className="lc-num">{countdown.s}</div><div className="lc-lbl">Giây</div></div>
          </div>
          <div className="urg-bar-wrap"><div className="urg-bar"></div></div>
          <div className="lc-cta">
            <div className="lc-cta-row">
              <a href="#register" className="btn btn-test" style={{ fontSize: '16px', padding: '17px 36px' }}>🎯 Đăng Ký Ngay — Nhận Ưu Đãi 30% →</a>
              <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo" style={{ fontSize: '14px' }}>💬 Zalo Tư Vấn Miễn Phí</a>
            </div>
            <button className="btn-dismiss" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Tôi cần đọc thêm thông tin trước — Để sau ↓
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="container text-center">
          <div className="sbadge">🤖 Sata Robo Offline</div>
          <h2 className="st">Chọn <span className="acc">Hành Trình</span><br />Phù Hợp Với Con</h2>
          <p className="ssub" style={{ maxWidth: '640px', margin: '0 auto 40px' }}>Hai nhóm sản phẩm — một cho thi đấu ngay, một xây nền tảng từ lớp 1 đến lớp 8.</p>
          <div className="pg-grid">
            <div className="pg-card anim" onClick={openModalThi} style={{ cursor: 'pointer' }}>
              <span className="pg-icon">🏆</span>
              <div className="pg-title">Nhóm 1: Khóa Thi Đấu</div>
              <p className="pg-sub">Luyện thi Robotics chuyên sâu — chuẩn bị cho cuộc thi do TW Đoàn và Thành Đoàn Đà Nẵng phát động. 16 buổi thực chiến, quà tặng và hỗ trợ thi đấu đầy đủ.</p>
              <div className="pg-tags">
                <span className="pg-tag nowrap">⏱ 16 buổi / khóa</span>
                <span className="pg-tag nowrap">🎯 TW Đoàn &amp; Thành Đoàn ĐN</span>
                <span className="pg-tag nowrap">🏅 Thi đấu thực chiến</span>
              </div>
              <div className="pg-courses">
                <div className="pg-course">Robosim Master 2026 — Offline</div>
                <div className="pg-course">Chiến Binh Robot 2026 — Offline</div>
              </div>
              <div className="pg-cta">📖 Xem chi tiết thông tin khóa học <span style={{ fontSize: '20px' }}>→</span></div>
            </div>
            <div className="pg-card oc anim" onClick={openModalDaihan} style={{ cursor: 'pointer' }}>
              <span className="pg-icon">🚀</span>
              <div className="pg-title">Nhóm 2: Lộ Trình Dài Hạn</div>
              <p className="pg-sub">Hành trình từ lớp 1 đến lớp 8 — mỗi module 48 buổi theo 4 học phần bài bản. Thi nội bộ hàng tháng — giải thưởng 36 triệu/năm.</p>
              <div className="pg-tags">
                <span className="pg-tag ot nowrap">⏱ 48 buổi / module</span>
                <span className="pg-tag ot nowrap">📚 Lớp 1 → Lớp 8</span>
                <span className="pg-tag ot nowrap">🏅 Championship 36tr/năm</span>
              </div>
              <div className="pg-courses">
                <div className="pg-course">🌱 Ươm Mầm Tài Năng — Lớp 1–2</div>
                <div className="pg-course">🚀 Bức Phá Giới Hạn — Lớp 3–4</div>
                <div className="pg-course">⚡ Khơi Nguồn Sáng Tạo — Lớp 5</div>
                <div className="pg-course">🏆 Chinh Phục Đấu Trường — Lớp 6–7</div>
                <div className="pg-course">🤖 Kiến Tạo Tương Lai — Lớp 8</div>
              </div>
              <div className="pg-cta" style={{ color: 'var(--orange)' }}>📖 Xem chi tiết thông tin khóa học <span style={{ fontSize: '20px' }}>→</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="sec-mid">
        <div className="container text-center">
          <div className="sbadge-cyan">📍 Địa điểm học</div>
          <h2 className="st">4 Trung Tâm <span className="cyan">Sata Robo</span><br />Phủ Khắp Đà Nẵng</h2>
          <p className="ssub">Trong hệ sinh thái Sata — cùng hệ thống với các cơ sở toán uy tín. Gần nhà, tiện lợi, phòng Lab hiện đại.</p>
          <div className="loc-grid">
            <div className="loc-card anim"><div style={{ fontSize: '28px', marginBottom: '10px' }}>🏫</div><div className="loc-num">01</div><div className="loc-addr">60 Lê Lợi</div><div style={{ fontSize: '12px', color: 'var(--gray)' }}>P. Hải Châu</div></div>
            <div className="loc-card anim"><div style={{ fontSize: '28px', marginBottom: '10px' }}>🏫</div><div className="loc-num">02</div><div className="loc-addr">258 Lê Thanh Nghị</div><div style={{ fontSize: '12px', color: 'var(--gray)' }}>P. Hoà Cường</div></div>
            <div className="loc-card anim"><div style={{ fontSize: '28px', marginBottom: '10px' }}>🏫</div><div className="loc-num">03</div><div className="loc-addr">232 Nguyễn Phước Lan</div><div style={{ fontSize: '12px', color: 'var(--gray)' }}>P. Cẩm Lệ</div></div>
            <div className="loc-card anim"><div style={{ fontSize: '28px', marginBottom: '10px' }}>🏫</div><div className="loc-num">04</div><div className="loc-addr">269 Điện Biên Phủ</div><div style={{ fontSize: '12px', color: 'var(--gray)' }}>P. Hoà Khê</div></div>
          </div>
        </div>
      </section>

      {/* CAM KET */}
      <section id="cam-ket">
        <div className="ck-glow1"></div><div className="ck-glow2"></div>
        <div className="container z1">
          <div className="ck-header">
            <div className="ck-supertitle">🛡️ Cam Kết Minh Bạch — Đo Được — Bảo Đảm</div>
            <h2 className="ck-h1"><span className="ck-white">6 Cam Kết </span><span className="ck-accent">Minh Bạch</span><br /><span className="ck-white">Của </span><span className="ck-gold">Sata Robo</span></h2>
            <p className="ck-desc">Không hứa hẹn chung chung — mỗi cam kết đều <strong style={{ color: '#fff' }}>đo lường được</strong> và có <strong style={{ color: '#fff' }}>cơ chế bảo đảm cụ thể</strong>.</p>
            <div className="ck-trustbar">
              <div className="ck-trust">✅ Cam kết bằng văn bản</div>
              <div className="ck-trust">✅ Đo được sau mỗi 12 buổi</div>
              <div className="ck-trust">✅ Hoàn tiền 100% nếu không hài lòng</div>
            </div>
          </div>
          <div className="ck-grid">
            <div className="ck-card anim"><div className="ck-num ck-num-default">#1</div><span className="ck-icon">🎯</span><div className="ck-title">Kết Quả Đo Được Mỗi Học Phần</div><div className="ck-body">Sau mỗi 12 buổi: bài kiểm tra năng lực + báo cáo Zalo chi tiết. <strong style={{ color: '#fff' }}>Chưa đạt → bù 3 buổi miễn phí.</strong></div><div className="ck-pill">✓ Đo được &amp; bù học</div></div>
            <div className="ck-card featured anim"><div className="ck-ribbon">⭐ Nổi Bật Nhất</div><div className="ck-num ck-num-gold">#2</div><span className="ck-icon">🔄</span><div className="ck-title gold-title">Trải Nghiệm 2 Buổi — Hoàn Tiền 100%</div><div className="ck-body">Buổi 1: Test Năng Lực <strong style={{ color: 'var(--gold)' }}>miễn phí</strong>. Không hài lòng → <strong style={{ color: 'var(--gold)' }}>hoàn 100% không hỏi thêm.</strong></div><div className="ck-pill gold-pill">💰 Hoàn tiền 100%</div></div>
            <div className="ck-card anim"><div className="ck-num ck-num-default">#3</div><span className="ck-icon">🏆</span><div className="ck-title">Kỹ Năng Thi Đấu Thực Chiến</div><div className="ck-body">100% học viên hoàn thành <strong style={{ color: '#fff' }}>đủ kỹ năng dự thi vòng đấu bản Robotics quốc gia.</strong></div><div className="ck-pill">✓ Thi đấu thực chiến</div></div>
          </div>
          <div className="ck-grid" style={{ marginTop: '20px' }}>
            <div className="ck-card anim"><div className="ck-num ck-num-default">#4</div><span className="ck-icon">👨‍🏫</span><div className="ck-title">Giảng Viên Đã Qua Đào Tạo Chuẩn</div><div className="ck-body">100% GV có chứng nhận chuẩn. <strong style={{ color: '#fff' }}>Lớp tối đa 12 học sinh</strong> — tương tác 1-1 với từng con.</div><div className="ck-pill">✓ Lớp ≤12 học sinh</div></div>
            <div className="ck-card anim"><div className="ck-num ck-num-default">#5</div><span className="ck-icon">📊</span><div className="ck-title">Báo Cáo Phát Triển Hàng Tháng</div><div className="ck-body">Phụ huynh nhận <strong style={{ color: '#fff' }}>"Báo cáo Phát triển"</strong> qua Zalo hàng tháng: tiến độ, điểm mạnh, ảnh &amp; video.</div><div className="ck-pill">✓ Báo cáo minh bạch</div></div>
            <div className="ck-card anim"><div className="ck-num ck-num-default">#6</div><span className="ck-icon">🎙️</span><div className="ck-title">Tự Tin Thuyết Trình &amp; Phản Biện</div><div className="ck-body">Mỗi HP kết thúc: <strong style={{ color: '#fff' }}>Thuyết trình Kỹ Sư Nhí</strong> trước phụ huynh — tự tin đứng nói trước đám đông.</div><div className="ck-pill">✓ Kỹ năng mềm thực tế</div></div>
          </div>
          <div className="ck-bottom-cta">
            <div className="ck-bottom-wrap">
              <div className="ck-bottom-title">🎯 6 Cam Kết = 6 Lý Do Ba Mẹ Tin Tưởng Sata Robo</div>
              <div className="ck-bottom-sub">Không cần đặt cọc, không cần ký hợp đồng ngay. Đăng ký buổi Test miễn phí trải nghiệm trực tiếp trước khi quyết định.</div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#register" className="btn btn-test" style={{ fontSize: '15px', padding: '15px 32px' }}>🚀 Đăng Ký Test Miễn Phí →</a>
                <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo">💬 Hỏi Thêm Qua Zalo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GIFTS */}
      <section className="sec-mid">
        <div className="container text-center">
          <div className="sbadge-gold">🎁 Quà tặng khi đăng ký</div>
          <h2 className="st">Bộ Quà Tặng <span className="gold">Giá Trị</span> Kèm Theo</h2>
          <p className="ssub">Đăng ký càng sớm, quà tặng càng nhiều. Minh bạch và chân thực.</p>
          <div className="gift-grid">
            <div className="gift-card g16 anim"><div className="gift-emoji">🎒</div><div className="gift-title">Khóa 16 Buổi</div><div className="gift-val">~300.000đ</div><div className="gift-items"><div className="gift-item">👕 Áo thun siêu nhân Sata Robo</div><div className="gift-item">📚 Bộ tài liệu học tập chính thức</div></div><div className="gift-cond">Đăng ký &amp; đóng học phí đầu tiên</div></div>
            <div className="gift-card g48 anim"><div className="gift-emoji">⭐</div><div className="gift-title">Khóa Full 48 Buổi</div><div className="gift-val">~500.000đ</div><div className="gift-items"><div className="gift-item">👕 Áo thun siêu nhân Sata Robo</div><div className="gift-item">📚 Bộ tài liệu học tập chính thức</div><div className="gift-item">🎒 Cặp học sinh Sata Robo</div><div className="gift-item">🎁 Quà gia tăng đặc biệt</div></div><div className="gift-cond">Đăng ký Full 48 buổi &amp; đóng học phí</div></div>
            <div className="gift-card drone anim"><div className="gift-emoji">🛸</div><div className="gift-title">BONUS ĐẶC BIỆT: Drone!</div><div className="gift-val" style={{ color: 'var(--cyan2)' }}>500k–800k</div><div className="gift-items"><div className="gift-item">🛸 Thiết bị Drone mini mang về nhà</div><div className="gift-item">✅ Cộng thêm lên tất cả quà trên</div></div><div className="gift-cond">🔥 Full 48 buổi + đóng tiền NGAY trong ngày Test</div></div>
          </div>
        </div>
      </section>

      {/* CHAMPIONSHIP */}
      <section className="sec-dark circuit-bg">
        <div className="cl-wrap"><div className="cl cl-h cl-p" style={{ top: '45%', left: 0, right: 0, animationDelay: '.3s' }}></div></div>
        <div className="container z1 text-center">
          <div className="sbadge-gold">🏆 Giải thưởng nội bộ</div>
          <h2 className="st">Sata Robo Championship<br /><span className="gold">36.000.000đ</span> Giải Thưởng Mỗi Năm</h2>
          <p className="ssub">12 kỳ thi hàng tháng — dành riêng cho học viên tại các trung tâm Sata Robo.</p>
          <div className="prize-hdr"><div className="prize-tot">36.000.000 VNĐ</div><div style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)' }}>12 kỳ × 3.000.000đ / kỳ</div></div>
          <table className="prize-tbl">
            <thead><tr><th>Hạng mục</th><th>Giải thưởng</th><th>Ghi chú</th></tr></thead>
            <tbody>
              <tr><td>🥇 Giải Nhất</td><td><span className="prize-val">1.200.000đ</span> + Trophy + Chứng nhận</td><td>Vinh danh toàn bộ fanpage Sata Robo</td></tr>
              <tr><td>🥈 Giải Nhì</td><td><span className="prize-val">800.000đ</span> + Chứng nhận</td><td>Ảnh lưu niệm tại Lab + gửi Zalo PH</td></tr>
              <tr><td>🥉 Giải Ba</td><td><span className="prize-val">500.000đ</span> + Chứng nhận</td><td>Cùng cơ chế vinh danh</td></tr>
              <tr><td>🎖 Khuyến Khích ×3</td><td><span className="prize-val">200.000đ</span> × 3 (voucher/kit)</td><td>3 học viên xuất sắc tiếp theo</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testi">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="sbadge">💬 Phụ huynh và học sinh nói gì</div>
            <h2 className="st">Hàng trăm học sinh đã tham gia khóa học<br /><span className="gold">và hào hứng làm được bài tập thực tế</span></h2>
            <p className="ssub" style={{ margin: '0 auto 28px', maxWidth: '620px' }}>Cảm nhận thực tế từ phụ huynh và học sinh đã trải qua hành trình luyện thi cùng Sata Robo</p>
          </div>
          <div className="tg">
            {/* Phụ huynh 1 */}
            <div className="tc">
              <div className="ts">★★★★★</div>
              <div className="tq">"Con học 3 tuần, từ chỗ không biết bắt đầu từ đâu đến khi thi thử đạt 85% điểm. Điều tôi thích nhất là AI chấm bài ngay — tôi biết chắc con hiểu bài trước khi học tiếp, khác hoàn toàn so với xem YouTube."</div>
              <div className="ta">
                <div className="tav">NA</div>
                <div><div className="tn">Anh Ngọc Anh</div><div className="ti">Phụ huynh bạn Duy Tùng · Đà Nẵng</div></div>
              </div>
              <TestiVideo videoId={TESTI_VIDEO_IDS[0]} />
            </div>
            {/* Phụ huynh 2 */}
            <div className="tc">
              <div className="ts">★★★★★</div>
              <div className="tq">"Ban đầu lo con học online không hiệu quả. Nhưng 27.000 đồng mỗi buổi — rẻ hơn cả nửa cốc trà sữa — mà con tiến bộ rõ rệt sau 2 tuần. Con học hào hứng và làm được bài tập thực hành rất tốt."</div>
              <div className="ta">
                <div className="tav">TS</div>
                <div><div className="tn">Anh Trường Sơn</div><div className="ti">Phụ huynh bạn Minh Châu · Đà Nẵng</div></div>
              </div>
              <TestiVideo videoId={TESTI_VIDEO_IDS[1]} />
            </div>
            {/* Phụ huynh 3 */}
            <div className="tc">
              <div className="ts">★★★★★</div>
              <div className="tq">"Con thi Robotics năm ngoái không vào được vòng chung kết vì không có chiến lược. Năm nay học khóa này, con tự làm được bài tập và hiểu rõ cách sắp xếp thứ tự nhiệm vụ. Tự tin hơn hẳn khi bước vào phòng thi!"</div>
              <div className="ta">
                <div className="tav">MT</div>
                <div><div className="tn">Chị Mỹ Trang</div><div className="ti">Phụ huynh bạn Gia Hân · Đà Nẵng</div></div>
              </div>
              <TestiVideo videoId={TESTI_VIDEO_IDS[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* REGISTER FORM */}
      <section id="register" className="circuit-bg">
        <div className="cl-wrap">
          <div className="cl cl-h cl-p" style={{ top: '20%', left: 0, right: 0 }}></div>
          <div className="cl cl-h cl-p" style={{ top: '80%', left: 0, right: 0, animationDelay: '1s' }}></div>
        </div>
        <div className="container z1">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <div className="sbadge-gold">📋 Đăng ký buổi test miễn phí</div>
            <h2 className="st">Bắt Đầu <span className="gold">Hành Trình</span><br />Của Con Ngay Hôm Nay</h2>
            <p className="ssub">Điền thông tin — Đội ngũ Sata Robo liên hệ trong <strong>2 giờ</strong> để xếp lịch buổi Test miễn phí!</p>
          </div>
          <div className="form-card">
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', fontFamily: 'var(--fh)', color: '#fff', marginBottom: '6px' }}>📝 Thông Tin Đăng Ký</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)' }}>Buổi Test miễn phí · Không ràng buộc · Hoàn tiền 100% sau 2 buổi đầu nếu không hài lòng</div>
            </div>
            <form id="reg-form" autoComplete="off" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="fg full">
                  <label className="flbl" htmlFor="f-name">Họ và tên phụ huynh <span className="req">*</span></label>
                  <input type="text" id="f-name" className="finput" placeholder="Ví dụ: Nguyễn Thị Lan" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="fg">
                  <label className="flbl" htmlFor="f-phone">Số điện thoại <span className="req">*</span></label>
                  <input type="tel" id="f-phone" className="finput" placeholder="0912 345 678" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="fg">
                  <label className="flbl" htmlFor="f-email">Email</label>
                  <input type="email" id="f-email" className="finput" placeholder="email@gmail.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="fg">
                  <label className="flbl" htmlFor="f-center">Chọn cơ sở học <span className="req">*</span></label>
                  <select id="f-center" className="fsel" required value={formData.center} onChange={e => setFormData({ ...formData, center: e.target.value })}>
                    <option value="">-- Chọn cơ sở gần bạn --</option>
                    <option value="60 Lê Lợi">60 Lê Lợi</option>
                    <option value="258 Lê Thanh Nghị">258 Lê Thanh Nghị</option>
                    <option value="232 Nguyễn Phước Lan">232 Nguyễn Phước Lan</option>
                    <option value="269 Điện Biên Phủ">269 Điện Biên Phủ</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="flbl" htmlFor="f-course">Khóa học quan tâm <span className="req">*</span></label>
                  <select id="f-course" className="fsel" required value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })}>
                    <option value="">-- Chọn khóa học cho con --</option>
                    <optgroup label="🏆 Nhóm 1 — Khóa Thi Đấu">
                      <option value="Robosim Master 2026 - Offline">🎮 Robosim Master 2026 — Offline</option>
                      <option value="Chiến Binh Robot 2026 - Offline">⚔️ Chiến Binh Robot 2026 — Offline</option>
                    </optgroup>
                    <optgroup label="🚀 Nhóm 2 — Lộ Trình Dài Hạn">
                      <option value="Ươm Mầm Tài Năng - Lớp 1-2">🌱 Ươm Mầm Tài Năng — Lớp 1–2</option>
                      <option value="Bức Phá Giới Hạn - Lớp 3-4">🚀 Bức Phá Giới Hạn — Lớp 3–4</option>
                      <option value="Khơi Nguồn Sáng Tạo - Lớp 5">⚡ Khơi Nguồn Sáng Tạo — Lớp 5</option>
                      <option value="Chinh Phục Đấu Trường - Lớp 6-7">🏆 Chinh Phục Đấu Trường — Lớp 6–7</option>
                      <option value="Kiến Tạo Tương Lai - Lớp 8">🤖 Kiến Tạo Tương Lai — Lớp 8</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <button type="submit" className="fsubmit" id="submit-btn" disabled={formLoading}>
                {formLoading ? '⏳ Đang gửi...' : '🚀 Đăng Ký Buổi Test Miễn Phí Ngay!'}
              </button>
              <p className="fnote">🔒 Thông tin của bạn được bảo mật tuyệt đối.<br />Sata Robo cam kết không chia sẻ dữ liệu với bên thứ ba.</p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec-dark">
        <div className="container text-center">
          <div className="sbadge">❓ Câu hỏi thường gặp</div>
          <h2 className="st">Giải Đáp <span className="acc">Mọi Thắc Mắc</span></h2>
          <p className="ssub" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>Những câu hỏi phụ huynh thường hỏi nhất trước khi quyết định cho con học.</p>
          <div className="faq-list">
            {faqItemsVi.map((item, idx) => (
              <div key={idx} className={`faq-item${openFaq === idx ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(idx)}>{item.q} <span className="faq-icon">+</span></div>
                <div className="faq-a"><div className="faq-a-in" style={{ paddingTop: '14px' }}>{item.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND */}
      <section id="brand" className="circuit-bg">
        <div className="cl-wrap"><div className="cl cl-h cl-p" style={{ top: '50%', left: 0, right: 0 }}></div></div>
        <div className="container z1">
          <div style={{ maxWidth: '740px', margin: '0 auto', textAlign: 'center' }}>
            <div className="sbadge">💜 Câu chuyện thương hiệu</div>
            <h2 className="st"><span className="acc">Khơi Nguồn Sáng Tạo</span><br />Chắp Cánh Tương Lai</h2>
          </div>
          <div className="bquote">"Khi gieo những hạt mầm trải nghiệm hôm nay, ngày mai sẽ nảy nở một thế hệ trẻ Việt Nam sáng tạo hơn, nhân văn hơn và bản lĩnh hơn."</div>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.72)', lineHeight: '1.9', marginBottom: '20px' }}>Sata Robo ra đời từ niềm tin rằng mọi đứa trẻ đều xứng đáng được trải nghiệm, được thử sức và phát triển trong một môi trường thực sự truyền cảm hứng.</p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.72)', lineHeight: '1.9', marginBottom: '36px' }}>Chúng tôi mang đến các chương trình Robotics gắn liền với thực tiễn — để các em không chỉ học lập trình, mà học cách tư duy, hợp tác và tự tin hội nhập với thế giới.</p>
          <div className="val-grid">
            <div className="val-card"><div className="val-icon">🔮</div><div className="val-title">Sáng Tạo</div><div className="val-desc">Không ngừng đổi mới phương pháp giáo dục và công nghệ học tập</div></div>
            <div className="val-card"><div className="val-icon">🤝</div><div className="val-title">Gắn Kết</div><div className="val-desc">Xây dựng mối quan hệ bền chặt giữa học sinh, phụ huynh và giáo viên</div></div>
            <div className="val-card"><div className="val-icon">✨</div><div className="val-title">Chính Trực</div><div className="val-desc">Cam kết minh bạch và trung thực trong mọi hoạt động</div></div>
            <div className="val-card"><div className="val-icon">💪</div><div className="val-title">Kỷ Luật</div><div className="val-desc">Rèn luyện tính tự giác và kiên trì trong học tập và làm việc</div></div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: 'linear-gradient(135deg,var(--pdark),var(--p),var(--p2))', padding: '72px 20px', textAlign: 'center' }}>
        <div className="container">
          <div className="sbadge" style={{ margin: '0 auto 20px' }}>🚀 Hành động ngay</div>
          <h2 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(24px,4vw,42px)', fontWeight: '900', color: '#fff', marginBottom: '16px', lineHeight: '1.2' }}>Trao cho con một dự án thật,<br />một robot thật và một sân khấu thật!</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.8)', marginBottom: '36px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>Đăng ký buổi Test Năng Lực miễn phí — Không ràng buộc. Hoàn tiền 100% nếu không hài lòng sau 2 buổi đầu.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#register" className="btn btn-test" style={{ fontSize: '16px', padding: '17px 36px' }}>🎯 Đăng Ký Test Miễn Phí Ngay →</a>
            <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo" style={{ fontSize: '14px' }}>💬 Zalo 0818.823.720</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ marginBottom: '10px' }}><img src={LOGO_SRC} className="nav-logo-img" alt="Sata Robo" style={{ height: '40px' }} /></div>
              <div className="fsl">🚀 Khơi Nguồn Sáng Tạo — Chắp Cánh Tương Lai</div>
              <p className="fdesc">Công ty Cổ phần Công nghệ Giáo dục Sata Robo. Tiên phong Robotics giáo dục tại Đà Nẵng.</p>
            </div>
            <div>
              <div className="ftitle">4 Cơ Sở</div>
              <div className="flinks">
                <a>📍 60 Lê Lợi</a><a>📍 258 Lê Thanh Nghị</a>
                <a>📍 232 Nguyễn Phước Lan</a><a>📍 269 Điện Biên Phủ</a>
              </div>
            </div>
            <div>
              <div className="ftitle">Liên Hệ</div>
              <div className="flinks">
                <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer">💬 Zalo: 0818.823.720</a>
                <a href="mailto:satarobo@gmail.com">📧 satarobo@gmail.com</a>
                <a href="https://facebook.com/Satarobo" target="_blank" rel="noreferrer">📘 facebook.com/Satarobo</a>
                <a href="https://sataworld.vn" target="_blank" rel="noreferrer">🌐 sataworld.vn</a>
              </div>
            </div>
          </div>
          <div className="fbottom">
            <span>© 2026 Công ty Cổ phần Công nghệ Giáo dục Sata Robo</span>
            <span>SP2 — Sata Robo Offline · Đà Nẵng</span>
          </div>
        </div>
      </footer>

      {/* FLOATING PANEL */}
      <div id="float-panel" style={{ opacity: floatVisible ? 1 : 0, pointerEvents: floatVisible ? 'auto' : 'none' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--gray)', textAlign: 'right', paddingRight: '4px', marginBottom: '2px', whiteSpace: 'nowrap' }}>Đăng ký ngay</div>
        <a href="#register" className="fp-btn fp-r1">🎯 Test Miễn Phí</a>
        <a href="#products" className="fp-btn fp-or">🏆 Xem Khóa Học</a>
        <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="fp-btn fp-zalo" title="Zalo tư vấn">💬</a>
      </div>

      {/* POPUP */}
      <div id="popup-overlay" className={popupVisible ? 'show' : ''} onClick={e => { if (e.target.id === 'popup-overlay') setPopupVisible(false) }}>
        <div className="popup-box">
          <button className="popup-close" onClick={() => setPopupVisible(false)}>✕</button>
          <div className="sbadge-red" style={{ margin: '0 auto 14px' }}>🔥 ƯU ĐÃI CÒN HẠN</div>
          <div className="popup-h1">Đăng ký Test miễn phí<span>trước khi hết suất tháng này!</span></div>
          <div className="popup-sub">Mỗi cơ sở chỉ nhận tối đa 12 học sinh/lớp. Buổi Test miễn phí — không ràng buộc — chúng tôi liên hệ trong 2 giờ!</div>
          <div className="popup-btns">
            <a href="#register" className="btn btn-r1" onClick={() => setPopupVisible(false)} style={{ width: '100%', justifyContent: 'center' }}>🚀 Đăng Ký Test Ngay →</a>
            <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo" onClick={() => setPopupVisible(false)} style={{ width: '100%', justifyContent: 'center' }}>💬 Zalo Tư Vấn Miễn Phí</a>
          </div>
          <button className="popup-dismiss" onClick={() => setPopupVisible(false)}>Tôi cần thêm thời gian để suy nghĩ — Để sau</button>
        </div>
      </div>

      {/* MODAL THI DAU */}
      <div id="modal-thi" className={`modal-ov${modalThi ? ' open' : ''}`} onClick={e => { if (e.target.id === 'modal-thi') closeModalThi() }}>
        <div className="mbox">
          <button className="mclose" onClick={closeModalThi}>✕</button>
          <div className="sbadge">🏆 Nhóm 1</div>
          <div className="mh1">Khóa Thi Đấu Robotics 2026</div>
          <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'linear-gradient(135deg,rgba(245,158,11,.1),rgba(107,33,168,.08))', border: '1.5px solid rgba(245,158,11,.4)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div><div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--gold)', marginBottom: '4px' }}>📋 Thể Lệ Thi Sáng Tạo Robotics 2026</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)' }}>Tài liệu chính thức từ Ban Tổ Chức — TW Đoàn TNCS Hồ Chí Minh</div></div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a href="https://drive.google.com/drive/folders/12DTFji_NWDg_i3d1SGgjKKp8vxjF1seL" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg,var(--gold),#D97706)', color: '#000', padding: '9px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', textDecoration: 'none' }}>👁 Xem Thể Lệ Thi</a>
              <a href="https://drive.google.com/drive/folders/12DTFji_NWDg_i3d1SGgjKKp8vxjF1seL" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,.15)', color: 'var(--gold)', border: '1.5px solid rgba(245,158,11,.4)', padding: '9px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', textDecoration: 'none' }}>⬇ Tải Về</a>
            </div>
          </div>
          <div className="msub">Luyện thi chuyên sâu cho cuộc thi Sáng tạo Robotics do TW Đoàn TNCS và Thành Đoàn Đà Nẵng phát động.</div>
          <div className="crs-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
              <div><div className="crs-title">🎮 Robosim Master 2026 — Offline</div><div className="crs-meta">16 buổi · Tiểu học &amp; THCS · Luyện thi vòng 7 TW Đoàn</div></div>
              <span className="sbadge-gold" style={{ whiteSpace: 'nowrap' }}>16 buổi</span>
            </div>
            <div className="crs-story">"Học đúng cách thi — không phải học nhớ bài. Mỗi buổi học trên RoboSim thật, có giáo viên chỉ chiến lược từng nhiệm vụ. Sau 16 buổi, con bước vào phòng thi với sự tự tin."</div>
            <div className="crs-phases">
              <div className="phase"><strong>Tuần 1–4: Nền Tảng RoboSim</strong>Hiểu sa bàn, nhiệm vụ, quy tắc tính điểm, luyện phản xạ cơ bản</div>
              <div className="phase"><strong>Tuần 5–8: Chiến Lược Điểm Số</strong>Thứ tự tối ưu nhiệm vụ, quản lý thời gian, tránh mất điểm oan</div>
              <div className="phase"><strong>Tuần 9–12: Thi Thử Thực Chiến</strong>Mô phỏng 100% điều kiện thi, phân tích lỗi, điều chỉnh chiến lược</div>
              <div className="phase"><strong>Tuần 13–16: Hoàn Thiện &amp; Chinh Phục</strong>Sa bàn áp lực cao, tập xử lý sự cố trong giờ thi</div>
            </div>
            <div className="price-block">
              <div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div>
              <div className="price-options" style={{ gridTemplateColumns: '1fr' }}>
                <div className="price-opt best" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div><div className="po-label">16 buổi trọn khóa</div><div className="po-neo">Niêm yết: 3.184.000đ</div></div>
                  <div style={{ textAlign: 'right' }}><div className="po-price" style={{ fontSize: '28px' }}>2.228.800đ</div><div className="po-per">≈ 139.300đ / buổi</div></div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '14px', background: 'rgba(168,85,247,.07)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,.75)', lineHeight: '1.75' }}>🎁 <strong>Quà tặng:</strong> Áo thun siêu nhân + Bộ tài liệu chính thức (~300.000đ)</div>
          </div>
          <div className="crs-card oc">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
              <div><div className="crs-title" style={{ color: 'var(--orange)' }}>⚔️ Chiến Binh Robot 2026 — Offline</div><div className="crs-meta">16 buổi · Tiểu học &amp; THCS · Robot Beta thực chiến</div></div>
              <span className="sbadge-orange" style={{ whiteSpace: 'nowrap' }}>16 buổi</span>
            </div>
            <div className="crs-story" style={{ borderLeftColor: 'var(--orange)' }}>"Bước tiến lên robot Beta thực chiến. Học sinh điều khiển robot vật lý thật, tranh đấu trên sa bàn thật. Kèm bonus Video Robosim để tự luyện thêm tại nhà."</div>
            <div className="crs-phases">
              <div className="phase" style={{ borderColor: 'rgba(249,115,22,.2)' }}><strong style={{ color: 'var(--orange)' }}>Tuần 1–4: Beta Nhập Môn</strong>Lắp robot Beta, lập trình C-block, tập điều khiển</div>
              <div className="phase" style={{ borderColor: 'rgba(249,115,22,.2)' }}><strong style={{ color: 'var(--orange)' }}>Tuần 5–8: Chiến Thuật Sa Bàn</strong>Phân tích sa bàn thi, lập chiến lược, luyện phản xạ</div>
              <div className="phase" style={{ borderColor: 'rgba(249,115,22,.2)' }}><strong style={{ color: 'var(--orange)' }}>Tuần 9–12: Đấu Thực Chiến</strong>Thi đấu nội bộ, phân tích điểm mạnh yếu</div>
              <div className="phase" style={{ borderColor: 'rgba(249,115,22,.2)' }}><strong style={{ color: 'var(--orange)' }}>Tuần 13–16: Chuẩn Bị Ngày Thi</strong>Hoàn thiện robot, bảo vệ dự án Kỹ Sư Nhí</div>
            </div>
            <div className="price-block" style={{ borderColor: 'rgba(249,115,22,.3)' }}>
              <div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div>
              <div className="price-options" style={{ gridTemplateColumns: '1fr' }}>
                <div className="price-opt best" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', borderColor: 'rgba(249,115,22,.35)' }}>
                  <div><div className="po-label">16 buổi trọn khóa</div><div className="po-neo">Niêm yết: 3.984.000đ</div></div>
                  <div style={{ textAlign: 'right' }}><div className="po-price" style={{ fontSize: '28px', color: 'var(--orange)' }}>2.788.800đ</div><div className="po-per">≈ 174.300đ / buổi</div></div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '14px', background: 'rgba(249,115,22,.06)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,.75)', lineHeight: '1.75' }}>🎁 <strong>Bonus:</strong> Video Robosim Online (490.000đ) + Áo thun siêu nhân + Bộ tài liệu chính thức</div>
          </div>
          <div className="modal-cta">
            <a href="#register" className="btn btn-test" onClick={closeModalThi} style={{ width: '100%', fontSize: '15px' }}>🚀 Đăng Ký Buổi Test Miễn Phí Ngay →</a>
            <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo" style={{ width: '100%', justifyContent: 'center' }}>💬 Zalo Tư Vấn 0818.823.720</a>
          </div>
        </div>
      </div>

      {/* MODAL DAI HAN */}
      <div id="modal-daihan" className={`modal-ov${modalDaihan ? ' open' : ''}`} onClick={e => { if (e.target.id === 'modal-daihan') closeModalDaihan() }}>
        <div className="mbox">
          <button className="mclose" onClick={closeModalDaihan}>✕</button>
          <div className="sbadge-orange">🚀 Nhóm 2</div>
          <div className="mh1">Lộ Trình Dài Hạn — 5 Module</div>
          <div className="msub">Hành trình từ lớp 1 đến lớp 8. Mỗi module 48 buổi = 4 học phần × 12 buổi. Tất cả giá áp dụng đến 31/05/2026.</div>
          <div className="mtabs">
            {['🌱 Lớp 1–2', '🚀 Lớp 3–4', '⚡ Lớp 5', '🏆 Lớp 6–7', '🤖 Lớp 8'].map((label, idx) => (
              <button key={idx} className={`mtab${activeTab === idx ? ' active' : ''}`} onClick={() => setActiveTab(idx)}>{label}</button>
            ))}
          </div>
          {activeTab === 0 && <div className="mpanel active"><div className="crs-card"><div className="crs-title">🌱 Ươm Mầm Tài Năng</div><div className="crs-meta">Lớp 1–2 · 48 buổi = 4 học phần × 12 buổi</div><div className="crs-story">"Con bạn 6–7 tuổi. Chúng tôi không dạy con lập trình — chúng tôi giúp con YÊU robot. Mỗi buổi là cuộc phiêu lưu."</div><div className="crs-phases"><div className="phase"><strong>HP1: Alpha Cơ Bản</strong>Khám phá robot, cảm biến, trò chơi logic</div><div className="phase"><strong>HP2: Alpha Sáng Tạo</strong>Lập trình kéo thả, xây mô hình tự động</div><div className="phase"><strong>HP3: Alpha Dự Án</strong>Tự thiết kế trò chơi, thử nghiệm &amp; sửa lỗi</div><div className="phase"><strong>HP4: Thuyết Trình KSN</strong>Bảo vệ dự án mini trước phụ huynh</div></div><div className="price-block"><div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div><div className="price-options"><div className="price-opt"><div className="po-label">1 HP (12 buổi)</div><div className="po-neo">2.400.000đ</div><div className="po-price">2.160.000đ</div><div className="po-per">180.000đ/buổi</div></div><div className="price-opt"><div className="po-label">2 HP (24 buổi)</div><div className="po-neo">4.800.000đ</div><div className="po-price">3.840.000đ</div><div className="po-per">160.000đ/buổi</div></div><div className="price-opt best"><div className="po-label">Full 48 buổi</div><div className="po-neo">9.600.000đ</div><div className="po-price">6.720.000đ</div><div className="po-per">140.000đ/buổi</div><div className="po-best">⭐ Khuyến nghị</div></div></div></div></div></div>}
          {activeTab === 1 && <div className="mpanel active"><div className="crs-card"><div className="crs-title">🚀 Bức Phá Giới Hạn</div><div className="crs-meta">Lớp 3–4 · 48 buổi = 4 học phần × 12 buổi</div><div className="crs-story">"Khóa này dạy con cách KHÔNG BỎ CUỘC khi robot sai, cách NGHĨ KHÁC khi chiến thuật thất bại, cách TỰ TIN thuyết trình trước đám đông."</div><div className="crs-phases"><div className="phase"><strong>HP1: Master Robosim Cơ Bản</strong>Nền tảng lập trình, tư duy thuật toán</div><div className="phase"><strong>HP2: Master Robosim Nâng Cao</strong>Chiến thuật thi đấu, luyện phản xạ</div><div className="phase"><strong>HP3: Beta Nhập Môn</strong>Robot Beta, lập trình C-block</div><div className="phase"><strong>HP4: Beta Chiến Thuật</strong>Sa bàn thi đấu, bảo vệ dự án KSN</div></div><div className="price-block"><div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div><div className="price-options"><div className="price-opt"><div className="po-label">1 HP (12 buổi)</div><div className="po-neo">2.988.000đ</div><div className="po-price">2.689.200đ</div><div className="po-per">224.000đ/buổi</div></div><div className="price-opt"><div className="po-label">2 HP (24 buổi)</div><div className="po-neo">5.976.000đ</div><div className="po-price">4.780.800đ</div><div className="po-per">199.000đ/buổi</div></div><div className="price-opt best"><div className="po-label">Full 48 buổi</div><div className="po-neo">11.952.000đ</div><div className="po-price">8.366.400đ</div><div className="po-per">174.000đ/buổi</div><div className="po-best">⭐ Khuyến nghị</div></div></div></div></div></div>}
          {activeTab === 2 && <div className="mpanel active"><div className="crs-card"><div className="crs-title">⚡ Khơi Nguồn Sáng Tạo</div><div className="crs-meta">Lớp 5 · 48 buổi = 4 học phần × 12 buổi</div><div className="crs-story">"Dạy con cách ĐẶT CÂU HỎI đúng, cách THIẾT KẾ giải pháp, cách THUYẾT PHỤC người khác tin vào ý tưởng của mình."</div><div className="crs-phases"><div className="phase"><strong>HP1: Storm Cơ Bản</strong>Hệ thống cơ điện tử, lập trình đa module</div><div className="phase"><strong>HP2: Storm Nâng Cao</strong>Thiết kế kiến trúc robot, tối ưu năng lượng</div><div className="phase"><strong>HP3: Sáng Tạo Ứng Dụng</strong>Robot giải bài toán thực tế</div><div className="phase"><strong>HP4: Dự Án Cá Nhân</strong>Thiết kế, lập trình, thuyết trình như Kỹ sư thật</div></div><div className="price-block"><div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div><div className="price-options"><div className="price-opt"><div className="po-label">1 HP (12 buổi)</div><div className="po-neo">3.360.000đ</div><div className="po-price">3.024.000đ</div><div className="po-per">252.000đ/buổi</div></div><div className="price-opt"><div className="po-label">2 HP (24 buổi)</div><div className="po-neo">6.720.000đ</div><div className="po-price">5.376.000đ</div><div className="po-per">224.000đ/buổi</div></div><div className="price-opt best"><div className="po-label">Full 48 buổi</div><div className="po-neo">13.440.000đ</div><div className="po-price">9.408.000đ</div><div className="po-per">196.000đ/buổi</div><div className="po-best">⭐ Khuyến nghị</div></div></div></div></div></div>}
          {activeTab === 3 && <div className="mpanel active"><div className="crs-card"><div className="crs-title">🏆 Chinh Phục Đấu Trường</div><div className="crs-meta">Lớp 6–7 · 48 buổi = 4 học phần × 12 buổi</div><div className="crs-story">"Đào tạo chuyên biệt hướng đến giải thưởng — lộ trình từ TW Đoàn đến WRC. 100% học viên hoàn thành đủ kỹ năng dự thi vòng đấu bản."</div><div className="crs-phases"><div className="phase"><strong>HP1: Robosim Elite</strong>Thuật toán nâng cao, chiến lược thi đấu quốc tế</div><div className="phase"><strong>HP2: Robosim Championship</strong>Mô phỏng giải đấu, phân tích đối thủ</div><div className="phase"><strong>HP3: Beta Master</strong>Robot phức tạp, lập trình AI cơ bản</div><div className="phase"><strong>HP4: Beta Quốc Tế</strong>Kỹ năng thi WRC, bảo vệ luận án KSN</div></div><div className="price-block"><div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div><div className="price-options"><div className="price-opt"><div className="po-label">1 HP (12 buổi)</div><div className="po-neo">3.600.000đ</div><div className="po-price">3.240.000đ</div><div className="po-per">270.000đ/buổi</div></div><div className="price-opt"><div className="po-label">2 HP (24 buổi)</div><div className="po-neo">7.200.000đ</div><div className="po-price">5.760.000đ</div><div className="po-per">240.000đ/buổi</div></div><div className="price-opt best"><div className="po-label">Full 48 buổi</div><div className="po-neo">14.400.000đ</div><div className="po-price">10.080.000đ</div><div className="po-per">210.000đ/buổi</div><div className="po-best">⭐ Khuyến nghị</div></div></div></div></div></div>}
          {activeTab === 4 && <div className="mpanel active"><div className="crs-card"><div className="crs-title">🤖 Kiến Tạo Tương Lai</div><div className="crs-meta">Lớp 8 · 48 buổi = 4 học phần × 12 buổi</div><div className="crs-story">"AI, robotics, cảm biến thông minh là ngôn ngữ của nền kinh tế 2030. Con ra trường với portfolio robot AI thực sự."</div><div className="crs-phases"><div className="phase"><strong>HP1: Storm AI Cơ Bản</strong>Xử lý tín hiệu cảm biến, phản ứng thông minh</div><div className="phase"><strong>HP2: Computer Vision</strong>Robot nhận diện màu sắc, hình dạng</div><div className="phase"><strong>HP3: AI Ứng Dụng</strong>Robot tự điều chỉnh theo môi trường thực</div><div className="phase"><strong>HP4: Dự Án Tốt Nghiệp</strong>Robot giải quyết bài toán xã hội thực tế</div></div><div className="price-block"><div className="price-deadline">🔥 Ưu đãi đến 31/05/2026</div><div className="price-options"><div className="price-opt"><div className="po-label">1 HP (12 buổi)</div><div className="po-neo">3.960.000đ</div><div className="po-price">3.564.000đ</div><div className="po-per">297.000đ/buổi</div></div><div className="price-opt"><div className="po-label">2 HP (24 buổi)</div><div className="po-neo">7.920.000đ</div><div className="po-price">6.336.000đ</div><div className="po-per">264.000đ/buổi</div></div><div className="price-opt best"><div className="po-label">Full 48 buổi</div><div className="po-neo">15.840.000đ</div><div className="po-price">11.088.000đ</div><div className="po-per">231.000đ/buổi</div><div className="po-best">⭐ Khuyến nghị</div></div></div></div></div></div>}
          <div className="modal-cta">
            <a href="#register" className="btn btn-r2" onClick={closeModalDaihan} style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '16px' }}>🚀 Đăng Ký Test Miễn Phí Cho Con Ngay →</a>
            <a href="https://zalo.me/0818823720" target="_blank" rel="noreferrer" className="btn btn-zalo" style={{ width: '100%', justifyContent: 'center' }}>💬 Zalo Tư Vấn 0818.823.720</a>
          </div>
        </div>
      </div>

      {/* THANK YOU OVERLAY */}
      <div id="ty-overlay" className={thankYouVisible ? 'show' : ''}>
        <div className="ty-particles">
          {['🎊','🎉','✨','⭐','💜','🌟','🎊','✨','⭐','🎉'].map((e, i) => (
            <span key={i} className="ty-particle" style={{ left: `${5 + i * 10}%`, animationDelay: `${i * 0.18}s`, animationDuration: `${2.5 + (i % 3) * 0.4}s` }}>{e}</span>
          ))}
        </div>
        <div className="ty-box">
          <div className="ty-success-ring">
            <span className="ty-emoji">🎉</span>
          </div>
          <div className="ty-badge-success">✅ Đăng ký thành công</div>
          <h1 className="ty-h1">Đăng Ký <span>Thành Công!</span></h1>
          <p className="ty-subtitle">Cảm ơn bạn đã tin tưởng Sata Robo!<br />Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất.</p>
          <div className="ty-steps">
            <div className="ty-step">
              <div className="ty-step-num">1</div>
              <div className="ty-step-body">
                <div className="ty-step-title">⏰ Liên hệ trong 2 giờ</div>
                <div className="ty-step-desc">Đội ngũ Sata Robo gọi/nhắn để xếp lịch buổi Test miễn phí cho con</div>
              </div>
            </div>
            <div className="ty-step">
              <div className="ty-step-num">2</div>
              <div className="ty-step-body">
                <div className="ty-step-title">📚 Nhận tài liệu ngay</div>
                <div className="ty-step-desc">Nhóm Zalo gửi tài liệu giới thiệu khóa học và thông tin chi tiết đến bạn</div>
              </div>
            </div>
            <div className="ty-step">
              <div className="ty-step-num">3</div>
              <div className="ty-step-body">
                <div className="ty-step-title">👨‍👩‍👧 Kết nối cộng đồng</div>
                <div className="ty-step-desc">Hỏi đáp trực tiếp với đội ngũ và gặp gỡ các phụ huynh khác trong nhóm</div>
              </div>
            </div>
          </div>
          <div className="ty-zalo-box">
            <div className="ty-zalo-icon">💬</div>
            <div className="ty-zalo-title">Tham gia nhóm Zalo ngay!</div>
            <p className="ty-zalo-desc">Trong khi chờ đội ngũ liên hệ, vào nhóm Zalo để nhận hướng dẫn và kết nối phụ huynh.</p>
            <div className="ty-cd-wrap">
              <div className="ty-cd">{tyCount}</div>
              <div className="ty-cd-sub">giây nữa sẽ mở nhóm Zalo tự động</div>
            </div>
            <button className="ty-zalo-btn" onClick={goToZalo}>💬 Vào Nhóm Zalo Hỗ Trợ Ngay →</button>
            <button className="ty-later" onClick={closeTY}>Tôi sẽ vào nhóm sau — Quay lại trang</button>
          </div>
        </div>
      </div>
    </>
  )
}

const OFFLINE_PAGE_STYLES = String.raw`/* ── ROOT TOKENS ─────────────────────────────────────────── */
:root {
  --p:#6B21A8;--p2:#7C3AED;--p3:#A855F7;--p4:#C084FC;
  --pdark:#3B0764;--pvery:#1E0A3C;
  --orange:#F97316;--gold:#F59E0B;--gold2:#FCD34D;
  --cyan:#06B6D4;--cyan2:#22D3EE;--green:#10B981;--red:#EF4444;
  --dark:#0F0A1E;--white:#fff;--gray:#9CA3AF;
  --neon-p:0 0 8px rgba(168,85,247,.8),0 0 24px rgba(124,58,237,.5),0 0 48px rgba(107,33,168,.3);
  --neon-gold:0 0 8px rgba(245,158,11,.8),0 0 24px rgba(245,158,11,.4);
  --neon-cyan:0 0 8px rgba(6,182,212,.8),0 0 20px rgba(6,182,212,.4);
  --neon-red:0 0 8px rgba(239,68,68,.8),0 0 24px rgba(239,68,68,.4);
  --neon-orange:0 0 8px rgba(249,115,22,.7),0 0 24px rgba(249,115,22,.3);
  --fh:'Lexend Deca',sans-serif;--fb:'Be Vietnam Pro',sans-serif;
  --r:12px;--rlg:20px;
  --sh:0 4px 24px rgba(107,33,168,.2);--shlg:0 12px 48px rgba(107,33,168,.35);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--dark);color:#fff;overflow-x:hidden;line-height:1.6}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}
.container{max-width:1100px;margin:0 auto;padding:0 20px}

/* ── CIRCUIT BG ──────────────────────────────────────────── */
.circuit-bg{position:relative;overflow:hidden}
.circuit-bg::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(168,85,247,.065) 1px,transparent 1px),
    linear-gradient(90deg,rgba(168,85,247,.065) 1px,transparent 1px);background-size:48px 48px}
.circuit-bg::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(ellipse 80% 50% at 20% 30%,rgba(107,33,168,.22) 0%,transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 70%,rgba(6,182,212,.1) 0%,transparent 55%)}
.cl-wrap{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.cl{position:absolute}
.cl-h{height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.4),transparent)}
.cl-v{width:1px;background:linear-gradient(180deg,transparent,rgba(168,85,247,.4),transparent)}
.cl-p{animation:clp 4s ease-in-out infinite}
@keyframes clp{0%,100%{opacity:.15}50%{opacity:.65}}
.cdot{position:absolute;width:4px;height:4px;background:var(--p3);border-radius:50%;
  box-shadow:var(--neon-p);animation:dp 3s ease-in-out infinite}
@keyframes dp{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
.z1{position:relative;z-index:1}

/* ── BARS ────────────────────────────────────────────────── */
#sale-bar{background:linear-gradient(90deg,#7f1d1d,#991b1b,#b91c1c);padding:9px 16px;
  text-align:center;font-size:13px;font-weight:700;z-index:1000;position:relative;
  display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px}
.sb-cd{display:inline-flex;align-items:center;gap:0;margin:0 6px}
.cd-u{display:inline-flex;flex-direction:column;align-items:center;background:rgba(255,255,255,.2);
  border-radius:5px;padding:2px 7px;min-width:34px}
.cd-n{font-family:monospace;font-size:15px;font-weight:900;color:#fff;line-height:1}
.cd-l{font-size:8px;font-weight:700;color:rgba(255,255,255,.75);margin-top:1px}
.cd-sep{font-size:15px;font-weight:900;color:rgba(255,255,255,.5);padding:0 3px;
  align-self:flex-start;margin-top:1px}
/* ── NAVBAR ──────────────────────────────────────────────── */
nav{position:sticky;top:0;z-index:900;background:rgba(15,10,30,.95);
  backdrop-filter:blur(14px);border-bottom:1px solid rgba(168,85,247,.25);
  height:70px;display:flex;align-items:center;
  box-shadow:0 2px 20px rgba(107,33,168,.2)}
.nav-in{display:flex;align-items:center;justify-content:space-between;width:100%;
  max-width:1100px;margin:0 auto;padding:0 20px}
.nav-brand{display:flex;align-items:center;gap:12px}
.nav-logo-img{height:46px;width:auto;display:block;
  filter:drop-shadow(0 0 8px rgba(168,85,247,.5))}
.nav-brand-text{display:flex;flex-direction:column}
.nav-sl{font-size:10px;color:var(--gold);font-weight:700;letter-spacing:.5px;white-space:nowrap;
  text-transform:uppercase}
.nav-slogan-sub{font-size:9px;color:rgba(255,255,255,.45);font-weight:500;margin-top:1px;
  white-space:nowrap;letter-spacing:.3px}
.nav-links{display:flex;gap:24px;font-size:13px;font-weight:600;color:rgba(255,255,255,.75)}
.nav-links a:hover{color:var(--p4)}
.nav-cta{background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;padding:9px 18px;
  border-radius:8px;font-weight:800;font-size:13px;box-shadow:var(--neon-p);white-space:nowrap;
  transition:all .25s;display:inline-block}
.nav-cta:hover{opacity:.9;transform:translateY(-1px)}

/* ── BUTTONS ─────────────────────────────────────────────── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-weight:800;border:none;cursor:pointer;transition:all .25s;white-space:nowrap}
.btn:hover{transform:translateY(-2px);opacity:.9}
.btn-r1{padding:14px 26px;border-radius:10px;font-size:14px;
  background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;box-shadow:var(--neon-p)}
.btn-r2{padding:14px 26px;border-radius:10px;font-size:14px;
  background:linear-gradient(135deg,var(--orange),#EA580C);color:#fff;box-shadow:var(--neon-orange)}
.btn-test{padding:16px 32px;border-radius:12px;font-size:15px;font-weight:900;
  background:linear-gradient(135deg,var(--green),#059669);color:#fff;
  box-shadow:0 0 16px rgba(16,185,129,.55)}
.btn-zalo{padding:14px 22px;border-radius:10px;font-size:13px;font-weight:700;
  background:#0068FF;color:#fff;box-shadow:0 0 10px rgba(0,104,255,.5)}
.btn-ghost{padding:13px 22px;border-radius:10px;font-size:14px;
  background:transparent;color:rgba(255,255,255,.8);
  border:1px solid rgba(168,85,247,.4)}
.btn-ghost:hover{background:rgba(168,85,247,.15);border-color:var(--p3)}

/* ── BADGES ──────────────────────────────────────────────── */
.sbadge,.sbadge-gold,.sbadge-cyan,.sbadge-orange,.sbadge-red{
  display:inline-flex;align-items:center;gap:6px;padding:5px 14px;
  border-radius:100px;font-size:11px;font-weight:700;margin-bottom:16px;
  letter-spacing:.6px;text-transform:uppercase;border:1px solid}
.sbadge{background:rgba(168,85,247,.15);color:var(--p4);border-color:rgba(168,85,247,.3);box-shadow:var(--neon-p)}
.sbadge-gold{background:rgba(245,158,11,.15);color:var(--gold);border-color:rgba(245,158,11,.3);box-shadow:var(--neon-gold)}
.sbadge-orange{background:rgba(249,115,22,.15);color:var(--orange);border-color:rgba(249,115,22,.3);box-shadow:var(--neon-orange)}
.sbadge-cyan{background:rgba(6,182,212,.15);color:var(--cyan2);border-color:rgba(6,182,212,.3);box-shadow:var(--neon-cyan)}
.sbadge-red{background:rgba(239,68,68,.15);color:#fca5a5;border-color:rgba(239,68,68,.3);box-shadow:var(--neon-red)}

/* ── TYPOGRAPHY ──────────────────────────────────────────── */
h2.st{font-family:var(--fh);font-size:clamp(24px,3.2vw,40px);font-weight:900;
  line-height:1.2;color:#fff;margin-bottom:14px}
h2.st .acc{color:var(--p4)} h2.st .gold{color:var(--gold)} h2.st .cyan{color:var(--cyan2)}
.hero-h1{font-family:var(--fh);font-size:clamp(26px,3.5vw,48px);font-weight:900;
  line-height:1.18;color:#fff;margin-bottom:22px}
/* CRITICAL FIX: prevent em text from breaking mid-word */
.hero-h1 em{color:var(--p4);font-style:normal;text-shadow:var(--neon-p);
  white-space:nowrap;display:inline-block}
.ssub{font-size:15px;color:rgba(255,255,255,.65);line-height:1.8;margin-bottom:32px}
.hook{font-size:16px;color:var(--cyan2);font-weight:700;margin-bottom:18px;
  text-shadow:var(--neon-cyan)}
.text-center{text-align:center}
/* General nowrap protection for badges & labels */
.nowrap{white-space:nowrap}

/* ── SECTIONS ────────────────────────────────────────────── */
section{padding:72px 20px}
.sec-dark{background:linear-gradient(180deg,var(--dark) 0%,var(--pvery) 100%)}
.sec-mid{background:rgba(255,255,255,.018);border-top:1px solid rgba(168,85,247,.1);
  border-bottom:1px solid rgba(168,85,247,.1)}

/* ── HERO ────────────────────────────────────────────────── */
#hero{background:linear-gradient(135deg,var(--dark) 0%,var(--pvery) 55%,#0D0F2B 100%);
  padding:80px 20px 60px}
.hero-grid{display:grid;grid-template-columns:1fr 420px;gap:52px;align-items:center}
.hero-proof{display:flex;align-items:center;gap:10px;margin-bottom:22px;flex-wrap:wrap}
.hero-proof-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,.1);
  border:1px solid rgba(16,185,129,.3);color:#6ee7b7;padding:4px 11px;border-radius:100px;
  font-size:12px;font-weight:700;white-space:nowrap}
.hero-btns{display:flex;flex-direction:column;gap:12px;margin-top:28px}
.hero-row{display:flex;gap:12px;flex-wrap:wrap}
.hero-card{background:linear-gradient(135deg,rgba(107,33,168,.3),rgba(30,10,60,.9));
  border:1px solid rgba(168,85,247,.5);border-radius:var(--rlg);padding:24px;
  box-shadow:var(--shlg),0 0 40px rgba(107,33,168,.2);backdrop-filter:blur(12px);
  position:relative;overflow:hidden}
.hero-card::before{content:"";position:absolute;top:-50%;right:-30%;width:200px;height:200px;
  background:radial-gradient(circle,rgba(168,85,247,.12) 0%,transparent 70%);
  pointer-events:none}
.hc-header{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.hc-icon-wrap{width:44px;height:44px;background:linear-gradient(135deg,var(--p),var(--p2));
  border-radius:12px;display:flex;align-items:center;justify-content:center;
  font-size:22px;box-shadow:var(--neon-p);flex-shrink:0}
.hero-card-title{font-family:var(--fh);font-size:13px;font-weight:800;color:var(--gold);
  letter-spacing:1px;text-transform:uppercase;line-height:1.2}
.hc-subtitle{font-size:11px;color:rgba(255,255,255,.45);margin-top:2px}
.hero-loc{display:flex;flex-direction:column;gap:7px}
.loc-row{display:flex;align-items:center;gap:10px;background:rgba(168,85,247,.08);
  border:1px solid rgba(168,85,247,.2);border-radius:10px;padding:9px 12px;
  transition:all .2s;cursor:default}
.loc-row:hover{background:rgba(168,85,247,.15);border-color:rgba(168,85,247,.4);transform:translateX(3px)}
.loc-num-badge{width:26px;height:26px;background:linear-gradient(135deg,var(--p),var(--p2));
  border-radius:7px;display:flex;align-items:center;justify-content:center;
  font-size:10px;font-weight:900;color:#fff;flex-shrink:0;font-family:var(--fh)}
.loc-info{flex:1;min-width:0}
.loc-name{font-size:13px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.loc-dist{font-size:10px;color:rgba(255,255,255,.45);margin-top:1px}
.loc-active{width:8px;height:8px;background:var(--green);border-radius:50%;
  box-shadow:0 0 6px rgba(16,185,129,.8);flex-shrink:0;animation:act-pulse 2s ease-in-out infinite}
@keyframes act-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}
.hc-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.3),transparent);margin:16px 0}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.hstat{background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.18);
  border-radius:9px;padding:10px 4px;text-align:center;transition:all .2s}
.hstat:hover{border-color:rgba(168,85,247,.4);background:rgba(168,85,247,.08)}
.hstat-n{font-family:var(--fh);font-size:18px;font-weight:900;color:var(--p4);
  text-shadow:var(--neon-p);line-height:1}
.hstat-l{font-size:9px;color:var(--gray);margin-top:4px;line-height:1.3}
.hc-cta-btn{display:block;margin-top:16px;background:linear-gradient(135deg,var(--green),#059669);
  color:#fff;text-align:center;padding:12px 16px;border-radius:10px;font-weight:800;
  font-size:13px;box-shadow:0 0 14px rgba(16,185,129,.45);transition:all .25s;
  text-decoration:none}
.hc-cta-btn:hover{transform:translateY(-2px);opacity:.9}

/* ── LARGE COUNTDOWN SECTION ─────────────────────────────── */
#countdown-urgency{
  background:linear-gradient(135deg,#130520 0%,#1a0533 40%,#0d0f2b 100%);
  padding:64px 20px;border-top:2px solid rgba(239,68,68,.35);
  border-bottom:2px solid rgba(239,68,68,.35)}
.lc-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.15);
  color:#fca5a5;border:1.5px solid rgba(239,68,68,.4);padding:7px 20px;border-radius:100px;
  font-size:12px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;
  margin-bottom:20px;animation:pulse-badge 2s ease-in-out infinite}
@keyframes pulse-badge{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
.lc-title{font-family:var(--fh);font-size:clamp(22px,3.5vw,36px);font-weight:900;
  color:#fff;margin-bottom:8px;line-height:1.2}
.lc-sub{font-size:15px;color:rgba(255,255,255,.65);margin-bottom:36px}
/* Large countdown display */
.lc-units{display:flex;justify-content:center;align-items:flex-start;gap:12px;
  flex-wrap:wrap;margin-bottom:12px}
.lc-unit{display:flex;flex-direction:column;align-items:center;gap:10px}
.lc-num{font-family:monospace;font-size:clamp(60px,10vw,96px);font-weight:900;
  line-height:1;background:rgba(107,33,168,.25);border:2px solid rgba(168,85,247,.45);
  border-radius:16px;padding:14px 20px;min-width:clamp(90px,14vw,128px);text-align:center;
  color:#fff;box-shadow:var(--neon-p),inset 0 0 20px rgba(107,33,168,.15);
  text-shadow:var(--neon-p)}
.lc-lbl{font-size:13px;font-weight:800;color:var(--p4);text-transform:uppercase;
  letter-spacing:1px}
.lc-sep{font-size:clamp(40px,6vw,72px);font-weight:900;color:rgba(168,85,247,.5);
  margin-top:14px;line-height:1}
/* Urgency progress bar */
.urg-bar-wrap{max-width:600px;margin:0 auto 32px;background:rgba(255,255,255,.08);
  border-radius:100px;height:8px;overflow:hidden}
.urg-bar{height:100%;background:linear-gradient(90deg,var(--red),var(--orange));
  border-radius:100px;animation:shrink-bar 2592000s linear forwards}
@keyframes shrink-bar{from{width:100%}to{width:0%}}
.lc-cta{display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:8px}
.lc-cta-row{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.lc-note{font-size:12px;color:rgba(255,255,255,.4)}
.btn-dismiss{background:none;border:none;cursor:pointer;
  color:rgba(255,255,255,.4);font-size:13px;font-family:var(--fb);
  text-decoration:underline;transition:.25s;padding:4px}
.btn-dismiss:hover{color:rgba(255,255,255,.7)}
/* Animated fire emoji */
@keyframes fire{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.15)}}
.fire{display:inline-block;animation:fire 1s ease-in-out infinite}

/* ── PRODUCT GROUPS ──────────────────────────────────────── */
#products{padding:72px 20px;background:linear-gradient(180deg,var(--pvery),var(--dark))}
.pg-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.pg-card{background:rgba(255,255,255,.03);border:1.5px solid rgba(168,85,247,.2);
  border-radius:var(--rlg);padding:36px 28px;cursor:pointer;transition:all .35s;
  position:relative;overflow:hidden}
.pg-card:hover{transform:translateY(-6px);border-color:var(--p3);box-shadow:var(--neon-p)}
.pg-card.oc{border-color:rgba(249,115,22,.25)}
.pg-card.oc:hover{border-color:var(--orange);box-shadow:var(--neon-orange)}
.pg-icon{font-size:50px;margin-bottom:16px;display:block}
.pg-title{font-family:var(--fh);font-size:clamp(19px,2.3vw,24px);font-weight:900;
  color:#fff;margin-bottom:8px;line-height:1.2}
.pg-sub{font-size:13px;color:var(--gray);margin-bottom:18px;line-height:1.7}
.pg-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:20px}
.pg-tag{background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.25);
  color:var(--p4);padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700;white-space:nowrap}
.pg-tag.ot{background:rgba(249,115,22,.1);border-color:rgba(249,115,22,.25);color:var(--orange)}
.pg-courses{display:flex;flex-direction:column;gap:7px;margin-bottom:20px}
.pg-course{display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,.8)}
.pg-course::before{content:"✓";color:var(--green);font-weight:900;flex-shrink:0}
.pg-cta{display:flex;align-items:center;gap:8px;font-weight:800;font-size:14px;
  color:var(--p4);transition:.25s}
.pg-cta:hover{gap:14px}
.pg-card.oc .pg-cta{color:var(--orange)}

/* ── LOCATIONS ───────────────────────────────────────────── */
.loc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.loc-card{background:rgba(255,255,255,.03);border:1px solid rgba(168,85,247,.2);
  border-radius:var(--r);padding:24px 16px;text-align:center;transition:.3s}
.loc-card:hover{border-color:var(--p3);box-shadow:var(--neon-p);transform:translateY(-4px)}
.loc-num{font-family:var(--fh);font-size:30px;font-weight:900;color:var(--p3);
  text-shadow:var(--neon-p);margin-bottom:6px}
.loc-addr{font-weight:700;font-size:14px;margin-bottom:4px}

/* ── 7 CAM KẾT — PREMIUM DESIGN ─────────────────────────── */
#cam-ket{
  background:linear-gradient(160deg,#080015 0%,#12002a 30%,#0a0020 60%,#050010 100%);
  padding:88px 20px;position:relative;overflow:hidden}
#cam-ket::before{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(168,85,247,.08) 1px,transparent 1px),
    linear-gradient(90deg,rgba(168,85,247,.08) 1px,transparent 1px);background-size:40px 40px}
/* Radial glows */
.ck-glow1{position:absolute;width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(107,33,168,.22) 0%,transparent 70%);
  top:-150px;left:-150px;pointer-events:none}
.ck-glow2{position:absolute;width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%);
  bottom:-100px;right:-100px;pointer-events:none}
/* Header */
.ck-header{text-align:center;position:relative;z-index:1;margin-bottom:56px}
.ck-supertitle{display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,rgba(168,85,247,.2),rgba(6,182,212,.1));
  border:1.5px solid rgba(168,85,247,.5);color:var(--p4);padding:8px 22px;
  border-radius:100px;font-size:12px;font-weight:800;letter-spacing:1px;
  text-transform:uppercase;margin-bottom:20px;box-shadow:var(--neon-p),0 0 0 4px rgba(168,85,247,.05)}
.ck-h1{font-family:var(--fh);font-size:clamp(28px,4.5vw,52px);font-weight:900;
  line-height:1.12;margin-bottom:16px}
.ck-h1 .ck-white{color:#fff}
.ck-h1 .ck-accent{color:var(--p4);text-shadow:var(--neon-p)}
.ck-h1 .ck-gold{color:var(--gold);text-shadow:var(--neon-gold)}
.ck-desc{font-size:16px;color:rgba(255,255,255,.6);max-width:620px;
  margin:0 auto;line-height:1.8}
/* Trust bar */
.ck-trustbar{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;
  margin-top:24px;margin-bottom:0}
.ck-trust{display:flex;align-items:center;gap:7px;background:rgba(16,185,129,.08);
  border:1px solid rgba(16,185,129,.25);color:#6ee7b7;padding:6px 14px;
  border-radius:100px;font-size:12px;font-weight:700;white-space:nowrap}
/* Grid */
.ck-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;position:relative;z-index:1}
.ck-grid-bottom{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;
  max-width:760px;margin:20px auto 0;position:relative;z-index:1}
.ck-card{background:linear-gradient(135deg,rgba(255,255,255,.05) 0%,rgba(107,33,168,.08) 100%);
  border:1.5px solid rgba(168,85,247,.2);border-radius:18px;padding:28px 22px;
  position:relative;overflow:hidden;transition:all .4s;cursor:default}
.ck-card::before{content:"";position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(168,85,247,.06),transparent);
  opacity:0;transition:.4s}
.ck-card:hover{border-color:var(--p3);box-shadow:0 0 0 1px rgba(168,85,247,.3),
  0 16px 48px rgba(107,33,168,.3),inset 0 1px 0 rgba(255,255,255,.08);
  transform:translateY(-5px)}
.ck-card:hover::before{opacity:1}
/* Featured card (cam kết 2 - hoàn tiền) */
.ck-card.featured{background:linear-gradient(135deg,rgba(245,158,11,.1),rgba(107,33,168,.15));
  border-color:rgba(245,158,11,.4);box-shadow:0 0 0 1px rgba(245,158,11,.15),
  0 8px 32px rgba(245,158,11,.12)}
.ck-card.featured:hover{border-color:var(--gold);box-shadow:0 0 0 1px rgba(245,158,11,.4),
  0 16px 48px rgba(245,158,11,.2);transform:translateY(-5px)}
/* Number badge */
.ck-num{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;
  justify-content:center;font-family:var(--fh);font-size:16px;font-weight:900;
  margin-bottom:16px;position:relative;z-index:1}
.ck-num-default{background:linear-gradient(135deg,rgba(168,85,247,.25),rgba(107,33,168,.4));
  border:1.5px solid rgba(168,85,247,.5);color:var(--p4);
  box-shadow:0 0 12px rgba(107,33,168,.3)}
.ck-num-gold{background:linear-gradient(135deg,rgba(245,158,11,.25),rgba(245,158,11,.15));
  border:1.5px solid rgba(245,158,11,.5);color:var(--gold);
  box-shadow:0 0 12px rgba(245,158,11,.3)}
.ck-icon{font-size:28px;margin-bottom:10px;display:block;position:relative;z-index:1}
.ck-title{font-weight:900;font-size:15px;color:#fff;margin-bottom:10px;
  line-height:1.35;position:relative;z-index:1}
.ck-title.gold-title{color:var(--gold)}
.ck-body{font-size:13px;color:rgba(255,255,255,.62);line-height:1.85;
  position:relative;z-index:1}
/* Highlight pill inside card */
.ck-pill{display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,.1);
  border:1px solid rgba(16,185,129,.3);color:#6ee7b7;padding:3px 10px;border-radius:100px;
  font-size:11px;font-weight:700;margin-top:10px}
.ck-pill.gold-pill{background:rgba(245,158,11,.1);border-color:rgba(245,158,11,.3);color:var(--gold)}
/* Corner ribbon */
.ck-ribbon{position:absolute;top:14px;right:14px;background:rgba(245,158,11,.15);
  border:1px solid rgba(245,158,11,.3);color:var(--gold);font-size:10px;
  font-weight:800;padding:3px 9px;border-radius:100px;letter-spacing:.5px}
/* Bottom CTA */
.ck-bottom-cta{text-align:center;margin-top:48px;position:relative;z-index:1}
.ck-bottom-wrap{background:linear-gradient(135deg,rgba(107,33,168,.15),rgba(6,182,212,.08));
  border:1.5px solid rgba(168,85,247,.3);border-radius:20px;padding:32px;
  max-width:640px;margin:0 auto}
.ck-bottom-title{font-family:var(--fh);font-size:20px;font-weight:900;color:#fff;
  margin-bottom:8px;line-height:1.3}
.ck-bottom-sub{font-size:13px;color:rgba(255,255,255,.55);margin-bottom:20px;line-height:1.7}
@media(max-width:900px){.ck-grid{grid-template-columns:repeat(2,1fr)}.ck-grid-bottom{grid-template-columns:1fr}}
@media(max-width:600px){.ck-grid{grid-template-columns:1fr}.ck-grid-bottom{grid-template-columns:1fr}}

/* ── GIFTS ───────────────────────────────────────────────── */
.gift-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.gift-card{border-radius:var(--rlg);padding:28px 20px;text-align:center}
.gift-card.g16{background:linear-gradient(135deg,rgba(107,33,168,.2),rgba(30,10,60,.5));
  border:1.5px solid rgba(168,85,247,.3)}
.gift-card.g48{background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(15,10,30,.8));
  border:1.5px solid rgba(245,158,11,.35)}
.gift-card.drone{background:linear-gradient(135deg,rgba(6,182,212,.12),rgba(15,10,30,.8));
  border:1.5px solid rgba(6,182,212,.35)}
.gift-emoji{font-size:38px;margin-bottom:12px}
.gift-title{font-family:var(--fh);font-size:16px;font-weight:900;color:#fff;margin-bottom:6px}
.gift-val{font-size:22px;font-weight:900;color:var(--gold);margin-bottom:14px;
  font-family:var(--fh)}
.gift-items{text-align:left;display:flex;flex-direction:column;gap:6px}
.gift-item{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:rgba(255,255,255,.8)}
.gift-cond{font-size:11px;color:var(--gray);margin-top:12px;font-style:italic;line-height:1.5}

/* ── PRIZES ──────────────────────────────────────────────── */
.prize-hdr{background:linear-gradient(135deg,rgba(245,158,11,.14),rgba(107,33,168,.14));
  border:1.5px solid rgba(245,158,11,.35);border-radius:var(--r);padding:22px;
  text-align:center;margin-bottom:26px}
.prize-tot{font-family:var(--fh);font-size:clamp(30px,5vw,52px);font-weight:900;
  color:var(--gold);text-shadow:var(--neon-gold);margin-bottom:6px}
.prize-tbl{width:100%;border-collapse:collapse}
.prize-tbl tr{border-bottom:1px solid rgba(168,85,247,.1)}
.prize-tbl th{background:rgba(168,85,247,.1);color:var(--p4);font-size:12px;font-weight:700;
  padding:9px 14px;text-align:left;text-transform:uppercase;letter-spacing:.5px}
.prize-tbl td{padding:11px 14px;font-size:13px;color:rgba(255,255,255,.8)}
.prize-tbl tr:hover td{background:rgba(168,85,247,.04)}
.prize-val{font-weight:800;color:var(--gold);font-family:var(--fh)}

/* ── VIDEO SEEDING ───────────────────────────────────────── */
.video-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px}
.video-wrap{position:relative;background:rgba(0,0,0,.4);border-radius:16px;overflow:hidden;
  border:1.5px solid rgba(168,85,247,.25);transition:.35s;cursor:pointer}
.video-wrap:hover{border-color:var(--p3);box-shadow:var(--neon-p);transform:translateY(-4px)}
/* 16:9 ratio container */
.video-inner{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}
.video-inner iframe,.video-inner video{position:absolute;top:0;left:0;width:100%;height:100%;border:none}
/* Placeholder (before YouTube ID is added) */
.video-placeholder{position:absolute;inset:0;background:linear-gradient(135deg,rgba(107,33,168,.2),rgba(30,10,60,.8));
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer}
.vp-play{width:62px;height:62px;background:rgba(168,85,247,.9);border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:22px;
  box-shadow:var(--neon-p),0 4px 20px rgba(0,0,0,.4);transition:.3s}
.video-wrap:hover .vp-play{transform:scale(1.1);background:var(--p2)}
.vp-label{font-size:12px;font-weight:700;color:rgba(255,255,255,.7);text-align:center;
  padding:0 16px;line-height:1.5}
.video-caption{padding:14px 16px;background:rgba(0,0,0,.3)}
.vc-name{font-weight:800;font-size:13px;color:#fff;margin-bottom:2px}
.vc-role{font-size:11px;color:var(--gray)}
.vc-tag{display:inline-block;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.25);
  color:var(--p4);font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-top:4px}
/* Admin note */
.video-admin-note{background:rgba(245,158,11,.08);border:1px dashed rgba(245,158,11,.3);
  border-radius:10px;padding:14px 18px;margin-bottom:24px;font-size:12px;line-height:1.7;
  color:rgba(255,255,255,.6);text-align:center}
@media(max-width:768px){.video-grid{grid-template-columns:1fr;gap:16px}}
.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.tc{background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.2);
  border-radius:var(--r);padding:22px;transition:.3s}
.tc:hover{transform:translateY(-4px);box-shadow:var(--neon-p)}
.tc-stars{font-size:15px;margin-bottom:9px}
.tc-quote{font-size:13px;line-height:1.8;color:rgba(255,255,255,.8);margin-bottom:14px;font-style:italic}
.tc-author{font-size:12px;font-weight:700;color:var(--p4)}
.tc-role{font-size:11px;color:var(--gray);margin-top:2px}

/* ── FORM ────────────────────────────────────────────────── */
#register{background:linear-gradient(135deg,var(--pvery),#0D0F2B 100%)}
.form-card{background:rgba(255,255,255,.04);border:1.5px solid rgba(168,85,247,.3);
  border-radius:var(--rlg);padding:40px;box-shadow:var(--shlg);max-width:700px;margin:0 auto}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.fg{display:flex;flex-direction:column;gap:8px}
.fg.full{grid-column:1/-1}
.flbl{font-size:13px;font-weight:700;color:var(--p4)}
.flbl .req{color:var(--red)}
.finput,.fsel{background:rgba(255,255,255,.06);border:1.5px solid rgba(168,85,247,.25);
  border-radius:8px;padding:12px 14px;color:#fff;font-family:var(--fb);font-size:14px;
  width:100%;transition:border-color .25s;outline:none}
.finput:focus,.fsel:focus{border-color:var(--p3);box-shadow:0 0 0 3px rgba(168,85,247,.15)}
.fsel option{background:var(--pvery);color:#fff}
.fsel{cursor:pointer}
.fsubmit{width:100%;margin-top:10px;padding:16px;font-size:16px;font-weight:900;
  border-radius:12px;background:linear-gradient(135deg,var(--p),var(--p2));
  color:#fff;border:none;cursor:pointer;transition:all .25s;box-shadow:var(--neon-p);
  font-family:var(--fb);letter-spacing:.3px}
.fsubmit:hover{transform:translateY(-2px);opacity:.9}
.fsubmit:disabled{opacity:.6;cursor:not-allowed;transform:none}
.fnote{text-align:center;font-size:12px;color:var(--gray);margin-top:14px;line-height:1.7}

/* Sheets config notice */
.sheets-notice{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.3);
  border-radius:8px;padding:14px;margin-bottom:20px;font-size:12px;line-height:1.7;
  color:rgba(255,255,255,.7);display:none}
.sheets-notice.show{display:block}

/* ── FAQ ─────────────────────────────────────────────────── */
.faq-list{max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.faq-item{background:rgba(255,255,255,.03);border:1px solid rgba(168,85,247,.15);
  border-radius:var(--r);overflow:hidden}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:17px 20px;
  cursor:pointer;font-weight:700;font-size:14px;gap:16px;transition:.25s;line-height:1.4}
.faq-q:hover{background:rgba(168,85,247,.07);color:var(--p4)}
.faq-icon{font-size:18px;transition:.35s;flex-shrink:0}
.faq-a{max-height:0;overflow:hidden;transition:max-height .4s ease}
.faq-a-in{padding:0 20px 16px;font-size:14px;color:rgba(255,255,255,.7);line-height:1.85;
  border-top:1px solid rgba(168,85,247,.1)}
.faq-item.open .faq-a{max-height:500px}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-item.open .faq-q{color:var(--p4)}

/* ── BRAND ───────────────────────────────────────────────── */
#brand{background:linear-gradient(135deg,var(--pdark) 0%,var(--dark) 100%)}
.bquote{background:rgba(168,85,247,.07);border:1px solid rgba(168,85,247,.22);
  border-left:4px solid var(--gold);border-radius:0 var(--r) var(--r) 0;
  padding:22px 26px;margin-bottom:28px;font-style:italic;font-size:15px;
  color:rgba(255,255,255,.85);line-height:1.85}
.val-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:36px}
.val-card{background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.14);
  border-radius:var(--r);padding:20px;text-align:center}
.val-icon{font-size:26px;margin-bottom:9px}
.val-title{font-weight:800;font-size:14px;color:var(--p4);margin-bottom:5px}
.val-desc{font-size:12px;color:rgba(255,255,255,.5);line-height:1.65}

/* ── FOOTER ──────────────────────────────────────────────── */
footer{background:var(--pvery);border-top:1px solid rgba(168,85,247,.2);padding:48px 20px 24px}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;margin-bottom:36px}
.fbrand{font-family:var(--fh);font-size:20px;font-weight:900;color:#fff;margin-bottom:7px}
.fbrand span{color:var(--p3)}
.fsl{color:var(--gold);font-size:11px;font-weight:600;letter-spacing:.5px;margin-bottom:12px}
.fdesc{font-size:13px;color:rgba(255,255,255,.48);line-height:1.75}
.ftitle{font-weight:800;font-size:12px;color:var(--p4);margin-bottom:12px;
  text-transform:uppercase;letter-spacing:.5px}
.flinks{display:flex;flex-direction:column;gap:8px}
.flinks a{font-size:13px;color:rgba(255,255,255,.52);transition:.25s}
.flinks a:hover{color:var(--p4)}
.fbottom{border-top:1px solid rgba(168,85,247,.14);padding-top:18px;display:flex;
  align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.3)}

/* ── FLOATING PANEL ──────────────────────────────────────── */
#float-panel{position:fixed;bottom:80px;right:16px;z-index:9990;display:flex;
  flex-direction:column;gap:8px;align-items:flex-end;opacity:0;pointer-events:none;transition:opacity .4s}
#float-panel.show{opacity:1;pointer-events:auto}
.fp-btn{display:flex;align-items:center;gap:6px;padding:9px 14px;border-radius:9px;
  font-weight:800;font-size:13px;cursor:pointer;border:none;transition:all .25s;
  text-decoration:none;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.4)}
.fp-r1{background:linear-gradient(135deg,var(--p),var(--p2));color:#fff;box-shadow:var(--neon-p),0 4px 16px rgba(0,0,0,.4)}
.fp-or{background:linear-gradient(135deg,var(--orange),#EA580C);color:#fff}
.fp-zalo{background:#0068FF;color:#fff;width:48px;height:48px;border-radius:50%;
  padding:0;justify-content:center;font-size:20px}
.fp-btn:hover{transform:translateY(-2px) scale(1.04)}

/* ── POPUP ───────────────────────────────────────────────── */
#popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9999;
  display:flex;align-items:center;justify-content:center;padding:20px;
  opacity:0;pointer-events:none;transition:opacity .4s;backdrop-filter:blur(8px)}
#popup-overlay.show{opacity:1;pointer-events:auto}
.popup-box{background:linear-gradient(135deg,var(--pvery),#0D0F2B);
  border:1.5px solid rgba(168,85,247,.4);border-radius:var(--rlg);padding:36px;
  max-width:480px;width:100%;position:relative;box-shadow:var(--shlg),0 0 60px rgba(107,33,168,.35);
  text-align:center}
.popup-close{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.08);
  border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;
  font-size:15px;display:flex;align-items:center;justify-content:center;transition:.25s}
.popup-close:hover{background:rgba(239,68,68,.3)}
.popup-h1{font-family:var(--fh);font-size:22px;font-weight:900;color:#fff;
  margin:14px 0 6px;line-height:1.2}
.popup-h1 span{color:var(--gold);display:block}
.popup-sub{font-size:13px;color:rgba(255,255,255,.62);margin-bottom:22px;line-height:1.7}
.popup-btns{display:flex;flex-direction:column;gap:10px}
.popup-dismiss{background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;
  font-size:12px;margin-top:10px;text-decoration:underline;transition:.25s;font-family:var(--fb)}
.popup-dismiss:hover{color:rgba(255,255,255,.7)}

/* ── MODALS ──────────────────────────────────────────────── */
.modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9998;
  display:flex;align-items:flex-start;justify-content:center;padding:20px;
  overflow-y:auto;backdrop-filter:blur(8px);display:none}
.modal-ov.open{display:flex}
.mbox{background:linear-gradient(135deg,var(--pvery),#0D0F2B);
  border:1.5px solid rgba(168,85,247,.4);border-radius:var(--rlg);padding:40px;
  max-width:860px;width:100%;margin:auto;position:relative;box-shadow:var(--shlg)}
.mclose{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.08);
  border:none;color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;
  font-size:17px;display:flex;align-items:center;justify-content:center;transition:.25s}
.mclose:hover{background:rgba(239,68,68,.3)}
.mh1{font-family:var(--fh);font-size:clamp(20px,2.8vw,30px);font-weight:900;
  color:#fff;margin-bottom:8px;line-height:1.2}
.msub{font-size:14px;color:rgba(255,255,255,.6);margin-bottom:30px;line-height:1.75}
/* Course card inside modal */
.crs-card{background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.2);
  border-radius:var(--r);padding:24px;margin-bottom:20px}
.crs-card.oc{border-color:rgba(249,115,22,.22)}
.crs-title{font-family:var(--fh);font-size:17px;font-weight:900;color:#fff;margin-bottom:3px}
.crs-meta{font-size:12px;color:var(--gray);margin-bottom:14px}
.crs-story{font-size:13px;color:rgba(255,255,255,.78);line-height:1.85;font-style:italic;
  background:rgba(168,85,247,.06);border-left:3px solid var(--p3);padding:13px;
  border-radius:0 8px 8px 0;margin-bottom:16px}
.crs-phases{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:18px}
.phase{background:rgba(168,85,247,.07);border:1px solid rgba(168,85,247,.18);
  border-radius:8px;padding:10px 12px;font-size:12px;color:rgba(255,255,255,.8);line-height:1.6}
.phase strong{color:var(--p4);display:block;margin-bottom:2px}
/* Simplified single-column pricing */
.price-block{background:rgba(255,255,255,.04);border:1.5px solid rgba(245,158,11,.3);
  border-radius:var(--r);padding:20px;margin-top:16px}
.price-deadline{display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,.12);
  color:#fca5a5;border:1px solid rgba(239,68,68,.3);padding:4px 12px;border-radius:100px;
  font-size:11px;font-weight:700;margin-bottom:14px}
.price-options{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.price-opt{background:rgba(255,255,255,.04);border-radius:10px;padding:14px 12px;text-align:center;
  border:1px solid rgba(168,85,247,.18)}
.price-opt.best{background:rgba(245,158,11,.07);border-color:rgba(245,158,11,.35)}
.po-label{font-size:11px;color:var(--gray);margin-bottom:6px}
.po-neo{font-size:11px;color:rgba(255,255,255,.3);text-decoration:line-through;margin-bottom:4px}
.po-price{font-family:var(--fh);font-size:19px;font-weight:900;color:var(--p4);line-height:1}
.price-opt.best .po-price{color:var(--gold)}
.po-per{font-size:11px;color:rgba(255,255,255,.5);margin-top:4px}
.po-best{font-size:10px;color:var(--gold);font-weight:700;margin-top:4px}
/* Module tabs */
.mtabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.mtab{padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;
  border:1px solid rgba(168,85,247,.25);color:rgba(255,255,255,.55);background:transparent;
  transition:.25s;font-family:var(--fb)}
.mtab.active{background:var(--p2);color:#fff;border-color:var(--p2)}
.mtab:hover:not(.active){border-color:var(--p4);color:var(--p4)}
.mpanel{display:none}
.mpanel.active{display:block}
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,.3),transparent);
  margin:22px 0}
.modal-cta{margin-top:26px;display:flex;flex-direction:column;gap:12px;align-items:center}

/* ── THANK YOU OVERLAY ───────────────────────────────────── */
#ty-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;
  justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .5s;
  background:linear-gradient(135deg,#0a001f 0%,#0f0a1e 50%,#030715 100%);
  overflow-y:auto}
#ty-overlay.show{opacity:1;pointer-events:auto}
/* Confetti particles */
.ty-particles{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}
.ty-particle{position:absolute;top:-20px;font-size:20px;
  animation:ty-fall linear infinite both}
@keyframes ty-fall{0%{top:-30px;opacity:1;transform:rotate(0) scale(1)}
  80%{opacity:.8}100%{top:110vh;opacity:0;transform:rotate(360deg) scale(.5)}}
/* Main box */
.ty-box{max-width:560px;width:100%;text-align:center;position:relative;z-index:1;
  padding:10px 0}
/* Success ring */
.ty-success-ring{width:90px;height:90px;margin:0 auto 14px;
  background:linear-gradient(135deg,rgba(168,85,247,.3),rgba(107,33,168,.5));
  border:2px solid rgba(168,85,247,.6);border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 30px rgba(168,85,247,.4),0 0 60px rgba(107,33,168,.2);
  animation:ring-pulse 2s ease-in-out infinite}
@keyframes ring-pulse{0%,100%{box-shadow:0 0 20px rgba(168,85,247,.4),0 0 40px rgba(107,33,168,.2)}
  50%{box-shadow:0 0 40px rgba(168,85,247,.7),0 0 80px rgba(107,33,168,.4)}}
.ty-emoji{font-size:48px;display:block;
  animation:bounce-in .6s cubic-bezier(0.68,-0.55,0.27,1.55) both}
@keyframes bounce-in{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.ty-badge-success{display:inline-flex;align-items:center;gap:6px;
  background:rgba(16,185,129,.15);color:#6ee7b7;border:1px solid rgba(16,185,129,.4);
  padding:4px 14px;border-radius:100px;font-size:11px;font-weight:700;
  letter-spacing:.6px;text-transform:uppercase;margin-bottom:10px}
.ty-h1{font-family:var(--fh);font-size:clamp(28px,5vw,46px);font-weight:900;color:#fff;
  margin-bottom:6px;line-height:1.15}
.ty-h1 span{color:var(--p4);text-shadow:var(--neon-p)}
.ty-subtitle{font-size:14px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:20px}
/* Steps */
.ty-steps{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;text-align:left}
.ty-step{display:flex;align-items:flex-start;gap:14px;
  background:rgba(168,85,247,.07);border:1px solid rgba(168,85,247,.2);
  border-radius:14px;padding:14px 16px;transition:all .2s}
.ty-step:hover{background:rgba(168,85,247,.12);border-color:rgba(168,85,247,.4)}
.ty-step-num{width:32px;height:32px;background:linear-gradient(135deg,var(--p),var(--p2));
  border-radius:9px;display:flex;align-items:center;justify-content:center;
  font-family:var(--fh);font-size:14px;font-weight:900;color:#fff;
  flex-shrink:0;box-shadow:var(--neon-p)}
.ty-step-body{flex:1;min-width:0}
.ty-step-title{font-size:13px;font-weight:800;color:#fff;margin-bottom:3px}
.ty-step-desc{font-size:12px;color:rgba(255,255,255,.6);line-height:1.6}
/* Zalo box */
.ty-zalo-box{background:linear-gradient(135deg,rgba(0,104,255,.18),rgba(0,68,200,.1));
  border:2px solid rgba(0,104,255,.5);border-radius:var(--rlg);padding:22px 20px;
  position:relative;overflow:hidden}
.ty-zalo-box::before{content:"";position:absolute;top:-30px;right:-30px;
  width:120px;height:120px;background:radial-gradient(circle,rgba(0,104,255,.15),transparent 70%);
  pointer-events:none}
.ty-zalo-icon{font-size:28px;margin-bottom:6px}
.ty-zalo-title{font-size:16px;font-weight:900;color:#93c5fd;margin-bottom:6px;font-family:var(--fh)}
.ty-zalo-desc{font-size:12px;color:rgba(255,255,255,.6);line-height:1.65;margin-bottom:4px}
.ty-cd-wrap{margin:12px 0}
.ty-cd{font-family:monospace;font-size:56px;font-weight:900;color:var(--gold);
  text-shadow:var(--neon-gold);line-height:1;animation:glow-pulse 1s ease-in-out infinite}
@keyframes glow-pulse{0%,100%{text-shadow:var(--neon-gold)}50%{text-shadow:0 0 24px rgba(245,158,11,1),0 0 56px rgba(245,158,11,.6)}}
.ty-cd-sub{font-size:12px;color:rgba(255,255,255,.4);margin-top:4px}
.ty-zalo-btn{display:flex;align-items:center;justify-content:center;gap:10px;
  background:linear-gradient(135deg,#0068FF,#0050CC);color:#fff;
  padding:14px 28px;border-radius:12px;font-weight:900;font-size:15px;margin-top:14px;
  box-shadow:0 4px 20px rgba(0,104,255,.5);transition:.25s;cursor:pointer;border:none;
  font-family:var(--fb);width:100%;animation:btn-pulse 2s infinite}
@keyframes btn-pulse{0%,100%{box-shadow:0 4px 20px rgba(0,104,255,.5)}50%{box-shadow:0 4px 30px rgba(0,104,255,.8),0 0 0 6px rgba(0,104,255,.1)}}
.ty-zalo-btn:hover{transform:translateY(-2px);opacity:.92}
.ty-later{background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;
  font-size:11px;margin-top:10px;text-decoration:underline;font-family:var(--fb);transition:.25s;display:block;width:100%;text-align:center}
.ty-later:hover{color:rgba(255,255,255,.6)}

/* ── ANIMATIONS ──────────────────────────────────────────── */
.anim{opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .5s ease}
.anim.visible{opacity:1;transform:translateY(0)}

/* ── RESPONSIVE ──────────────────────────────────────────── */
@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr}
  .hero-right{order:-1}
  .hero-stats{grid-template-columns:repeat(4,1fr)}
  .pg-grid{grid-template-columns:1fr}
  .loc-grid{grid-template-columns:repeat(2,1fr)}
  .ck-grid{grid-template-columns:repeat(2,1fr)}
  .gift-grid{grid-template-columns:1fr 1fr}
  .tg{grid-template-columns:1fr 1fr}
  .val-grid{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
  .form-grid{grid-template-columns:1fr}
  .fg.full{grid-column:1}
  .crs-phases{grid-template-columns:1fr}
  .price-options{grid-template-columns:repeat(3,1fr)}
  .lc-units{gap:8px}
  .video-grid{grid-template-columns:1fr}
}
@media(max-width:600px){
  nav{height:60px}
  .nav-logo-img{height:38px}
  .nav-links,.nav-slogan-sub{display:none}
  .nav-sl{font-size:9px}
  section{padding:48px 14px}
  .hero-h1{font-size:24px}
  .hero-h1 em{font-size:clamp(22px,6.5vw,32px)}
  .hero-row{flex-direction:column}
  .btn-r1,.btn-r2,.btn-test,.btn-ghost{width:100%;justify-content:center}
  .hero-stats{grid-template-columns:1fr 1fr}
  .loc-grid{grid-template-columns:1fr 1fr}
  .ck-grid,.ck-grid-bottom{grid-template-columns:1fr}
  .gift-grid{grid-template-columns:1fr}
  .tg{grid-template-columns:1fr}
  .val-grid{grid-template-columns:1fr 1fr}
  .footer-grid{grid-template-columns:1fr}
  .fbottom{flex-direction:column;gap:8px;text-align:center}
  .mbox{padding:22px 14px}
  .form-card{padding:24px 16px}
  .price-options{grid-template-columns:1fr}
  .lc-num{padding:10px 14px;min-width:72px;font-size:clamp(44px,12vw,72px)}
  .lc-sep{font-size:40px;margin-top:8px}
  .lc-units{gap:6px}
  .lc-cta-row{flex-direction:column;align-items:center}
  .lc-cta-row .btn{width:100%;justify-content:center}
  .ty-h1{font-size:26px}
  .ty-cd{font-size:40px}
}
@media(max-width:380px){
  .hero-h1{font-size:21px}
  .loc-grid{grid-template-columns:repeat(2,1fr)}
}

/* ═══════════════════════════════════════════════════
   ADVANCED ANIMATED CIRCUIT BOARD BACKGROUND
   ═══════════════════════════════════════════════════ */
#circuit-canvas{
  position:fixed;top:0;left:0;width:100%;height:100%;
  pointer-events:none;z-index:0;opacity:.45}
body{position:relative}
/* Neon LED pulse overlay on sections */
.neon-section-border{
  position:relative}
.neon-section-border::after{
  content:"";position:absolute;left:0;right:0;bottom:0;height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(168,85,247,.6) 30%,rgba(6,182,212,.6) 70%,transparent 100%);
  animation:border-flow 4s linear infinite}
@keyframes border-flow{
  0%{background-position:0% 50%}
  100%{background-position:200% 50%}}
/* Moving neon line sweep */
.sweep-line{
  position:absolute;left:0;right:0;height:2px;pointer-events:none;z-index:0;
  background:linear-gradient(90deg,transparent,rgba(168,85,247,.4),rgba(6,182,212,.3),transparent);
  animation:sweep 8s linear infinite;opacity:0}
@keyframes sweep{
  0%{top:-2px;opacity:0}
  5%{opacity:1}
  95%{opacity:1}
  100%{top:100%;opacity:0}}
/* Corner neon accents */
.neon-corner{position:absolute;width:32px;height:32px;pointer-events:none;z-index:2}
.neon-corner-tl{top:0;left:0;border-top:2px solid rgba(168,85,247,.7);border-left:2px solid rgba(168,85,247,.7);border-radius:4px 0 0 0}
.neon-corner-tr{top:0;right:0;border-top:2px solid rgba(6,182,212,.7);border-right:2px solid rgba(6,182,212,.7);border-radius:0 4px 0 0}
.neon-corner-bl{bottom:0;left:0;border-bottom:2px solid rgba(168,85,247,.7);border-left:2px solid rgba(168,85,247,.7);border-radius:0 0 0 4px}
.neon-corner-br{bottom:0;right:0;border-bottom:2px solid rgba(6,182,212,.7);border-right:2px solid rgba(6,182,212,.7);border-radius:0 0 4px 0}

/* ═══════════════════════════════════════════════════
   MOBILE-FIRST PROFESSIONAL IMPROVEMENTS
   ═══════════════════════════════════════════════════ */

/* ── Smoother overall feel ── */
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
* { -webkit-tap-highlight-color: transparent; }
img { -webkit-user-drag: none; }
::selection { background: rgba(168,85,247,.35); color: #fff; }

/* ── Mobile nav: hamburger-style compact layout ── */
@media (max-width: 600px) {
  #sale-bar { font-size: 11px; padding: 7px 10px; gap: 5px; }
  .sb-cd { margin: 0 3px; }
  .cd-u { padding: 2px 5px; min-width: 28px; }
  .cd-n { font-size: 13px; }
  nav { height: 56px; }
  .nav-in { padding: 0 14px; flex-wrap: nowrap; }
  .nav-logo-img { height: 34px; }
  .nav-sl { font-size: 9px; letter-spacing: 0; }
  .nav-links { display: none; }
  .nav-cta { padding: 7px 10px; font-size: 10px; border-radius: 7px; white-space: nowrap; flex-shrink: 0; }
}
@media (max-width: 420px) {
  .nav-brand-text { display: none; }
  .nav-cta { font-size: 11px; padding: 8px 12px; }
}

/* ── Hero mobile ── */
@media (max-width: 600px) {
  #hero { padding: 40px 14px 36px; }
  .hero-grid { gap: 28px; grid-template-columns: 1fr; }
  .hero-right { order: 1; }
  .hero-proof { gap: 6px; }
  .hero-proof-badge { font-size: 10px; padding: 3px 8px; }
  .hook { font-size: 13px; margin-bottom: 12px; }
  .hero-h1 { font-size: 22px; line-height: 1.22; margin-bottom: 14px; }
  .hero-h1 em { font-size: 22px; }
  .ssub { font-size: 13px; line-height: 1.7; margin-bottom: 20px; }
  .hero-btns { gap: 9px; margin-top: 18px; }
  .hero-row { gap: 8px; flex-direction: column; }
  .btn-r1, .btn-r2, .btn-test, .btn-zalo, .btn-ghost {
    width: 100%; justify-content: center; padding: 13px 18px; font-size: 13px;
  }
  .hero-card { padding: 18px 14px; }
  .hero-stats { grid-template-columns: repeat(4,1fr); gap: 6px; margin-top: 12px; }
  .hstat-n { font-size: 16px; }
  .hstat-l { font-size: 9px; }
}

/* ── Countdown mobile ── */
@media (max-width: 480px) {
  #countdown-urgency { padding: 40px 12px; }
  .lc-badge { font-size: 10px; padding: 5px 14px; }
  .lc-title { font-size: 18px; }
  .lc-sub { font-size: 12px; }
  .lc-units { gap: 5px; }
  .lc-num {
    font-size: clamp(38px, 11vw, 60px);
    padding: 8px 10px;
    min-width: clamp(58px, 16vw, 80px);
    border-radius: 10px;
  }
  .lc-sep { font-size: 32px; margin-top: 6px; }
  .lc-lbl { font-size: 11px; }
  .urg-bar-wrap { margin-bottom: 20px; }
  .lc-cta-row { flex-direction: column; gap: 9px; }
  .lc-cta-row .btn { width: 100%; justify-content: center; padding: 13px 16px; font-size: 13px; }
  .btn-dismiss { font-size: 11px; }
}

/* ── Products section mobile ── */
@media (max-width: 600px) {
  #products { padding: 44px 14px; }
  .pg-grid { grid-template-columns: 1fr; gap: 16px; }
  .pg-card { padding: 22px 16px; }
  .pg-icon { font-size: 38px; }
  .pg-title { font-size: 17px; }
  .pg-sub { font-size: 12px; }
  .pg-tags { gap: 5px; }
  .pg-tag { font-size: 10px; padding: 2px 8px; }
  .pg-course { font-size: 12px; }
  .pg-cta { font-size: 13px; }
}

/* ── Locations mobile ── */
@media (max-width: 500px) {
  .loc-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .loc-card { padding: 16px 10px; }
  .loc-num { font-size: 24px; }
  .loc-addr { font-size: 12px; }
}

/* ── 6 Cam Kết mobile ── */
@media (max-width: 600px) {
  #cam-ket { padding: 48px 12px; }
  .ck-supertitle { font-size: 10px; padding: 6px 14px; }
  .ck-h1 { font-size: clamp(22px, 7vw, 32px); }
  .ck-desc { font-size: 13px; }
  .ck-trustbar { gap: 8px; }
  .ck-trust { font-size: 10px; padding: 4px 10px; }
  .ck-grid { grid-template-columns: 1fr; gap: 12px; }
  .ck-grid-bottom { grid-template-columns: 1fr; }
  .ck-card { padding: 20px 16px; border-radius: 14px; }
  .ck-num { width: 36px; height: 36px; font-size: 13px; border-radius: 9px; }
  .ck-icon { font-size: 22px; margin-bottom: 7px; }
  .ck-title { font-size: 13px; }
  .ck-body { font-size: 12px; }
  .ck-pill { font-size: 10px; }
  .ck-bottom-wrap { padding: 22px 14px; }
  .ck-bottom-title { font-size: 15px; }
}

/* ── Gifts mobile ── */
@media (max-width: 500px) {
  .gift-grid { grid-template-columns: 1fr; gap: 14px; }
  .gift-card { padding: 22px 16px; }
  .gift-emoji { font-size: 30px; margin-bottom: 8px; }
  .gift-title { font-size: 15px; }
  .gift-val { font-size: 18px; }
  .gift-item { font-size: 12px; }
}

/* ── Championship table mobile ── */
@media (max-width: 600px) {
  .prize-tbl { font-size: 11px; }
  .prize-tbl th, .prize-tbl td { padding: 7px 8px; }
  .prize-tot { font-size: clamp(24px, 8vw, 40px); }
}

/* ── Testimonials mobile ── */
@media (max-width: 600px) {
  .tg { grid-template-columns: 1fr; gap: 14px; }
  .tc { padding: 18px 14px; }
  .tc-quote { font-size: 12px; line-height: 1.75; }
  .tc-author { font-size: 12px; }
  .tc-role { font-size: 10px; }
}

/* ── Video grid mobile ── */
@media (max-width: 600px) {
  .video-grid { grid-template-columns: 1fr; gap: 14px; margin-top: 24px; }
  .video-caption { padding: 10px 12px; }
  .vc-name { font-size: 12px; }
  .vc-role { font-size: 10px; }
}

/* ── Form mobile ── */
@media (max-width: 600px) {
  #register { padding: 44px 12px; }
  .form-card { padding: 22px 14px; border-radius: 14px; }
  .form-grid { grid-template-columns: 1fr; gap: 14px; }
  .fg.full { grid-column: 1; }
  .finput, .fsel { padding: 11px 12px; font-size: 14px; border-radius: 7px; }
  .fsubmit { padding: 14px; font-size: 14px; border-radius: 10px; }
  .fnote { font-size: 11px; }
}

/* ── FAQ mobile ── */
@media (max-width: 600px) {
  .faq-list { padding: 0; }
  .faq-q { font-size: 13px; padding: 14px 14px; }
  .faq-a-in { font-size: 13px; padding: 0 14px 14px; }
}

/* ── Modal mobile ── */
@media (max-width: 600px) {
  .modal-ov { padding: 10px; }
  .mbox { padding: 18px 12px; border-radius: 14px; }
  .mh1 { font-size: 18px; }
  .msub { font-size: 12px; margin-bottom: 18px; }
  .crs-card { padding: 16px 12px; }
  .crs-title { font-size: 15px; }
  .crs-phases { grid-template-columns: 1fr; gap: 8px; }
  .phase { padding: 8px 10px; font-size: 11px; }
  .price-options { grid-template-columns: 1fr; gap: 8px; }
  .price-opt { padding: 12px 10px; }
  .po-price { font-size: 17px !important; }
  .po-label, .po-per { font-size: 10px; }
  .mtabs { gap: 5px; }
  .mtab { padding: 6px 10px; font-size: 11px; }
  .modal-cta { gap: 9px; }
  .modal-cta .btn { font-size: 13px; padding: 13px 16px; }
}

/* ── Thank you overlay mobile ── */
@media (max-width: 480px) {
  .ty-box { padding: 6px 0; }
  .ty-success-ring { width: 72px; height: 72px; }
  .ty-emoji { font-size: 38px; }
  .ty-h1 { font-size: 24px; }
  .ty-subtitle { font-size: 12px; margin-bottom: 14px; }
  .ty-steps { gap: 8px; }
  .ty-step { padding: 11px 12px; gap: 10px; }
  .ty-step-num { width: 28px; height: 28px; font-size: 12px; }
  .ty-step-title { font-size: 12px; }
  .ty-step-desc { font-size: 11px; }
  .ty-zalo-box { padding: 16px 14px; }
  .ty-zalo-title { font-size: 14px; }
  .ty-cd { font-size: 44px; }
  .ty-zalo-btn { padding: 12px 16px; font-size: 13px; }
}

/* ── Float panel mobile ── */
@media (max-width: 480px) {
  #float-panel { bottom: 70px; right: 10px; gap: 6px; }
  .fp-btn { padding: 7px 11px; font-size: 11px; }
  .fp-zalo { width: 42px; height: 42px; }
}

/* ── Popup mobile ── */
@media (max-width: 480px) {
  .popup-box { padding: 24px 16px; border-radius: 14px; }
  .popup-h1 { font-size: 18px; }
  .popup-sub { font-size: 12px; }
  .popup-btns .btn { padding: 12px; font-size: 13px; }
}

/* ── Footer mobile ── */
@media (max-width: 600px) {
  footer { padding: 36px 14px 20px; }
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
  .fbottom { flex-direction: column; gap: 6px; text-align: center; font-size: 10px; }
  .flinks a { font-size: 12px; }
  .ftitle { font-size: 11px; }
  .fdesc { font-size: 12px; }
}

/* ── Brand/Values section mobile ── */
@media (max-width: 500px) {
  .val-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .val-card { padding: 14px 10px; }
  .bquote { padding: 16px 16px; font-size: 13px; }
}

/* ── Section headings mobile ── */
@media (max-width: 480px) {
  h2.st { font-size: clamp(18px, 5.5vw, 26px); }
  section { padding: 40px 12px; }
  .sec-mid { border-left: none; border-right: none; }
  .sbadge, .sbadge-gold, .sbadge-cyan, .sbadge-red, .sbadge-orange {
    font-size: 9px; padding: 4px 10px;
  }
  .ssub { font-size: 12px; }
}

/* ── Drive link button mobile ── */
@media (max-width: 480px) {
  .drive-link-box { flex-direction: column; align-items: flex-start !important; }
  .drive-link-box .drive-btns { flex-direction: row; width: 100%; }
  .drive-link-box .drive-btns a { flex: 1; justify-content: center; text-align: center; }
}

/* ── Tablet improvements (601–900px) ── */
@media (min-width: 601px) and (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .hero-right { order: -1; }
  .pg-grid { grid-template-columns: 1fr 1fr; }
  .ck-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .tg { grid-template-columns: 1fr 1fr; }
  .video-grid { grid-template-columns: 1fr 1fr; }
  .gift-grid { grid-template-columns: 1fr 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}

/* ── Touch-friendly tap targets ── */
@media (hover: none) and (pointer: coarse) {
  .btn { min-height: 44px; }
  .nav-cta { min-height: 40px; }
  .faq-q { min-height: 48px; }
  .fsel, .finput { min-height: 46px; font-size: 16px !important; }
  .mtab { min-height: 38px; }
  a, button { -webkit-tap-highlight-color: rgba(168,85,247,.2); }
}

/* ── Prevent input zoom on iOS ── */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  select, textarea, input { font-size: 16px; }
}

/* ── Safe area for iPhone notch/home bar ── */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  #float-panel { bottom: calc(70px + env(safe-area-inset-bottom)); }
  footer { padding-bottom: calc(24px + env(safe-area-inset-bottom)); }
}

/* ── Canvas on low-power mode ── */
@media (prefers-reduced-motion: reduce) {
  #circuit-canvas { display: none; }
  .anim { opacity: 1 !important; transform: none !important; }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* ── OnlinePage testimonial match ───────────────────────── */
#testi { background:#0D0820; padding:64px 20px; }
#testi .tg { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
#testi .tc {
  background:rgba(168,85,247,.07); border:1px solid rgba(168,85,247,.15);
  border-radius:var(--rlg); padding:22px; transition:all .3s;
}
#testi .tc:hover { border-color:var(--p3); box-shadow:var(--neon-p); transform:translateY(-4px); }
#testi .ts { color:var(--gold); font-size:15px; margin-bottom:12px; letter-spacing:1px; }
#testi .tq { font-size:13px; color:rgba(255,255,255,.7); line-height:1.75; margin-bottom:16px; font-style:italic; }
#testi .ta { display:flex; align-items:center; gap:10px; }
#testi .tav {
  width:38px; height:38px; border-radius:50%;
  background:linear-gradient(135deg,var(--p),var(--p2));
  display:flex; align-items:center; justify-content:center;
  font-weight:800; color:#fff; font-size:13px; flex-shrink:0;
  border:1px solid rgba(168,85,247,.4);
}
#testi .tn { font-weight:700; font-size:13px; color:#fff; }
#testi .ti { font-size:11px; color:rgba(255,255,255,.45); }
#testi .tv-ph {
  margin-top:14px; background:#000;
  border:1px solid rgba(168,85,247,.3); border-radius:8px;
  aspect-ratio:16/9; display:flex; flex-direction:column; align-items:center;
  justify-content:center; cursor:pointer; transition:border-color .25s; position:relative;
  overflow:hidden;
}
#testi .tv-ph:hover { border-color:var(--p3); }
#testi .tv-ph.playing { cursor:default; }
#testi .tv-thumb {
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0;
  transition:transform .4s ease;
}
#testi .tv-ph:hover .tv-thumb { transform:scale(1.04); }
#testi .tv-overlay {
  position:absolute; inset:0; z-index:1; pointer-events:none;
  background:linear-gradient(to top,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 50%,rgba(0,0,0,.1) 100%);
}
#testi .tplay {
  width:44px; height:44px; background:rgba(168,85,247,.9); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:16px; margin-bottom:6px; color:#fff; position:relative; z-index:2;
  box-shadow:0 2px 12px rgba(0,0,0,.5); transition:transform .3s;
}
#testi .tv-ph:hover .tplay { transform:scale(1.1); }
#testi .tv-ph p {
  font-size:11px; color:rgba(255,255,255,.8); text-align:center;
  position:relative; z-index:2; text-shadow:0 1px 3px rgba(0,0,0,.8);
}
#testi .tv-iframe { position:absolute; inset:0; width:100%; height:100%; border:none; display:block; z-index:2; }

@media(max-width:900px) {
  #testi .tg { grid-template-columns:1fr; }
}

/* ── Cross-device stability overrides ───────────────────── */
html, body, #root { min-height: 100%; width: 100%; }
body { min-width: 320px; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
section, header, footer, nav, #sale-bar, .modal-ov, .popup-ov { max-width: 100vw; }
.container, .nav-in, .hero-grid, .pg-grid, .ck-grid, .ck-grid-bottom, .tg,
.video-grid, .gift-grid, .form-grid, .footer-grid, .price-options, .crs-phases {
  min-width: 0;
}
.hero-left, .hero-right, .hero-card, .pg-card, .ck-card, .tc, .gift-card,
.form-card, .crs-card, .price-opt, .phase, .mbox, .popup-box, .ty-box {
  min-width: 0;
}
.hero-h1, h2.st, .pg-title, .ck-title, .crs-title, .mh1, .popup-h1, .ty-h1,
.faq-q, .fdesc, .ssub {
  overflow-wrap: anywhere;
}
.nav-links { flex-wrap: wrap; row-gap: 8px; }
.btn, .nav-cta, .pg-cta, .fsubmit, .ty-zalo-btn { max-width: 100%; white-space: normal; text-align: center; }
img, video, iframe, canvas { max-width: 100%; }
.video-wrap, .video-placeholder { width: 100%; }

@media (max-width: 1100px) {
  .container, .nav-in { max-width: 100%; }
  .hero-grid { grid-template-columns: 1fr; gap: 36px; }
  .nav-links { gap: 14px; font-size: 12px; }
}
@media (min-width: 601px) and (max-width: 1100px) {
  .hero-right { order: -1; }
}

@media (min-width: 901px) and (max-width: 1100px) {
  .pg-grid, .tg, .video-grid, .gift-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ck-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ck-grid-bottom { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 601px) and (max-width: 768px) {
  nav { height: auto; min-height: 64px; }
  .nav-in { flex-wrap: wrap; gap: 10px; padding: 10px 14px; }
  .nav-brand { flex: 1 1 auto; min-width: 190px; }
  .nav-links { order: 3; width: 100%; justify-content: center; gap: 10px 16px; }
  .nav-cta { padding: 8px 14px; font-size: 12px; }
  .hero-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .loc-grid, .val-grid { grid-template-columns: 1fr 1fr; }
  .price-options { grid-template-columns: 1fr !important; }
  .mbox, .popup-box, .ty-box { width: min(100%, calc(100vw - 20px)); }
  .modal-ov { align-items: flex-start; overflow-y: auto; }
  .mbox { max-height: none; margin: 12px auto; }
}

@media (max-width: 480px) {
  .container, .nav-in { padding-left: 12px; padding-right: 12px; }
  .nav-logo-img { height: 38px; }
  .nav-sl { font-size: 9px; }
  .nav-slogan-sub { display: none; }
  .nav-links { display: none; }
  #sale-bar { font-size: 11px; line-height: 1.45; padding: 8px 8px; }
  .sb-cd { width: 100%; justify-content: center; margin: 4px 0 0; }
  .hero-proof, .pg-tags, .ck-trustbar { justify-content: center; }
  .val-grid { grid-template-columns: 1fr; }
  .loc-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-stats { grid-template-columns: repeat(4, 1fr); }
  .price-opt.best { align-items: flex-start !important; text-align: left !important; }
  .price-opt.best > div:last-child { text-align: left !important; width: 100%; }
  .mtabs { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
  .mtab { flex: 0 0 auto; }
  #float-panel { left: auto; right: 12px; bottom: calc(16px + env(safe-area-inset-bottom)); flex-direction: column; align-items: flex-end; max-width: none; }
  .fp-btn { flex: none; padding: 9px 13px; font-size: 12px; }
  .fp-zalo { flex: none; width: 44px; height: 44px; }
}

/* Mobile polish requested for header, section titles, and floating CTAs */
.sbadge, .sbadge-gold, .sbadge-cyan, .sbadge-red, .sbadge-orange {
  margin-bottom: 18px;
  line-height: 1.35;
}
h2.st {
  line-height: 1.28;
  margin-bottom: 20px;
}
.ssub {
  margin-top: 4px;
  line-height: 1.82;
}

@media (max-width: 768px) {
  .nav-in {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 10px 12px;
  }
  .nav-brand {
    min-width: 0;
    gap: 9px;
  }
  .nav-brand-text {
    min-width: 0;
    gap: 3px;
  }
  .nav-sl {
    line-height: 1.25;
    white-space: normal;
  }
  .nav-cta {
    justify-self: end;
    width: auto;
    white-space: nowrap;
  }
  h2.st {
    line-height: 1.3;
    margin-bottom: 18px;
  }
}

@media (max-width: 600px) {
  nav {
    height: 56px;
    min-height: 56px;
  }
  .nav-in {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    gap: 8px;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }
  .nav-brand-text {
    display: none;
  }
  .nav-logo-img {
    height: 36px;
  }
  .nav-cta {
    flex-shrink: 0;
    padding: 7px 12px;
    font-size: 12px;
    border-radius: 8px;
    white-space: nowrap;
    min-height: unset;
    justify-self: unset;
  }
  .sbadge, .sbadge-gold, .sbadge-cyan, .sbadge-red, .sbadge-orange {
    margin-bottom: 16px;
  }
  .ssub {
    line-height: 1.78;
  }
  #float-panel {
    left: auto !important;
    right: 12px !important;
    bottom: calc(16px + env(safe-area-inset-bottom)) !important;
    flex-direction: column !important;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 8px;
    max-width: none;
  }
  #float-panel .fp-btn {
    flex: none;
    height: auto;
    padding: 9px 13px;
    font-size: 12px;
    border-radius: 9px;
    white-space: nowrap;
  }
  #float-panel .fp-zalo {
    flex: none;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 999px;
    font-size: 20px;
  }
}

@media (max-width: 380px) {
  .nav-logo-img {
    height: 38px;
  }
  .nav-sl {
    font-size: 8px;
  }
  .nav-cta {
    min-height: 38px;
    padding: 9px 14px;
    font-size: 12px;
  }
  #float-panel .fp-btn {
    padding: 8px 11px;
    font-size: 11px;
  }
  #float-panel .fp-zalo {
    width: 40px;
    height: 40px;
  }
}

`
