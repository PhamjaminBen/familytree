"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { redirect } from "next/navigation";
import Confirmation from "@/components/confirmation";
import { store } from "@/lib/store";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { Circles, ColorRing, Oval } from "react-loader-spinner";
import { Person } from "@/types/persontype";
import { useRouter } from "next/navigation";

type Inputs = {
	title: string;
	description: string;
	day: string;
	month: string;
	year: string;
	image: any;
	taggedIDs: any;
};

type FormData = {
	title?: string;
	description?: string;
	day?: string;
	month?: string;
	year?: string;
	image: any;
	taggedIDs?: any;
};

const checkKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === "Enter") e.preventDefault();
};

const fetchData = async () => {
	const data = await fetch("/api");
	const cleanData = await data.json();
	return cleanData;
};

export default function AddMemberForm() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}

	const { isLoading, data } = useQuery({
		queryKey: ["data"],
		queryFn: fetchData,
	});

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
		control,
	} = useForm<Inputs>();

	const [img, setImg] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [submitLoading, setSubmitLoading] = useState(false);
	const router = useRouter();

	if (isLoading)
		return (
			<div className='flex flex-col items-center bg-white h-[87vh]'>
				<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
					Loading...
				</h1>
				<Circles
					height='80'
					width='80'
					color='#000'
					ariaLabel='circles-loading'
					wrapperStyle={{ position: "absolute", top: "50%" }}
					wrapperClass=''
					visible={true}
				/>
			</div>
		);

	const people = data.map((person: Person) => ({
		label: person.name,
		value: person.id,
	}));

	const onSubmit: SubmitHandler<Inputs> = async (entry: FormData) => {
		setSubmitLoading(true);
		if (!entry.image) {
			setErrorMessage("Image is required");
			setSubmitLoading(false);
			return;
		}
		if (!entry.image.type.startsWith("image")) {
			setErrorMessage("Please upload an Image file");
			setSubmitLoading(false);
			return;
		}

		const date = `${entry.year}-${entry.month?.padStart(
			2,
			"0"
		)}-${entry.day?.padStart(2, "0")}`;

		const formData = new FormData();
		formData.append("file", entry.image);
		formData.append("upload_preset", "image_preset");

		const cloudImage = await fetch(
			`https://api.cloudinary.com/v1_1/dogeq8qft/image/upload`,
			{
				method: "POST",
				body: formData,
			}
		).then((result) => {
			return result.json();
		});

		fetch("/photo-gallery/api", {
			method: "POST",
			body: JSON.stringify({
				image: {
					url: cloudImage.url,
					title: entry.title,
					description: entry.description,
					date: date ? date : "",
					people: entry.taggedIDs?.map(
						(entry: { label: string; value: string }) => entry.value
					),
				},
			}),
			headers: {
				"content-type": "application/json",
			},
		}).then(() => {
			setSubmitLoading(false);
			router.push("/photo-gallery");
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

			<div className='flex flex-row'>
				<label>Image</label>
				<p className='text-red-500'>*</p>
			</div>
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
			{errorMessage && <p className='text-red-500'>{errorMessage}</p>}

			<label>People in Photo</label>
			<Controller
				control={control}
				name={"taggedIDs"}
				render={({ field: { value, onChange, ...field } }) => {
					return (
						<Select
							isMulti
							{...field}
							options={people}
							onChange={(val) => onChange(val)}
						/>
					);
				}}
			/>

			<div className='flex flex-row pt-8'>
				<label>Image Title </label>
			</div>
			<input
				{...register("title")}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Image Date</label>
			<div className=' flex flex-col items-center lg:flex-row flex-wrap space-y-3 lg:space-y-0 space-x-0 lg:space-x-3'>
				<label className='mr-2'>Year</label>
				<select
					{...register("year")}
					defaultValue={undefined}
					className='w-24 px-5 py-3 border-2 border-slate-800/50 rounded-xl'
				>
					<option key={-1} value={undefined}></option>
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
					defaultValue={undefined}
					className='w-24 px-5 py-3 border-2 border-slate-800/50 rounded-xl'
				>
					<option key={-1} value={undefined}></option>
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
					defaultValue={undefined}
				>
					<option key={-1} value={undefined}></option>
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

			<div className='inline-flex items-center gap-x-2'>
				<input
					type='submit'
					className='w-fit px-5 py-3 bg-[#9ac0dd] text-white rounded-full hover:bg-white hover:text-[#9ac0dd] hover:border-[#9ac0dd] border-white   border-2 active:text-2xl  font-semibold'
				/>
				{submitLoading && (
					<Oval
						height={40}
						width={40}
						color='#4fa94d'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
						ariaLabel='oval-loading'
						secondaryColor='#4fa94d'
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				)}
			</div>
		</form>
	);
}
