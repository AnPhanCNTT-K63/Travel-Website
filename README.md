# VVBA Travel Agency Website

## Overview
VVBA is a travel agency website built with **ASP.NET Web API**, **React.js**, and **SQL Server**. It provides a comprehensive platform for users to explore, book, and manage tours, while administrators can oversee operations, manage users, and handle bookings.

[![Video Demo #1]()](https://www.youtube.com/watch?v=4J54g9lQj2U) (Click to navigate)

## Technologies Used
- **Backend**: ASP.NET Web API
- **Frontend**: React.js
- **Storage**: AWS S3
- **CDN**: AWS CloudFront
- **Database**: SQL Server

## Branches
- **api**: Contains the backend code (ASP.NET Web API).
- **client**: Contains the frontend code (React.js).

## Features

### User & Admin Features

[![Video Demo #2]()](https://www.youtube.com/watch?v=O5XxbzcNFfc) (Click to navigate)

[![Video Demo #3]()](https://www.youtube.com/watch?v=cBRGNql3Z3Y) (Click to navigate)

#### Authentication & Account Management
- **Registration**: Users can register using email, username, and password.
  - Duplicate emails or usernames are not allowed.
  - Can signin or signup via google
- **Login**: Users can log in with registered credentials or Google.
  - Password recovery via email verification.
  - Banned and deleted accounts are handled with appropriate messages.
- **Profile & Account Management**:
  - View and update personal information.
  - Auto-lock for security.
  - Report issues and request account deletion.

#### Post Management
- View, create, edit, and delete posts.
- Deleted posts go to Trash Can for restoration or permanent deletion.
- New posts require admin approval before being displayed in the Blog section.

#### Tour Filtering
- Search by tour name, city, country, and date.
- Filter by tour price (default: $1 - $1000).

### Admin Features

[![Video Demo #4]()](https://www.youtube.com/watch?v=zcnTDdhZ1Ow) (Click to navigate)

[![Video Demo #5]()](https://www.youtube.com/watch?v=yGrjxL60gEg) (Click to navigate)

[![Video Demo #6]()](https://www.youtube.com/watch?v=qirwJgjFmX0) (Click to navigate)

#### Tour & Tour Package Management
- **Create Tours**: Input tour details and save.
- **Create Tour Packages**: Add additional tour packages and activities.
- **Edit/Delete Tours & Packages**:
  - Update details, images, and descriptions.
  - Modify refundable policies and schedule options.
  - Move deleted tours to trash for restoration or permanent removal.

#### User Management
- View activity status, restore, lock, or delete accounts.
- Approve or reject profile lock/unlock requests.
- Confirm payment information.

#### Reports & Analytics
- View revenue, bookings, posts, registrations, and payments.
- Display data using column, pie, and line charts.
- Export reports as files.

#### Payment Approval
- Approve or reject booking payments.
- Filter and sort invoices by status.

### User Booking & Billing

[![Video Demo #7]()](https://www.youtube.com/watch?v=vxAZsUa_LVE) (Click to navigate)

- **Create Booking Requests**: Provide contact details and make payments.
- **Booking Management**: Track approval status and delete transaction history.
- **Billing & Payments**:
  - Add payment methods (bank name, card number).
  - View paid invoices and discount codes.
  - Export invoices as PDF.

## Installation
1. Clone the repository.

2. Navigate to the backend (API) directory and set up the ASP.NET Web API:
   ```sh
   cd api
   ```
   - Install dependencies
   - Configure the database connection (SQL Server)
   - Run the backend

3. Navigate to the frontend (Client) directory and set up React.js:
   ```sh
   cd client
   npm install
   npm start
   ```
## Contributing
Contributions are welcome! Feel free to open issues and submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For inquiries, please contact [phanducan147@gmail.com](mailto:phanducan147@gmail.com).

