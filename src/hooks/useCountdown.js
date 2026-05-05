import { useEffect, useState } from 'react';
import { getNextDeadline, getTimeRemaining } from '../utils/deadlines';

/**
 * Hook countdown đến deadline kế tiếp (5/10/15/20/25 hàng tháng)
 * Tự động cập nhật mỗi 1 giây
 */
export default function useCountdown() {
  const [deadline, setDeadline] = useState(getNextDeadline());
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(deadline);
      setTimeLeft(remaining);

      // Nếu hết hạn → tính deadline mới
      if (remaining.expired) {
        const newDeadline = getNextDeadline();
        setDeadline(newDeadline);
        setTimeLeft(getTimeRemaining(newDeadline));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return { deadline, timeLeft };
}
