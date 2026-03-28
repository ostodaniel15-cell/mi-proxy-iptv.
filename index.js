const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send("Falta la URL");

    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'http://dplatino.net/'
            }
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        response.data.pipe(res);
    } catch (e) {
        res.status(500).send("Error conectando a DPLATINO");
    }
});

app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));
