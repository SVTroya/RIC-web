import {connectToDB} from '@utils/database'
import Game from '@models/game'
import {NextRequest} from 'next/server'

export async function GET(_req: NextRequest, {params}: { params: { id: string } }) {
  try {
    await connectToDB()

    const res = await Game.findOne({user: params.id})

    return new Response(JSON.stringify(res), {status: 200})
  } catch (error) {
    console.error(error)
    return new Response('Failed to fetch game created by user!', {status: 500})
  }
}

export async function POST(req: NextRequest, {params}: { params: { id: string } }) {
  try {
    const {game} = await req.json()

    await connectToDB()

    if (!params.id) {
      return new Response('Unknown user id!', {status: 500})
    }

    const oldGame = await Game.find({user: params.id})
    if (oldGame) {
      await Game.deleteOne({user: params.id})
    }

    const res = await Game.create({...game, user: params.id})

    return new Response(JSON.stringify(res._id), {status: 201})
  } catch (error) {
    console.error(error)
    return new Response('Failed to save game!', {status: 500})
  }
}