import { NextResponse } from 'next/server';
 
function getData(data: any) {
    return JSON.stringify(data)
}

export async function GET() {
  return NextResponse.json({ hello: 'world' });
}
 
export async function POST(
  request: Request
) {
  const body = await request.json();
  const data = await getData(body);
 
  return NextResponse.json(data);
}