require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt"); //password hashing
const { connectDb, getDb } = require("./db");
const fs = require("fs"); //dealing with files
const path = require("path");
const { ObjectId } = require("bson"); //mongodb
const session = require("express-session");
const multer = require("multer"); //for photos

const app = express();

app.set("trust proxy", 1); // REQUIRED for Render

app.use(express.json());

const cors = require("cors");

app.use(cors({
    origin: true,
    credentials: true
}));


//sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

//Connect to client folder files
app.use(express.static(path.join(__dirname, "..", "Client")));
//Opens index.html at the first page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Client", "index.html"));
});
// Serve profile pics from a URL
app.use(
    "/profile-pics",
    express.static(path.join(__dirname, "..", "Client", "Client Uploads", "Profile Pics"))
);
app.use(
    "/entry-pics/",
    express.static(path.join(__dirname, "..", "Client", "Client Uploads", "Entry Pics"))
);


async function startServer() {
    try {
        await connectDb();
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer();

//PROFILE PIC STORAGE
const photoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "Client", "Client Uploads", "Profile Pics"));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${req.session.user.id}-${Date.now()}${ext}`);
    }
});

//PROFILE PICS UPLOAD
const profilePicUpload = multer({
    storage: photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files allowed"), false);
        }
        cb(null, true);
    }
});


//ENTRY PICS STORAGE
const entryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "Client", "Client Uploads", "Entry Pics"));
    },
    filename: (req, file, cb) => {
        cb(null, `entry-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadEntryPhoto = multer({
    storage: entryStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images allowed"));
        }
        cb(null, true);
    }
});

app.get("/auth/me", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }
    let currentUser = req.session.user;

    return res.json({
        loggedIn: true,
        currentUser
    });
});

//1. REGISTER - add try and catch 
app.post("/register", async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Missing Username and/or Password."
        });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const existingUserUsername = await users.findOne({ username });
        if (existingUserUsername) {
            return res.status(409).json({
                error: "Username already exists."
            });
        }
        const existingUserEmail = await users.findOne({ email });
        if (existingUserEmail) {
            return res.status(409).json({
                error: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await users.insertOne({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            bio: 'Hello, nice to meet you!',
            profilePicUrl: "/Client Uploads/Profile Pics/default-profile.jpg",
            profileColor: "#7aAAF7",
            friends: [],
        });

        res.status(201).json({
            message: "User registered successfully!"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
});

//2. LOGIN - add try and catch 
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Missing Username and/or Password."
        });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const user = await users.findOne({ username });
        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        //save logged-in user in sessions
        req.session.user = {
            id: user._id,
            username: user.username
        };

        return res.json({
            message: "Login successful!",
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
});


//logout
app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({
                error: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");
        res.json({ success: true });
    });
});

//3.CREATE A NEW JOURNAL  
app.post("/journals", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not Logged In"
        });
    }

    const {
        title,
        coverImage
    } = req.body;

    if (!title || !coverImage) {
        return res.status(400).json({
            error: "Missing Information"
        });
    }

    try {
        const db = getDb();
        const journals = db.collection("journals");

        const newJournal = {
            userId: new ObjectId(req.session.user.id),
            title,
            coverImage,
            createdAt: new Date()
        };

        await journals.insertOne(newJournal);
        res.status(200).json({
            message: "Journal created!"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
});


//4. DELETE A JOURNAL
app.delete("/journals/:id", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }
    const journalId = req.params.id

    try {
        const db = getDb();
        const journals = db.collection("journals");
        const entries = db.collection("entries");

        const result = await journals.deleteOne({
            _id: new ObjectId(journalId),
            userId: new ObjectId(req.session.user.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Journal not found"
            });
        }

        await entries.deleteMany({
            journalId: new ObjectId(journalId),
            authorId: new ObjectId(req.session.user.id)
        });

        res.status(204).json({
            message: "Journal deleted"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server Error"
        });
    }
});


//EDIT JOURNAL
app.post("/journals/edit", async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ error: "Not logged in" });
    }

    try {

        const db = getDb();
        const journals = db.collection("journals");

        const { journalCoverSrc, journalTitle, journalId } = req.body;

        if (!journalId) {
            return res.status(400).json({
                error: "Journal ID required"
            }
            );
        }

        const updateFields = {};

        if (journalCoverSrc) {
            updateFields.coverImage = journalCoverSrc;
        }

        if (journalTitle) {
            updateFields.title = journalTitle;
        }

        const result = await journals.findOneAndUpdate(
            {
                _id: new ObjectId(journalId),
                userId: new ObjectId(req.session.user.id)
            },
            { $set: updateFields },
            { returnDocument: "after" }
        );

        if (!result) {
            return res.status(404).json({
                error: "Journal not found"
            });
        }


        res.json({
            coverImage: result.coverImage,
            title: result.title
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


//GET ALL OF A USER'S JOURNALS
app.get("/journals", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged In"
        });
    }
    const db = getDb();
    const journals = db.collection("journals");

    try {
        const userJournals = await journals
            .find({ userId: new ObjectId(req.session.user.id) })
            .sort({ createdAt: -1 }) //newest first
            .toArray();

        return res.status(200).json({
            message: "Journals retrieved successfully",
            journals: userJournals
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error fetching journals"
        });
    }
});

//CREATE AN ENTRY
app.post("/journals/:id/entries", uploadEntryPhoto.single("entryPhoto"), async (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }

    const journalId = req.params.id;
    const { entryTitle, entryContent, isPublic, entryColor } = req.body;

    if (!entryTitle || !entryContent || !entryColor || isPublic === undefined) {
        return res.status(400).json({
            error: "Missing Information"
        });
    }

    try {
        const db = getDb();
        const journals = db.collection("journals");
        const entries = db.collection("entries");

        const journal = await journals.findOne({
            _id: new ObjectId(journalId),
            userId: new ObjectId(req.session.user.id)
        });

        if (!journal) {
            return res.status(403).json({
                error: "Journal not found or unauthorized"
            });
        }

        const newEntry = {
            journalId: new ObjectId(journalId),
            authorId: journal.userId,
            title: entryTitle,
            content: entryContent,
            isPublic,
            photo: req.file ? `/entry-pics/${req.file.filename}` : null,
            backgroundColor: entryColor,
            createdAt: new Date(),
            likes: [],
            comments: []
        };

        const result = await entries.insertOne(newEntry);

        res.status(201).json({
            message: "Entry added!",
            entry: { ...newEntry, _id: result.insertedId }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}
);



// GET ALL OF A USER'S ENTRIES FROM A JOURNAL 
app.get("/journals/:id/entries", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    const journalId = req.params.id;

    try {
        const db = getDb();
        const entries = db.collection("entries");

        const entriesList = await entries.find(
            {
                journalId: new ObjectId(journalId),
                authorId: new ObjectId(req.session.user.id)
            }
        ).sort({ createdAt: -1 }).toArray();

        return res.status(200).json({
            message: "Entries retrieved",
            entries: entriesList
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
});



//GET ALL ENTRIES FOR CURRENT USER
app.get("/me/entries", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const entries = db.collection("entries")

        const userEntries = await entries.find({
            authorId: new ObjectId(req.session.user.id)
        }).sort({ createdAt: -1 }).toArray();

        return res.status(200).json(
            {
                message: "Entries Retrieved",
                userEntries
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error"
        });
    }
});

// EDIT AN ENTRY
app.post("/entries/edit", uploadEntryPhoto.single("editEntryPhoto"), async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }

    const db = getDb();
    const entries = db.collection("entries");

    const { entryId, entryTitle, entryContent, isPublic, isFullyChanged, removePhoto, newBackgroundColor } = req.body;

    if (!entryId) {
        return res.status(400).json({
            error: "Entry ID required"
        });
    }

    try {
        const entry = await entries.findOne({
            _id: new ObjectId(entryId),
            authorId: new ObjectId(req.session.user.id)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found or unauthorized"
            });
        }

        const updateFields = {};
        if (entryTitle !== undefined) {
            updateFields.title = entryTitle;
        }
        if (entryContent !== undefined) {
            updateFields.content = entryContent;
        }
        if (isPublic !== undefined) {
            updateFields.isPublic = isPublic;
        }
        if (isFullyChanged === true) {
            updateFields.edited = true;
            updateFields.editedAt = new Date();
        }

        if (newBackgroundColor) {
            updateFields.backgroundColor = newBackgroundColor;
        }

        if (req.file) {
            if (entry.photo) {
                const oldFilename = entry.photo.replace(/^\/entry-pics\//, "");
                const oldPhotoPath = path.join(__dirname, "..", "Client", "Client Uploads", "Entry Pics", oldFilename);
                fs.unlink(oldPhotoPath, err => {
                    if (err) console.warn("Failed to delete old entry photo:", err);
                });
            }
            updateFields.photo = `/entry-pics/${req.file.filename}`;
        }
        else if (removePhoto) {
            if (entry.photo) {
                const oldFilename = entry.photo.replace(/^\/entry-pics\//, "");
                const oldPhotoPath = path.join(__dirname, "..", "Client", "Client Uploads", "Entry Pics", oldFilename);
                fs.unlink(oldPhotoPath, err => {
                    if (err) {
                        console.warn("Failed to delete entry photo:", err);
                    }
                });
            }
            updateFields.photo = null;
        }

        await entries.updateOne(
            { _id: new ObjectId(entryId) },
            { $set: updateFields }
        );

        const updatedEntry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        return res.status(200).json({
            entry: updatedEntry
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



//DELETE AN ENTRY
app.delete("/entries/:id", async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ error: "Not logged in" });
    }
    try {

        const entryId = req.params.id;
        const db = getDb();
        const entries = db.collection("entries");

        const entry = await entries.findOne({
            _id: new ObjectId(entryId),
            authorId: new ObjectId(req.session.user.id)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found or unauthorized"
            });
        }

        if (entry.photo) {
            const filename = path.basename(entry.photo);
            const photoPath = path.join(__dirname, "..", "Client", "Client Uploads", "Entry Pics", filename);

            fs.unlink(photoPath, err => {
                if (err) console.warn("Failed to delete entry photo:", err);
            });
        }


        const result = await entries.deleteOne(
            { _id: new ObjectId(entryId) },
        );

        if (result.deletedCount === 0) {
            return res.status(500).json({
                error: "Failed to delete entry"
            });
        }

        return res.status(200).json({
            message: "Entry deleted successfully!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


// GET ALL PUBLIC ENTRIES FOR THE FEED
app.get("/feed", async (req, res) => {
    try {
        const db = getDb();
        const entries = db.collection("entries");
        const usersCollection = db.collection("users");

        const publicEntries = await entries
            .find({ isPublic: "public" })
            .sort({ createdAt: -1 })
            .toArray();

        if (publicEntries.length === 0) {
            return res.status(200).json({
                message: "No public entries yet",
                entries: []
            });
        }

        const userIds = [...new Set(publicEntries.map(e => e.authorId.toString()))].map(id => new ObjectId(id));
        const users = await usersCollection.find({
            _id: { $in: userIds }
        }).toArray();

        const userMap = {};
        users.forEach(user => {
            userMap[user._id.toString()] = user;
        });

        const feedEntries = publicEntries.map(entry => {
            const user = userMap[entry.authorId.toString()];
            return {
                id: entry._id,
                title: entry.title,
                content: entry.content,
                photo: entry.photo,
                createdAt: entry.createdAt,
                edited: entry.edited || false,
                likes: entry.likes || [],
                comments: entry.comments || [],
                backgroundColor: entry.backgroundColor,
                author: {
                    id: entry.authorId,
                    username: user?.username || "Anonymous",
                    profilePicUrl: user?.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg"
                }
            };
        });

        return res.status(200).json({
            message: "Public entries retrieved",
            entries: feedEntries
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

// EDIT PROFILE
app.post("/profile/edit", profilePicUpload.single("profilePic"), async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({
                error: "Not logged in"
            });
        }

        const db = getDb();
        const users = db.collection("users");

        const user = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const { username, bio, profileColorInput, newPassword, newEmail } = req.body;
        const profilePicFile = req.file;

        if (username && username != user.username) {
            const existingUserUsername = await users.findOne({ username });

            if (existingUserUsername) {
                return res.status(409).json({
                    error: "Username already exists."
                });
            }
        }

        const updateFields = {};

        if (username) {
            updateFields.username = username;
            req.session.user.username = username;
        }
        if (bio) {
            updateFields.bio = bio;
        }
        if (profileColorInput) {
            updateFields.profileColor = profileColorInput;
        }
        if (newPassword){
            updateFields.password = await bcrypt.hash(newPassword, 10);
        }
        if (newEmail){
            updateFields.email = newEmail; 
        }

        if (profilePicFile) {
            if (user.profilePicUrl && !user.profilePicUrl.includes("default-profile.jpg")) {
                const oldPicPath = path.join(__dirname, "..", "Client", user.profilePicUrl);
                fs.unlink(oldPicPath, (err) => {
                    if (err) {
                        console.error("Failed to delete old profile pic:", err);
                    }
                });
            }

            updateFields.profilePicUrl = `/Client Uploads/Profile Pics/${profilePicFile.filename}`;
        }

        const result = await users.findOneAndUpdate(
            { _id: new ObjectId(req.session.user.id) },
            { $set: updateFields },
            { returnDocument: "after" }
        );

        return res.status(200).json({
            username: result.username,
            bio: result.bio || "Hello, nice to meet you!",
            profilePicUrl: result.profilePicUrl || "",
            profileColor: result.profileColor || "#7aAAF7",
            email: result.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error"
        });
    }
});


// Get user profile
app.get("/profile", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const user = await users.findOne(
            { _id: new ObjectId(req.session.user.id) },
            { projection: { username: 1, bio: 1, profilePicUrl: 1, profileColor : 1, email : 1} }
        );

        res.json({
            username: user.username,
            bio: user.bio || "Hello, nice to meet you!",
            profilePicUrl: user.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg",
            profileColor: user.profileColor,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error"
        });
    }
});


//SEARCH FOR USERS BY USERNAME
app.get('/users/:username', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }

    const db = getDb();
    const users = db.collection("users");
    const { username } = req.params;

    try {
        const matchingUsers = await users
            .find({ username: { $regex: username, $options: "i" } })
            .project({ username: 1, bio: 1, profilePicUrl: 1, _id: 1, friends: 1 })
            .toArray();

        if (!matchingUsers || matchingUsers.length === 0) {
            return res.status(404).json({
                error: "No users found"
            });
        }

        const results = matchingUsers.map(user => ({
            username: user.username,
            bio: user.bio || "Hello, nice to meet you!",
            id: user._id,
            profilePicUrl: user.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg",
            friends: user.friends || []
        }));

        return res.status(200).json({
            results
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//ADD USER AS FRIEND
app.post('/users/:id/friend', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const { id } = req.params;
        const currentUser = req.session.user;

        const friendUser = await users.findOne({ _id: new ObjectId(id) });
        if (!friendUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const safeFriend = {
            id: friendUser._id,
            username: friendUser.username,
            profilePicUrl: friendUser.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg",
            bio: friendUser.bio || "Hello, nice to meet you!"
        };

        await users.updateOne(
            { _id: new ObjectId(currentUser.id) },
            { $addToSet: { friends: safeFriend } } //$addToSet = no duplicates
        );

        const currentUserInfo = await users.findOne({ _id: new ObjectId(currentUser.id) });

        await users.updateOne(
            { _id: new ObjectId(friendUser._id) },
            {
                $push: {
                    friendRequests: {
                        id: currentUserInfo._id,
                        username: currentUserInfo.username,
                        profilePicUrl: currentUserInfo.profilePicUrl,
                        bio: currentUserInfo.bio
                    }
                }
            }
        );


        return res.status(200).json({
            success: true,
            friend: safeFriend
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


// GET FRIEND REQUESTS FOR LOGGED-IN USER
app.get('/me/friend-requests', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: "Not logged in" });

    try {
        const db = getDb();
        const users = db.collection("users");

        const currentUser = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        if (!currentUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const requests = currentUser.friendRequests || [];

        const friendIds = new Set((currentUser.friends || []).map(f => f.id.toString()));
        const filteredRequests = requests.filter(r => !friendIds.has(r.id.toString()));

        return res.status(200).json({
            success: true,
            friendRequests: filteredRequests
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



//SEND FRIEND REQUEST
app.post('/users/:id/request', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {

        const db = getDb();
        const users = db.collection("users");

        const { id: recipientId } = req.params;

        const sender = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        const recipient = await users.findOne({
            _id: new ObjectId(recipientId)
        });

        if (!recipient) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        sender.friends = sender.friends || [];
        sender.friendRequests = sender.friendRequests || [];
        recipient.friends = recipient.friends || [];
        recipient.friendRequests = recipient.friendRequests || [];

        if (recipient.friends.some(f => f.id.equals(sender._id))) {
            return res.status(400).json({ error: "Already friends" });
        }

        const mutualRequestIndex = sender.friendRequests.findIndex(f => f.id.equals(recipient._id));

        if (mutualRequestIndex !== -1) {
            await users.updateOne(
                { _id: sender._id },
                {
                    $pull: { friendRequests: { id: recipient._id } },
                    $push: { friends: { id: recipient._id, username: recipient.username, profilePicUrl: recipient.profilePicUrl, bio: recipient.bio } }
                }
            );

            await users.updateOne(
                { _id: recipient._id },
                {
                    $pull: { friendRequests: { id: sender._id } },
                    $push: { friends: { id: sender._id, username: sender.username, profilePicUrl: sender.profilePicUrl, bio: sender.bio } }
                }
            );
            return res.status(200).json({
                success: true, message: "You are now friends!"
            });
        }

        if (recipient.friendRequests.some(f => f.id.equals(sender._id))) {
            return res.status(400).json({
                error: "Friend request already sent"
            });
        }

        await users.updateOne(
            { _id: recipient._id },
            {
                $push: {
                    friendRequests: { id: sender._id, username: sender.username, profilePicUrl: sender.profilePicUrl, bio: sender.bio }
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Friend request sent"
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


//UNFOLLOW USER
app.delete('/users/:id/request', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {

        const db = getDb();
        const users = db.collection("users");

        const recipientId = req.params.id;

        const sender = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        const recipient = await users.findOne({
            _id: new ObjectId(recipientId)
        });

        if (!recipient) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        sender.friendRequests = sender.friendRequests || [];
        recipient.friendRequests = recipient.friendRequests || [];
        sender.friends = sender.friends || [];
        recipient.friends = recipient.friends || [];

        if (recipient.friends.some(f => f.id.equals(sender._id))) {
            return res.status(400).json({ error: "You are already friends" });
        }

        await users.updateOne(
            { _id: recipient._id },
            { $pull: { friendRequests: { id: sender._id } } }
        );

        await users.updateOne(
            { _id: sender._id },
            { $pull: { friends: { id: recipient._id } } }
        );

        return res.status(200).json({
            success: true,
            message: "Unfollowed user"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});





//ACCEPT FRIEND REQUEST
app.post('/me/friend-requests/:id/accept', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {

        const db = getDb();
        const users = db.collection("users");

        const currentUser = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        const requestId = new ObjectId(req.params.id);

        const request = currentUser.friendRequests?.find(f => f.id.equals(requestId));

        if (!request) {
            return res.status(404).json({
                error: "Friend request not found"
            });
        }

        await users.updateOne(
            { _id: currentUser._id },
            {
                $pull: { friendRequests: { id: requestId } },
                $push: { friends: { id: requestId, username: request.username, profilePicUrl: request.profilePicUrl, bio: request.bio } }
            }
        );

        await users.updateOne(
            { _id: requestId },
            { $push: { friends: { id: currentUser._id, username: currentUser.username, profilePicUrl: currentUser.profilePicUrl, bio: currentUser.bio } } }
        );

        return res.status(200).json({
            success: true,
            message: "Friend request accepted"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});




//REJECT FRIEND REQUEST
app.post('/me/friend-requests/:id/reject', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {

        const db = getDb();
        const users = db.collection("users");

        const currentUser = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        const requestId = new ObjectId(req.params.id);

        await users.updateOne(
            { _id: currentUser._id },
            { $pull: { friendRequests: { id: requestId } } }
        );

        return res.status(200).json({
            success: true,
            message: "Friend request rejected"
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});




//REMOVE USER AS FRIEND 
app.delete('/users/:id/friend', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const { id } = req.params;
        const currentUser = req.session.user;

        const friendUser = await users.findOne({ _id: new ObjectId(id) });

        if (!friendUser) {
            return res.status(404).json({ error: "User not found" });
        }

        await users.updateOne(
            { _id: new ObjectId(currentUser.id) },
            { $pull: { friends: { id: friendUser._id } } }
        );

        await users.updateOne(
            { _id: friendUser._id },
            { $pull: { friends: { id: new ObjectId(currentUser.id) } } }
        );

        return res.status(204).json({
            success: true,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//GET ALL FRIENDS 
app.get('/me/friends', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const currentUser = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        const usersFollowing = currentUser.friends;
        const followingIds = usersFollowing.map(f => f.id);

        const mutualFriends = await users.find({
            _id: { $in: followingIds },
            "friends.id": currentUser._id
        })
            .project({
                username: 1,
                bio: 1,
                profilePicUrl: 1
            })
            .toArray();

        const safeMutualFriends = mutualFriends.map(u => ({
            id: u._id,
            username: u.username,
            bio: u.bio || "Hello, nice to meet you!",
            profilePicUrl: u.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg"
        }));


        return res.status(200).json({
            success: true,
            safeMutualFriends
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


// GET "FOLLOWING"
app.get('/me/following', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const currentUserId = new ObjectId(req.session.user.id);

        const following = await users.find({
            "friendRequests.id": currentUserId
        })
            .project({
                username: 1,
                bio: 1,
                profilePicUrl: 1
            })
            .toArray();

        const safeFollowing = following.map(u => ({
            id: u._id,
            username: u.username,
            bio: u.bio || "",
            profilePicUrl: u.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg"
        }));

        return res.status(200).json({
            success: true,
            safeFollowing
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



//GET "FOLLOWERS"
app.get('/me/followers', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const users = db.collection("users");

        const currentUser = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        const followers = await users.find({
            "friendRequest.id": currentUser._id,
            _id: { $ne: currentUser._id } // exclude self
        }).project({ username: 1, bio: 1, profilePicUrl: 1 }).toArray();

        // exclude mutual friends 
        const mutualIds = (currentUser.friends || []).map(f => f.id.toString());
        const nonMutualFollowers = followers.filter(f => !mutualIds.includes(f._id.toString()));

        const safeFollowers = nonMutualFollowers.map(u => ({
            id: u._id,
            username: u.username,
            bio: u.bio || "Hello, nice to meet you!",
            profilePicUrl: u.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg"
        }));

        return res.status(200).json({
            success: true,
            safeFollowers
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});





// LIKE/UNLIKE AN ENTRY
app.post('/entries/:id/likes', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const entries = db.collection("entries");
        const entryId = req.params.id;
        const userId = req.session.user.id;

        const entry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found"
            });
        }

        let update;
        let message;

        if (entry.likes.includes(userId)) {
            //unlike
            update = { $pull: { likes: userId } };
            message = "Removed";

        } else {
            //like
            update = { $addToSet: { likes: userId } };
            message = "Added";
        }

        const result = await entries.updateOne(
            { _id: new ObjectId(entryId) },
            update);

        if (result.modifiedCount === 0) {
            return res.status(500).json({
                error: "Failed to update likes"
            });
        }

        const updatedEntry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        return res.status(200).json({
            message,
            likes: updatedEntry.likes
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});



// ADD COMMENT
app.post('/entries/:id/comments', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const entries = db.collection("entries");
        const users = db.collection("users");
        const entryId = req.params.id;
        const { commentContent } = req.body;

        if (!commentContent) {
            return res.status(400).json({
                error: "Comment content required"
            });
        }

        const entry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found"
            });
        }

        const currentUser = await users.findOne({
            _id: new ObjectId(req.session.user.id)
        });

        if (!currentUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const newComment = {
            _id: new ObjectId(),
            text: commentContent,
            authorId: currentUser._id,
            authorUsername: currentUser.username,
            profilePicUrl: currentUser.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg",
            createdAt: new Date(),
            replies: [],
            likes: []
        };

        const result = await entries.updateOne(
            { _id: new ObjectId(entryId) },
            { $push: { comments: newComment } }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).json({
                error: "Failed to add comment"
            });
        }

        const updatedEntry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        return res.status(200).json({
            message: "Comment added successfully",
            comments: updatedEntry.comments
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Server error"
        });
    }

});



// DELETE COMMENT
app.delete('/entries/:entryId/comments/:commentId', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    const { entryId, commentId } = req.params;
    const userId = new ObjectId(req.session.user.id);

    try {
        const db = getDb();
        const entries = db.collection("entries");

        const entry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found"
            });
        }

        const comment = entry.comments.find(c => c._id.equals(new ObjectId(commentId)));

        if (!comment) {
            return res.status(404).json({
                error: "Comment not found"
            });
        }

        if (!comment.authorId.equals(userId) && !entry.authorId.equals(userId)) {
            return res.status(403).json({
                error: "Not authorized"
            });
        }

        await entries.updateOne(
            { _id: new ObjectId(entryId) },
            { $pull: { comments: { _id: new ObjectId(commentId) } } }
        );

        const updatedEntry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        return res.status(200).json({
            message: "Comment deleted successfully",
            comments: updatedEntry.comments
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Server error"
        });
    }
});




// EDIT COMMENT
app.post('/entries/:entryId/comments/:commentId', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    const { entryId, commentId } = req.params;
    const { text } = req.body;
    const userId = new ObjectId(req.session.user.id);

    if (!text) {
        return res.status(400).json({
            error: "Comment text required"
        });
    }

    try {
        const db = getDb();
        const entries = db.collection("entries");

        const entry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found"
            });
        }

        const comment = entry.comments.find(c => c._id.equals(new ObjectId(commentId)));

        if (!comment) {
            return res.status(404).json({
                error: "Comment not found"
            });
        }


        if (!comment.authorId.equals(userId)) {
            return res.status(403).json({
                error: "Not authorized"
            });
        }

        await entries.updateOne(
            { _id: new ObjectId(entryId) },
            {
                $set: {
                    "comments.$[c].text": text,
                    "comments.$[c].edited": true,
                    "comments.$[c].editedAt": new Date()
                }
            },
            { arrayFilters: [{ "c._id": new ObjectId(commentId) }] }
        );

        const updatedEntry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        const updatedComment = updatedEntry.comments.find(c => c._id.equals(new ObjectId(commentId)));

        return res.status(200).json({
            message: "Comment edited successfully",
            comment: updatedComment
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
});



// LIKE A COMMENT
app.post('/entries/:entryId/comments/:commentId/likes', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    try {
        const db = getDb();
        const entries = db.collection("entries");
        const { entryId, commentId } = req.params;
        const userId = req.session.user.id;

        const entry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        if (!entry) {
            return res.status(404).json({
                error: "Entry not found"
            });
        }

        const comment = entry.comments.find(c => c._id.equals(new ObjectId(commentId)));

        if (!comment) {
            return res.status(404).json({
                error: "Comment not found"
            });
        }

        let update;
        let operationText;

        if (comment.likes && comment.likes.includes(userId)) {
            // Unlike
            update = { $pull: { "comments.$[c].likes": userId } };
            operationText = "Removed";
        } else {
            // Like
            update = { $addToSet: { "comments.$[c].likes": userId } };
            operationText = "Added";
        }

        const result = await entries.updateOne(
            { _id: new ObjectId(entryId) },
            update,
            { arrayFilters: [{ "c._id": new ObjectId(commentId) }] }
        );

        if (result.modifiedCount === 0) {
            return res.status(500).json({
                error: "Failed to update likes"
            });
        }

        const updatedEntry = await entries.findOne({
            _id: new ObjectId(entryId)
        });

        const updatedComment = updatedEntry.comments.find(c => c._id.equals(new ObjectId(commentId)));

        return res.status(200).json({
            message: "Success",
            operation: operationText,
            likes: updatedComment.likes
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
});

let feedbackArray = [];

app.post('/feedback', async (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }
    try {
        const { feedbackCategory, feedbackContent } = req.body;

        if (!feedbackCategory || !feedbackContent) {
            return res.status(400).json({
                error: "Missing Information"
            });
        }

        feedbackArray.push({
            userId: req.session.user.id,
            category: feedbackCategory,
            content: feedbackContent,
            date: new Date()
        });

        console.log("All Feedback: ", feedbackArray);

        return res.status(200).json({
            message: "Feedback Sent!",
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }

});

//bottom
/*
cd "/Users/wificampbell/Desktop/Coding Projects/Journaling App/Server"
node server.js

*/