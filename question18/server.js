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


// Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('Song', songSchema);

// Initialize sample song data in MongoDB
async function initializeDatabase() {
    const sampleSongs = [
        {
            Songname: 'Tum Hi Ho',
            Film: 'Aashiqui 2',
            Music_director: 'Mithoon',
            singer: 'Arijit Singh',
            actor: 'Aditya Roy Kapur',
            actress: 'Shraddha Kapoor'
        },
        {
            Songname: 'Kal Ho Naa Ho',
            Film: 'Kal Ho Naa Ho',
            Music_director: 'Shankar-Ehsaan-Loy',
            singer: 'Sonu Nigam',
            actor: 'Shah Rukh Khan',
            actress: 'Preity Zinta'
        },
        {
            Songname: 'Chaiyya Chaiyya',
            Film: 'Dil Se',
            Music_director: 'A. R. Rahman',
            singer: 'Sukhwinder Singh',
            actor: 'Shah Rukh Khan',
            actress: 'Manisha Koirala'
        },
        {
            Songname: 'Tera Yaar Hoon Main',
            Film: 'Sonu Ke Titu Ki Sweety',
            Music_director: 'Rochak Kohli',
            singer: 'Arijit Singh',
            actor: 'Kartik Aaryan',
            actress: 'Nushrratt Bharuccha'
        },
        {
            Songname: 'Bekhayali',
            Film: 'Kabir Singh',
            Music_director: 'Sachet-Parampara',
            singer: 'Sachet Tandon',
            actor: 'Shahid Kapoor',
            actress: 'Kiara Advani'
        }
    ];

    try {
        await Song.deleteMany({}); // optional: clear existing records
        await Song.insertMany(sampleSongs);
        console.log('✅ Sample songs inserted into MongoDB');
    } catch (err) {
        console.error('❌ Error initializing database:', err);
    }
}


// Home route
app.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.render('index', { songs });
    } catch (err) {
        res.status(500).send('❌ Error loading songs');
    }
});
app.post('/',async (req,res)=>
{
    try{
        const song = new Song(req.body);
        await song.save();
        res.redirect('/');
    }
    catch(err)
    {
        res.status(500).send('❌ Error saving song');
    }
});

// Count route
app.get('/count', async (req, res) => {
    try {
        const count = await Song.countDocuments();
        res.send(`Total Songs: ${count}`);
    } catch (err) {
        res.status(500).send('❌ Could not count songs');
    }
});

// Filter by music director
app.get('/director/:name', async (req, res) => {
    try {
        const songs = await Song.find({ Music_director: new RegExp(req.params.name, 'i') });
        res.render('index', { songs });
    } catch (err) {
        res.status(500).send('❌ Error fetching songs by director');
    }
});

// Filter by music director and singer
app.get('/director/:md/singer/:s', async (req, res) => {
    try {
        const songs = await Song.find({
            Music_director: new RegExp(req.params.md, 'i'),
            singer: new RegExp(req.params.s, 'i')
        });
        res.render('index', { songs });
    } catch (err) {
        res.status(500).send('❌ Error filtering songs');
    }
});

// Delete song by name
app.delete('/delete/:name', async (req, res) => {
    try {
        await Song.deleteOne({ Songname: req.params.name });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('❌ Could not delete song');
    }
});

// Add new song
app.post('/add', async (req, res) => {
    try {
        const { Songname, Film, Music_director, singer } = req.body;
        if (!Songname || !Film || !Music_director || !singer) {
            return res.status(400).send('❌ Missing required fields');
        }
        await Song.create(req.body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('❌ Could not add song');
    }
});

// Update actor & actress
app.put('/update/:name', async (req, res) => {
    try {
        const { actor, actress } = req.body;
        await Song.updateOne(
            { Songname: req.params.name },
            { $set: { actor, actress } }
        );
        res.redirect('/');
    } catch (err) {
        res.status(500).send('❌ Could not update song');
    }
});

// Filter by singer and film
app.get('/singer/:singer/film/:film', async (req, res) => {
    try {
        const songs = await Song.find({
            singer: new RegExp(req.params.singer, 'i'),
            Film: new RegExp(req.params.film, 'i')
        });
        res.render('index', { songs });
    } catch (err) {
        res.status(500).send('❌ Error fetching songs');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
