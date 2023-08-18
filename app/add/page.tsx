"use client";

import addTemplate from "@/lib/familytreetemplate";
import FamilyTree from "@balkangraph/familytree.js";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";

type Inputs = {
	name: string;
	gender: string;
	partner: string;
	father: string;
	mother: string;
	children: string;
	birthdate: string;
	profession: string;
	hobbies: string;
	phone: string;
	bio: string;
	instagram: string;
	email: string;
	facebook: string;
};

interface input {
	id?: number;
	name: string;
	gender: string;
	pids?: string | number[];
	fid?: number;
	mid?: number;
	children?: any;
	birthdate?: any;
	profession?: string;
	hobbies?: string;
	phone?: string;
	bio?: string;
	instagram: string;
	email: string;
	facebook: string;
}

export default function AddForm() {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const getData = async () => {
			const data = await fetch("/api");
			const treeData = await data.json();
			return treeData;
		};
		if (!data) {
			getData().then((data) => setData(data));
		}
	}, [data]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (entry: input) => {
		for (const [field, answer] of Object.entries(entry)) {
			if (answer === "None" || answer === "") {
				delete entry[field as keyof typeof entry];
			}
		}
		// console.log(Math.max(0, ...data.map((x: any) => x.id)));
		entry.id = Math.max(0, ...data.map((x: any) => x.id)) + 1;

		if (entry.pids) {
			entry.pids = [parseInt(entry.pids as string)];
		}
		if (entry.children) {
			entry.children = entry.children.map(
				(child: { label: string; value: number }) => child.value
			);
		}

		console.log(entry);
		fetch("../api", {
			method: "POST",
			body: JSON.stringify({
				person: entry,
			}),
			headers: {
				"content-type": "application/json",
			},
		});
		window.location.reload();
	};

	const [currgender, changeCurrGender] = useState("female");

	if (!data)
		return (
			<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
				Loading...
			</h1>
		);

	return (
		<form
			className='py-10 w-2/5 m-auto flex flex-col space-y-3'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-5xl font-bold pb-10'>Personal Info</h1>
			<label>Name</label>
			<input
				placeholder='Full Name'
				{...register("name", { required: true })}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Gender</label>
			<select
				{...register("gender", { required: true })}
				onChange={(e) => changeCurrGender(e.target.value)}
				className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
			>
				<option value='female'>female</option>
				<option value='male'>male</option>
				<option value='other'>other</option>
			</select>

			<h1 className='text-5xl font-bold pt-10'>Family Info</h1>
			<label className='pt-5'>Husband/Wife</label>
			<input
				{...register("partner")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Father</label>
			<input
				{...register("father")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Mother</label>
			<input
				{...register("mother")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>children (separate by space or comma)</label>
			<input
				{...register("children")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Date of Birth</label>
			<input
				{...register("birthdate")}
				type='date'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<h1 className='text-5xl font-bold pt-20'>Extra info</h1>

			<label className='pt-5'>Profession</label>
			<input
				{...register("profession")}
				type='text'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Hobbies</label>
			<input
				{...register("hobbies")}
				type='text'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Short biography</label>
			<textarea
				{...register("bio")}
				placeholder='Any extra information you would like to put here!'
				className='px-5 py-3 h-96 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<h1 className='text-5xl font-bold pt-20'>Contact/Social</h1>

			<label className='pt-5'>Phone number</label>
			<input
				{...register("phone")}
				type='tel'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Email</label>
			<input
				{...register("email")}
				type='email'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Instagram handle</label>
			<input
				{...register("instagram")}
				type='email'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Facebook link</label>
			<input
				{...register("facebook")}
				type='email'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<input
				type='submit'
				className='w-fit px-5 py-3 rounded-full bg-slate-800 text-white'
			/>
		</form>
	);
}
