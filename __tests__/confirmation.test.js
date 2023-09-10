import { render, screen, fireEvent } from "@testing-library/react";
import Confirmation from "@/components/confirmation";
import "@testing-library/jest-dom";

describe("Components Visible", () => {
	it("renders a heading", () => {
		render(<Confirmation />);

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

describe("Test Button", () => {
	it("test click", () => {
		render(<Confirmation onSubmit={() => console.log("hi")} />);

		const mockCallBack = jest.fn();

		const button = screen.getByRole("button", {
			name: /add another member/i,
		});

		fireEvent.click(button);
	});
});
