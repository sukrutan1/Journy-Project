import { pgTable, timestamp, varchar, uuid, text} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    fullName: varchar("full_name", { length: 100 } ).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;


export const visits = pgTable("visits", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade"}).notNull(),
    country_code: varchar("country_code", { length: 3 }).notNull(),
    color: varchar("color", { length: 7 }).default("#ff0000"),
    notes: text("notes"),
    visit_date: timestamp("visit_date").defaultNow().notNull(),
});

export type NewVisit = typeof visits.$inferInsert;