import Image from "next/image";
import MemberPopup from "./memberpopup";
import { Person } from "@/types/persontype";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
import * as Dialog from "@radix-ui/react-dialog";

type ImageType = {
	url: string;
	title: string;
	description: string;
	date: string;
	people: string[];
};

type ImageCardProps = {
	image: ImageType;
	people: Person[];
};
export default function ImageCard({ image, people }: ImageCardProps) {
	console.log(people);
	return (
		<div className='max-w-sm rounded-xl overflow-hidden shadow-lg'>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<Image
						src={image.url}
						alt={image.title}
						width={300}
						height={300}
						className='h-auto w-full bg-white'
					/>
				</Dialog.Trigger>
				<Dialog.Portal className='bg-blue-500'>
					<Dialog.Overlay className='bg-black/20 z-0 fixed inset-0' />
					<Dialog.Content className=' bg-black max-h-[80%] w-[95%] md:w-[85%] lg:w-[75%] flex flex-col md:flex-row fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl'>
						<Image
							src={image.url}
							alt={image.title}
							width={3000}
							height={3000}
							className='max-h-[80%] w-[100%] md:w-[75%] z-10 object-contain rounded-t-xl md:rounded-l-xl md:rounded-t-none'
						/>
						<div className='flex flex-col p-4 bg-white md:w-[25%] pb-2 rounded-b-xl md:rounded-r-xl md:rounded-b-none'>
							<div className='font-bold text-purple-500 text-2xl mb-2'>
								{image.title}
							</div>
							<div className='text-md mb-2'>{image.description}</div>
							{image.people && (
								<>
									<div className='font-bold text-lg mb-2'>People:</div>
									<ul className='flex-row flex-wrap gap-2'>
										{image.people.map((id) => {
											const foundPerson = people.find(
												(person) => person.id === id
											);
											return (
												<li key={id}>
													<MemberPopup
														data={foundPerson ? foundPerson : people[0]}
													/>
													,
												</li>
											);
										})}
									</ul>
								</>
							)}
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<div className='px-6 py-4'>
				<div className='font-bold text-purple-500 text-xl mb-2'>
					{image.title}
				</div>
				<div className='text-md mb-2'>{image.description}</div>
				{/* <div className='text-md mb-2'>Date: {Date(image.date)}</div> */}
				{image.people && (
					<>
						<div className='font-bold text-lg mb-2'>People:</div>
						<ul className='flex-row flex-wrap gap-2'>
							{image.people.map((id, i) => {
								const foundPerson = people.find((person) => person.id === id);
								if (i === 3 && image.people.length > 4) {
									return (
										<li className='hover:underline'>
											+{image.people.length - 4}
										</li>
									);
								} else if (i < 3) {
									return (
										<li key={id}>
											<MemberPopup
												data={foundPerson ? foundPerson : people[0]}
											/>
										</li>
									);
								}
							})}
						</ul>
					</>
				)}
			</div>
		</div>
	);
}

{
	/* <Dialog>
			<DialogTrigger className='text-[1rem] hover:underline text-start'>
      <Image
				src={image.url}
				alt={image.title}
				width={300}
				height={300}
				className='h-auto w-full'
			/>
			</DialogTrigger>
			<DialogContent className='max-h-[80vh] max-w-[95vw] md:max-w-3xl overflow-y-scroll flex flex-col items-center'>
				<DialogHeader>
					<DialogTitle>
            Image
					</DialogTitle>
				</DialogHeader>				
			</DialogContent>
		</Dialog> */
}

// <Dialog.Root>
// 		<Dialog.Trigger asChild>
// 			<Image
// 				src={image.url}
// 				alt={image.title}
// 				width={300}
// 				height={300}
// 				className='h-auto w-full'
// 			/>
// 		</Dialog.Trigger>
// 		<Dialog.Portal>
// 			<Dialog.Overlay className='bg-black/10 z-20 fixed inset-0' />
// 			<Dialog.Content className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] shadow-lg'>
// 				<Image
// 					src={image.url}
// 					alt={image.title}
// 					width={500}
// 					height={500}
// 					className='h-auto w-full'
// 				/>
// 				<Dialog.Title />
// 				<Dialog.Description />
// 			</Dialog.Content>
// 		</Dialog.Portal>
// 	</Dialog.Root>
