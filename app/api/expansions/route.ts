import {connectToDB} from '@utils/database'
import Expansion from '@models/expansion'
import { NextRequest } from 'next/server'

export async function GET() {
  try {
    await connectToDB()

    const expansionsList = await Expansion.find({})

    return new Response(JSON.stringify(expansionsList), {status: 200})
  } catch (e) {
    return new Response('Failed to fetch expansions!', {status: 500})
  }
}

export async function POST(req: NextRequest) {
  const {expIds} = await req.json()

  try {
    await connectToDB()

    const expansionsList = await Expansion.find({_id: {$in: expIds}})

    return new Response(JSON.stringify(expansionsList), {status: 200})
  } catch (e) {
    return new Response('Failed to get Expansions by id!', {status: 500})
  }
}