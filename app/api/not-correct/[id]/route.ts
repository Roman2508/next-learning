import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()

  const word = await prisma.notCorrect.update({ where: { id: +params.id }, data })
  return NextResponse.json(word)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const word = await prisma.notCorrect.delete({ where: { id: +params.id } })
  return NextResponse.json(word)
}
