// Shared types among main process and render processes

interface Json {
  [x: string]: string | number | boolean | Date | Json | JsonArray
}

type JsonArray = Array<string | number | boolean | Date | Json | JsonArray>

type OptionalJson = Json | undefined | null

enum Channels {
  ASYNC_REQUEST_MESSAGE = 'async-request-message',
  SYNC_REQUEST_MESSAGE = 'sync-request-message',
  ASYNC_RESPONSE_JSON = 'async-reply-json',
  SYNC_RESPONSE_JSON = 'sync-reply-json'
}

enum MessageStatus {
  SUCCESS,
  FAILED,
  PENDING
}

enum MessageType {
  FETCH_JSON_FILE
}

type Message = {
  mid?: number
  type: MessageType
  payload: Json
}

type Response = {
  mid?: number
  status: MessageStatus
  body?: Json
}

export { Json, JsonArray, OptionalJson, Channels, MessageType, MessageStatus, Message, Response }
