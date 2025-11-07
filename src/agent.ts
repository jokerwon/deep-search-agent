import type { Config } from './config'
import { DEFAULT_CONFIG, loadConfig, mergeConfig } from './config'

export class DeepSearchAgent {
  private config: Config

  constructor(config?: Config) {
    const envConfig = loadConfig()
    this.config = mergeConfig(mergeConfig(DEFAULT_CONFIG, envConfig), config || {} as Config)
  }
}
