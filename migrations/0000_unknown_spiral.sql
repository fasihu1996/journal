CREATE TABLE `entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`mood` text NOT NULL,
	`favorited` integer DEFAULT false NOT NULL,
	`tags` text NOT NULL,
	`createdAt` integer NOT NULL
);
