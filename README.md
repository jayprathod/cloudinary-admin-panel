# Cloudinary Admin Panel

This project demonstrates a simple user management panel using **Node.js** for the backend and basic **HTML, CSS, and JavaScript** for the frontend. It features integration with Cloudinary for image upload, retrieval, and deletion, alongside MongoDB for data storage.

---

## **Features**
- User Registration:
  - Uploads user profile images to Cloudinary.
  - Stores user details in MongoDB.
  - Secures passwords using bcrypt.

- View Users:
  - Fetches user data from MongoDB.
  - Displays user details including their profile image.

- Delete Users:
  - Deletes user data from MongoDB.
  - Removes associated images from Cloudinary.

---

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB (via Mongoose)
- **Image Management**: Cloudinary
- **Security**: Bcrypt for password hashing

---

## **Folder Structure**
```
cloudinary-admin-panel/
├── backend/
│   ├── config/            # Configuration files (e.g., Cloudinary, MongoDB)
│   ├── index.js           # Main entry point for the backend server
│   ├── server/            # Server-side API logic
│   ├── package.json       # Backend dependencies
│   └── package-lock.json  # Backend dependency lock file
├── frontend/
│   ├── index.html         # Main HTML file
│   ├── script.js          # Frontend JavaScript
│   └── style.css          # Frontend CSS styles
└── .gitignore             # Git ignore configuration
```

---

## **Setup Instructions**

### **1. Clone Repository**
```bash
git clone <repository-url>
cd cloudinary-admin-panel
```

### **2. Install Backend Dependencies**
```bash
cd backend
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file inside the `backend` folder with the following:
```env
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
MONGO_URI=<your-mongodb-uri>
```

### **4. Run the Backend Server**
```bash
npm start
```

### **5. Open Frontend**
Open the `index.html` file in the `frontend` folder using a browser.

---

## **APIs**

### **1. Register User**
**Endpoint**: `POST /register`

**Request Body**:
```json
{
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "birthDate": "1990-01-01",
    "password": "securepassword"
}
```
**File**: Profile image as `multipart/form-data`

**Response**:
```json
{
    "message": "Registration Successful"
}
```

---

### **2. Get Users**
**Endpoint**: `GET /users`

**Response**:
```json
{
    "message": [
        {
            "name": "John",
            "surname": "Doe",
            "email": "john.doe@example.com",
            "birthDate": "1990-01-01",
            "profileImage": "https://cloudinary.com/..."
        }
    ]
}
```

---

### **3. Delete User**
**Endpoint**: `DELETE /users/:userId`

**Response**:
```json
{
    "message": "User deleted successfully"
}
```

---
