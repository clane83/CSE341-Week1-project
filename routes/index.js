const router = require('express').Router();

router.use('/contacts', require('./contacts'));
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello world']
    res.send('Hello World!');
});

module.exports = router;