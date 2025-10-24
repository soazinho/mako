import "dotenv/config";

import { eq } from "drizzle-orm";

import { db } from "./db";
import { usersTable } from "./schema";

async function main() {
	const user: typeof usersTable.$inferInsert = {
		name: "Charles",
		email: "charles@example.com",
		hashedPassword: "hashed_password",
	};

	await db.insert(usersTable).values(user);
	console.log("New user created!");

	const usersList = await db.select().from(usersTable);
	console.log("Getting all users from the database: ", usersList);

	await db
		.update(usersTable)
		.set({
			name: "Charles v2",
			email: "charles.updated@example.com",
		})
		.where(eq(usersTable.email, usersTable.email));
	console.log("User info updated!");

	await db.delete(usersTable).where(eq(usersTable.email, usersTable.email));
	console.log("User deleted!");
}

main();
