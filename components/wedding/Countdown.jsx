'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDate }) {
        const [timeLeft, setTimeLeft] = useState({});
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
                setMounted(true);

                const calculateTimeLeft = () => {
                        const difference = +new Date(targetDate) - +new Date();
                        let left = {};

                        if (difference > 0) {
                                left = {
                                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                                        minutes: Math.floor((difference / 1000 / 60) % 60),
                                        seconds: Math.floor((difference / 1000) % 60),
                                };
                        }
                        return left;
                };

                setTimeLeft(calculateTimeLeft());

                const timer = setInterval(() => {
                        setTimeLeft(calculateTimeLeft());
                }, 1000);
                return () => clearInterval(timer);
        }, [targetDate]);

        if (!mounted || Object.keys(timeLeft).length === 0) {
                return <div className="text-center text-xl font-serif">Today is the day!</div>;
        }

        return (
                <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center py-8"
                >
                        <div className="flex flex-wrap justify-center">
                                <TimeBox value={timeLeft.days || 0} label="Days" />
                                <TimeBox value={timeLeft.hours || 0} label="Hours" />
                                <TimeBox value={timeLeft.minutes || 0} label="Mins" />
                                <TimeBox value={timeLeft.seconds || 0} label="Secs" />
                        </div>
                </motion.div>
        );
}

const TimeBox = ({ value, label }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[90px] border border-white/20 shadow-lg">
                        <span className="block text-2xl md:text-4xl font-bold tabular-nums">
                                {value < 10 ? `0${value}` : value}
                        </span>
                </div>
                <span className="text-xs md:text-sm uppercase tracking-widest mt-2 font-medium opacity-80">
                        {label}
                </span>
        </div>
);
