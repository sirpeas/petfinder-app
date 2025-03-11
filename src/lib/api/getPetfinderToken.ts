let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export const getAccessToken = async (): Promise<string> => {
  try {
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return cachedToken;
    }

    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.PETFINDER_CLIENT_ID!,
        client_secret: process.env.PETFINDER_CLIENT_SECRET!,
      }),
    });

    if (!response.ok) {
      const errorText = await response.json();
      console.error('Failed to fetch access token:', errorText);
      throw new Error(`Petfinder API error: ${errorText}`);
    }

    const { access_token, expires_in } = await response.json();

    cachedToken = access_token;
    tokenExpiry = Date.now() + expires_in * 1000;

    return access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to retrieve access token');
  }
}
