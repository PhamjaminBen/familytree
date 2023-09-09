import { render, screen } from "@testing-library/react";
import NavBar from "@/components/navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
	it("Navbar rendered", () => {
		const navbar = render(<NavBar />);

		expect(navbar).toBeInTheDocument();
	});
});
