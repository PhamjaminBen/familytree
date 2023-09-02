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

const getData = async () => {
	const data = await fetch("/api").then((response) => {
		return response.json();
	});
	return data;
};

export default function NameIndex() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}

	const { isLoading, data } = useQuery({
		queryKey: ["data"],
		queryFn: getData,
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

	return (
		<div className='flex flex-col items-center bg-white my-10'>
			<p className='text-left w-[95vw] xl:w-1/2 mb-5'>
				Currently showing {data.length} names
			</p>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
