import connection from '../config/config.js';
import showMessage from '../util/dialogInvoker.js';
import constants from '../util/constants.js';
import { table } from 'table';

/** 
 * Error message if query fails to execute.
 * @param {*} res The response object.
 * @param {*} err The error being thrown.
 */
const errorMessage = (res, err) => {
    showMessage(err, constants.ERROR.TYPE, constants.ERROR.CODE);
    res.status(400).json({ message: `Querying Failed`, error: err });   
}

/**
 * Checks if a staff member exists.
 * @param {*} staff_staffno The staff number to check.
 * @returns True or false depending on whether the staff member exists.
 */
const checkStaffExists = async (staff_staffno) => {
    try {
        const staff = await connection.execute(
            "SELECT * FROM DH_STAFF WHERE STAFFNO = :1",
            [staff_staffno],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        return staff.length > 0 ? true : false;

    } catch (err) {
        showMessage(err, constants.ERROR.TYPE, constants.ERROR.CODE);

    }
};

/**
 * POST :: /staff
 * @description Creates a new staff member.
 * @param {*} req The request object. 
 * @param {*} res The response object.
 */
const createStaff = async (req, res) => {
    const { staff_staffno, staff_fname, staff_lname, staff_position, 
            staff_sex, staff_dob, staff_salary, staff_branchno, 
            staff_telephone, staff_mobile, staff_email } = req.body;

    try {
        const staffExists = checkStaffExists(staff_staffno);

        if (staffExists) {
            showMessage(`Staff member ${staff_staffno} already exists.`, constants.ERROR.TYPE, constants.ERROR.CODE);
            res.status(400).json({ message: `Staff member ${staff_staffno} already exists.` });

        } else {
            const newStaff = await connection.execute(
                "EXEC STAFF_HIRE_SP (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11)", 
                [
                    staff_staffno, staff_fname, staff_lname, 
                    staff_position, staff_sex, staff_dob, 
                    staff_salary, staff_branchno, staff_telephone, 
                    staff_mobile, staff_email
                ],
                { autoCommit: true, outFormat: connection.OUT_FORMAT_OBJECT }
            );
            showMessage(`Successfully Queried Data: ⬇\n${table(newStaff.rows)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
        }

    } catch (err) {
        errorMessage(res, err);

    }
}

/**
 * GET :: /staff
 * @description Gets all staff members.
 * @param {*} req The request object.
 * @param {*} res The response object.
 * @isWorking YES
 */
const getAllStaff = async (req, res) => {
    try {
        const allStaff = await connection.execute("SELECT * FROM DH_STAFF", [], { outFormat: connection.OUT_FORMAT_OBJECT });

        showMessage(res, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
        res.status(200).json({ message: `Querying Successful`, data: allStaff.rows });

    } catch (err) {
        errorMessage(res, err);

    }
}

/**
 * GET :: /staff/:staffId
 * @description Gets a staff member by their staff number.
 * @param {*} req The request object.
 * @param {*} res The response object.
 * @isWorking YES
 */
const getStaffById = async (req, res) => {
    const staff_staffno = req.params.staffId;

    try {
        const staff = await connection.execute(
            "SELECT * FROM DH_STAFF WHERE STAFFNO = :1",
            [staff_staffno],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        if (staff.rows.length > 0) {
            showMessage(`Successfully Queried Data: ${staff_staffno} found.`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
            res.status(200).json({ message: `Staff member ${staff_staffno} found.`, data: staff.rows });

        } else {
            showMessage(`Staff member ${staff_staffno} not found.`, constants.ERROR.TYPE, constants.ERROR.CODE);
            res.status(404).json({ message: `Staff member ${staff_staffno} not found.` });

        }

    } catch (err) {
        errorMessage(res, err);

    }
}

/**
 * GET :: /staff/:staffName
 * @description Gets a staff member by their first and last name.
 * @param {*} req The request object. 
 * @param {*} res The response object.
 * @isWorking YES
 */
const getStaffByName = async (req, res) => {
    const staff_fname  = req.params.staffName;

    try {

        const staff = await connection.execute(
            "SELECT * FROM DH_STAFF WHERE FNAME = :1",
            [staff_fname],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        if (staff.rows.length > 0) {
            showMessage(`Successfully Queried Data: ${staff_fname} found.`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
            res.status(200).json({ message: `Staff member ${staff_fname} found.`, data: staff.rows });

        } else {
            res.status(404).json({ message: `Staff member ${staff_fname} not found.` })
        }

    } catch(err) {
        errorMessage(res, err);

    }
}

/**
 * PUT :: /staff/:staffId
 * @description Updates a staff member by their staff number.
 * @param {*} req The request object. 
 * @param {*} res The response object.
 */
const updateStaffById = async (req, res) => {
    const staff_staffno = req.params.staffId;
    const { staff_salary, staff_phone, staff_email } = req.body;

    try {
        const staff = await connection.execute(
            "UPDATE DH_STAFF SET SALARY = :1, PHONE = :2, EMAIL = :3 WHERE STAFFNO = :4",
            [staff_salary, staff_phone, staff_email, staff_staffno],
            { autoCommit: true, outFormat: connection.OUT_FORMAT_OBJECT }
        );
        showMessage(`Successfully Queried Data: ⬇\n${table(staff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch(err) {
        errorMessage(res, err);

    }
}

/**
 * PUT :: /staff/:staff_fname
 * @description Updates a staff member by their first name.
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const updateStaffByName = async (req, res) => {
    const { staff_fname } = req.params.staffName;
    const { staff_salary, staff_phone, staff_email } = req.body;

    try {
        const staff = await connection.execute(
            "UPDATE DH_STAFF SET SALARY = :1, PHONE = :2, EMAIL = :3, WHERE FNAME = :4",
            [staff_salary, staff_phone, staff_email, staff_fname],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );
        showMessage(`Successfully Queried Data: ⬇\n${table(staff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch(err) {
        errorMessage(res, err);

    }
}

/**
 * DELETE :: /staff/:staffId
 * @description Deletes a staff member by their staff number.
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const deleteStaffById = async (req, res) => {
    const { staff_staffno } = req.params.staffId;

    try {
        const deleteStaff = await connection.execute(
            "DELETE FROM DH_STAFF WHERE STAFFNO = :1",
            [staff_staffno],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );
        showMessage(`Successfully Queried Data: ⬇\n${table(deleteStaff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch(err) {
        errorMessage(res, err);

    }
}

export default {
    createStaff,
    getAllStaff,
    getStaffById,
    getStaffByName,
    updateStaffById,
    updateStaffByName,
    deleteStaffById,
};