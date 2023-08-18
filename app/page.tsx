export default async function home() {
	return (
		<div className='flex flex-col gap-y-2 items-center text-center w-full px-36 py-10'>
			<p>
				<b>Welcome!</b> This website was created on October 15th 2022. There are
				[numNames] names in this family tree. The earliest recorded event is the
				birth of [name] in [year]. The most recent event is the birth of [name]
				in [year].
			</p>
		</div>
	);
}
