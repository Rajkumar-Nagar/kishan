"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MandiJoinButton } from '@/components/onlineMandi/joinButtion';
import { useRouter } from 'next/navigation';

// Define the types for the props
interface SlotCardProps {
    slotName: string;
    date: string;         // Date in ISO string format (or any valid date format)
    startTime: number;    // Start time as a number (e.g., 10 for 10:00 AM)
    endTime: number;      // End time as a number (e.g., 11 for 11:00 AM)
    backgroundImage: string;  // URL for the background image
    icon: string;         // URL for the icon
}

// Type for the countdown result
interface CountdownResult {
    isInSlot: boolean;
    remainingTime: string;
}

const SlotCard: React.FC<SlotCardProps> = ({ slotName, date, startTime, endTime, backgroundImage, icon }) => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const router = useRouter();

    // Update the current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Calculate time difference and determine if the slot is ongoing or upcoming
    const calculateTimeDifference = (startTime: number, endTime: number): CountdownResult => {
        const now = currentTime;

        // Current slot times (today)
        const startDateTime = new Date(now);
        const endDateTime = new Date(now);

        startDateTime.setHours(startTime, 0, 0); // Set start time
        endDateTime.setHours(endTime, 0, 0);     // Set end time

        // Next day slot time (if slot has ended today)
        const nextStartDateTime = new Date(startDateTime);
        nextStartDateTime.setDate(nextStartDateTime.getDate() + 1); // Move to the next day

        if (now < startDateTime) {
            // Slot hasn't started yet, show countdown to today's slot
            const diffInMs = startDateTime.getTime() - now.getTime();
            const hours = Math.floor(diffInMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
            const seconds = Math.floor((diffInMs / 1000) % 60);
            return {
                isInSlot: false,
                remainingTime: `${hours}h ${minutes}m ${seconds}s to start`,
            };
        } else if (now >= startDateTime && now <= endDateTime) {
            // Slot is ongoing
            return { isInSlot: true, remainingTime: "" };
        } else {
            // Slot has ended, show countdown for the next day's slot
            const diffInMs = nextStartDateTime.getTime() - now.getTime();
            const hours = Math.floor(diffInMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
            const seconds = Math.floor((diffInMs / 1000) % 60);
            return {
                isInSlot: false,
                remainingTime: `${hours}h ${minutes}m ${seconds}s to start`,
            };
        }
    };

    const { isInSlot, remainingTime } = calculateTimeDifference(startTime, endTime);

    const handleMainMandi = (): void => {
        router.push("/mandi/slot-1");
    }

    return (
        <div className="slot bg-[#282828] min-h-60 rounded-xl overflow-hidden">
            <div className="upperpart h-40 relative"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <div className="blackgradianrt absolute bottom-0 h-14 w-full flex items-end justify-end"
                    style={{ background: 'linear-gradient(0deg, #00000080, #0000)' }}
                >
                    <div className="content flex items-center gap-2 py-2 px-4">
                        {
                            !isInSlot && (
                                <Image width={100} height={100} alt='clock' src={"/clock.png"} className='w-4 h-4' />
                            )}

                        <h1 className='text-white text-base'>
                            {isInSlot ? <Image width={600} height={600} alt='reload' src={"/online1.png"} className='w-16 h-16' /> : remainingTime}
                        </h1>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between px-4'>
                <div className="bottompart py-3 space-y-1">
                    <div className="moring flex items-center gap-2">
                        <Image width={100} height={100} alt='icon' src={icon} className='w-6 h-6' />
                        <h1 className='text-white text-xl font-semibold'>{slotName}</h1>
                    </div>
                    <p className='text-[#b9bcbd] text-sm '>
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })} from {startTime}:00 to {endTime}:00
                    </p>
                </div>

                {/* Conditionally show the button */}
                {isInSlot ? (
                    <MandiJoinButton onClick={handleMainMandi} />
                ) : (null
                    // <p className='text-[#b9bcbd] text-sm '>{remainingTime}</p>
                )}
            </div>
        </div>
    );
};

export default SlotCard;
