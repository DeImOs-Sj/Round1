const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    aadhar: { type: String, unique: true, required: true, trim: true },
    dob: { type: String, required: true },
});

const FormData = mongoose.model('FormData', formSchema);

app.post('/api/form', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.json({ success: true, message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/form', async (req, res) => {
    try {
        const formData = await FormData.find();
        res.json(formData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/form/:id', async (req, res) => {
    try {
        const formData = await FormData.findById(req.params.id);
        res.json(formData);
    } catch (error) {
        res.status(404).json({ message: 'Form data not found' });
    }
});

app.put('/api/form/:id', async (req, res) => {
    try {
        const formData = await FormData.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, message: 'Form data updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


app.delete('/api/form/:id', async (req, res) => {
    try {
        await FormData.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Form data deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
