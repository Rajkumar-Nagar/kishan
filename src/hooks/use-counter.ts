import { useState, useEffect, useMemo } from "react";

function useCountdown(targetDate?: string | Date, offset = 30) {
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeLeft = useMemo(() => {
        if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 30 };
        const difference = offset * 1e3 + +new Date(targetDate) - +new Date();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
        return timeLeft;
    }, [targetDate, currentTime, offset]);

    return timeLeft;
}

export default useCountdown;
