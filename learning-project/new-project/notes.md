express() -> creates an express application, which is a function that can be called to handle requests and responses
.get, .post, .all, .use -> declarative methods, no inherent content("here's how to handle things later); they can take multiple handlers after the route path: app.method("path", fn1, fn2, fn3...) - but each one must call next().

.listen -> imperative handle with inherent functionality(node functionality via express shortcut)

.route -> chain multiple http methods for the same path

Middleware is code between a request and a response

express.static(root, [options]) -> serves static files and is based on serve-static. It takes a root directory from which to serve static assets. You can specify a mount path(a URL path) for the static middleware,
ex: app.use(express.static("foldername")) or app.use("path", express.static("foldername"))

express.Router() creates a router instance that mounts into the app at some path. Its useful for maintainability and scalability, as it narrows the scope of the logic(not global)
mini Express app, a modular, isolated group of routes and middleware that can be plugged into main app

next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD() functions. It will skip the remaining route callback(s) for the current route, and jump to the next route. This allows you to bypass any remaining route callbacks for a route and pass control to the next route.
ex: app.get('/user/:id', function (req, res, next) {
if (req.params.id === '0') next('route')
else next()})

router.use() applies within the router scope, with per-section logic(e.g. /user) instead of global scope(as per app.use)

Error-handling middleware ALWAYS takes four arguments: (err, req, res, next), otherwise, it is not recognized as an error-handling middleware function and will not be executed by Express. That tells express: "run this only when someone calls next(err)"
ex: app.use((err, req, res, next) => {console.error(err.stack); res.status(500).send("Seomthing broke!")})
-Anything passed to next()(except "rout") is treated as an error, making Express jump to error-handling middleware.

- If you pass an error to next() and dont handle it in a custom error handled, it will be handled by the built-in error handler

- to have access to all of the objects properties, we need "new Error"(create a new object instance)
- for errors returned from async functions, must pass them to next(), otherwise it would cause an unhandled exception or silent failure and express wouldnt know about it

URI(Uniform Resource Identifier) => Any resource identifier, local or through internet(identifies something, not necessarily says how to access)
URL(Uniform Resource Locator) => A type of URI, includes access method(identifies and locates a resource on the web)

At https://expressjs.com/en/guide/ see "Overriding the Express API" and "Using template engines"
"error-handling" can be revised
