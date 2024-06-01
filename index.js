const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const items = {};

//get route
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    if (items[id]) {
        res.json({ id, item: items[id] });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// post route
app.post('/items', (req, res) => {
    const { id, item } = req.body;
    if (items[id]) {
        return res.status(400).json({ error: 'Item already exists' });
    }
    items[id] = item;
    res.status(201).json({ id, item });
});

// DELETE route
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    if (items[id]) {
        delete items[id];
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
