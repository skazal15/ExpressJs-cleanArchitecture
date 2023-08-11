# Node.js + Express.js + MongoDB + Clean Architecture

This is the user API code with tech stack node.js, express.js, mongodb using clean architecture.

## Architecture Overview
This project's architecture is based on Uncle Bob's [The Clean Architecture.][1] Please at least skim through his blog
as you will have a better understanding of how it works.

We are separated this application into 4 different layers
  1. routes (highest)
  2. controller
  3. usecase
  4. infrastructure (lowest)

The gist of it is a separation of concerns. Outer layer (lower) can reference (or know) the inner (highest) layer, however, the inner layers __can not__ know about outer layer. We accomplished this by using [Dependency Injection][2] and [Duck Typing][3] since Javascript doesn't have the concept of Interface.


```
(highest)                                    (lowest, most detail implementation)
routes ---> controller ---> usecase ---> infrastructure
```
## Run the server
```
$ npm install
$ npx nodemon server
```

[1]: https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html
[2]: https://martinfowler.com/articles/injection.html
[3]: https://en.wikipedia.org/wiki/Duck_typing