import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { Example } from ".";

describe("Example", () => {
	it("should render without throwing an error", () => {
		render(<Example />);

		expect(screen.getByRole("heading")).toBeInTheDocument();
	});
});
