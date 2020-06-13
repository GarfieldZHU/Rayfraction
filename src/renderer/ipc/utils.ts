// Utilities for IPC in render process

const DEFAULT_MESSAGE_POOL = 256

/**
 * Get an ID generator in pool range.
 * @param pool the max size of id pool
 */
export function getMessageIdGenerator(pool: number): () => number {
  let id = 0
  return (): number => {
    id += 1
    return id % pool
  }
}

/**
 *  ** Not pure **
 * Get an messaeg ID once.
 * ID is self-incremental in a default range.
 */
export const generateMessageId = getMessageIdGenerator(DEFAULT_MESSAGE_POOL)
