import {connectToDB} from '@utils/database'
import Expansion from '@models/expansion'
import { NextRequest } from 'next/server'

export async function GET() {
  try {
    await connectToDB()

    const expansionsList = await Expansion.find({})

    return new Response(JSON.stringify(expansionsList), {status: 200})
  } catch (e) {
    console.log(e)
    return new Response('Failed to fetch expansions!', {status: 500})
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectToDB()

    const {expIds} = await req.json()
    const expansionsList = await Expansion.find({_id: {$in: expIds}})

    return new Response(JSON.stringify(expansionsList), {status: 200})
  } catch (e) {
    console.log(e)
    return new Response('Failed to get Expansions by id!', {status: 500})
  }
}