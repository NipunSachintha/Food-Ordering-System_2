# Food Ordering System

This Food Ordering System is a full-stack web application designed to streamline the process of ordering food in a restaurant or café environment. It allows users to browse menus, place orders, and manage their accounts, while providing staff and administrators with tools to manage orders, menu items, users, and view sales reports. The system includes:

- **Customer Interface:** Users can register, log in, browse the menu, place new orders, and view previous orders.
- **Admin Dashboard:** Admins can manage menu items, view and manage users, and access sales reports.
- **Kitchen Dashboard:** Staff can view and update the status of incoming orders.
- **POS (Point of Sale):** For staff to process orders and payments.
- **Authentication & Authorization:** Secure login and protected routes for different user roles.

The backend is built with Node.js and Express, using MongoDB for data storage. The frontend is built with React and Vite for a fast, modern user experience.

---

This repository contains a full-stack food ordering system with separate `backend` and `frontend` folders. Below is an overview of the project structure and the purpose of each main directory and file.

## Project Structure

```
Food-Ordering-System_2/
├── backend/
│   ├── db.js                # Database connection setup
│   ├── index.js             # Entry point for backend server
│   ├── package.json         # Backend dependencies and scripts
│   ├── middleware/
│   │   └── authMiddleware.js    # Authentication middleware
│   ├── models/
│   │   ├── Foodmodel.js         # Food item schema/model
│   │   ├── orderModel.js        # Order schema/model
│   │   └── UserModel.js         # User schema/model
│   └── routes/
│       ├── adminRoute.js        # Admin-related API routes
│       ├── foodRoute.js         # Food-related API routes
│       ├── orderRoute.js        # Order-related API routes
│       └── userRoute.js         # User-related API routes
├── frontend/
│   ├── eslint.config.js     # ESLint configuration
│   ├── index.html          # Main HTML file
│   ├── package.json        # Frontend dependencies and scripts
│   ├── README.md           # Frontend documentation
│   ├── vite.config.js      # Vite configuration
│   ├── assets/
│   │   └── posLogo.jpg         # Logo image
│   ├── public/
│   │   └── vite.svg            # Public assets
│   └── src/
│       ├── App.css             # Main app styles
│       ├── App.jsx             # Main React component
│       ├── index.css           # Global styles
│       ├── main.jsx            # React entry point
│       ├── actions/
│       │   ├── AdminActions.jsx    # Admin actions
│       │   ├── FoodActions.jsx     # Food actions
│       │   └── OrderActions.jsx    # Order actions
│       ├── assets/
│       │   └── react.svg           # React logo
│       ├── components/
│       │   ├── navbar.jsx          # Navigation bar
│       │   ├── NewOrderTab.jsx     # New order tab component
│       │   ├── PreviousOrdersTab.jsx   # Previous orders tab component
│       │   ├── ProtectedRoute.jsx      # Route protection component
│       ├── context/
│       │   └── AuthContext.jsx         # Authentication context
│       ├── pages/
│       │   ├── Admin.jsx               # Admin dashboard
│       │   ├── Kitchen.jsx             # Kitchen dashboard
│       │   ├── logIn.jsx               # Login page
│       │   ├── Pos.jsx                 # POS page
│       │   ├── Register.jsx            # Registration page
│       │   ├── Unauthorized.jsx        # Unauthorized access page
│       │   └── adminPages/
│       │       ├── MenuManagement.jsx      # Menu management page
│       │       ├── SalesReports.jsx        # Sales reports page
│       │       └── UserManagement.jsx      # User management page
│       └── utils/
│           └── AxiosInstance.jsx           # Axios instance for API calls
```

## Backend

- **db.js**: Handles database connection.
- **index.js**: Main server file, sets up Express and routes.
- **middleware/**: Contains authentication middleware.
- **models/**: Mongoose schemas for Food, Order, and User.
- **routes/**: API endpoints for admin, food, order, and user operations.

## Frontend

- **index.html**: Main HTML file for the React app.
- **App.jsx**: Root React component.
- **main.jsx**: Entry point for React rendering.
- **actions/**: Contains logic for admin, food, and order actions.
- **components/**: Reusable UI components (navbar, tabs, protected routes).
- **context/**: React context for authentication state.
- **pages/**: Main pages for admin, kitchen, POS, login, register, unauthorized, and admin subpages.
- **utils/**: Utility functions (e.g., Axios instance for API calls).

## How to Run

1. **Backend**

   - Navigate to the `backend` folder.
   - Install dependencies: `npm install`
   - Start the server: `npm start` or `node index.js`

2. **Frontend**
   - Navigate to the `frontend` folder.
   - Install dependencies: `npm install`
   - Start the development server: `npm run dev`
