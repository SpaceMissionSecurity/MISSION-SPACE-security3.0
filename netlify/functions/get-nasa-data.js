// Rimuovi la riga del require('node-fetch')
exports.handler = async (event, context) => {
  const apiKey = process.env.NASA_API_KEY;
  const type = event.queryStringParameters.type || 'neows';
  const oggi = new Date().toISOString().split('T')[0];

  let url;
  if (type === 'weather') {
    url = `https://nasa.gov{oggi}&api_key=${apiKey}`;
  } else {
    url = `https://nasa.gov{oggi}&api_key=${apiKey}`;
  }

  try {
    const response = await fetch(url); // fetch è integrato in Netlify Functions
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Errore" }) };
  }
};
