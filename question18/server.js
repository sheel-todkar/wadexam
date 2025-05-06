const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up static and views folders
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB Connected');
}).catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
});

// Define the Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('Song', songSchema);

// Insert initial data (only once - then comment it out)
async function insertInitialSongs() {
    const songs = [
        { Songname: 'Tum Hi Ho', Film: 'Aashiqui 2', Music_director: 'Mithoon', singer: 'Arijit Singh', actor: 'Aditya Roy Kapur', actress: 'Shraddha Kapoor' },
        { Songname: 'Kal Ho Naa Ho', Film: 'Kal Ho Naa Ho', Music_director: 'Shankar-Ehsaan-Loy', singer: 'Sonu Nigam', actor: 'Shah Rukh Khan', actress: 'Preity Zinta' },
        { Songname: 'Chaiyya Chaiyya', Film: 'Dil Se', Music_director: 'A. R. Rahman', singer: 'Sukhwinder Singh', actor: 'Shah Rukh Khan', actress: 'Manisha Koirala' },
        { Songname: 'Tera Yaar Hoon Main', Film: 'Sonu Ke Titu Ki Sweety', Music_director: 'Rochak Kohli', singer: 'Arijit Singh', actor: 'Kartik Aaryan', actress: 'Nushrratt Bharuccha' },
        { Songname: 'Bekhayali', Film: 'Kabir Singh', Music_director: 'Sachet-Parampara', singer: 'Sachet Tandon', actor: 'Shahid Kapoor', actress: 'Kiara Advani' }
    ];

    await Song.deleteMany({}); // Clear existing data
    await Song.insertMany(songs);
    console.log('✅ Re-inserted clean song data');
}
// Run once
// insertInitialSongs();

// Home route - Display all songs
app.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.render('index', { songs });
    } catch (err) {
        res.status(500).send('Error loading songs');
    }
});

// Get count
app.get('/count', async (req, res) => {
    const count = await Song.countDocuments();
    res.send(`Total Songs: ${count}`);
});

// Filter by music director
app.get('/director/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.render('index', { songs });
});

// Filter by music director and singer
app.get('/director/:md/singer/:s', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.md, singer: req.params.s });
    res.render('index', { songs });
});

// Delete song by name
app.get('/delete/:name', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.name });
    res.redirect('/');
});

// Add new favorite song (via form)
app.post('/add', async (req, res) => {
    await Song.create(req.body);
    res.redirect('/');
});

// Update actor & actress for a song
app.post('/update/:name', async (req, res) => {
    await Song.updateOne(
        { Songname: req.params.name },
        { $set: { actor: req.body.actor, actress: req.body.actress } }
    );
    res.redirect('/');
});

// Filter by singer and film
app.get('/singer/:singer/film/:film', async (req, res) => {
    const songs = await Song.find({ singer: req.params.singer, Film: req.params.film });
    res.render('index', { songs });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
