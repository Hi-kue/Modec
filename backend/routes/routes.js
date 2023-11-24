'use strict';

import express from 'express';
import staffController from '../controllers/staff.controller.js';

const router = express.Router();

router.get('/status' , (req, res) => {
    res.status(200).json({ message : 'OK' });
});

router.get('/', (req, res) => {
    res.send({ message : 'Welcome to the Staff API!' });
});

/**
 * POST :: /staff
 * @description Creates a new staff member.
 */
router.put('/staff', staffController.createStaff);

/**
 * GET :: /staff
 * @description Gets all staff members.
 */
router.get('/staff', staffController.getAllStaff);

/**
 * GET :: /staff/:id
 * @description Gets a staff member by their staff number.
 */
router.get('/staff/:staffId', staffController.getStaffById);

/**
 * GET :: /staff/:name
 * @description Gets a staff member by their name.
 */
router.get('/staff/name/:staffName', staffController.getStaffByName);

/**
 * PUT :: /staff/:id
 * @description Updates a staff member by their staff id.
 */
router.put('/staff/:staffId', staffController.updateStaffById);

/**
 * PATCH :: /staff/:id
 * @description Updates staff member by their name.
 */
router.patch('/staff/:staffId', staffController.updateStaffByName);

/**
 * DELETE :: /staff/:id
 * @description Deletes a staff member by their staff id.
 */
router.delete('/staff/:staffId', staffController.deleteStaffById);

export default router;