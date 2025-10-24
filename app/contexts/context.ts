import { createContext } from "react-router";

import type { User } from "~/types/User";

export const userContext = createContext<User | null>(null);
