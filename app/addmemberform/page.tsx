"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { redirect } from "next/navigation";
import Confirmation from "@/components/confirmation";
import { store } from "@/lib/store";

type Inputs = {
	name: string;
	gender: string;
	partner: string;
	father: string;
	mother: string;
	children: string;
	birthyear: string;
	birthmonth: string;
	birthday: string;
	deathyear: string;
	deathmonth: string;
	deathday: string;
	isdeceased: boolean;
	profession: string;
	hobbies: string;
	phone: string;
	bio: string;
	instagram: string;
	email: string;
	facebook: string;
	portrait: any;
	birthdate: any;
	deathdate: any;
	deathknown: boolean;
};

type FormData = {
	name?: string;
	gender?: string;
	partner?: string;
	father?: string;
	mother?: string;
	children?: string;
	birthyear?: string;
	birthmonth?: string;
	birthday?: string;
	deathyear?: string;
	deathmonth?: string;
	deathday?: string;
	isdeceased?: boolean;
	profession?: string;
	hobbies?: string;
	phone?: string;
	bio?: string;
	instagram?: string;
	email?: string;
	facebook?: string;
	portrait?: any;
	birthdate?: any;
	deathdate?: any;
	deathknown?: boolean;
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
		formState: { errors },
		control,
	} = useForm<Inputs>();

	const [img, setImg] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const onSubmit: SubmitHandler<Inputs> = async (entry: FormData) => {
		entry.birthdate = `${entry.birthyear}-${entry.birthmonth?.padStart(
			2,
			"0"
		)}-${entry.birthday?.padStart(2, "0")}`;
		delete entry.birthyear;
		delete entry.birthmonth;
		delete entry.birthday;

		if (!entry.deathknown || !entry.isdeceased) {
			entry.deathdate = "";
		} else {
			entry.deathdate = `${entry.deathyear}-${entry.deathmonth?.padStart(
				2,
				"0"
			)}-${entry.deathday?.padStart(2, "0")}`;
		}
		delete entry.deathyear;
		delete entry.deathmonth;
		delete entry.deathday;

		delete entry.deathknown;

		if (entry.portrait) {
			const formData = new FormData();
			formData.append("file", entry.portrait);
			formData.append("upload_preset", "image_preset");
			await fetch(`https://api.cloudinary.com/v1_1/dogeq8qft/image/upload`, {
				method: "POST",
				body: formData,
			})
				.then((result) => {
					return result.json();
				})
				.then((data) => {
					delete entry.portrait;
					entry.portrait = data.url;
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
		}).then(() => setSubmitted(true));
	};

	if (submitted)
		return (
			<Confirmation
				onSubmit={() => {
					setSubmitted(false);
					location.reload();
				}}
			/>
		);

	return (
		<form
			className='px-5 py-10 max-w-3xl m-auto flex flex-col space-y-3'
			onKeyDown={(e) => {
				checkKeyDown(e);
			}}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-5xl font-bold pb-3'>New Member Form</h1>
			<p className='bg-slate-100 p-5 rounded-3xl'>
				If you would like to add a member to the family tree, please fill in
				this form. <br />
				<br />
				If a field doesn&apos;t apply to you or you would like to omit it, feel
				free to leave it blank, we only require your name, and some form of
				connection to a family member of the tree! <br />
				<br />
				For those concerned about privacy, we will omit the email and phone
				number on the public website.
			</p>

			<h1 className='text-5xl font-bold pb-10'>Personal Info</h1>
			<div className='flex flex-row'>
				<label>Full Name </label>
				<p className='text-red-500'>*</p>
			</div>
			<input
				placeholder='Full Name'
				{...register("name", { required: true })}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>
			{errors.name && (
				<span className='text-red-600'>Please enter your name.</span>
			)}

			<label className='pt-5'>Gender</label>
			<select
				{...register("gender", { required: true })}
				className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
			>
				<option value='female'>female</option>
				<option value='male'>male</option>
				<option value='other'>other</option>
				<option value='other'>Would not like to specify</option>
			</select>

			<label className='pt-5'>Image of self</label>
			{img && (
				<Image className='w-auto' src={img} alt='' height={200} width={200} />
			)}
			<Controller
				control={control}
				name={"portrait"}
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

			<label className='pt-5'>Date of Birth</label>
			<div className=' flex flex-col lg:flex-row flex-wrap space-y-3 lg:space-y-0 space-x-0 lg:space-x-3'>
				<label className='mr-2'>Year</label>
				<select
					{...register("birthyear")}
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
					{...register("birthmonth")}
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
					{...register("birthday")}
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

			<label className='pt-5 text-lg '>
				Is this person deceased?
				<input {...register("isdeceased")} type='checkbox' className='ml-2' />
			</label>

			<label className='pt-5 text-lg '>
				If deceased, is the date of death known?
				<input {...register("deathknown")} type='checkbox' className='ml-2' />
			</label>

			<label className='pt-5'>Date of Death (If applicable and known)</label>
			<div className=' flex flex-col lg:flex-row flex-wrap space-y-3 lg:space-y-0 space-x-0 lg:space-x-3'>
				<label className='mr-2'>Year</label>
				<select
					{...register("deathyear")}
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
					{...register("deathmonth")}
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
					{...register("deathday")}
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

			<h1 className='text-5xl font-bold pt-10'>Family Info</h1>
			<p className='bg-slate-100 p-5 rounded-3xl'>
				Please try to use full names for the relatives that you enter. Please
				fill out at least one box in this section so we know how you are related
				to the rest of the tree.
			</p>

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

			<label className='pt-5'>Children (separate by space or comma)</label>
			<input
				{...register("children")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<h1 className='text-5xl font-bold pt-20'>Extra info</h1>

			<label className='pt-5'>Profession</label>
			<input
				{...register("profession")}
				type='text'
				placeholder='Teacher, programmer, etc.'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Hobbies</label>
			<input
				{...register("hobbies")}
				type='text'
				placeholder='e.g. a sport you play, or passion you have. "Volleyball, Piano, ..."'
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

			<label className='pt-5'>Instagram @</label>
			<input
				{...register("instagram")}
				type='text'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Facebook link</label>
			<input
				{...register("facebook")}
				type='text'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<input
				type='submit'
				className='w-fit px-5 py-3 bg-[#9ac0dd] text-white rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl  font-semibold'
			/>
		</form>
	);
}
