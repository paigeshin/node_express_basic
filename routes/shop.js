const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
    /* 그냥 /views/shop.html 을 적어버리면 OS root로 가버려서 안된다 */
    /* path.join을 사용하면 project root로 간다. */
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;