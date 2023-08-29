import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
	title: "Pham Clan Website",
	description: "The family tree and history of the Pham Clan.",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = new QueryClient();

	return (
		<html lang='en'>
			{/* <QueryClientProvider client={queryClient}> */}
			<body className='min-h-screen w-screen'>
				<header className='sticky z-50 top-0'>
					<NavBar />
				</header>
				<main className=''>{children}</main>
			</body>
			{/* </QueryClientProvider> */}
		</html>
	);
}
