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
interface PopupProps {
	data: Person;
}

export default function MemberPopup({ data }: PopupProps) {
	return (
		<Dialog>
			<DialogTrigger className='text-[1rem] hover:underline text-start'>
				{data.name}
			</DialogTrigger>
			<DialogContent className='max-h-[80vh] max-w-[95vw] md:max-w-3xl overflow-y-scroll flex flex-col items-center'>
				<DialogHeader>
					<DialogTitle>
						<h1 className='w-full text-5xl text-center'>{data.name}</h1>
					</DialogTitle>
				</DialogHeader>
				{data.portrait && (
					<div className='h-[300px] w-[300px] flex'>
						<Image
							src={data.portrait}
							alt='portrait'
							height={300}
							width={300}
							className='rounded-full'
						/>
					</div>
				)}
				<div className='grid grid-cols-2 w-full'>
					{[
						"bio",
						"mother",
						"father",
						"birthdate",
						"deathdate",
						"phone",
						"email",
						"profession",
						"hobbies",
						"instagram",
						"facebook",
					].map((key: string, i) => {
						if (data[key as keyof typeof data]) {
							return (
								<div
									key={i}
									className={`${key === "bio" ? "col-span-2 p-2" : "p-2"}`}
								>
									<h1 className='font-bold text-lg'>
										{key.charAt(0).toUpperCase() + key.slice(1)}
									</h1>
									<p className='overflow-clip'>
										{data[key as keyof typeof data]}
									</p>
								</div>
							);
						}
					})}
				</div>
			</DialogContent>
		</Dialog>
	);
}
