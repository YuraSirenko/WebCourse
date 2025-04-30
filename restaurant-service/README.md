# Restaurant Service Application

This project is a web application designed for a restaurant service, featuring three user roles: Administrator, Waiter, and Guest. Each role has specific functionalities to enhance the user experience and streamline restaurant operations.

## Project Structure

The project is organized as follows:

```
restaurant-service
├── src
│   ├── sass
│   │   ├── _variables.scss      # SASS variables for consistent styling
│   │   ├── _mixins.scss         # Reusable SASS mixins for common styles
│   │   └── main.scss            # Main SASS file that imports variables and mixins
│   ├── css
│   │   └── main.css              # Compiled CSS output from SASS
│   ├── admin
│   │   ├── index.html            # Admin login page
│   │   └── dashboard.html        # Admin dashboard for user management
│   ├── waiter
│   │   ├── index.html            # Waiter login page
│   │   └── orders.html           # Page for managing orders
│   └── guest
│       ├── index.html            # Guest login page
│       └── menu.html             # Restaurant menu for guests
├── package.json                   # NPM configuration and dependencies
└── README.md                      # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd restaurant-service
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Compile SASS to CSS**:
   ```
   npm run build
   ```

4. **Open the application**:
   - Open the `index.html` files in the `admin`, `waiter`, and `guest` directories to access the respective user interfaces.

## User Roles

- **Administrator**: 
  - Can log in to manage users and view the dashboard.
  
- **Waiter**: 
  - Can log in to manage orders and access their functionalities.
  
- **Guest**: 
  - Can log in to view their orders and browse the restaurant menu.

This README provides an overview of the application structure and setup instructions to get started with the Restaurant Service Application.