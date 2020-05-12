# node_express_basic

- What is Express.js?
- Using Middleware
- Working with Requests & Responses
- Routing
- Returning HTML Pages (Files)

### Why express?

- Server logic is Complex!
- You want to focus on your Business Logic, not on the nitty-gritty Details!
- Use a Framework for the Heavy Lifting!

### Alternatives to Express.js

- Vanilla Node.js
- Adonis.js (Laravel inspired)
- Koa
- Sails.js

### Middleware

- Express.js is all bout Middleware

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a4af352-67fb-4ef2-8870-ec06b93ab35f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a4af352-67fb-4ef2-8870-ec06b93ab35f/Untitled.png)

### Internals of Express

- express에서 default header가 contentType으로  `text/html` 이다.
- `app.use()` function will be executed for every incoming requests
- `app.use()` 로 get, post, update, delete를 다 handle 할 수 있음. 보통은 그렇게 하지는 않지만 말이다.

### Basic

- Don't ever call `next()` if you want to have one response for each router
- node.js 코드는 무조건 미들웨어에서 미들웨어로 넘어간다.

```jsx
const express = require('express');
const app = express();

app.use((req, res, next) => {

    console.log('First Middleware');
    next();

});

app.use('/users', (req, res, next) => {

    console.log('`/users` in middleware');

    res.send('Hello Users');

    //don't ever call next() if you want to have only one response for each router
});

app.use('/', (req, res, next) => {

    console.log('`/` in middleware');

    res.send('Hello Root');

    //don't ever call next() if you want to have only one response for each router
});

app.listen(3000);
```

### Error page

```jsx
//Error Page
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
});
```

### Using route

- app.js

```jsx
const express = require('express');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);

app.listen(3000);
```

- shopRoutes

```jsx
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('In another middleware!');
    //express에서 default header가 contentType: `text/html`
    res.send('<h1>Hello from Express!</h1>'); //send response, contentType: `text/html`
});

module.exports = router;
```

### Send file

- send file

```jsx
router.get('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});
```

⇒ `__dirname` 은 기본적으로 현재 root를 반납한다.

### Path

- root directory 가져오는 helper function 만들기

```jsx
const path = require('path');

//dirname returns directory name of the path
module.exports = path.dirname(process.mainModule.filename); //root directory를 가져옴 
```

- 적용한 모습

```jsx
const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
```

- node.js static file

```jsx
app.use(express.static(path.join(__dirname, 'public')));
```

```jsx
<head>
<link rel="stylesheet" href="/css/main.css">
</head>
```

### What is Express.js?

- Express.js is Node.js framework - a package that adds a bunch of utility functions and tools and a clear set of rules on how the app should be built (middleweares!)
- It's highly extensible and other packages can be plugged into it (middleware!)

### Middleware, next() and res()

- Express.js relies heavily on middleware functions - you can easily add them by calling use()
- Middleware functions handle a request and should call next() to forward the request to the next function in line or send a response

### Routing

- You can filter requests by path and method
- If you filter by method, paths are matched exactly, otherwise, the first segment of a URL is matched
- You can use the express.Router to split your routes across files elegantly

### Serve Files

- You're not limited to serving dummy text as a response
- You can sendFile()s to your users - e.g. HTML files
- If a request is directly made for a file (e.g. a .css file is requested), you can enable static serving for such files via express.static()
