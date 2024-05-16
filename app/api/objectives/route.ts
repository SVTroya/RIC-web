import {connectToDB} from '@utils/database'
import {NextRequest} from 'next/server'
import Objective from '@models/objective'

export async function GET(req: NextRequest) {
  try{
    await connectToDB()

    const exp = req.nextUrl.searchParams.get('exp')

    const objectivesList = await Objective.find({exp: exp ? {$in: ['base', exp]} : 'base'})

    console.log('Objectives List:', objectivesList)
    return new Response(JSON.stringify(objectivesList), {status: 200})
  } catch (e) {
    console.error('Error:', e)
    return new Response('Failed to fetch objectives!', {status: 500})
  }
}