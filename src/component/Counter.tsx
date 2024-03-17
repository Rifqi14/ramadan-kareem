import DateTimeDisplay from './DateTimeDisplay';

export default function Counter({
	days,
	hours,
	minutes,
	seconds,
	withDays = false,
}: {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	withDays: boolean;
}) {
	return (
		<div className='flex flex-row items-center font-bold gap-4 sm:gap-10 text-lg sm:text-6xl border-2 border-black rounded-full w-fit p-10'>
			{withDays && (
				<>
					<DateTimeDisplay value={days} type='Hari' />
					<p>:</p>
				</>
			)}
			<DateTimeDisplay value={hours} type='Jam' />
			<p>:</p>
			<DateTimeDisplay value={minutes} type='Menit' />
			<p>:</p>
			<DateTimeDisplay value={seconds} type='Detik' />
		</div>
	);
}
