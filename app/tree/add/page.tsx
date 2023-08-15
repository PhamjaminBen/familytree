export default function add() {
	return (
		// <></>
		<form className='flex flex-col gap-y-2 items-center px-20'>
			<input
				type='text'
				placeholder='Full name'
				className='px-4 py-2 rounded w-3xl border-black border-2'
			/>
			<input
				type='text'
				placeholder='Last Name'
				className='px-4 py-2 rounded w-3xl border-black border-2'
			/>
		</form>
	);
}
