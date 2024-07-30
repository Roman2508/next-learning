import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'

export async function GET() {
  const words = await prisma.notCorrect.findMany()
  return NextResponse.json(words)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const existedWord = await prisma.notCorrect.findUnique({ where: { eng: data.eng } })

  if (existedWord) {
    return new Response(`Таке слово вже існує в словнику`, { status: 400 })
  }

  const word = await prisma.notCorrect.create({ data })
  return NextResponse.json(word)
}

export async function DELETE() {
  await prisma.notCorrect.deleteMany({})
  return NextResponse.json({ status: 'SUCCESS' })
}
