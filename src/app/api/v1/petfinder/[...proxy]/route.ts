import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/api/getPetfinderToken';

export async function GET(
  req: NextRequest,
  { params }: { params: { proxy?: string[] } }, // Retrieve params properly
) {
  try {
    const { proxy } = await params;
    if (!proxy || proxy.length === 0) {
      return NextResponse.json({ error: 'Invalid API path' }, { status: 400 });
    }

    const apiPath = proxy.join('/'); // Join dynamic path segments
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const petfinderUrl = new URL(`https://api.petfinder.com/v2/${apiPath}`);
    req.nextUrl.searchParams.forEach((value, key) => {
      petfinderUrl.searchParams.append(key, value);
    });

    const response = await fetch(petfinderUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Petfinder API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
