import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { roomName, isOwner } = req.body;

  if (req.method === 'POST' && roomName) {
    console.log(`Getting token for room '${roomName}' as owner: ${isOwner}`);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: { room_name: roomName, is_owner: isOwner },
      }),
    };

    const dailyRes = await fetch(
      `${
        process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'
      }/meeting-tokens`,
      options,
    );

    const { token, error } = await dailyRes.json();

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ token, domain: process.env.DAILY_DOMAIN });
  }

  return res.status(500);
}
