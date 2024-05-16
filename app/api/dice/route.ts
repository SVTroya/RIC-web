import {connectToDB} from '@utils/database'
import Die from '@models/die'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try{
    await connectToDB()

    const exp = req.nextUrl.searchParams.get('exp')

    const diceList = await Die.find({die_type: exp ? {$in:  ['base', exp]} : 'base'})

    return new Response(JSON.stringify(diceList), {status: 200})
  } catch (e) {
    console.error(e)
    return new Response('Failed to fetch dice!', {status: 500})
  }
}
