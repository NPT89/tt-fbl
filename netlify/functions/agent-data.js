// netlify/functions/agent-data.js
// Dette kjører på Netlify og fungerer som proxy

exports.handler = async (event, context) => {
  // CORS headers for å tillate alle domener
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };

  // Håndter OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Hent agent ID fra query parameter
    const agentId = event.queryStringParameters?.agent || 'simen.froyhaug';
    
    console.log('🔄 Proxy request for agent:', agentId);

    // Din Google Apps Script URL
 // Nytt public Google Sheet
const PUBLIC_SHEET_ID = 'DITT_NYE_SHEET_ID_HER';
const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${1Ivolxn5wJsUUzVEAb9Ww25tfF5ip1-2mhzSHJRePNz0}/values/AgentData`;

const response = await fetch(sheetsUrl);
      method: 'GET',
      headers: {
        'User-Agent': 'Netlify-Proxy/1.0'
      },
      // Følg redirects automatisk
      redirect: 'follow'
    });

    console.log('📡 Google response status:', response.status);
    console.log('📡 Google response headers:', Object.fromEntries(response.headers));

    const responseText = await response.text();
    console.log('📄 Raw response:', responseText.substring(0, 200));

    // Sjekk om vi fikk JSON
    if (responseText.startsWith('{') && responseText.includes('"success"')) {
      const jsonData = JSON.parse(responseText);
      console.log('✅ Valid JSON received');
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(jsonData)
      };
    }

    // Hvis vi ikke fikk JSON, returner fallback data
    console.log('⚠️ No valid JSON, returning fallback data');
    
    const fallbackData = {
      success: true,
      agent: {
        name: agentId.includes('simen') ? 'Simen F.' : 'Agent',
        team: 'Proxy Team'
      },
      currentMonth: {
        casesResolved: 999,
        avgResponseTime: '1min',
        satisfaction: 5.0,
        firstResolve: 100,
        workingDays: 5,
        totalChats: 500,
        totalCalls: 300,
        totalEmails: 200
      },
      previousMonth: {
        casesResolved: 800,
        avgResponseTime: '2min',
        satisfaction: 4.8,
        firstResolve: 95
      },
      team: {
        avgCases: 850,
        avgCsat: 4.9,
        ranking: 1,
        totalTeams: 5
      },
      historical: {
        months: ['Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug'],
        casesResolved: [600, 650, 700, 750, 800, 850, 999],
        responseTime: [2.5, 2.3, 2.1, 1.9, 1.7, 1.5, 1.0]
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'Netlify Proxy Fallback'
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(fallbackData)
    };

  } catch (error) {
    console.error('❌ Proxy error:', error);
    
    // Error fallback
    const errorData = {
      success: false,
      error: error.message,
      agent: { name: 'Error', team: 'Error Team' },
      currentMonth: { casesResolved: 0, avgResponseTime: '0min', satisfaction: 0, firstResolve: 0 },
      lastUpdated: new Date().toISOString()
    };

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(errorData)
    };
  }
};
