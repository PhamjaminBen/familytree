import NavBar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Bitter, EB_Garamond } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const bitter = Bitter({ subsets: ["latin"] });
const eb_Garamond = EB_Garamond({ subsets: ["latin"] });

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
		<html lang='en' className={eb_Garamond.className}>
			<body className='min-h-screen w-screen'>
				<header className='sticky z-50 top-0'>
					<NavBar />
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
