import bcrypt from "bcryptjs";

import { db } from "~/db/db";
import { usersTable } from "~/db/schema";

interface UserRegister {
	name: string;
	email: string;
	password: string;
}

interface UserLogin {
	email: string;
	password: string;
}

export async function findUserById(userId: string) {
	const user = await db.query.usersTable.findFirst({
		where: (t, { eq }) => eq(t.id, parseInt(userId, 10)),
	});
	if (!user) return null;

	return user;
}

export async function register({ name, email, password }: UserRegister) {
	const user = await db.query.usersTable.findFirst({
		where: (t, { eq }) => eq(t.email, email),
	});
	if (user) return user;

	const hashedPassword = await bcrypt.hash(password, 12);

	await db.insert(usersTable).values({
		name: name,
		email: email,
		hashedPassword,
	});

	return null;
}

export async function login({ email, password }: UserLogin) {
	const user = await db.query.usersTable.findFirst({
		where: (t, { eq }) => eq(t.email, email),
	});
	if (!user) return null;

	const isValid = await bcrypt.compare(password, user.hashedPassword);
	return isValid ? user : null;
}
