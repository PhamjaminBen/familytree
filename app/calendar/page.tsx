"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import * as Dialog from "@radix-ui/react-dialog";
import { EventImpl } from "@fullcalendar/core/internal.js";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

interface EventType {
	id: string;
	title: string;
	date: string;
	extendedProps: {
		description: string;
	};
}

const fetchData = async () => {
	const rawCalendarData = await fetch("/calendar/api");
	let calendarData = await rawCalendarData.json();
	const rawPeopleData = await fetch("/api");
	const peopleData = await rawPeopleData.json();
	for (let person of peopleData) {
		const birthDate = new Date(person.birthdate);
		if (!Number.isNaN(birthDate.getDay())) {
			for (let year = 2023; year < 2100; year++) {
				calendarData = [
					...calendarData,
					{
						allDay: true,
						title: `Birthday - ${person.name}`,
						start: birthDate.setFullYear(year),
						id: uuid(),
						extendedProps: {
							description: "test description",
						},
						backgroundColor: "#f57177",
						borderColor: "#f57177",
					},
				];
			}
		}
	}
	return calendarData;
};

export default function Calendar() {
	const { isLoading, data } = useQuery({
		queryKey: ["treeData"],
		queryFn: fetchData,
	});

	const [open, setOpen] = useState(false);
	const [eventTitle, setEventTitle] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [eventData, setEventData] = useState<EventType[] | null>(null);

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

	if (!eventData) {
		setEventData(data);
	}

	return (
		<>
			<h1 className='text-3xl lg:text-5xl font-bold text-center mt-10'>
				Event Calendar
			</h1>
			<Dialog.Root open={open} onOpenChange={setOpen} key='Info Popup'>
				<Dialog.Portal>
					<Dialog.Overlay className='bg-black/10 fixed inset-0' />
					<Dialog.Content
						className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
            translate-x-[-50%] translate-y-[-50%] rounded-xl
          bg-white/100 p-[25px] z-30 border-black shadow-xl'
					>
						<Dialog.Title className='m-0 text-3xl font-bold'>
							{eventTitle}
						</Dialog.Title>
						<Dialog.Description className='text-mauve11 mt-[10px] mb-5 text-lg leading-normal'>
							{eventDescription}
						</Dialog.Description>

						<fieldset className='mb-[15px] flex items-center gap-5'>
							<label className='text-right text-lg'>Date:</label>
							<h1
								className='p-2 rounded-xl inline-flex h-[45px] w-full flex-1 items-center justify-center text-left text-lg'
								id='date'
							>
								{eventDate}
							</h1>
						</fieldset>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>

			<div className='max-h-screen max-w-6xl flex flex-col items-center justify-center m-auto mt-10 overflow-scroll'>
				<div className='w-full h-full'>
					<FullCalendar
						plugins={[dayGridPlugin]}
						initialView='dayGridMonth'
						events={eventData ? eventData : []}
						eventClick={(info) => {
							setEventTitle(info.event.title);
							setEventDescription(info.event.extendedProps.description);
							setEventDate(info.event.startStr);
							setOpen(true);
						}}
						eventsSet={(events) => {
							console.log("events");
							for (let event of events) {
								console.log(event.toJSON());
							}
						}}
					/>
				</div>
			</div>
		</>
	);
}
