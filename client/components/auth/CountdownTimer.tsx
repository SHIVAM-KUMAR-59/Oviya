'use client';
import { useEffect, useState } from 'react';

const CountdownTimer = ({
  seconds,
  onExpire,
}: {
  seconds: number;
  onExpire: () => void;
}) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onExpire]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const expired = remaining <= 0;

  return (
    <span
      style={{
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums',
        color: expired ? '#e57373' : remaining < 60 ? 'var(--rose)' : 'var(--soft)',
      }}
    >
      {expired ? 'Expired' : `${m}:${s.toString().padStart(2, '0')}`}
    </span>
  );
};

export default CountdownTimer;
