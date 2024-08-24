# eBookHeaven

Welcome to eBookHeaven! This project is a Next.js application for browsing, purchasing, and managing eBooks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse books by category and price
- View book details
- Add books to wishlist
- Manage shopping cart
- Checkout with various payment methods
- View past orders
- Responsive design for mobile and desktop

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **Redux**: State management
- **Axios**: HTTP client for API requests
- **Shadcn/UI**: UI components library
- **Tailwind CSS**: Utility-first CSS framework for styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/eBookHeaven.git
   cd eBookHeaven

2. Install Dependencies
   ```bash
   npm install

3. Set Up Environment Variables
   Create a .env.local file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url

4. Run the Development Server

   ```bash
   npm run dev

Open http://localhost:3000 in your browser.

### Usage
- **Home Page**: Browse featured and bestselling books.
- **Store**: Filter books by category and price, and add items to your cart.
- **Wishlist**: Manage and view your favorite books.
- **Checkout**: Complete your purchase with options for discount codes and payment methods.
- **Orders**: View and filter past orders.

### Usage
- **GET `/api/books`** - Fetches a list of books.
- **GET `/api/book/:id`** - Fetches details of a specific book.
- **POST `/api/checkout`** - Submits an order.
- **GET `/api/orders`** - Retrieves past orders.

### Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.
