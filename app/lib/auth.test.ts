import { describe, expect, test } from "vitest";

import { hasPermission, roles } from "./auth";

describe("hasPermission", () => {
	test.each([
		{
			input: { role: roles.USER, requiredRole: roles.ADMIN },
			expectedResult: false,
			condition: "less than",
		},
		{
			input: { role: roles.ADMIN, requiredRole: roles.ADMIN },
			expectedResult: true,
			condition: "equal to",
		},
		{
			input: { role: roles.ADMIN, requiredRole: roles.USER },
			expectedResult: true,
			condition: "greater than",
		},
	])(
		`should return $expectedResult when role is $condition required role`,
		({ input, expectedResult }) => {
			const result = hasPermission(input.role, input.requiredRole);

			expect(result).toBe(expectedResult);
		},
	);
});
