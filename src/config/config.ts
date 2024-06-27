import { config } from 'dotenv';

export class NanceConfig {
  private static instance: NanceConfig;
  private constructor() {}

  public static getInstance(): NanceConfig {
    if (!NanceConfig.instance) {
      config();
      NanceConfig.instance = new NanceConfig();
    }

    return NanceConfig.instance;
  }

  public getApiKey(): string {
    return this.get('API_KEY');
  }

  public getSecretKey(): string {
    return this.get('SECRET_KEY');
  }

  public get(key: string): string {
    return process.env[key] || '';
  }
}
