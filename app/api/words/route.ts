import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const words = await prisma.word.findMany()
  return NextResponse.json(words)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const word = await prisma.word.create({ data })
  return NextResponse.json(word)
}

export async function DELETE() {
  await prisma.word.deleteMany({})
  return NextResponse.json({ status: 'SUCCESS' })
}
