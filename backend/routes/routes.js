'use strict';

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Dream Home Application API.');
});

// TODO: Complete Routes with Models and Controllers
router.post('/staff');
router.get('/staff');
router.get('/staff/:id');
router.put('/staff/:id');
router.patch('/staff/:id');
router.delete('/staff/:id');

export default router;