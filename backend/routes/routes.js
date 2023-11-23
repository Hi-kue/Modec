'use strict';

import express from 'express';
import staffController from '../controllers/staff.controller.js';

const router = express.Router();

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
router.get('/staff/:id', staffController.getStaffById);

/**
 * GET :: /staff/:name
 * @description Gets a staff member by their name.
 */
router.get('/staff/:name', staffController.getStaffByName);

/**
 * PUT :: /staff/:id
 * @description Updates a staff member by their staff id.
 */
router.put('/staff/:id', staffController.updateStaffById);

/**
 * PATCH :: /staff/:id
 * @description Updates staff member by their name.
 */
router.patch('/staff/:id', staffController.updateStaffByName);

/**
 * DELETE :: /staff/:id
 * @description Deletes a staff member by their staff id.
 */
router.delete('/staff/:id', staffController.deleteStaffById);

export default router;