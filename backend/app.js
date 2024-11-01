import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import {connectDB} from './config/db.js';
import cookieParser from 'cookie-parser';
import swaggerDocs from './swagger.js';


 

const app = express();
connectDB();
app.use(bodyParser.json());
app.use(cors());

// use cookie parser
app.use(cookieParser());
swaggerDocs(app);

// Import route
import studentRoutes from './routes/student.routes.js';
import adminRoutes from './routes/admin.route.js';
import blogRoutes from './routes/blog.routes.js';
import testimonyRoutes from './routes/testimony.route.js';
import adminRegistration from './routes/volunteer.routes.js';


// use routes
app.use('/api/student', studentRoutes);
app.use('/api/volunteer', adminRegistration);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes)
app.use('/api/testimonies', testimonyRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
