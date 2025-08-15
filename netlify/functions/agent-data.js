exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const agentId = event.queryStringParameters?.agent || 'test';
    
    // Test Google Sheets CSV henting
    const SHEET_ID = '1Ivolxn5wJsUUzVEAb9Ww25tfF5ip1-2mhzSHJRePNz0';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    
    console.log('Fetching CSV from:', csvUrl);
    
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    console.log('CSV received, length:', csvText.length);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        agent: agentId,
        csvLength: csvText.length,
        csvPreview: csvText.substring(0, 200),
        message: 'Google Sheets CSV test'
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};
