"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";

type Inputs = {
	name: string;
	gender: GenderEnum;
	pids: string;
	fid: number;
	mid: number;
	children: any;
};

interface input {
	id?: number;
	name: string;
	gender: GenderEnum;
	pids?: string | number[];
	fid?: number;
	mid?: number;
	children?: any;
}

enum GenderEnum {
	female = "female",
	male = "male",
	other = "other",
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
			if (answer === "None") {
				delete entry[field as keyof typeof entry];
			}
		}
		entry.id =
			data.length === 0 ? Math.max(...data.map((x: any) => x.id)) + 1 : 1;

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

	if (!data)
		return (
			<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
				Loading...
			</h1>
		);

	const options = data.map((person: any) => ({
		label: person.name,
		value: person.id,
	}));

	return (
		<form
			className='py-10 w-2/5 m-auto flex flex-col space-y-3'
			onSubmit={handleSubmit(onSubmit)}
		>
			<label>Name</label>
			<input
				placeholder='Full Name'
				{...register("name", { required: true })}
				className='px-5 py-3 border-2 border-slate-800/50 rounded-xl w-full'
			/>

			<label className='pt-5'>Gender</label>
			<select
				{...register("gender", { required: true })}
				className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
			>
				<option value='female'>female</option>
				<option value='male'>male</option>
				<option value='other'>other</option>
			</select>

			<label className='pt-5'>Husband/Wife</label>
			<select
				{...register("pids")}
				defaultValue={undefined}
				className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
			>
				<option key={0} value={undefined}>
					None
				</option>
				{data.map((person: any) => (
					<option key={person.id} value={person.id}>
						{person.name}
					</option>
				))}
			</select>

			<label className='pt-5'>Father</label>
			<select
				{...register("fid")}
				defaultValue={undefined}
				className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
			>
				<option key={0} value={undefined}>
					None
				</option>
				{data.map(
					(person: any) =>
						person.gender === "male" && (
							<option key={person.id} value={[person.id]}>
								{person.name}
							</option>
						)
				)}
			</select>

			<label className='pt-5'>Mother</label>
			<select
				{...register("mid")}
				defaultValue={undefined}
				className='w-fit px-5 py-3 border-2 border-slate-800/50 rounded-xl'
			>
				<option key={0} value={undefined}>
					None
				</option>
				{data.map(
					(person: any) =>
						person.gender === "female" && (
							<option key={person.id} value={[person.id]}>
								{person.name}
							</option>
						)
				)}
			</select>

			<label className='pt-5'>children</label>
			<Controller
				control={control}
				name='children'
				render={({ field: { onChange, onBlur, value, name, ref } }) => (
					<MultiSelect
						options={options}
						onChange={onChange}
						value={value ? value : []}
						labelledBy='Select'
						hasSelectAll={false}
					/>
				)}
			/>

			<input
				type='submit'
				className='w-fit px-5 py-3 rounded-full bg-slate-800 text-white'
			/>
		</form>
	);
}
