"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, Field } from "react-hook-form";
import { Cloudinary } from "@cloudinary/url-gen";
import { redirect } from "next/navigation";
import { useNavigate } from "react-router-dom";
import Confirmation from "@/components/confirmation";
import { Button } from "@/components/ui/button";

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
	binding: string;
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
	binding: string;
}
const checkKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === "Enter") e.preventDefault();
};

export default function AddMemberForm() {
	const [img, setImg] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [data, setData] = useState<any>(null);
	const [currDataIdx, setCurrDataIdx] = useState(0);
	const [treeData, setTreeData] = useState([
		{
			name: "",
			gender: "",
			partner: "",
			father: "",
			mother: "",
			children: "",
			birthdate: "",
			profession: "",
			hobbies: "",
			phone: "",
			bio: "",
			instagram: "",
			email: "",
			facebook: "",
			portrait: "",
		},
	]);
	const [currData, setCurrData] = useState({
		approved: false,
		name: "",
		gender: "",
		partner: "",
		father: "",
		mother: "",
		children: "",
		birthdate: "",
		profession: "",
		hobbies: "",
		phone: "",
		bio: "",
		instagram: "",
		email: "",
		facebook: "",
		portrait: "",
	});
	const [approved, setApproved] = useState(false);
	const [password, setPassword] = useState("");

	useEffect(() => {
		const getData = async () => {
			const raw = await fetch("/approvememberform/api");
			const data = await raw.json();
			return data;
		};
		const getTreeData = async () => {
			const data = await await fetch("../api");
			const treeData = await data.json();
			return treeData;
		};
		if (!data) {
			getData().then((data) => {
				setData(data);
				setCurrData(data[currDataIdx]);
				console.log("all data", data);
			});
			getTreeData().then((td) => setTreeData(td));
		}
	}, [data]);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
		control,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (entry: any) => {
		currData.approved = true;
		// entry.approved = true;
		fetch("/approvememberform/api", {
			method: "PATCH",
			body: JSON.stringify({
				entry: entry,
			}),
			headers: {
				"content-type": "application/json",
			},
		});
	};

	if (!data)
		return (
			<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
				Loading...
			</h1>
		);

	if (!approved)
		return (
			<div className='h-full w-full flex flex-col justify-center items-center'>
				<h1 className='text-center text-5xl font-bold absolute top-[40vh]'>
					Enter Password
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (password === "phamclan1977") {
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

	if (approved)
		return (
			<div className='w-full h-full pt-10'>
				<div className='max-w-full md:w-2/5 m-auto flex flex-row items-center justify-center space-x-5'>
					<button
						className='text-lg px-5 py-3 rounded-xl bg-slate-800 text-white font-bold'
						disabled={currDataIdx === 0}
						onClick={() => {
							reset();
							setCurrDataIdx(currDataIdx - 1);
							setCurrData(data[currDataIdx - 1]);
						}}
					>
						Prev
					</button>
					<p>
						{currDataIdx + 1} of {data.length}
					</p>
					<button
						className='text-lg px-5 py-3 rounded-xl bg-slate-800 text-white font-bold'
						disabled={currDataIdx === data.length - 1}
						onClick={() => {
							reset();
							setCurrDataIdx(currDataIdx + 1);
							setCurrData(data[currDataIdx + 1]);
						}}
					>
						Next
					</button>
				</div>

				<form
					className={`px-5 py-10 max-w-full md:w-3/5 m-auto flex flex-col space-y-3 ${
						currData.approved ? "bg-green-300" : "bg-red-300"
					} rounded-3xl mt-10`}
					onKeyDown={(e) => {
						checkKeyDown(e);
					}}
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className='font-bold text-2xl'>
						{currData.approved ? "Approved" : "NOT APPROVED"}{" "}
					</h1>
					<label>Full Name</label>
					<input
						defaultValue={currData.name}
						{...register("name", { required: true })}
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					{errors.name && (
						<span className='text-red-600'>Please enter your name.</span>
					)}
					<label className='pt-5'>Gender</label>
					<select
						defaultValue={currData.gender}
						{...register("gender", { required: true })}
						className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
					>
						<option value='female'>female</option>
						<option value='male'>male</option>
						<option value='other'>other</option>
					</select>
					<label className='pt-5'>Image link</label>
					{currData.portrait && (
						<img
							className='w-2/5 h-auto'
							src={currData.portrait}
							alt=''
							height={100}
							width={100}
						/>
					)}
					<input
						defaultValue={currData.portrait}
						{...register("portrait", { required: true })}
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Date of Birth</label>
					<input
						defaultValue={currData.birthdate}
						{...register("birthdate")}
						type='date'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<h1 className='text-5xl font-bold pt-10'>Family Info</h1>
					<label className='pt-5'>Husband/Wife</label>
					<input
						defaultValue={currData.partner}
						{...register("partner")}
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Father</label>
					<input
						defaultValue={currData.father}
						{...register("father")}
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Mother</label>
					<input
						defaultValue={currData.mother}
						{...register("mother")}
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Children (separate by space or comma)</label>
					<input
						defaultValue={currData.children}
						{...register("children")}
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<h1 className='text-5xl font-bold pt-20'>Extra info</h1>
					<label className='pt-5'>Profession</label>
					<input
						defaultValue={currData.profession}
						{...register("profession")}
						type='text'
						placeholder='Teacher, programmer, etc.'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Hobbies</label>
					<input
						defaultValue={currData.hobbies}
						{...register("hobbies")}
						type='text'
						placeholder='e.g. a sport you play, or passion you have. "Volleyball, Piano, ..."'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Short biography</label>
					<textarea
						defaultValue={currData.bio}
						{...register("bio")}
						placeholder='Any extra information you would like to put here!'
						className='px-5 py-3 h-96 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<h1 className='text-5xl font-bold pt-20'>Contact/Social</h1>
					<label className='pt-5'>Phone number</label>
					<input
						defaultValue={currData.phone}
						{...register("phone")}
						type='tel'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Email</label>
					<input
						defaultValue={currData.email}
						{...register("email")}
						type='email'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Instagram @</label>

					<input
						defaultValue={currData.instagram}
						{...register("instagram")}
						type='text'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>
					<label className='pt-5'>Facebook link</label>
					<input
						defaultValue={currData.facebook}
						{...register("facebook")}
						type='text'
						className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
					/>

					<label className='pt-5'>Assign Data To:</label>
					<select
						defaultValue={undefined}
						{...register("binding", { required: true })}
						className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
					>
						{treeData.map((person: any) => (
							<option key={person.id} value={person.id}>
								{person.name}
							</option>
						))}
					</select>
					<input
						type='submit'
						className='w-fit px-5 py-3 rounded-full bg-slate-800 text-white'
					/>
				</form>
			</div>
		);
}
