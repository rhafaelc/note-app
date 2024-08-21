# Note App

The **Note App** is a simple and efficient tool for taking and managing notes. It offers a secure way to create, update, and delete notes, with user authentication to ensure that your notes are kept private and accessible only to you.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [How to Use](#how-to-use)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Introduction

The Note App is designed to provide a seamless experience for taking notes, with support for rich text formatting. The app requires users to log in to access their notes, ensuring that your data is secure and personalized. All operations are handled on the client side for fast and responsive interactions.

## Features

- **User Authentication**: Sign up or log in using Auth.js, with the option to authenticate via Google or create a new account.
- **Add Notes**: Create new notes with a rich text editor powered by Tiptap.
- **Update Notes**: Edit your existing notes to keep them up-to-date.
- **Delete Notes**: Remove notes that are no longer needed.
- **Filter Notes**: Easily filter your notes based on keywords or tags.
- **Pagination**: Navigate through large sets of notes with built-in pagination.
- **Secure Access**: Notes are securely stored in a Supabase PostgreSQL database, accessed via Drizzle ORM.
- **Modern UI**: Built with ShadCN UI components for a clean and modern user interface.
- **Theme**: Easily change themes (dark/light) when user is authenticated.

## How to Use

1. **Log In**: To use the Note App, you must log in. You can create a new account or log in using your Google account.
2. **Add a Note**: Once logged in, use the "Add Note" button to create a new note. You can use the rich text editor to format your text as needed.
3. **Update a Note**: Click on an existing note to edit its content.
4. **Delete a Note**: If you no longer need a note, you can delete it from your notes list.
5. **Filter Notes**: Use the filter option to search for notes based on keywords or tags.
6. **Paginate Notes**: If you have many notes, use the pagination controls to navigate through pages of notes.

## Installation

To run the app locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/rhafaelc/note-app.git
   ```

2. Navigate to the project directory:
   ```sh
   cd note-app
   ```

3. Install dependencies using pnpm:
   ```sh
   pnpm install
   ```

4. Start the development server:
   ```sh
   pnpm dev
   ```

## Usage

Once the app is running locally, open your browser and navigate to `http://localhost:3000`. Log in or sign up to start managing your notes. You must be logged in to add, update, or delete notes. Use the filtering and pagination features to organize and navigate your notes effectively.

## Technologies Used

- **Next.js 14** App Router.
- **Auth.js** for secure authentication, with support for Google and email-based sign-up.
- **Supabase** with PostgreSQL for database management.
- **Drizzle ORM** for database access and querying.
- **ShadCN UI** for a modern user interface.
- **Tiptap** for a rich text editor experience.
- **Tailwind CSS** for styling.
