const express = require('express')
const app = express();
const mongoose = require('mongoose');
const port = 5000;
var fileUpload = require('express-fileupload')
const cors = require('cors')
mongoose.connect('mongodb+srv://dsubham257sd:subhamdas@cluster0.g80uwk0.mongodb.net/?retryWrites=true&w=majority')
let usermember = require('./Models/member_schema');
let userstudent = require('./Models/student_schema');
let adminuser = require('./Models/admin_schema');
app.use(cors());
app.use(fileUpload());
app.get('/', (req, res) => res.send('Hello World!'))

//Login 
app.get('/Login', async (req, res) => {
    console.log('admin trying to Login')
    const { email, password } = req.headers;
    try {
        const adminAuthorised = await adminuser.findOne({ email, password })
        if (adminAuthorised) {
            res.json({ message: 'Authorised' })
        } else {
            res.json({ message: 'Not Authorised' })
        }
    } catch (error) {
        console.log('error getting data from Db', error)
    }
})
//MemberLogin
app.get('/MemberLogin', async (req, res) => {
    const { email, password } = req.headers;
    try {
        const memberAuth = await usermember.findOne({ email, password })
        if (memberAuth) {
            res.json({ message: 'Authorised', email: email })
        }
        else {
            res.json({ message: 'Not Authorised' })
        }
    } catch (error) {
        console.log('error Getting the data from usermember Server:', error)
    }
})
//handle member dashboard
app.get('/MemberDashboard', async (req, res) => {
    const { email } = req.headers;
    try {
        const memberdata = await usermember.findOne({ email: email });
        if (memberdata) {
            res.json({ email: memberdata.email, firstname: memberdata.firstname, lastname: memberdata.lastname, faculty: memberdata.faculty, phone: memberdata.phone,deptId:memberdata.deptId,facultyId:memberdata.facultyId });
        }
    } catch (error) {
        console.log('Error fetching data', error)
    }
})
//handle StudentLogin
app.get('/StudentLogin', async (req, res) => {
    console.log('Student trying to Login');
    const { email, password } = req.headers;
    try {
        const studentAuth = await userstudent.findOne({ email, password });
        if (studentAuth) res.json({ message: 'Authorised', email: email })
        else res.json({ message: 'Not Authorised' })

    } catch (error) {
        console.log('Error fetching data of student from db:', error);
    }
})


// handling student registration
app.get('/Registerstudent', async (req, res) => {
    const { firstname, lastname, email, password, dob, address, gender, course } = req.headers;
    console.log('user trying to save details in student db')
    const newStudent = userstudent({ firstname, lastname, email, password, dob, address, gender, course });
    try {
        const response = await newStudent.save();
        res.json({ message: 'Data Saved in Server' })
    } catch (error) {
        res.json({ message: 'email already used', error: error })
    }
})

/// handling member users registration
app.get('/Registermember', async (req, res) => {
    const { firstname, lastname, email, password, faculty, phone } = req.headers;
    // console.log(firstname,lastname,password,email)
    let deptId;
    let facultyId;
    if (faculty === 'Developer') {
        deptId = 11;
        facultyId = 111;
    }
    if (faculty === 'HR') {
        deptId = 12;
        facultyId = 112;
    }
    console.log('user trying to save details in member db')
    const newMember = usermember({ firstname, lastname, email, password, faculty, phone, deptId, facultyId })
    try {
        const response = await newMember.save();
        res.json({ message: 'Data Saved in Server' })
    } catch (error) {
        res.json({ message: 'email already used', error: error })
    }

})
// fetching student records
app.get('/StudentRecord', async (req, res) => {
    const { email } = req.headers;
    try {
        const studentData = await userstudent.find();
        const validuser = await usermember.findOne({ email });
        if (validuser && studentData) {
            res.json({ message: 'Authorised', data: studentData });
        }
        else {
            res.json({ message: 'Error' })
        }
    } catch (error) {
        console.log('Error fetching data from DB', error)
    }
})
//fetching all data records
app.get('/Allrecords', async (req, res) => {
    const { email } = req.headers;
    try {
        const validuser = await adminuser.findOne({ email });
        const studentdata = await userstudent.find();
        const memberdata = await usermember.find();
        if (validuser) {
            res.json({ message: 'Authorised', studentdata: studentdata, memberdata: memberdata });
        } else {
            res.json({ message: 'Unauthorised' })
        }
    } catch (error) {
        console.log('Error getting data from all record :', error)
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))