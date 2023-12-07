# React Firebase CRUD E-commerce

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

This project is a straightforward CRUD (Create, Read, Update, Delete) application developed using React and Firebase. It serves as a platform for creating purchase orders based on selected products, offering category-based filtering, and providing a shopping cart feature.

### Prerequisites

- Node.js 
- Firebase

### Steps

1. Clone the Repository:
   ```bash
   https://github.com/FedeCasper/PreEntrega2RouyereFederico.git
2. Navigate to the project directory: 
   ```bash
   cd EntregaFinalRouyereFederico
3. Install dependencies:   
   ```bash
   npm install
4. Run the app: 
   ```bash
   npm start


### Usage

You can log in as a trial user with the following credentials:
- User email:
   ```bash
   user@mail.com
- User password:
   ```bash
   123456
Or you can create a new user from the Register form.

Once you're inside the site the application features a main page showcasing all available products. The navigation bar includes a section allowing users to filter products based on categories. Clicking on a product card navigates to a detailed view, providing comprehensive information about the product. Additionally, users can add the product to their shopping cart.

### Database

This project uses Firestore ( Firebase ) as its database. Ensure you have an account on Firebase and follow these steps:

- To set up Firebase for your project, make sure to replace the placeholder values in the `firebaseConfig` object with your actual Firebase credentials. You can obtain these credentials from your Firebase project settings in the `Firebase Console`.  
   ```bash
   const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_AUTH_DOMAIN",
   projectId: "YOUR_PROJECT_ID",
   storageBucket: "YOUR_STORAGE_BUCKET",
   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
   appId: "YOUR_APP_ID"
   }

### Extra Dependencies

The project utilizes a few additional dependencies beyond the specified requirements for the assignment, including Material Icons, Tailwind CSS, and React Spinners. 

- [Material Icons](https://mui.com/) : Material Icons enhance the visual elements. 
- [React Spinners](https://tailwindcss.com/) : Tailwind CSS provides a utility-first styling approach for efficient and responsive design. 
- [React Spinners](https://www.npmjs.com/package/react-spinners) : React Spinners offer customizable loading spinners for a better user experience. 
- [Reactfire](https://www.npmjs.com/package/reactfire) : Reactfire implemented for security in client authentication.

### Known Issues

- Reactfire is not compatible with firebase version 10.7.0 you'll need version 9.0.0