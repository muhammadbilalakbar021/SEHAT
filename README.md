# This is Repo for SEHAT Backend

## API End points

## Authentication

Login and SignUp
For Login : POST http://localhost:3000/api/user/login
// also mention object schema which is expected at this route
For Sign Up : POST http://localhost:3000/api/auth/signup

## User

Get all users : GET http://localhost:3000/api/user/
Get user by Id : GET http://localhost:3000/api/user/:id

    1. Information
    Get information of user by Id : GET  http://localhost:3000/api/information/:id
    Save user information :         POST http://localhost:3000/api/information/addUserInformation/
    Update user information :       PUT  http://localhost:3000/api/information/updateUserInformation

    2. Medical History
    Get Medical History of user by Id : GET  http://localhost:3000/api/medicalHistory/:id
    Save user Medical History :         POST http://localhost:3000/api/medicalHistory/addUserMedicalHistory/
    Append user Medical History :       PUT  http://localhost:3000/api/medicalHistory/appendUserMedicalHistory
    Update user Medical History :       PUT  http://localhost:3000/api/medicalHistory/
    updateUserMedicalHistory

    3. Vitals
    Get Vitals of user by Id : GET  http://localhost:3000/api/Vitals/:id
    Save user Vitals         : POST POST http://localhost:3000/api/Vitals/addUserVitals
    Append user Vitals       : PUT  http://localhost:3000/api/Vitals/appendUserVitals
    Update user Vitals       : PUT  http://localhost:3000/api/Vitals/updateUserVitals

    3. Medicine Status
    Get Medicine Status of user by Id : GET  http://localhost:3000/api/medicineStatus/:id
    Save user Medicine Status         : POST POST http://localhost:3000/api/medicineStatus/addUserMedicineStatus
    Append user Medicine Status       : PUT  http://localhost:3000/api/medicineStatus/appendUserMedicineStatus
    Update user Medicine Status       : PUT  http://localhost:3000/api/medicineStatus/updateUserMedicineStatus

