import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import type { Person } from "@/types/persontype";
import Image from "next/image";
import { useState } from "react";
interface PopupProps {
	data: Person;
}

export default function NewEventPopup() {
	const [eventTitle, setEventTitle] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventDate, setEventDate] = useState("");
	return (
		<Dialog>
			<DialogTrigger className='text-[1rem] hover:underline text-start'>
				<button className='bg-blue-500 text-white p-5 rounded-xl'>
					New Event
				</button>
			</DialogTrigger>
			<DialogContent className='max-h-[80vh] max-w-[95vw] md:max-w-3xl overflow-y-scroll flex flex-col items-center'>
				<DialogHeader>
					<DialogTitle>
						<h1 className='w-full text-5xl text-center'>test</h1>
					</DialogTitle>
				</DialogHeader>
				<fieldset className='mb-[15px] flex items-center gap-5'>
					<label className=' w-[90px] text-right text-[15px]' htmlFor='name'>
						Title
					</label>
					<input
						className='p-2 rounded-xl focus:shadow-sm inline-flex h-[45px] w-full flex-1 items-center justify-center border-black border'
						id='name'
						value={eventTitle}
						onChange={(event) => setEventTitle(event.target.value)}
					/>
				</fieldset>
				<fieldset className='mb-[15px] flex items-center gap-5'>
					<label
						className='w-[90px] text-right text-[15px]'
						htmlFor='description'
					>
						Description
					</label>
					<input
						className='p-2 rounded-xl focus:shadow-sm inline-flex h-[45px] w-full flex-1 items-center justify-center border-black border'
						id='description'
						value={eventDescription}
						onChange={(event) => setEventDescription(event.target.value)}
					/>
				</fieldset>
				<fieldset className='mb-[15px] flex items-center gap-5'>
					<label className='w-[90px] text-right text-[15px]' htmlFor='date'>
						Date
					</label>
					<input
						type='date'
						className='p-2 rounded-xl focus:shadow-sm inline-flex h-[45px] w-full flex-1 items-center justify-center border-black border'
						id='date'
						value={eventDate}
						onChange={(event) => setEventDate(event.target.value)}
					/>
				</fieldset>
				<div className='mt-[25px] flex justify-end'>
					<button
						// onClick={() => {
						// 	// event?.setEnd(new Date());
						// 	console.log(event?.id);
						// 	const foundEventindex = data.indexOf(
						// 		data.filter((data) => data.id === event?.id)[0]
						// 	);
						// 	if (!event) return;
						// 	setData([
						// 		...data.filter((data) => data.id !== event?.id),
						// 		{
						// 			id: event.id,
						// 			title: eventTitle,
						// 			date: eventDate,
						// 			extendedProps: {
						// 				description: eventDescription,
						// 			},
						// 		},
						// 	]);
						// 	setOpen(false);
						// 	// setData([]);
						// }}
						className=' border border-slate-800 inline-flex h-[35px] items-center justify-center rounded-full px-[15px] font-medium leading-none'
					>
						Save changes
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
