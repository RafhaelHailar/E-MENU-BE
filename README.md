<h1 align="center">
E-MENU Backend
<br>
 Menu Booking App Hackathon
</h1>

<p align="center">
The menu booking app aims to revolutionize the dining experience by allowing users to 
scan a QR code at their table, place an order from their mobile device, and have the 
order sent directly to the kitchen's queueing system. This will streamline the order 
process, improve efficiency, and enhance customer satisfaction.
</p>

<br>
<br>

## Tech Stack

- Express.js
- Node.js
- PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Git [Git](https://git-scm.com/downloads)
- Node [Node](https://nodejs.org/en/download/)

###### DATABASE (Optional, If you have hosted database)
- PostgreSQL [PostgreSQL](https://www.postgresql.org/download/)
- PgAdmin [PgAdmin](https://www.pgadmin.org/download/pgadmin-4-apt/)

## Quick Start

Follow these steps to get the project up and running on your local machine:

1. Clone the project from the Github 'e-menu-be' main branch (dev). Copy the clone link.

```bash
  e.g. https://github.com/RafhaelHailar/E-MENU-BE.git
```

2. Open your target folder where you want to clone the project, then right-click and open your Terminal (Command Prompt/Powershell/Gitbash). Enter the following command plus the clone link to execute.

```bash
git clone https://github.com/RafhaelHailar/E-MENU-BE.git
```

3. Change directory to the project folder.

```bash
cd E-MENU-BE
```

4. Install the dependencies.

```bash
npm i
```

or

```bash
yarn
```


5. Setup environment variables.

must see: [Environment Variables](#environment-variables)


```bash
cp .env.example .env.dev
```

6. Generate database.

```bash
npm run prisma:generate
```

or

```bash
yarn prisma:migrate
```

7. Database migration.

```bash
npm run prisma:migrate
```

or 

```bash
yarn prisma:migrate
```

8. Start the server.

```bash
npm run dev
```

or 

```bash
yarn dev
```

## Table of Contents

- [E Menu API Node Server](#e-menu-be)
  - [Quick Start](#quick-start)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Commands](#commands)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)

## Features

- **SQL database**: [PostgreSQL](https://www.postgresql.org) object data modeling using [Prisma](https://www.prisma.io) ORM
- **Validation**: request data validation using [Joi](https://joi.dev) 
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Git hooks**: with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [Prettier](https://prettier.io)

## Commands

Running in production:

```bash
npm run production
```
Database:

```bash
# push changes to database
npm run db:push

# pull database changes to this app
npm run db:pull

# start prisma studio
npm run db:studio
```

## Environment Variables

The environment variables can be found and modified in the `.env.dev` file. They come with these default values:

```bash
# URL of the PostgreSQL database
# postgresql://[db username]:[db password]@[db host]:[db port]/[db name]?schema=public
DATABASE_URL=postgresql://postgres:secret@localhost:5432/mydb?schema=public

# Port number
APP_PORT=8080

# For CORS (Optional)
FRONTEND_BASE_URL=
BACKEND_BASE_URL=
```

- `DATABASE_URL` the url of the database the your are going to link with the backend. You need to find out your database
`hostname`,`port`,`username`,and `password` in `postgresql` the default are similar above.

- `APP_PORT` any number between `(0-65,535)` where the backend will run, recommended to use 4 digits `(e.g 8080,8000)`.

- `FRONTEND_BASE_URL` optional. the starting part of the frontend url (e.g **`https://github.com/`**/RafhaelHailar/E-MENU-BE)

- `BACKEND_BASE_URL` optional. the starting part of the backend url (e.g **`http://localhost:8080/`**/api/auth/)

## Project Structure

```
app\
 |--controllers\    # Route controllers (controller layer)
 |--lib\            # Include helpers, third-party library wrappers, or common functionalities.
 |--middlewares\    # Custom express middlewares
 |--prisma\         # Prisma database schemas and migrations
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--types\          # App Types
 |--utils\          # Utility classes and functions
 |--validators\     # Request data validation schemas
app.js              # App entry point
test\               # Testing files
docs\               # Swagger files
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:8080/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

## Contributing

Please follow these best practices when contributing to the project:

- **Stay Updated** : To ensure your local repository is up to date with the latest changes from the main development branch (`dev`), follow these steps:

- **Branches**: Create a new branch for each changes you're working on. Use a branch name that matches the structure `[target]/[what you do]` e.g `auth/register` and use an already made branch if it matches what you have done from that target. (for example: you made an update in register, use `auth/register` again, for fix use `register/fix` instead).

1. Go to your terminal (Command Prompt/Powershell/Gitbash). To ensure that you're on the main branch, enter the following command, then press 'Enter' to execute.

```bash
git checkout dev
```

2. To stay updated with the origin repository.

```bash
git pull origin dev --rebase
```

3. Create a new branch. (name it with `[target]/[what you have done]` structure, e.g. `auth/register`)

```bash
git checkout -b "new/branch"
```

4. You may proceed and start coding.

## Commit Guidelines

- **Commits**: Follow these steps to commit and push your changes to the repository:

1. Make Small, Atomic Commits

- Each commit should represent a single logical change. This makes it easier to understand the project history and simplifies code reviews.

2. Write Clear and Descriptive Commit Messages

- Use the imperative mood in the commit message, e.g., "feat: add changes" instead of "add changes" or "Fixes bug".
- Start with a short (50 characters or less) summary of the change.

3. Commit Frequently

- Commit your work regularly to avoid losing progress and to share your changes with others early and often.
- Aim for small, incremental commits that make it easier to track and understand changes.

4. Include All Related Changes

- Ensure that all changes related to a single task or bug fix are included in the same commit.
- Avoid mixing unrelated changes in a single commit.

5. Add a Commit for Every File Change

- Whenever you make changes to a file, add a commit that specifically addresses those changes.
- This practice ensures that the history of each file is clear and easy to follow.

For commit messages refer to this [conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)
