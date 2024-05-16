import {connectToDB} from '@utils/database'
import Expansion from '@models/expansion'

export async function GET() {
  try {
    await connectToDB()

    const expansionsList = await Expansion.find({})

    return new Response(JSON.stringify(expansionsList), {status: 200})
  } catch (e) {
    console.error(e)
    return new Response('Failed to fetch expansions!', {status: 500})
  }
}
