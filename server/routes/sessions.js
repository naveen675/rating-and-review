const express = require('express');
const router = express.Router();
router.use(express.json());


router.delete('/me', (req,res) => {

    delete req.session.userId;
    res.status(204).send();
})


module.exports = router;
