import fs from 'fs'
import { Json } from '../../common/types'

// const RESULT_URL = 'results/'

// const filePath = (fileName: string) => RESULT_URL + fileName

const loadJson = async (file: string): Promise<Json | void> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err: Error, data: Buffer) => {
      if (err) {
        reject(err)
      }
      try {
        resolve(JSON.parse(data.toString()))
      } catch (e) {
        reject(new Error(`json file not valid: ${e}`))
      }
    })
  })
}

export { loadJson }
