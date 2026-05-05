// ============================================
// TRACKING UTILITIES
// - Meta Pixel: ID 2157352735031955
// - GA4: ID G-0K2CW1DQK1
// - Google Sheet endpoint
// ============================================

// URL Google Apps Script — endpoint nhận lead từ form
export const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzL_pQgB0NivwwVl9Dz8EJv5CTkRFhI7v_F9zKg5lZiBFSO0jqgo4ylqWXpNgotzSdX/exec';

// ============================================
// FACEBOOK PIXEL — Track event Lead
// ============================================
export function trackFacebookLead(data = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'Lead', {
        content_name: data.course || 'Khóa học Robotics',
        content_category: data.center || 'Sata Robo Đà Nẵng',
        value: 0,
        currency: 'VND'
      });
      console.log('[Pixel] Lead event tracked', data);
    } catch (err) {
      console.warn('[Pixel] Track Lead error:', err);
    }
  }
}

// ============================================
// FACEBOOK PIXEL — Track button click (CompleteRegistration intent)
// ============================================
export function trackPixelEvent(eventName, data = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('trackCustom', eventName, data);
      console.log('[Pixel] Custom event:', eventName, data);
    } catch (err) {
      console.warn('[Pixel] Custom track error:', err);
    }
  }
}

// ============================================
// GOOGLE ANALYTICS GA4 — Track event generate_lead
// ============================================
export function trackGA4Lead(data = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'generate_lead', {
        course_name: data.course || 'Không xác định',
        center: data.center || 'Không xác định',
        currency: 'VND',
        value: 0
      });
      console.log('[GA4] generate_lead event tracked', data);
    } catch (err) {
      console.warn('[GA4] Track lead error:', err);
    }
  }
}

// ============================================
// GA4 — Track custom event
// ============================================
export function trackGA4Event(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
      console.log('[GA4] Event:', eventName, params);
    } catch (err) {
      console.warn('[GA4] Event track error:', err);
    }
  }
}

// ============================================
// SUBMIT LEAD TO GOOGLE SHEETS via Apps Script
// ============================================
export async function submitLeadToSheet(formData) {
  try {
    // Apps Script parses raw JSON; text/plain keeps this request CORS-simple in browsers.
    const sheetPayload = JSON.stringify({
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      center: formData.center || '',
      course: formData.course || '',
      sataMath: formData.sataMath || ''
    });

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script trả no-cors → không đọc được response, nhưng data vẫn được gửi
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: sheetPayload
    });

    console.log('[Sheet] Lead submitted', formData);
    return { success: true };
  } catch (err) {
    console.error('[Sheet] Submit error:', err);
    return { success: false, error: err.message };
  }
}

// ============================================
// HÀM TỔNG HỢP — Submit lead + tracking đầy đủ
// ============================================
export async function handleLeadSubmission(formData) {
  // 1. Gửi data lên Google Sheet
  const sheetResult = await submitLeadToSheet(formData);

  // 2. Track Meta Pixel — event Lead
  trackFacebookLead({
    course: formData.course,
    center: formData.center
  });

  // 3. Track GA4 — event generate_lead
  trackGA4Lead({
    course: formData.course,
    center: formData.center
  });

  return sheetResult;
}

// ============================================
// VALIDATE PHONE VIETNAM
// SDT VN: bắt đầu 0, tổng 10 số (03x, 05x, 07x, 08x, 09x)
// Hoặc +84 prefix
// ============================================
export function validateVietnamPhone(phone) {
  const cleaned = phone.replace(/\s|-|\./g, '');
  const regex = /^(0|\+84)[35789]\d{8}$/;
  return regex.test(cleaned);
}

export function validateEmail(email) {
  if (!email) return true; // Email không bắt buộc
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
