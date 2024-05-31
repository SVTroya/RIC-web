import Blueprint from '@models/blueprint'
import {connectToDB} from '@utils/database'

export async function GET() {
  try{
    await connectToDB()

    const blueprintsList = await Blueprint.find({})

    return new Response(JSON.stringify(blueprintsList), {status: 200})
  }
  catch (e) {
    console.log(e)
    return new Response('Failed to fetch blueprints!', {status: 500})
  }
}