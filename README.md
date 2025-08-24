# Mybrary

A modern, full-featured digital library management system built with Node.js, Express, and MongoDB. Manage authors, books, and cover images with an intuitive web interface.

## ✨ Features

### 📚 Core Library Management
- **Complete CRUD Operations** for both Authors and Books
- **Author Management**: Create, view, edit, and delete authors
- **Book Management**: Add books with cover images, edit details, and remove books
- **Relationship Management**: Books are automatically linked to authors
- **Search & Filter**: Find books by title, author, or publication date ranges

### 🖼️ Advanced File Handling
- **FilePond Integration**: Modern drag & drop file upload interface
- **Cover Image Management**: Upload, preview, and manage book cover images
- **Image Validation**: Supports JPEG, PNG, and GIF formats
- **Automatic Cleanup**: Removes old images when updating or deleting books

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Interface**: Hover effects, confirmation modals, and smooth transitions
- **Grid Layouts**: Beautiful card-based displays for books and authors
- **Pagination**: Efficient browsing through large collections

### 🔍 Smart Search & Organization
- **Author Search**: Find authors by name with real-time filtering
- **Book Organization**: Sort books by creation date, publication date, and more
- **Recently Added Books**: Homepage showcases latest additions
- **Author Book Collections**: View all books by a specific author

## 🛠️ Tech Stack

### **Backend**
- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js with RESTful API design
- **Database**: MongoDB with Mongoose ODM
- **File Handling**: Multer for file uploads
- **Method Override**: Support for PUT/DELETE operations

### **Frontend**
- **Template Engine**: EJS with Express-EJS-Layouts
- **File Upload**: FilePond with image preview and validation
- **Styling**: Inline CSS with responsive design principles
- **JavaScript**: Modern ES6+ features and DOM manipulation

### **Development & Deployment**
- **Auto-restart**: Nodemon for development
- **Environment Management**: dotenv for configuration
- **Version Control**: Git with GitHub integration
- **Deployment Ready**: Heroku deployment configuration

## 📁 Project Structure

```
mybrary/
├── models/                    # Database models and schemas
│   ├── author.js            # Author model with timestamps
│   └── book.js              # Book model with cover image support
├── routes/                   # Express route handlers
│   ├── index.js             # Homepage and main routes
│   ├── authors.js           # Author CRUD operations
│   └── books.js             # Book CRUD operations with file uploads
├── views/                    # EJS templates
│   ├── layouts/             # Layout templates
│   │   └── layout.ejs       # Main application layout
│   ├── authors/             # Author-related templates
│   │   ├── index.ejs        # Authors listing with search
│   │   ├── new.ejs          # Create new author form
│   │   ├── show.ejs         # Author details with books
│   │   ├── edit.ejs         # Edit author form
│   │   ├── books.ejs        # Author's books grid view
│   │   └── _form_field.ejs  # Reusable form components
│   ├── books/               # Book-related templates
│   │   ├── index.ejs        # Books listing with search
│   │   ├── new.ejs          # Create new book with FilePond
│   │   ├── show.ejs         # Book details view
│   │   ├── edit.ejs         # Edit book form
│   │   └── _form_field.ejs  # Reusable book form fields
│   └── index.ejs            # Homepage with recent books
├── public/                   # Static assets
│   ├── css/                 # Custom stylesheets
│   │   └── filepond.css     # FilePond customization
│   ├── javascript/          # Client-side JavaScript
│   │   └── fileupload.js    # FilePond initialization
│   └── uploads/             # File storage
│       └── bookCovers/      # Book cover images
├── uploads/                  # Legacy upload directory
├── server.js                 # Main application entry point
├── package.json              # Project configuration and dependencies
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

## 🚀 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

## 📦 Installation

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
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=mongodb://localhost:27017/mybrary
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Ensure MongoDB is running locally, or configure your MongoDB Atlas connection string.

## 🎯 Usage

### Development Mode
```bash
npm run devstart
```
Starts the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```
Starts the server using Node.js directly.

The application will be available at `http://localhost:3000`

## 🔌 API Routes

### **Main Routes**
- `GET /` - Homepage with recently added books

### **Author Routes**
- `GET /authors` - List all authors with search functionality
- `GET /authors/new` - Create new author form
- `POST /authors` - Create new author
- `GET /authors/:id` - View author details with books
- `GET /authors/:id/edit` - Edit author form
- `PUT /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author
- `GET /authors/:id/books` - View all books by author (grid layout)

### **Book Routes**
- `GET /books` - List all books with search and filtering
- `GET /books/new` - Create new book form with FilePond
- `POST /books` - Create new book with cover image
- `GET /books/:id` - View book details
- `GET /books/:id/edit` - Edit book form
- `PUT /books/:id` - Update book and cover image
- `DELETE /books/:id` - Delete book and cover image

## 🌍 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | MongoDB connection string | - | ✅ Yes |
| `PORT` | Application port | 3000 | ❌ No |
| `NODE_ENV` | Environment mode | development | ❌ No |

## 🎨 Key Features Explained

### **FilePond Integration**
- **Drag & Drop**: Intuitive file upload interface
- **Image Preview**: See cover images before uploading
- **Validation**: File type and size restrictions
- **Responsive**: Works on all device sizes

### **Database Design**
- **Author Model**: Simple name field with automatic timestamps
- **Book Model**: Comprehensive book information with author references
- **Relationships**: Books automatically linked to authors
- **File Storage**: Only filenames stored in database (efficient)

### **User Interface**
- **Card Layouts**: Modern, responsive design patterns
- **Action Buttons**: Easy access to edit, delete, and view operations
- **Confirmation Modals**: Safe deletion with user confirmation
- **Search & Filter**: Quick access to specific content

## 🚀 Development

### **Adding New Features**

1. **Create Models**: Add new schemas in `models/` directory
2. **Add Routes**: Create route handlers in `routes/` directory
3. **Create Templates**: Build EJS templates in `views/` directory
4. **Update Server**: Import and use new routes in `server.js`

### **File Upload Customization**

- **Supported Formats**: JPEG, PNG, GIF
- **File Size Limit**: 5MB maximum
- **Storage Location**: `public/uploads/bookCovers/`
- **Cleanup**: Automatic removal of old files

## 📊 Scripts

- `npm start` - Start the production server
- `npm run devstart` - Start development server with auto-restart

## 🔄 Git Workflow

```bash
# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Deploy to Heroku (if configured)
git push heroku main
```

## 🌟 Recent Updates

- ✅ **Complete CRUD Operations** for Authors and Books
- ✅ **FilePond Integration** for modern file uploads
- ✅ **Author Books Page** with grid layout and pagination
- ✅ **Real-time Book Counts** on authors listing
- ✅ **Enhanced User Interface** with responsive design
- ✅ **File Management** with automatic cleanup
- ✅ **Search & Filtering** capabilities
- ✅ **Professional Error Handling** and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:
- Check the existing issues in the repository
- Open a new issue with detailed information
- Ensure your environment variables are correctly configured
- Verify MongoDB is running and accessible

## 🎉 Project Status

**Current Status**: ✅ **Production Ready**

Your Mybrary application is now a **complete, professional-grade** library management system with:
- Full CRUD operations
- Modern file upload interface
- Responsive design
- Database relationships
- Search and filtering
- Error handling
- Deployment readiness

Ready for production use and further enhancements! 🚀