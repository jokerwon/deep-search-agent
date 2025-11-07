import { describe, expect, it } from 'vitest'

import { DeepSearchAgent } from '../src/agent'

const agent = new DeepSearchAgent()

describe('agent', () => {
  it('deep search agent instance should be created', () => {
    expect(agent instanceof DeepSearchAgent).toBe(true)
  })
})
