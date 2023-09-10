"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { redirect } from "next/navigation";
import Confirmation from "@/components/confirmation";
import { store } from "@/lib/store";

type Inputs = {
	title: string;
	description: string;
	day: string;
	month: string;
	year: string;
	image: any;
};

type FormData = {
	title?: string;
	description?: string;
	day?: string;
	month?: string;
	year?: string;
	image: any;
};

const checkKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === "Enter") e.preventDefault();
};

export default function AddMemberForm() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
		control,
	} = useForm<Inputs>();

	const [img, setImg] = useState("");

	const onSubmit: SubmitHandler<Inputs> = async (entry: FormData) => {
		console.log(typeof entry.image);
		console.log(entry.image);
		return;
		const date = `${entry.year}-${entry.month?.padStart(
			2,
			"0"
		)}-${entry.day?.padStart(2, "0")}`;

		if (entry.image) {
			const formData = new FormData();
			formData.append("file", entry.image);
			formData.append("upload_preset", "image_preset");
			await fetch(`https://api.cloudinary.com/v1_1/dogeq8qft/image/upload`, {
				method: "POST",
				body: formData,
			})
				.then((result) => {
					return result.json();
				})
				.then((data) => {
					entry.image = data.url;
				});
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
	};

	return (
		<form
			className='px-5 py-10 max-w-3xl m-auto flex flex-col space-y-3'
			onKeyDown={(e) => {
				checkKeyDown(e);
			}}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-5xl font-bold pb-3'>Add Photo</h1>

			<h1 className='text-5xl font-bold pb-10'>Image Title</h1>
			<div className='flex flex-row'>
				<label>Full Name </label>
				<p className='text-red-500'>*</p>
			</div>
			<input
				placeholder='Full Name'
				{...register("title")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Image</label>
			{img && (
				<Image className='w-auto' src={img} alt='' height={200} width={200} />
			)}
			<Controller
				control={control}
				name={"image"}
				render={({ field: { value, onChange, ...field } }) => {
					return (
						<input
							{...field}
							value={value?.fileName}
							onChange={(event: any) => {
								setImg(URL.createObjectURL(event.target.files[0]));
								onChange(event.target.files[0]);
							}}
							type='file'
							id='picture'
						/>
					);
				}}
			/>

			<label className='pt-5'>Date</label>
			<div className=' flex flex-col lg:flex-row flex-wrap space-y-3 lg:space-y-0 space-x-0 lg:space-x-3'>
				<label className='mr-2'>Year</label>
				<select
					{...register("year")}
					defaultValue={2023}
					className='w-24 px-5 py-3 border-2 border-slate-800/50 rounded-xl'
				>
					{Array(200)
						.fill(1)
						.map((x, y) => 2030 - (x + y))
						.map((number: number, x: number) => (
							<option key={x} value={number}>
								{number}
							</option>
						))}
				</select>

				<label className='mr-2'>Month</label>
				<select
					{...register("month")}
					defaultValue={1}
					className='w-24 px-5 py-3 border-2 border-slate-800/50 rounded-xl'
				>
					{Array(12)
						.fill(1)
						.map((x, y) => x + y)
						.map((number: number, x: number) => (
							<option key={x} value={number}>
								{number}
							</option>
						))}
				</select>

				<label className='mr-2'>Day</label>
				<select
					{...register("day")}
					className='w-24 px-5 py-3 border-2 border-slate-800/50 rounded-xl'
					defaultValue={1}
				>
					{Array(31)
						.fill(1)
						.map((x, y) => x + y)
						.map((number: number, x: number) => (
							<option key={x} value={number}>
								{number}
							</option>
						))}
				</select>
			</div>
			<label className='pt-5'>Photo Description</label>
			<textarea
				{...register("description")}
				placeholder='Any extra information you would like to put here!'
				className='px-5 py-3 h-96 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<input
				type='submit'
				className='w-fit px-5 py-3 bg-[#9ac0dd] text-white rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl  font-semibold'
			/>
		</form>
	);
}
