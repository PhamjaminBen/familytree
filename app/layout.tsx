import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pham Clan Website",
	description: "The family tree and history of the Pham Clan.",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='min-h-screen w-screen'>
				<header className='sticky z-50 top-0'>
					<NavBar />
				</header>
				<main className=''>{children}</main>
			</body>
		</html>
	);
}
