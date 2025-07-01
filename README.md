# Mindjournal

## Instructions for running locally

After cloning the repository, perform the following actions:

1. `npm install` to install dependencies
2. `npx drizzle-kit generate` to create the database models
3. `npx drizzle-kit migrate` to perform the migrations and create the tables
4. `npm run dev` to start the local development server

## Implemented features

### Mandatory features

1. All journal entries are displayed with the newest being displayed first. Each entry shows the title, the creation date, the content and the mood.
2. New entries can be created by pressing the "New entry" button. New entries consist of a title, the mood, the content and a creation date.

### Optional features

1. Journal entries are saved persistently either in a lcoal sqlite database or in a turso database instance. Those entries are redisplayed on application launch.
2. Users can set an alternative creation date for the entries, but only for past dates.
