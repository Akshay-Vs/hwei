<h1 align='center'>Hwei (Under development)</h1>
<h3 align='center'>E-commerce Headless Dashboard</h3>

Hwei is an open-source, headless e-commerce solution tailored for small to medium businesses. Designed to be modular, scalable, and developer-friendly, Hwei provides a robust backend, an admin panel, and customizable APIs for seamless storefront integration. Whether you're looking to launch your next online store or manage an existing business, Hwei empowers you to build and scale efficiently.

---

<img align="center" src="https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1rb1zmEbpDskW2xn8qAhzMdCXYuTb0B6VOFPm">

## Features

### Core Features

- **Authentication**: Secure JWT-based authentication with role-based access control.
- **Product Management**: Create, update, and manage products with support for multiple variants and categories.
- **Inventory Tracking**: Real-time stock updates and tracking.
- **Order Management**: Process orders with comprehensive order lifecycle tracking.
- **Payment Integration**: Out-of-the-box support for Stripe and other payment gateways.
- **Admin Panel**: Intuitive interface for managing the backend, built using Next.js.
- **API-First Design**: RESTful APIs for custom storefront and frontend integrations.
- **Analytics Dashboard**: Business insights including sales trends, inventory alerts, and order reports.
- **Headless Architecture**: Decouple the frontend from the backend for maximum flexibility.

### Additional Features

- **Multi-Tenancy**: Support for multiple stores under one installation.
- **Localization**: Multi-language and currency support.
- **Search & Filters**: Optimized search and filter APIs for products.
- **Customizable Roles**: Define custom roles and permissions for admin users.
- **SEO Ready**: Metadata management and Open Graph integration.
- **Extensible Modules**: Add plugins or microservices as needed.

---

## Tech Stack

### Backend

- **Nest.js**: Backend logic and APIs.
- **PostgreSQL**: Relational database for structured data.
- **Redis**: Caching and session management.
- **Prisma**: ORM for database management.

### Admin Panel

- **Next.js**: Admin dashboard with SSR and SSG support.
- **TailwindCSS**: Modern and customizable UI components.

### APIs

- **RESTful API**: Flexible endpoints for frontend integration.
- **Authentication**: Clerk.

---

## Installation

### Prerequisites

- Node.js (>= 18.x)
-
-

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/hwei.git
   cd hwei
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Environment Variables**
   Copy `.env.example` to `.env` and configure your database, Redis, and API keys.

   ```bash
   cp .env.example .env
   ```

4. **Run Database Migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

6. **Access the Admin Panel**
   Visit `http://localhost:3000` to explore the admin panel.

---

## API Documentation

Hwei provides detailed API documentation for integrating your custom frontend. The documentation includes:

- **Authentication**: User login, logout, and role management.
- **Products**: Endpoints for managing products and categories.
- **Orders**: APIs for processing orders and tracking order statuses.
- **Payments**: Stripe integration for payment handling.

API Docs are available [here](https://github.com/Akshay-Vs/hwei/).

---

## Contribution

Contributions are welcome! If you’d like to contribute to Hwei, please:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with your changes.

### Development Commands

- **Run Backend**: `npm run dev`
- **Run Admin Panel**: `npm run dev:admin`
- **Lint Code**: `npm run lint`
- **Run Tests**: `npm run test`

---

## Roadmap

#### Roadmap is available [here](https://github.com/Akshay-Vs/hwei/blob/main/ROADMAP.md).

## License

Hwei is released under the [MIT License](LICENSE).

---

## Acknowledgments

- Thanks to the open-source community for inspiration and tools.
- Designed and developed by [AKVS](https://akvs.dev) with ❤️ for developers and business owners alike.
