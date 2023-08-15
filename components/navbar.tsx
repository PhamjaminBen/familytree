import Link from "next/link";
export default function NavBar() {
	return (
		<nav className='bg-white text-black font-semibold text-lg w-full shadow-md'>
			<div id='content' className=' py-5 px-20 m-auto text-lg'>
				<ul className='flex gap-8'>
					<li>
						<Link href='/' className='font-extrabold text-xl'>
							The Phams - 1977 and Soaring
						</Link>
					</li>
					<li className='ml-auto'>
						<Link href='/' className='hover:underline'>
							Home
						</Link>
					</li>
					<li>
						<Link href='/tree' className='hover:underline'>
							Family Tree
						</Link>
					</li>
					<li>
						<Link href='/tree/add' className='hover:underline'>
							Add Members
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
