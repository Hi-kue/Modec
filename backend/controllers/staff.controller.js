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
    showMessage(res, constants.ERROR.TYPE, constants.ERROR.CODE);
    res.status(400).json({ message: `Querying Failed`, error: err });   
}

/**
 * Success message if the query executes successfully.
 * @param {*} res The response object.
 * @param {*} data The data being returned.
 */
const successMessage = (res , data) => {
    showMessage(res, constants.SUCCESS.TYPE, constants.SUCCESS.CODE); 
    res.status(200).json({ message: `Querying Successful`, data: data })
}

/**
 * POST :: /staff
 * @description Creates a new staff member.
 * @param {*} req The request object. 
 * @param {*} res The response object.
 */
const createStaff = async (req, res) => {
    const { staff_fname, staff_lname, staff_position, 
            staff_dob, staff_salary, staff_branchno, 
            staff_telephone, staff_mobile, staff_email } = req.body;

    try {
        const newStaff = await connection.execute(
            "EXEC STAFF_HIRE_SP (:1, :2, :3, :4, :5, :6, :7, :8, :9);",
            [staff_fname, staff_lname, staff_position, staff_dob, staff_salary, staff_branchno, staff_telephone, staff_mobile, staff_email],
            { autoCommit: true, outFormat: connection.OUT_FORMAT_OBJECT }
        );

        successMessage(`Successfully Queried Data: ⬇\n${table(newStaff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch (err) {
        errorMessage(res, err);

    }
}

/**
 * GET :: /staff
 * @description Gets all staff members.
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const getAllStaff = async (req, res) => {
    try {
        const allStaff = await connection.execute("SELECT * FROM DH_STAFF;", [], { outFormat: connection.OUT_FORMAT_OBJECT });

        showMessage(res, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);
        res.status(200).json({ message: `Querying Successful`, data: allStaff });
    } catch (err) {
        errorMessage(res, err);

    }
}

/**
 * GET :: /staff/:staff_staffno
 * @description Gets a staff member by their staff number.
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const getStaffById = async (req, res) => {
    const { staff_staffno } = req.params;

    try {
        const staff = await connection.execute(
            "SELECT * FROM DH_STAFF WHERE STAFFNO = :1;", 
            [staff_staffno], 
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        successMessage(`Successfully Queried Data: ⬇\n${table(staff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch (err) {
        errorMessage(res, err);

    }
}

/**
 * GET :: /staff/:staff_name
 * @description Gets a staff member by their first and last name.
 * @param {*} req The request object. 
 * @param {*} res The response object.
 */
const getStaffByName = async (req, res) => {
    const { staff_fname, staff_lname } = req.params;

    try {

        const staff = await connection.execute(
            "SELECT * FROM DH_STAFF WHERE FNAME = :1 AND LNAME = :2;",
            [staff_fname, staff_lname],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );
        
        successMessage(`Successfully Queried Data: ⬇\n${table(staff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch(err) {
        errorMessage(res, err);

    }
}

/**
 * PUT :: /staff/:id/
 * @description Updates a staff member by their staff number.
 * @param {*} req The request object. 
 * @param {*} res The response object.
 */
const updateStaffById = async (req, res) => {
    const { id, salary, phone, email } = req.params;

    try {
        const staff = await connection.execute(
            "UPDATE DH_STAFF SET SALARY = :1, PHONE = :2, EMAIL = :3 WHERE STAFFNO = :4;",
            [salary, phone, email, id],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        successMessage(`Successfully Queried Data: ⬇\n${table(staff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

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
    const { staff_fname, staff_salary, staff_phone, staff_email } = req.body;

    try {
        const staff = await connection.execute(
            "UPDATE DH_STAFF SET SALARY = :1, PHONE = :2, EMAIL = :3, WHERE FNAME = :4;",
            [staff_salary, staff_phone, staff_email, staff_fname],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        successMessage(`Successfully Queried Data: ⬇\n${table(staff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

    } catch(err) {
        errorMessage(res, err);

    }
}

/**
 * DELETE :: /staff/:staff_staffno
 * @description Deletes a staff member by their staff number.
 * @param {*} req The request object.
 * @param {*} res The response object.
 */
const deleteStaffById = async (req, res) => {
    const { staff_staffno } = req.body;

    try {
        const deleteStaff = await connection.execute(
            "DELETE FROM DH_STAFF WHERE STAFFNO = :1;",
            [staff_staffno],
            { outFormat: connection.OUT_FORMAT_OBJECT }
        );

        successMessage(`Successfully Queried Data: ⬇\n${table(deleteStaff)}`, constants.SUCCESS.TYPE, constants.SUCCESS.CODE);

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