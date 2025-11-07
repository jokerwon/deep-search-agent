import { describe, expect, it } from 'vitest'
import { loadConfig, mergeConfig } from '../src/config'

describe('config', () => {
  it('should load config', async () => {
    const config = loadConfig()
    expect(config).toMatchInlineSnapshot(`
      {
        "apiKey": "sk-a9796bcd93cc4ea0a4d990ca2261f751",
        "llmModel": "deepseek-chat",
        "maxContentLength": 20000,
        "maxReflections": 2,
        "maxSearchResults": 3,
        "outputDir": "reports",
        "saveIntermediateStates": true,
        "searchTimeout": 240,
      }
    `)
  })

  it('merges config', () => {
    expect(mergeConfig({ apiKey: 'sk-123' }, { apiKey: 'sk-345', llmModel: 'gpt-4' })).toEqual({ apiKey: 'sk-345', llmModel: 'gpt-4' })
  })
})
