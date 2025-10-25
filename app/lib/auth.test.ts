import { describe, expect, test } from "vitest";

import { hasPermission, roles } from "./auth";

describe("hasPermission", () => {
	test("should return false when role is less than required role", async () => {
		const result = hasPermission(roles.USER, roles.ADMIN);

		expect(result).toBe(false);
	});

	test("should return true when role is equal than required role", async () => {
		const result = hasPermission(roles.ADMIN, roles.ADMIN);

		expect(result).toBe(true);
	});

	test("should return true when role greater than required role", async () => {
		const result = hasPermission(roles.ADMIN, roles.USER);

		expect(result).toBe(true);
	});
});
