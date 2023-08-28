"use client";
import { store } from "@/lib/store";
import { redirect } from "next/navigation";

export default async function Home() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}
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
