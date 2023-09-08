"use client";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import DataTable from "@/components/datatable";
import { columns } from "@/components/columns";
import { redirect } from "next/navigation";
import { store } from "@/lib/store";

type StringDict = {
	[details: string]: string;
};

const fetchData = async () => {
	const data = await fetch("/api");
	const cleanData: any = await data.json();

	for (const person of cleanData) {
		person.datestring = "";
		if (person.isdeceased === "true") {
			if (person.birthdate) {
				const birthyear = new Date(person.birthdate).getFullYear();
				person.datestring += `${birthyear}-`;
			} else {
				person.datestring = "???? - ";
			}

			if (person.deathdate) {
				const deathyear = new Date(person.deathdate).getFullYear();
				person.datestring += `${deathyear}`;
			} else {
				person.datestring += "????";
			}
		} else {
			if (person.birthdate) {
				const birthyear = new Date(person.birthdate).getFullYear();
				person.datestring = `b.${birthyear}`;
			}
		}
	}
	return cleanData;
};

export default function NameIndex() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}

	const { isLoading, data } = useQuery({
		queryKey: ["data"],
		queryFn: fetchData,
	});

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

	const NameDict: StringDict = {};
	for (let obj of data) {
		NameDict[obj.id] = obj.name;
	}

	console.log(data);
	for (let obj of data) {
		obj.father = NameDict[obj.fid];
		obj.mother = NameDict[obj.mid];
		obj.marriage = obj.pids.map((id: string) => NameDict[id]);
		obj.data = { ...obj };
	}

	console.log(data);
	return (
		<div className='flex flex-col items-center bg-white my-10'>
			<h1 className='text-3xl lg:text-5xl font-bold text-center'>Name Index</h1>
			<p className='text-center md:text-left w-[95vw] xl:w-1/2 mb-5'>
				Currently showing {data.length} names
			</p>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
