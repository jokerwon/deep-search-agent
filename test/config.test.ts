import { describe, expect, it } from 'vitest'
import { mergeConfig } from '../src/config'

describe('config', () => {
  it('merges config', () => {
    expect(mergeConfig({ apiKey: 'sk-123' }, { apiKey: 'sk-345', llmModel: 'gpt-4' })).toEqual({ apiKey: 'sk-345', llmModel: 'gpt-4' })
  })
})
