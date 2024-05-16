import {connectToDB} from '@utils/database'
import Die from '@models/die'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try{
    await connectToDB()

    const {exp} = await req.json()
    const diceList = await Die.find({die_type: !exp ? 'base' : {$in:  ['base', exp]}})

    return new Response(JSON.stringify(diceList), {status: 200})
  }
  catch (e) {
    console.log(e)
    return new Response('Failed to fetch dice!', {status: 500})
  }
}