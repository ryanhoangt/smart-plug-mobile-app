import { useEffect, useState } from 'react';
import { getFormatedDate } from '../services/time.service';

function useTimer() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const id = setInterval(() => {
      const timeString = getFormatedDate();
      setTime(timeString);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return time;
}

export default useTimer;
