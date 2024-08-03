const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/Users');
const PlaceModel = require('./models/Place');
const BookingModel = require('./models/Booking');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');   
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

require('dotenv').config();
const app = express();
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cookieParser());
const PORT = process.env.PORT || 3500;
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromToken(req)
{
    return new Promise((resolve, reject) => 
        {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, user) =>
                {
                    if (err) reject(err);
                    resolve(user);
                
                });
        });
}

app.get('/test', (req, res) => {
    res.json('Hello World');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    try{
        const newUser = await UserModel.create({ 
            name, 
            email, 
            password: hashedPassword });
        res.json(newUser);
    }catch (error) {
        res.status(500).json(error); // Internal Server Error
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({email});
        if (userDoc) {
            const passOK = bcrypt.compareSync(password, userDoc.password);
            if (passOK) {
                jwt.sign({email:userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, { expiresIn: '120h' }, (err, token) =>{
                    if (err) throw err;
                    const {name, email, password} = userDoc.toObject();
                    res.cookie('token', token).json({name, email});
                });
            }
            else {
                res.status(401).json('Wrong password');
            }
        }else{
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/profile', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if(token)
        {
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.status(401).json('Token expired');
                    } else {
                        res.status(403).json('Invalid token');
                    }
                } else {
                    const {name, email, _id} = await UserModel.findById(user.id);
                    res.json({name, email, _id});
                }
            }); // Add closing parenthesis here
        } else {
            res.status(401).json('Unauthorized');
        
        }
});

app.post('/logout', (req, res) => {
    res.cookie('token','').json('Logged out');
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'Photo' + Date.now() + '.jpg';
    destination = path.join(__dirname, '/uploads', newName);
    try
    {
        await download.image( {
            url: link,
            dest: destination,
        });
        res.json(newName);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

const photosMiddleware = multer({dest: 'uploads/'});
app.post('/upload', photosMiddleware.array('photo',100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newName = path + '.' + ext;
        fs.renameSync(path, newName);
        uploadedFiles.push(newName.replace('uploads\\',''));
    }

    res.json(uploadedFiles);
});

app.post('/places', async (req, res) => 
    {
        const {token} = req.cookies;
        const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body;
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => 
            {
                if (err) throw err;
                const placeDoc = await PlaceModel.create({
                    owner: user.id,
                    title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests
                });
                res.json(placeDoc);
                
            });
        
    }
);

app.get('/user-places', (req, res) => 
    {
        const {token} = req.cookies;
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => 
            {
                if (err) throw err;
                const {id} = user;
                res.json(await PlaceModel.find({owner:id}));
            });
    });

app.get('/places/:id', async (req, res) => 
    {
        const {id} = req.params;
        res.json(await PlaceModel.findById(id));
    }
);

app.put('/places', async (req, res) => 
    {
        const {token} = req.cookies;
        const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body;
        const placeDoc = await PlaceModel.findById(id);
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => 
            {
                if (err) throw err;
                if (placeDoc.owner.toString() === user.id) {
                    placeDoc.set({
                        title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests
                    });
                    placeDoc.save();
                    res.json(placeDoc);
                } else {
                    res.status(403).json('Unauthorized');
                }
            });
    }
);  

app.get('/places', async (req, res) => 
    {
        res.json(await PlaceModel.find());
    }
);

app.post('/booking',  async (req, res) => 
    {
        const userData = await getUserDataFromToken(req);
        const {place, checkIn, checkOut, guests, name, mobile, price} = req.body;
        BookingModel.create({place, checkIn, checkOut, guests, name, mobile, price, user: userData.id}).then((doc) => {
            
            res.json(doc);          
        }).catch ((error) => {
            throw error;
        });
    }
);

app.get('/booking', async (req, res) => 
    {
        const userData = await getUserDataFromToken(req);
        res.json(await BookingModel.find({user:userData.id}).populate('place'));
    });

// models\uploads\Photo1716168394720.jpg
app.listen(3500, () => {
    console.log('Server is running on port 3000');
});



