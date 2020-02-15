import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { Example } from "./Example";

const wrapper: ReactWrapper = mount(<Example />);

describe("Example", () => {
	it("should render without throwing an error", () => {
		expect(wrapper.find("#example").length).toBe(1);
	});
});
