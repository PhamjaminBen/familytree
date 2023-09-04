"use client";

import { verify } from "@/lib/userslice";
import { store } from "@/lib/store";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Login() {
	const verified = store.getState().user.verified;
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	if (verified) {
		router.push("/");
	}

	return (
		<div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-5'>
			<div id='title'>
				<h1 className='text-black font-bold  text-6xl md:text-9xl w-[100vw] mt-10'>
					The Pham Family
				</h1>
				<h2 className='text-slate-800 font-bold  text-lg md:text-3xl mt-5'>
					1977 and Soaring
				</h2>
			</div>
			<p className='text-center text-xl font-bold max-w-5xl px-10 mt-10'>
				<b>Welcome to the Pham family website!</b> To ensure privacy, please use
				the password to access the website. If you don&apos;t know the password,
				please ask whoever gave you the website link to provide it to you.
			</p>
			<h1 className='text-center text-5xl font-bold '>Enter Password</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (password === "phamclan1977") {
						console.log("success");
						store.dispatch(verify());
						console.log(store.getState().user.verified);
						router.push("/");
					} else {
						setErrorMessage("Wrong Password.");
					}
				}}
				className={` text-slate-800`}
			>
				<input
					autoFocus={true}
					type='password'
					className='bg-slate-100 py-3 px-5  text-lg rounded-xl '
					content={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<input
					type='submit'
					className='bg-slate-800 text-white font-bold p-3 ml-5 rounded-xl hover:bg-indigo-700 focus:p-2'
				/>
				{errorMessage && (
					<p className='text-red-500 mt-5 font-semibold text center'>
						{errorMessage}
					</p>
				)}
			</form>
		</div>
	);
}
