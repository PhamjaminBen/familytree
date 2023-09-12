"use client";
import ImageCard from "@/components/imageCard";
import MemberPopup from "@/components/memberpopup";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Circles } from "react-loader-spinner";

type ImageType = {
	url: string;
	title: string;
	description: string;
	date: string;
	people: string[];
};

const fetchPictures = async () => {
	const data = await fetch("/photo-gallery/api");
	const cleanData = await data.json();
	return cleanData;
};

const fetchPeople = async () => {
	const data = await fetch("/api");
	const cleanData = await data.json();
	return cleanData;
};

export default function PhotoGallery() {
	const pictureQuery = useQuery({
		queryKey: ["pictures"],
		queryFn: fetchPictures,
	});

	const peopleQuery = useQuery({
		queryKey: ["people"],
		queryFn: fetchPeople,
	});

	if (pictureQuery.isLoading || peopleQuery.isLoading)
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

	return (
		<>
			<h1 className='text-3xl lg:text-5xl font-bold text-center mt-10'>
				Photo Gallery
			</h1>
			<Link href='/photo-gallery/add'>
				<div className='px-5 py-3 my-5 bg-[#9ac0dd] border-2 border-[#9ac0dd] w-36 m-auto rounded-xl text-white text-xl text-center hover:bg-white hover:text-[#9ac0dd]'>
					Add Photo
				</div>
			</Link>

			<div className='container mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					{pictureQuery.data.map((image: ImageType, i: number) => (
						<ImageCard key={i} image={image} people={peopleQuery.data} />
					))}
				</div>
			</div>
		</>
	);
}
