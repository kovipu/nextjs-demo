import { NextResponse } from 'next/server';

export function middleware(req, ev) {
  console.log("received request: ", req);

  return NextResponse.next();
}