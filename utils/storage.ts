function save(key: string, value: any){
  try {
    const serializedState = JSON.stringify(value)
    localStorage.setItem(key, serializedState)
  } catch (error) {
    console.error("Set state error: ", (error as Error)?.message)
  }
}

function load(key: string) {
  try {
    const serializedState = localStorage.getItem(key)
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (error) {
    console.error("Get state error: ", (error as Error)?.message)
    return null
  }
}

function remove(key: string) {
  localStorage.removeItem(key)
}

export default {
  save,
  load,
  remove
}
