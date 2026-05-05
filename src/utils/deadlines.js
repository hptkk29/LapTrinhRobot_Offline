// ============================================
// Logic deadline xoay vòng (rolling deadline)
// Mốc cố định: ngày 5, 10, 15, 20, 25 mỗi tháng
// Sau ngày 25 → nhảy sang ngày 1 tháng sau
// ============================================

/**
 * Tính deadline kế tiếp dựa vào ngày hôm nay
 * @returns {Date} deadline gần nhất chưa qua
 */
export function getNextDeadline() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  // Các mốc deadline trong tháng
  const milestones = [5, 10, 15, 20, 25];

  // Tìm mốc gần nhất chưa qua
  for (const milestone of milestones) {
    if (day <= milestone) {
      return new Date(year, month, milestone, 23, 59, 59);
    }
  }

  // Nếu đã qua ngày 25 → deadline = cuối ngày cuối tháng này
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, lastDayOfMonth, 23, 59, 59);
}

/**
 * Format ngày deadline thành chuỗi DD/MM/YYYY
 */
export function formatDeadline(deadline) {
  const dd = String(deadline.getDate()).padStart(2, '0');
  const mm = String(deadline.getMonth() + 1).padStart(2, '0');
  const yyyy = deadline.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Tính khoảng thời gian còn lại từ now đến deadline
 * @returns {object} { days, hours, minutes, seconds, total, expired }
 */
export function getTimeRemaining(deadline) {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      expired: true
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    total: diff,
    expired: false
  };
}
