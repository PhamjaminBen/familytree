"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface LayoutProps {
	children: React.ReactNode;
}

export default function TreeLayout({ children }: LayoutProps) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
