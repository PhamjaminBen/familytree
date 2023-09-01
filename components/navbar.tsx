import Link from "next/link";
export default function NavBar() {
	return (
		<nav className='bg-white text-black font-semibold max-w-[100vw] shadow-md'>
			<div
				id='content'
				className=' py-5 px-5 md:px-20 m-auto text-sm md:text-lg'
			>
				<ul className='flex gap-y-5 gap-x-2 md:gap-8'>
					<li>
						<Link href='/' className='font-extrabold text-lg md:text-xl'>
							The Phams - 1977 and Soaring
						</Link>
					</li>
					<li className=' ml-auto'>
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
						<Link href='/addmemberform' className='hover:underline'>
							Add Members
						</Link>
					</li>
					<li>
						<Link href='/nameindex' className='hover:underline'>
							Name Index
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
