// netlify/functions/get-nasa-data.js
exports.handler = async (event) => {
  const apiKey = process.env.NASA_API_KEY;
  const type = event.queryStringParameters.type || 'neows';
  const oggi = new Date().toISOString().split('T')[0];

  let url;
  if (type === 'weather') {
    // Chiediamo gli ultimi 30 giorni per il meteo per non avere array vuoti
    url = `https://nasa.gov{apiKey}`;
  } else {
    url = `https://nasa.gov{oggi}&api_key=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
