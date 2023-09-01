"use client";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/datatable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Person = {
	name: string;
	year?: string;
	marraige?: string;
	mother?: string;
	father?: string;
};

type StringDict = {
	[details: string]: string;
};

const columns: ColumnDef<Person>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					className='text-xl font-bold text-black'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-[1rem] ml-4'>{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "birthdate",
		header: ({ column }) => {
			return (
				<Button
					className='text-xl font-bold text-black'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					D.O.B
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-[1rem] ml-4'>{row.getValue("birthdate")}</div>
		),
	},
	{
		accessorKey: "father",
		header: ({ column }) => {
			return (
				<Button
					className='text-xl font-bold text-black'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Father
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-[1rem] ml-4'>{row.getValue("father")}</div>
		),
	},
	{
		accessorKey: "mother",
		header: ({ column }) => {
			return (
				<Button
					className='text-xl font-bold text-black'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Mother
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-[1rem] ml-4'>{row.getValue("mother")}</div>
		),
	},
	{
		accessorKey: "marriage",
		header: ({ column }) => {
			return (
				<Button
					className='text-xl font-bold text-black'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Marriage
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const values: String[] = row.getValue("marriage");
			return (
				<>
					{values.map((person) => (
						<div className='text-[1rem] ml-4'>{person}</div>
					))}
				</>
			);
		},
	},
];

const getData = async () => {
	const data = await fetch("/api").then((response) => {
		return response.json();
	});
	return data;
};

export default function NameIndex() {
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

	for (let obj of data) {
		obj.father = NameDict[obj.fid];
		obj.mother = NameDict[obj.mid];
		console.log(obj.pids.at(0));
		obj.marriage = obj.pids.map((id: string) => NameDict[id]);
	}

	return (
		<div className='flex flex-col items-center bg-white my-10'>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
