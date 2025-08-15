exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const agentId = event.queryStringParameters?.agent || 'test';
    
    // Prøv Google Sheets API (offentlig - ingen API key nødvendig for public sheets)
    const SHEET_ID = '1Ivolxn5wJsUUzVEAb9Ww25tfF5ip1-2mhzSHJRePNz0';
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/AgentData`;
    
    console.log('Fetching from API:', apiUrl);
    
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    
    console.log('API response:', jsonData);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        agent: agentId,
        apiResponse: jsonData,
        message: 'Google Sheets API test'
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
