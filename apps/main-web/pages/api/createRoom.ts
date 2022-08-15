import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { privacy, expiryMinutes, ...rest } = req.body;

  if (req.method === 'POST') {
    if (process.env['NODE_ENV'] !== 'production') {
      console.log(`Creating room on domain ${process.env.DAILY_DOMAIN}`);
    }

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `uid=${req.cookies['uid']};`,
      },
      body: JSON.stringify({
        privacy: privacy || 'public',
        properties: {
          exp: Math.round(Date.now() / 1000) + (expiryMinutes || 5) * 60, // expire in x minutes
          eject_at_room_exp: true,
          enable_knocking: privacy !== 'public',
          ...rest,
        },
      }),
    };

    const dailyRes = await fetch(
      `${process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'}/rooms`,
      options,
    );

    const { name, url, error } = await dailyRes.json();

    if (error) {
      return res.status(500).json({ error });
    }

    return res
      .status(200)
      .json({ name, url, domain: process.env.DAILY_DOMAIN });
  }

  return res.status(500);
}
