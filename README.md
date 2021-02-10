# This is Repo for SEHAT Backend

## API End points

## Authentication 
Login and SignUp
For Login :   POST http://localhost:3000/api/user/login
For Sign Up : POST http://localhost:3000/api/auth/signup

## User
Get all users :  GET http://localhost:3000/api/user/
Get user by Id : GET http://localhost:3000/api/user/:id

    1. Information
    Get information of user by Id : GET  http://localhost:3000/api/information/:id
    Save user information :         POST http://localhost:3000/api/information/addUserInformation/
    Update user information :       PUT  http://localhost:3000/api/information/updateUserInformation

    2. Medical History
    Get Medical History of user by Id : GET  http://localhost:3000/api/medicalHistory/:id
    Save user Medical History :         POST http://localhost:3000/api/medicalHistory/addUserMedicalHistory/
    Append user Medical History :       PUT  http://localhost:3000/api/medicalHistory/appendUserMedicalHistory
    Update user Medical History :       PUT  http://localhost:3000/api/medicalHistory/updateUserMedicalHistory
    

