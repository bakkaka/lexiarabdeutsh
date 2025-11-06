import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();
  const limit = Number(searchParams.get('limit') || 50);

  // Read sample JSON (works in dev & on Vercel since it's in /public)
  const jsonPath = path.join(process.cwd(), 'public', 'data', 'sample.json');
  const dataRaw = fs.readFileSync(jsonPath, { encoding: 'utf8' });
  const data = JSON.parse(dataRaw);

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  // Simple search: prefix or substring match on mot_de or mot_ar
  const results = data.filter((item: any) =>
    item.mot_de.toLowerCase().startsWith(q) ||
    item.mot_ar.toLowerCase().startsWith(q) ||
    item.mot_de.toLowerCase().includes(q) ||
    item.mot_ar.toLowerCase().includes(q)
  ).slice(0, limit);

  return NextResponse.json({ results });
}
