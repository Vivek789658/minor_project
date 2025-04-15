# University Feedback Hub

A comprehensive web application for managing university course feedback, built with React.js and Node.js.

## 🎯 Features

### For Students
- Submit course feedback for different subjects
- View and track feedback submission history
- Receive notifications about new feedback forms
- Contact administrators for support
- View personal academic profile
- Analytics dashboard for feedback insights

### For Professors
- View feedback received for their courses
- Analyze student responses through charts and visualizations
- Manage course-specific notifications
- Respond to student queries
- Track feedback completion rates

### For Administrators
- Create and manage feedback forms
- Register new students and professors
- Assign subjects to professors
- Monitor feedback submission statistics
- Generate reports and export data
- Manage user accounts and permissions
- View comprehensive analytics dashboard

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router for navigation
- Chart.js for visualizations
- React Icons
- Parcel for bundling

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
\`\`\`

2. Install dependencies for both client and server:
\`\`\`bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
\`\`\`

3. Set up environment variables:
Create a .env file in the server directory with:
\`\`\`
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
\`\`\`

4. Start the development servers:
\`\`\`bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
\`\`\`

## 📱 Mobile Access
To access the application from a mobile device:
1. Ensure your phone is on the same WiFi network as the computer
2. Use the computer's IP address instead of localhost
3. Access via: http://[your-ip-address]:1234

## 🔐 Security Features
- JWT-based authentication
- Encrypted password storage
- Protected API routes
- Session management
- Input validation and sanitization

## 📊 Data Management
- Real-time feedback submission tracking
- Automated response collection
- Excel export functionality
- Data visualization tools
- Comprehensive reporting system

## 🎨 UI/UX Features
- Responsive design for all devices
- Modern and intuitive interface
- Real-time notifications
- Interactive dashboards
- Accessible form controls
- Dark/Light mode support

## 👥 User Roles
1. **Admin**
   - Complete system control
   - User management
   - Form creation and management
   - Analytics access

2. **Professor**
   - View student feedback
   - Response analytics
   - Course management
   - Student communication

3. **Student**
   - Submit feedback
   - View submission history
   - Access notifications
   - Contact support

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.



## 🙏 Acknowledgments
- All contributors and testers
- The university community for feedback
- Open source community for tools and libraries 