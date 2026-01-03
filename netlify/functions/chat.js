// Netlify Serverless Function for Perplexity AI
// API key is stored securely in Netlify environment variables

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  console.log('=== CHAT FUNCTION CALLED ===');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Path:', event.path);

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS preflight');
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    console.log('Rejected: not POST');
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get API key from environment variable
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  console.log('=== API KEY CHECK ===');
  console.log('API Key exists:', !!apiKey);
  console.log('API Key length:', apiKey ? apiKey.length : 0);
  console.log('API Key starts with pplx-:', apiKey ? apiKey.startsWith('pplx-') : false);
  console.log('API Key first 10 chars:', apiKey ? apiKey.substring(0, 10) + '...' : 'N/A');
  
  if (!apiKey) {
    console.log('ERROR: No API key found!');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'API key not configured on server',
        debug: 'PERPLEXITY_API_KEY environment variable is missing. Add it in Netlify Site Settings → Environment Variables'
      })
    };
  }

  // Parse request body
  let body;
  try {
    body = JSON.parse(event.body);
    console.log('=== REQUEST BODY ===');
    console.log('Model:', body.model);
    console.log('Messages count:', body.messages?.length);
    console.log('Max tokens:', body.max_tokens);
  } catch (parseError) {
    console.log('ERROR parsing body:', parseError.message);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON in request body', debug: parseError.message })
    };
  }

  const { messages, model = 'sonar', max_tokens = 500, temperature = 0.2 } = body;

  if (!messages || !Array.isArray(messages)) {
    console.log('ERROR: messages array missing');
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Messages array is required' })
    };
  }

  try {
    console.log('=== CALLING PERPLEXITY API ===');
    console.log('URL: https://api.perplexity.ai/chat/completions');
    console.log('Model:', model);
    
    const requestBody = {
      model,
      messages,
      max_tokens,
      temperature
    };
    
    console.log('Request body:', JSON.stringify(requestBody).substring(0, 500));

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('=== PERPLEXITY RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const responseText = await response.text();
    console.log('Response body (first 500 chars):', responseText.substring(0, 500));
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.log('ERROR: Failed to parse Perplexity response as JSON');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid response from Perplexity API',
          debug: responseText.substring(0, 200)
        })
      };
    }

    if (!response.ok) {
      console.log('ERROR: Perplexity returned error');
      console.log('Error details:', JSON.stringify(data));
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: data.error?.message || 'API error', 
          details: data,
          debug: `Perplexity returned status ${response.status}`
        })
      };
    }

    console.log('=== SUCCESS ===');
    console.log('Response has choices:', !!data.choices);
    console.log('First choice content length:', data.choices?.[0]?.message?.content?.length || 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.log('=== EXCEPTION ===');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Server error: ' + error.message,
        debug: error.stack
      })
    };
  }
};
