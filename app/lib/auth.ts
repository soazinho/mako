export const roles = {
	USER: "user",
	ADMIN: "admin",
} as const;

type Role = (typeof roles)[keyof typeof roles];

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
	const hierarchy = {
		[roles.USER]: 0,
		[roles.ADMIN]: 1,
	};

	return hierarchy[userRole] >= hierarchy[requiredRole];
}
