exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const agentParam = event.queryStringParameters?.agent;
    if (!agentParam) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing agent parameter' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        agent: { name: agentParam, team: 'Test Team' },
        message: 'Basic test working'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
