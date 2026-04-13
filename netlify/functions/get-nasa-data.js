// Usa HTTPS nativo di Node.js per evitare dipendenze esterne
const https = require('https');

exports.handler = async (event) => {
    const apiKey = process.env.NASA_API_KEY;
    const type = event.queryStringParameters.type || 'neows';
    const oggi = new Date().toISOString().split('T')[0];

    // URL semplificato al massimo (usiamo solo NeoWS per il test)
    const url = `https://nasa.gov{oggi}&end_date=${oggi}&api_key=${apiKey}`;

    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: data
                });
            });
        }).on('error', (err) => {
            resolve({
                statusCode: 500,
                body: JSON.stringify({ 
                    error: "Connessione fallita", 
                    messaggio: err.message,
                    url_tentato: url.replace(apiKey, "HIDDEN") // Per vedere se l'URL è corretto
                })
            });
        });
    });
};
