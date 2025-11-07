import { cwd as nativeCwd } from 'node:process'

export interface WorkingDirectoryOptions {
  override?: string
  fallback?: string
}

export function getWorkingDirectory(options: WorkingDirectoryOptions = {}): string {
  const { override, fallback } = options

  if (override?.length)
    return override

  const resolved = nativeCwd()
  if (resolved.length)
    return resolved

  if (fallback?.length)
    return fallback

  throw new Error('Unable to resolve the working directory')
}
