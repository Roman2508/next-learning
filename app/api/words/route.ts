import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma-client"

export async function GET() {
  const words = await prisma.word.findMany()
  return NextResponse.json(words)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const word = await prisma.word.create({ data })
  return NextResponse.json(word)
}
