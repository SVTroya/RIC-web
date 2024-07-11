export default async function saveGameToDB(game: Game, userId: string) {
  const res = await fetch(`/api/games/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify({game})
  })

  return await res.json()
}