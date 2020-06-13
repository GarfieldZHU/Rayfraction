import { Json, Message, MessageType } from '../../common/types'
import { loadJson } from '../helpers/fileHelpers'

const serveMessage = async (message: Message): Promise<Json | void> => {
  const { type, payload } = message
  switch (type) {
  case MessageType.FETCH_JSON_FILE:
    return loadJson(payload?.file as string)
  default:
  }
}

const serveMessageSync = (message: Message): Json | void => {
  console.log(message)
}

export { serveMessage, serveMessageSync }
