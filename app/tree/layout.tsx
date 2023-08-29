"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Children } from "react";
export default function TreeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
