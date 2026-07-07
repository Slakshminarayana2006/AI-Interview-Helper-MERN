const express = require('express');
const JWTverify = require('../middlewares/JWTverify');
const { getResumeAndDescription, getReportById, getAllReportsOfAUser,getResumePdf } = require('../controllers/interviewControllers');
const router = express.Router();
const {upload} = require('../middlewares/multer');


router.route('/interview-data').post(
    JWTverify, 
    upload.fields([
        {
            name : "resumePdf",
            maxCount : 1
        }
    ]),
    getResumeAndDescription
)

router.route('/getReportsById/:reportId').get(JWTverify, getReportById);
router.route('/getAllReport').get(JWTverify, getAllReportsOfAUser);
router.route('/getresume/:interviewId').get(JWTverify, getResumePdf);


module.exports = router;

