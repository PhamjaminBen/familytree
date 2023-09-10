import { render, screen, fireEvent } from "@testing-library/react";
import MemberPopup from "@/components/memberpopup";
import type { Person } from "@/types/persontype";
import "@testing-library/jest-dom";

const testPerson: Person = {
	name: "Test Name",
	gender: "Male",
	id: "5",
};

describe("Components Visible", () => {
	it("renders a heading", () => {
		render(<MemberPopup data={testPerson} />);

		const heading = screen.getByRole("heading", {
			name: /thank you!/i,
		});

		const button = screen.getByRole("button", {
			name: /add another member/i,
		});

		expect(button).toBeVisible();
		expect(heading).toBeVisible();
	});
});
