import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Farcaster webhook payload – handle as needed
    return NextResponse.json({ ok: true, received: !!body });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'nibbles-webhook' });
}
