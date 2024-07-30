import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const words = await prisma.correct.findMany()
  return NextResponse.json(words)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const existedWord = await prisma.correct.findUnique({ where: { eng: data.eng } })

  if (existedWord) {
    return new Response(`Таке слово вже існує в словнику`, { status: 400 })
  }

  const word = await prisma.correct.create({ data })
  return NextResponse.json(word)
}

export async function DELETE() {
  await prisma.correct.deleteMany({})
  return NextResponse.json({ status: 'SUCCESS' })
}
