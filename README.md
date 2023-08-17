# Sidey | The home for your Side Projects

Show your Side Project to the world, takes #BuildInPublic to the next level by leaving all your side project information in one place, easy and simple.

## Table of contents
- [Installation](/#installation)
- [Env configuration](/#env-configuration)
- [How to collaborate?](/#how-to-collaborate?)
  - [Any questions? Contact Me](/#contact-me) 

# Getting started

## Installation
1. Make a fork of this repository
2. Install all the dependencies running `pnpm install`
3. create a project in Supabase
4. create a .env file following the .env.example structure. [Read more](/#env-configuration)
5. run the command `pnpm prisma db push`
6. run `pnpm dev`

## Env configuration

#### SUPABASE_PROJECT_ID
Go into your Supabase project to `settings -> General -> General settings` and get the 'Reference ID' and paste it here

#### SUPABASE_PASSWORD
This is the password of your Supabase project. if you forget the password you can go into your Supabase project to `settings -> Database -> Database password -> Reset database password` and copy here the new password

#### DATABASE_URL
Go into your Supabase project to `settings -> Database -> Connection string`, select the 'URI' tab, copy the URL, and paste it here

#### SUPABASE_SECRET_KEY
Go into your Supabase project to `settings -> API -> Project API keys` and get the 'service_role secret' key and paste it here

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
Go into your Supabase project to `settings -> API -> Project API keys` and get the 'anon public' key and paste it here

#### NEXT_PUBLIC_SUPABASE_URL
This has a default value in the [.env.example](/.env.example) file. don't delete it


## How to collaborate?

1. Look for an issue to work on in the [GitHub issue tracker.](https://github.com/JhonnGutierrez/Sidey/issues) If you can't find an issue that suits you, create a new issue and tell us in it that you want to solve it.

2. Fork the project on GitHub.

3. Create a new branch from the "develop" branch. This ensures that your changes don't interfere with the main codebase.

4. Make changes to the code in your local branch.

5. Push your changes to your forked repository on GitHub. This updates your forked repository with your changes.

6. Create a pull request (PR) from your branch to the "develop" branch of the original repository. This asks the project maintainers to review your changes and merge them into the main codebase.

7. Wait for the maintainers to review and merge your PR. Be patient and wait for the maintainers to review your changes. They may ask you to make further changes before they merge your changes into the main codebase.

## Contact Me
If you have questions you can send me a message by Discord to @jeegscreator

## License
[MIT License](./LICENSE)
