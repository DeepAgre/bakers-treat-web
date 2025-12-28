export default async function handler(req, res) {
  const { email, birthday } = req.body;
  
  // This stays on the server where users can't see it!
  const apiKey = process.env.BREVO_API_KEY; 

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      attributes: { BIRTHDAY: birthday },
      listIds: [5],
      updateEnabled: true
    }),
  });

  if (response.ok) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}