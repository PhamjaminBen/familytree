"use client";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsCaretDownFill } from "react-icons/bs";

export default function NavBar() {
	return (
		<nav className='bg-white text-black font-semibold max-w-[100vw] shadow-md'>
			<div
				id='content'
				className=' py-5 px-5 md:px-20 m-auto text-sm md:text-lg'
			>
				<ul className='flex gap-y-5 gap-x-2'>
					<li className='p-2 hidden sm:block'>
						<Link
							href='/'
							className='hover:bg-gray-100 p-2 rounded-xl transition-all duration-200 sm:text-lg lg:text-xl font-bold'
						>
							The Phams - 1977 and Soaring
						</Link>
					</li>
					<li className='p-2 sm:ml-auto'>
						<Link
							href='/'
							className='hover:bg-gray-100 p-2 rounded-xl transition-all duration-200'
						>
							Home
						</Link>
					</li>
					<li className='ml-auto sm:m-0'>
						<DropdownMenu>
							<DropdownMenuTrigger className='inline-flex items-end hover:bg-gray-100 p-2 rounded-xl transition-all duration-200'>
								<h1 className='mr-1'>Family </h1>
								<BsCaretDownFill />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel className='text-xl font-bold'>
									Family
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href='/tree' className='text-xl w-full'>
										Family Tree
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href='/nameindex' className='text-xl w-full'>
										Name Index
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href='/addmemberform' className='text-xl w-full'>
										Register Family Member
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
					<li>
						<DropdownMenu>
							<DropdownMenuTrigger className='inline-flex items-end hover:bg-gray-100 p-2 rounded-xl transition-all duration-200'>
								<h1 className='mr-1'>Events/Social</h1>
								<BsCaretDownFill />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel className='text-xl font-bold'>
									Events/Social
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href='/calendar' className='text-xl w-full'>
										Event Calendar
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href='/bulletin' className='text-xl w-full'>
										Bulletin Board
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href='/pham-legacy-program' className='text-xl w-full'>
										Pham Legacy Program
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
				</ul>
			</div>
		</nav>
	);
}
