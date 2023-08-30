"use client";

import createTree from "@/lib/familytreeoptions";
import addTemplate from "@/lib/familytreetemplate";
import { store } from "@/lib/store";
import FamilyTree from "@balkangraph/familytree.js";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
	const data = await fetch("/api");
	const cleanData = await data.json();
	return cleanData;
};

export default function Tree() {
	addTemplate(FamilyTree);
	if (!store.getState().user.verified) {
		redirect("/login");
	}

	const { isLoading, data } = useQuery({
		queryKey: ["treeData"],
		queryFn: fetchData,
	});

	useEffect(() => {
		let tree: FamilyTree;
		if (!isLoading) {
			tree = createTree(data);
		}
	}, [isLoading]);

	return (
		<div className='flex flex-col items-center bg-white h-[87vh]'>
			{isLoading ? (
				<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
					Loading...
				</h1>
			) : (
				<div className='bg-slate-100 opacity-0 sm:opacity-100 p-5 rounded-xl self-start absolute top-0 sm:top-[12vh] z-20 space-y-10 mx-5'>
					<h1 className='m-auto sm:text-lg font-semibold w-full text-left'>
						Want to add yourself to the tree?{" "}
						<Link
							href='/addmemberform'
							className='text-blue-500 hover:underline hover:text-indigo-600'
						>
							Click here to submit a form.
						</Link>
					</h1>
				</div>
			)}
			<div
				id='tree'
				className='h-[85vh] sm:h-[97vh] w-[98vw] rounded-xl mb-1 mt-1 '
			></div>
		</div>
	);
}
