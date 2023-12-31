"use client";
import { store } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Circles } from "react-loader-spinner";

export default function Home() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}
	return (
		<div className='flex flex-col gap-y-16 items-center text-center text-lg md:text-2xl max-w-5xl m-auto p-10'>
			<div id='title'>
				<h1 className='text-black font-bold  text-6xl md:text-9xl w-[100vw]'>
					The Pham Family
				</h1>
				<h2 className='text-slate-800 font-bold  text-lg md:text-3xl mt-5'>
					1977 and Soaring
				</h2>
			</div>
			<p className=''>
				<b>Welcome!</b> This is a website dedicated to the history and ancestry
				of the Pham family, who first came to the United States in 1977.
				Currently a Work in Progess, stay tuned🫡
			</p>
			{/* <Image
				src='/Pham.jpg'
				alt='PhamilyPicture'
				height={750}
				width={750}
			></Image> */}
			<div className='flex flex-row flex-wrap justify-evenly'>
				<Link
					href='/tree'
					className=' bg-[#9ac0dd] text-white py-5 px-7 w-56 rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl  m-1.5'
				>
					Family Tree
				</Link>
				<Link
					href='/add-member-form'
					className=' bg-[#9ac0dd] text-white py-5 px-7 w-56 rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl   m-1.5'
				>
					Add Member
				</Link>
				<Link
					href='/calendar'
					className=' bg-[#9ac0dd] text-white py-5 px-7 w-56 rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl   m-1.5'
				>
					Calendar
				</Link>
				<Link
					href='/name-index'
					className=' bg-[#9ac0dd] text-white py-5 px-7 w-56 rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl   m-1.5'
				>
					Name Index
				</Link>
			</div>

			<article className='max-w-5xl rounded-xl bg-slate-100 text-slate-800 p-2 shadow-md'>
				<h1 className='font-bold text-3xl pb-7'>About the Phams</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
					architecto libero ab similique dolorum, ipsa illo ipsum molestias
					voluptas natus quasi magnam, debitis animi quidem facilis neque
					consequatur esse suscipit.
				</p>
			</article>

			<article className=' text-slate-900'>
				<h1 className='font-bold text-3xl pb-7'>
					What we plan to add in the future...
				</h1>
				<ul className='space-y-3'>
					<li className='border-b-2 border-indigo-200 pb-2'>
						Photo and Video Sharing
					</li>
					<li className='border-b-2 border-indigo-200 pb-2 line-through text-gray-600'>
						Event Calendar
					</li>
					<li className='border-b-2 border-indigo-200 pb-2'>Blog Posts</li>
					<li className='border-b-2 border-indigo-200 pb-2'>
						Message Board/Forum
					</li>
					<li className='border-b-2 border-indigo-200 pb-2'>
						Memorial Section
					</li>
				</ul>
			</article>
		</div>
	);
}
