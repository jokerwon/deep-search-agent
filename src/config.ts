import { loadEnvConfig } from '@next/env'
import { getWorkingDirectory } from './utils/workdir'

export interface Config {
  apiKey: string

  // 模型配置
  llmModel?: string

  // 搜索配置
  maxSearchResults?: number
  searchTimeout?: number
  maxContentLength?: number

  // Agent配置
  maxReflections?: number
  maxParagraphs?: number

  // 输出配置
  outputDir?: string
  saveIntermediateStates?: boolean
}

export const DEFAULT_CONFIG: Config = {
  apiKey: '',
  llmModel: 'deepseek-chat',
  maxSearchResults: 3,
  searchTimeout: 240,
  maxContentLength: 20000,
  maxReflections: 2,
  maxParagraphs: 5,
  outputDir: 'reports',
  saveIntermediateStates: true,
}

export function loadConfig(): Config {
  const env = loadEnvConfig(getWorkingDirectory())
  if (!env.combinedEnv) {
    return { apiKey: '' }
  }
  const { combinedEnv: { AGENT_API_KEY, LLM_MODEL, MAX_REFLECTIONS, MAX_SEARCH_RESULTS, SEARCH_TIMEOUT, MAX_CONTENT_LENGTH, OUTPUT_DIR, SAVE_INTERMEDIATE_STATES } } = env
  return {
    apiKey: AGENT_API_KEY || '',
    llmModel: LLM_MODEL,
    maxReflections: Number.parseInt(MAX_REFLECTIONS || '2'),
    maxSearchResults: Number.parseInt(MAX_SEARCH_RESULTS || '3'),
    searchTimeout: Number.parseInt(SEARCH_TIMEOUT || '240'),
    maxContentLength: Number.parseInt(MAX_CONTENT_LENGTH || '20000'),
    outputDir: OUTPUT_DIR,
    saveIntermediateStates: SAVE_INTERMEDIATE_STATES === 'TRUE',
  } as const satisfies Config
}

export function mergeConfig(defaultConfig: Config, overrides: Config): Config {
  return { ...defaultConfig, ...overrides } as const satisfies Config
}
