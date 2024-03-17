export default function DateTimeDisplay({ value, type }: { value: number; type: 'Hari' | 'Jam' | 'Menit' | 'Detik' }) {
	return (
		<div className='flex flex-col justify-center'>
			<p className='text-center'>{value.toString().length <= 1 ? `0${value}` : value}</p>
			<span className='text-lg text-center'>{type}</span>
		</div>
	);
}
