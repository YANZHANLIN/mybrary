# Mybrary

A modern web application built with Node.js, Express, and MongoDB for managing a digital library system.

## Features

- Web-based library management interface
- MongoDB database integration for data persistence
- Responsive design with EJS templating
- RESTful API architecture
- Environment-based configuration
- Development tools for enhanced productivity

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS with Express-EJS-Layouts
- **Development**: Nodemon for auto-restart
- **Environment Management**: dotenv

## Project Structure

```
mybrary/
├── models/           # Database models and schemas
├── routes/           # Express route handlers
│   └── index.js     # Main application routes
├── views/           # EJS templates
│   ├── layouts/     # Layout templates
│   │   └── layout.ejs
│   └── index.ejs    # Main page template
├── public/          # Static assets (CSS, JS, images)
├── node_modules/    # NPM dependencies
├── server.js        # Main application entry point
├── package.json     # Project configuration and dependencies
├── .gitignore      # Git ignore rules
└── README.md       # Project documentation
```

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd mybrary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure your MongoDB service is running locally, or ensure your MongoDB Atlas connection is properly configured.

## Usage

### Development Mode
```bash
npm run devstart
```
This starts the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```
This starts the server using Node.js directly.

The application will be available at `http://localhost:3000`

## API Routes

- `GET /` - Main application page

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | Required |
| `PORT` | Application port | 3000 |
| `NODE_ENV` | Environment mode | development |

## Development

### File Structure Details

- **server.js**: Main application file that sets up Express, connects to MongoDB, and starts the server
- **routes/**: Contains all route handlers organized by functionality
- **views/**: EJS templates for rendering HTML pages
- **models/**: Mongoose schemas and models for database operations
- **public/**: Static files served directly by Express

### Adding New Features

1. Create new routes in the `routes/` directory
2. Add corresponding EJS templates in `views/`
3. Create database models in `models/` if needed
4. Import and use new routes in `server.js`

## Scripts

- `npm start` - Start the production server
- `npm run devstart` - Start development server with auto-restart

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue in the repository.