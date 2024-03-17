'use client';
import Counter from '@/component/Counter';
import { useCountdown } from '@/helper/countdown';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import data from '../data/ramadan-date.json';

export default function Home() {
	const calendar = data;
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [todayMaghrib, setTodayMaghrib] = useState<Dayjs>();
	const [nextImsaq, setNextImsaq] = useState<Dayjs>();
	const [idulFitri, setIdulFitri] = useState<Dayjs>();

	const [day, hour, minute, second] = useCountdown(todayMaghrib ? todayMaghrib.format('YYYY/MM/DD HH:mm:ss') : dayjs().format('YYYY/MM/DD HH:mm:ss'));
	const [dayImsaq, hourImsaq, minuteImsaq, secondImsaq] = useCountdown(
		nextImsaq ? nextImsaq.format('YYYY/MM/DD HH:mm:ss') : dayjs().format('YYYY/MM/DD HH:mm:ss')
	);
	const [dayIdulFitri, hourIdulFitri, minuteIdulFitri, secondIdulFitri] = useCountdown(
		idulFitri ? idulFitri.format('YYYY/MM/DD HH:mm:ss') : dayjs().format('YYYY/MM/DD HH:mm:ss')
	);

	const play = () => {
		if (audioRef.current && dayjs().isSame(todayMaghrib)) {
			audioRef.current.play();
		}
	};
	const now = dayjs().format('YYYY-M-DD');
	const tomorrow = dayjs().add(1, 'day').format('YYYY-M-DD');
	const currentCalendar = calendar.find(cal => cal.date_for === now);
	const nextCalendar = calendar.find(cal => cal.date_for === tomorrow);

	useEffect(() => {
		setTodayMaghrib(dayjs(`${currentCalendar?.date_for} ${currentCalendar?.maghrib}`));
		if (dayjs().isBefore(dayjs(`${currentCalendar?.date_for} ${currentCalendar?.fajr}`))) {
			setNextImsaq(dayjs(`${currentCalendar?.date_for} ${currentCalendar?.fajr}`).subtract(10, 'minute'));
		} else {
			setNextImsaq(dayjs(`${nextCalendar?.date_for} ${nextCalendar?.fajr}`).subtract(10, 'minute'));
		}
		setIdulFitri(dayjs('2024/04/11'));
		play();
	}, []);
	return (
		<div className='flex flex-col w-full h-screen justify-center gap-5'>
			<div className='flex flex-col items-center w-full gap-5'>
				<Counter days={dayIdulFitri} hours={hourIdulFitri} minutes={minuteIdulFitri} seconds={secondIdulFitri} withDays />
				<p className='text-xl font-medium'>Menjelang Idul FItri</p>
			</div>
			<div className='flex flex-col sm:flex-row gap-5 sm:gap-0 w-full'>
				<div className='w-full flex flex-col items-center gap-5'>
					<Counter days={dayImsaq} hours={hourImsaq} minutes={minuteImsaq} seconds={secondImsaq} withDays={false} />
					<p className='text-xl font-medium'>
						Menjelang Imsak {dayjs().isAfter(dayjs(`${currentCalendar?.date_for} ${currentCalendar?.fajr}`)) && 'Berikutnya'}
					</p>
				</div>
				<div className='w-full flex flex-col items-center gap-5'>
					<Counter days={day} hours={hour} minutes={minute} seconds={second} withDays={false} />
					<p className='text-xl font-medium'>Menjelang Maghrib</p>
				</div>
			</div>
			<audio ref={audioRef} src='/adzan.mp3' />
		</div>
	);
}
