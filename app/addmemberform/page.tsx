"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, Field } from "react-hook-form";
import { Cloudinary } from "@cloudinary/url-gen";
import { redirect } from "next/navigation";
import { useNavigate } from "react-router-dom";
import Confirmation from "@/components/confirmation";

const cld = new Cloudinary({
	cloud: {
		cloudName: "dogeq8qft",
		apiSecret: "Vn5ftFV0eZJPkVcAUWJ95w7mYoY",
		apiKey: "771763696918615",
	},
});

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
	portrait: any;
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
	portrait: any;
}
const checkKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === "Enter") e.preventDefault();
};

export default function AddMemberForm() {
	// const [data, setData] = useState<any>(null);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const data = await fetch("/api");
	// 		const treeData = await data.json();
	// 		return treeData;
	// 	};
	// 	if (!data) {
	// 		getData().then((data) => setData(data));
	// 	}
	// }, [data]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		control,
	} = useForm<Inputs>();

	const [img, setImg] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [password, setPassword] = useState("");
	const [approved, setApproved] = useState(false);

	const onSubmit: SubmitHandler<Inputs> = async (entry: any) => {
		if (entry.portrait) {
			const formData = new FormData();
			formData.append("file", entry.portrait);
			formData.append("upload_preset", "image_preset");
			const result = await fetch(
				`https://api.cloudinary.com/v1_1/dogeq8qft/image/upload`,
				{ method: "POST", body: formData }
			)
				.then((result) => {
					return result.json();
				})
				.then((data) => {
					delete entry.portrait;
					entry.portrait = data.url;
					console.log(entry);
				});
		}

		// console.log(entry, result);
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

	if (!approved)
		return (
			<div className='h-full w-full flex flex-col justify-center items-center'>
				<h1 className='text-center text-5xl font-bold absolute top-[40vh]'>
					Enter Password
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (password === "phamclan1977!") {
							setApproved(true);
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

	if (submitted)
		return (
			<Confirmation
				onSubmit={() => {
					console.log("clicked");
					setSubmitted(false);
					location.reload();
				}}
			/>
		);

	return (
		<form
			className='px-5 py-10 max-w-full md:w-2/5 m-auto flex flex-col space-y-3'
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
			<input
				{...register("birthdate")}
				type='date'
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

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
				className='w-fit px-5 py-3 rounded-full bg-slate-800 text-white'
			/>
		</form>
	);
}
