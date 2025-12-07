import { describe, expect, test } from "vitest";

import { hasPermission, roles } from "./auth";

describe("hasPermission", () => {
	test.each([
		{
			input: { role: roles.USER, requiredRole: roles.ADMIN },
			condition: "less than",
			expectedResult: false,
		},
		{
			input: { role: roles.ADMIN, requiredRole: roles.ADMIN },
			condition: "equal to",
			expectedResult: true,
		},
		{
			input: { role: roles.ADMIN, requiredRole: roles.USER },
			condition: "greater than",
			expectedResult: true,
		},
	])(`when role is $condition required role should return $expectedResult `, ({
		input,
		expectedResult,
	}) => {
		const result = hasPermission(input.role, input.requiredRole);

		expect(result).toBe(expectedResult);
	});
});
