"use client";

import { verify } from "@/lib/userslice";
import { store } from "@/lib/store";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Login() {
	const verified = store.getState().user.verified;
	const [password, setPassword] = useState("");
	const router = useRouter();

	if (verified) {
		router.push("/");
	}

	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			<h1 className='text-center text-5xl font-bold absolute top-[40vh]'>
				Enter Password
			</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (password === "phamclan1977") {
						console.log("success");
						store.dispatch(verify());
						console.log(store.getState().user.verified);
						router.push("/");
					} else {
						alert("Wrong password");
					}
				}}
				className={` text-slate-800 absolute top-[50vh]`}
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
					className='bg-slate-800 text-white font-bold p-3 ml-5 rounded-xl'
				/>
			</form>
		</div>
	);
}
