import { useEffect, useState } from 'react';

/**
 * Hook theo dõi vị trí scroll (px tính từ top)
 * Dùng để ẩn/hiện top bar, floating CTA...
 */
export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // gọi lần đầu

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
