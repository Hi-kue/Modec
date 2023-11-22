import pool from '../config/config';

const createStaff = async (req, res) => {
    let { staff_name, staff_email, staff_phone, staff_address, staff_password, staff_role } = req.body;
    
}

const getAllStaff = async (req, res) => {

}

const getStaffById = async (req, res) => {

}

const getStaffByName = async (req, res) => {

}

const updateStaffById = async (req, res) => {

}

const updateStaffByName = async (req, res) => {

}

const deleteStaffById = async (req, res) => {

}

const patchStaffById = async (req, res) => {

}

export default {
    createStaff,
    getAllStaff,
    getStaffById,
    getStaffByName,
    updateStaffById,
    updateStaffByName,
    deleteStaffById,
    patchStaffById
}