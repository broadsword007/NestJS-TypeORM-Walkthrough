<<<<<<< HEAD
# NestJs-TypeORM-Walkthrough
=======
# demo

## Description

This is a just a walkthrough to get hands on with NestJS and TypeORM.

### Tasks
* Corrected the structure of modules(It was wrong in the last walkthrough)
	* now we have a central AppModule separate from ManagementModule(Previously we went straight to ManagementModule)
* Removed mongoose and thus mongoDB and shifted to a remote MySQL database
* Integrated ORM instead of writing queries
* Created Entities for User and Todo
* Created nested resource
	* Todo is now a nested resource and depends on User to whom the todos belong
	* Todo is now through accessible nested route /users/:userid/todos/
* Created separate modules for User and Todo. Then used concept of shared modules to make "UserService" accessible to TodoModule
* Created a bidirectional OneToMany relation between User and Todo. So now a you get Todos for a specific user and one user cannot delete Todo of another user  

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

>>>>>>> Initial Commit
