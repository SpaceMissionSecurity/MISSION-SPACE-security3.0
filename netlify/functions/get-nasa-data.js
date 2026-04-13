const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.NASA_API_KEY;
  // Leggiamo il tipo di richiesta dai parametri dell'URL (es: ?type=weather)
  const type = event.queryStringParameters.type || 'neows';
  const oggi = new Date().toISOString().split('T')[0];

  let url;
  if (type === 'weather') {
    // API DONKI per particelle solari (Meteo Spaziale)
    url = `https://nasa.gov{oggi}&api_key=${apiKey}`;
  } else {
    // API NeoWS (Asteroidi)
    url = `https://nasa.gov{oggi}&api_key=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Errore API" }) };
  }
};
