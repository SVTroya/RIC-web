import {NextRequest} from 'next/server'
import {connectToDB} from '@utils/database'
import Game from '@models/game'

export async function PATCH(req: NextRequest, {params}: { params: { id: string } }) {
  try {
    const {lastRound} = await req.json()

    await connectToDB()

    const game = await Game.findById(params.id)

    if (!game) {
      return new Response('Game not found', {status: 404})
    }

    game.lastRound = lastRound

    await game.save()

    return new Response('Game successfully updated', {status: 200})
  } catch (error) {
    console.error(error)
    return new Response('Failed to update game!', {status: 500})
  }
}

export async function DELETE(_req: NextRequest, {params}: { params: { id: string } }) {
  try {
    await connectToDB()

    await Game.findByIdAndDelete(params.id)

    return new Response('Game deleted successfully', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Error deleting game!', {status: 500})
  }
}