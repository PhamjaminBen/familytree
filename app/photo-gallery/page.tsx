import Link from "next/link";

export default function PhotoGallery() {
	return (
		<>
			<h1 className='text-3xl lg:text-5xl font-bold text-center my-10'>
				Photo Gallery
			</h1>
			<Link href='/photo-gallery/add'>
				<div className='p-5 bg-blue-500 w-36 m-auto rounded-xl text-white text-xl text-center'>
					Add
				</div>
			</Link>
		</>
	);
}
