# Moodjournal

## Instructions for running locally

After cloning the repository, you have two options. You can either use the script I have written to have the project running or manually perform the steps.

### Fully automated setup

1. `npm run dev:first` will run a combination of custom scripts, which installs all requirements, creates the local environment file, creates the database migration file, performs the migrations to create the tables in the database and runs the dev server. This is only required for the very first execution after cloning. All those steps can also be performed manually, but using this script is more convenient.
2. Subsequent runs can simply use `npm run dev` instead. While `npm run dev:first` will also work, the additional steps are no longer required.

### Fully manual setup

1. After closing the repo, run `npm run install` to install the required packages.
2. Run the command `echo 'DATABASE_URL="file:./dev.db"' > .env.local` to create a local environment file, which points the project to the database location. This database will automatically be created later.
3. Run `npx drizzle-kit generate` to create the database migrations based on the drizzle schema.
4. Run `npx drizzle-kit migrate` to perform the migrations on the dev.db database file.
5. Run `npm run dev` to start the development server.

## Implemented features

### Mandatory features

1. All journal entries are displayed.
   1. The newest entry is displayed first.
   2. Each entry shows the title, the creation date, the content and the mood.
2. Creation and display of new entries
   1. An entry consists of a title and a content of variable length.
   2. A new entry is assigned the current date during creation.
3. Important entries can be highlighted.
   1. Highlighted entries are easily accessible, e.g. through a separate list or filters.
   2. Highlights can be dynamically set and removed by the user, so they are added or removed from the filter view
   3. Highlighted entries can be visually differenciated from normal entries

### Work in progress:

4. Entries only show 250 symbols of content.
   1. If the content is shorter than 250 symbols, the entire content is shown.
   2. For longer content, the user can show the full entry through an interaction.

### Optional features

1. Journal entries are saved persistently either in a lcoal sqlite database or in a turso database instance. Those entries are redisplayed on application launch.
2. Users can set an alternative creation date for the entries, but only for past dates.

### Work in progress:

3. New entries can be marked with tags
   1. Tags are displayed for each entry
   2. Previous tags are suggested while typing
   3. New tags can be set during entry creation and are suggested on future creations
4. Not all entries are immediately loaded. Additional entries are either loaded manually or through user interaction
   1. The chronological order of the entries remains

## Tests
