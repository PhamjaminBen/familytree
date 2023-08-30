"use client";
import { store } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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
			<div className='flex flex-row flex-wrap space-y-5 space-x-0 sm:space-x-5 sm:space-y-0 justify-center'>
				<Link
					href='/tree'
					className=' bg-[#9ac0dd] text-white py-5 px-7 rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl font-semibold'
				>
					Go to family tree
				</Link>
				<Link
					href='/addmemberform'
					className=' bg-[#9ac0dd] text-white py-5 px-7 rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl  font-semibold'
				>
					Add yourself to the tree!
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
					<li className='border-b-2 border-indigo-200 pb-2'>Event Calendar</li>
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
