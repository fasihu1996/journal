# Mindjournal

## Instructions for running locally

After cloning the repository, perform the following actions:

1. `npm run dev:first` this is a custom script, which will install all requirements, create the database migration file, perform the migrations to create the tables in the database and run the dev server. This is only required for the very first execution after cloning.
2. Subsequent runs can simply use `npm run dev` instead.

## Implemented features

### Mandatory features

1. All journal entries are displayed with the newest being displayed first. Each entry shows the title, the creation date, the content and the mood.
2. New entries can be created by pressing the "New entry" button. New entries consist of a title, the mood, the content and a creation date.

### Optional features

1. Journal entries are saved persistently either in a lcoal sqlite database or in a turso database instance. Those entries are redisplayed on application launch.
2. Users can set an alternative creation date for the entries, but only for past dates.
