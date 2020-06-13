// Load the file from file system by main process via IPC

import { ipcRenderer, IpcRendererEvent } from 'electron'
import * as R from 'ramda'

import { Channels, MessageType, Response, MessageStatus, OptionalJson } from '../../common/types'
import { generateMessageId } from './utils'

const fetchJsonFile = R.memoizeWith(
  R.identity,
  async (fileName: string): Promise<OptionalJson> => {
    const newId = generateMessageId()
    return new Promise((resolve, reject) => {
      if (!fileName) {
        reject()
      }

      ipcRenderer.on(Channels.ASYNC_RESPONSE_JSON, (event: IpcRendererEvent, resp: Response) => {
        const { mid, status, body } = resp
        // This receiver should only handler the message sent from this channel sender
        if (mid === newId) {
          console.log(
            `Receive response - mid: ${mid}, status: ${status}, body: ${JSON.stringify(
              body
            )}, ${event}`
          )
          if (status === MessageStatus.SUCCESS) {
            resolve(body)
          } else if (status === MessageStatus.FAILED) {
            reject(body)
          }
        }
      })

      console.log(`Send message - mid: ${newId}, file: ${fileName}`)
      // Async message sender
      ipcRenderer.send(Channels.ASYNC_REQUEST_MESSAGE, {
        mid: newId,
        type: MessageType.FETCH_JSON_FILE,
        payload: { file: fileName }
      })
    })
  }
)

export { fetchJsonFile }
