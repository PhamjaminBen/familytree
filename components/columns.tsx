import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import MemberPopup from "./memberpopup";
import type { Person } from "@/types/persontype";

export const columns: ColumnDef<Person>[] = [
	{
		accessorKey: "data",
		header: undefined,
		cell: undefined,
	},
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
		cell: ({ row }) => {
			const data: Person = row.getValue("data");
			return <MemberPopup data={data} />;
		},
	},
	{
		accessorKey: "datestring",
		header: ({ column }) => {
			return (
				<Button
					className='text-xl font-bold text-black'
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Dates
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='text-[1rem] ml-4'>{row.getValue("datestring")}</div>
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
					{values.map((person, id) => (
						<div key={id.toString()} className='text-[1rem] ml-4'>
							{person}
						</div>
					))}
				</>
			);
		},
	},
];
