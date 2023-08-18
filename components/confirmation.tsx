import Link from "next/link";
import { Button } from "./ui/button";

export default function Confirmation(props: any) {
	const { onSubmit } = props;
	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			<h1 className='text-center text-5xl font-bold absolute top-[40vh]'>
				Thank you!
			</h1>
			<h2 className='text-center text-2xl absolute top-[50vh]'>
				Your response has been recorded, and we will work to add you to the tree
				soon!
			</h2>
			<Button
				className='bg-slate-100 text-slate-800 absolute top-[58vh] py-3 px-5  text-lg rounded-xl hover:text-white transition'
				onClick={onSubmit}
			>
				Add Another Member
			</Button>
		</div>
	);
}
