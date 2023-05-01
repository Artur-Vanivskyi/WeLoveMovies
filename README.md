
# WeLoveMovies Backend (API)

![Alt text](https://user-images.githubusercontent.com/106690298/235382876-9299913b-1d2c-4c34-805a-3fa0a9d90041.png)
### A demonstration of advanced backend development/RESTful API implementation using PostgreSQL and DB Manipulation.

### WeLoveMovies Repository Description
This repository was created in order to demonstrate my ability to build complex servers and access data through a database, including skills such as:

- Install and use common middleware packages.
- Receive requests through routes.
- Run tests from the command line.
- Access relevant information through route and query parameters.
- Create an error handler for the case where a route doesn't exist.
- Build an API following RESTful design principles.
- Create and customize a knexfile.js file.
- Create a connection to your database with Knex.
- Write database queries to complete CRUD routes in an Express server.
- Return joined and nested data with Knex.
- Write database migrations using Knex's migration tool.
- Deploy backend server to a cloud service.

Other tasks accomplished in this repository include:
- The ```app.js``` file and ```server.js``` file are correctly configured, with the ```app.js``` file exporting the application created from Express.
- Use of the CORS package so that requests from the frontend can correctly reach the backend.
- If a request is made to a route that doesn't exist, the server returns a ```404``` error.
- If a request is made to a route that exists but the HTTP method is wrong, the server returns a ```405``` error.
- All routes respond with the appropriate status code and use a data key in the response.

## Technology Used
The backend/API for this application were built with:
- Node.js
- Express server framework
- CORS package
- PostgreSQL database
- Knex.js for query building

## Tools and Concepts used
### RESTful design principles
A robust API should give clear direction for API developers and consumers. It should be easy for the people who are using it to make sense of it. Accordingly, the API's design should be simple, predictable, and consistent. One way to ensure a robust API design is by following RESTful design principles when creating your API.

REST, which stands for representational state transfer, is a software architecture style. REST is a set of constraints for building web APIs. A RESTful API server provides access to resources. A client, like the browser or another server, can then access and change the resources.

### Major error types and handling
Another key feature of a robust API is its error-handling approach. When building RESTful APIs using Express, or any other framework or library, validation checks are always necessary as a best practice. And it's always important to return an error response to the client, so that the client can stay informed on why their request isn't working.

However, as the API grows in size and complexity, handling every possible error and returning a response for every validation check can quickly become tedious; it can make it difficult to quickly grasp what the code is doing. Having a centralized error-handling approach can simplify the code.

### Organizing Express code
Besides following RESTful design principles and having centralized error handling, a robust API is built on top of well-organized and well-structured code. Like all software projects, Express APIs tend to get larger and more complex over time. The more files that you have in the project, the more important that the file organization becomes. The files need to be organized in a way that makes it easy to find and modify existing code, and to add new code in a location consistent with the existing code. An example of advanced organization is by using ideas like:

- **Group-by-resource structure:** A file organization structure in which any code that handles requests to a resource is stored in a folder with the same name as the resource, regardless of the URL to that resource.

- **Controller files:** A file that defines and exports the route handler functions and is responsible for managing the state of a single resource in an API.

- **Express router:** A modular middleware and routing system that can be attached to an Express app

### Creating/Using Hosted Databases
A database is defined as an organized collection of data, generally stored and accessed electronically from a computer system.

Companies rely heavily on databases to store the data that powers their applications. Databases store a variety of data, such as usernames, email addresses, and nearly every other type of information that you can imagine.

A hosted database, sometimes called a managed database, is a cloud-computing service in which the end user pays a cloud service provider for access to a database. Unlike a local database, you don't have to set up or maintain a hosted database on your own; rather, it's the provider's responsibility to oversee the database's infrastructure. This allows you to focus on building your application instead of spending time installing, configuring, and updating your database.
