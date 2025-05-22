# WebCourse

## Prerequisites
- Node.js (v14 or higher)
- npm

## Frontend Setup (React SPA)
```powershell
# Clone the repository and install dependencies
git clone <repo-url> .
npm install

# Start the development server on port 8000
$env:PORT=8000; npm start
```
The SPA will be available at http://localhost:8000.

## Linting
This project uses Airbnb JavaScript style with 4-space indentation.
```powershell
# Install ESLint and Airbnb config
npm install --save-dev eslint eslint-config-airbnb base-config eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y

# Run linter
enpm run lint
```

## REST API Endpoints
All data exchange is done via JSON over REST. The backend server is assumed to be running at http://localhost:8000.

| Resource                  | Endpoint                                 | Supported Methods             |
| ------------------------- | ---------------------------------------- | ----------------------------- |
| Customers                 | /customers/                              | GET, POST                     |
| Customer Detail           | /customers/:id/                          | GET, PUT, PATCH, DELETE       |
| Items                     | /items/                                  | GET, POST                     |
| Item Detail               | /items/:id/                              | GET, PUT, PATCH, DELETE       |
| Item-Has-Orders           | /item-has-orders/                        | GET, POST                     |
| Item-Has-Order Detail     | /item-has-orders/:id/                    | GET, PUT, PATCH, DELETE       |
| Item Types                | /item-types/                             | GET, POST                     |
| Item Type Detail          | /item-types/:id/                         | GET, PUT, PATCH, DELETE       |
| Orders                    | /orders/                                 | GET, POST                     |
| Order Detail              | /orders/:id/                             | GET, PUT, PATCH, DELETE       |
| Payment Methods           | /payment-methods/                        | GET, POST                     |
| Payment Method Detail     | /payment-methods/:id/                    | GET, PUT, PATCH, DELETE       |
| Salary Histories          | /salary-histories/                       | GET, POST                     |
| Salary History Detail     | /salary-histories/:id/                   | GET, PUT, PATCH, DELETE       |
| Salary Types              | /salary-types/                           | GET, POST                     |
| Salary Type Detail        | /salary-types/:id/                       | GET, PUT, PATCH, DELETE       |
| Sales                     | /sales/                                  | GET, POST                     |
| Sale Detail               | /sales/:id/                              | GET, PUT, PATCH, DELETE       |
| Tables in Restaurant      | /tables-in-restaurant/                   | GET, POST                     |
| Table Detail              | /tables-in-restaurant/:id/               | GET, PUT, PATCH, DELETE       |
| Waiters                   | /waiters/                                | GET, POST                     |
| Waiter Detail             | /waiters/:id/                            | GET, PUT, PATCH, DELETE       |
| Waiter-Has-Orders         | /waiter-has-orders/                      | GET, POST                     |
| Waiter-Has-Order Detail   | /waiter-has-orders/:id/                  | GET, PUT, PATCH, DELETE       |

## Lab Requirements

Students should practice working with a front-end framework by creating a Single Page Application (SPA) based on static templates from the previous lab. The application must implement:

- Login / logout functionality
- User roles (e.g., admin, user)
- Users listing page
- Full User CRUD (Create, Read, Update, Delete)

Technical and quality requirements:

- SPA communicates with the backend via REST interface, using JSON for data exchange
- Accessible on http://localhost:8000
- No errors or warnings in the browser console
- Loading speed under 4 seconds
- Support at least two modern browsers
- No commented-out code in production files
- Uses Airbnb JavaScript style guide with 4-space indentation
- Apply Single Responsibility Principle: one component or service per file
- Limit files to 400 lines, functions to 75 lines
- Consistent naming conventions for files, components, and services
- Presentation logic in component classes; templates contain only view markup
- After navigating to any route (e.g., `/users`) and refreshing, the same view must load via client-side routing

Environment and setup documentation:

- Project must run on Linux environment
- Backend can be Python, Node.js, or PHP
- Setup by cloning the repository and executing minimal commands; see above **Frontend Setup** section
