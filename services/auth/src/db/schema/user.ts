import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    verified: boolean("verified").default(false).notNull()
})