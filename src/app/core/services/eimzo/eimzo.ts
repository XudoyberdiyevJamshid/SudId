import { Injectable, signal } from '@angular/core';
import { ESignKey, initModuleEimzo } from '@shohrux_saidov/eimzo-client';

export interface EriKey {
  id: string;
  name: string;
  jshshir: string;
  date: string;
  vo: string;
}

@Injectable({
  providedIn: 'root',
})
export class EimzoService {
  private client: any = null;

  hasEimzo = signal<boolean>(false);

  keys = signal<ESignKey[]>([]);

  async init(): Promise<void> {
    if (!this.client) {
      try {
        this.client = await initModuleEimzo();

        await this.client.addKey(
          'edo.sud.uz',
          'D075757F8EE6C095E79D8D50D46BFBFF32EE52D5E6594C378D80529517B22BFD72A77B70AD5B73FF4F9842A5C0E0FA6A00975D1B142F4D123C5161B29747F336',
        );

        try {
          await this.client.checkVersion();
        } catch (vError) {}

        await this.client.installApiKeys();

        this.hasEimzo.set(true);
      } catch (error) {
        console.error('E-IMZO topilmadi yoki xatolik:', error);
        this.hasEimzo.set(false);
      }
    }
  }
  async loadPfxKeys(): Promise<void> {
    await this.init();

    if (this.hasEimzo()) {
      try {
        const pfxKeys = await this.client.listAllUserKeys();
        this.keys.set(pfxKeys);
      } catch (error) {
        console.error('PFX kalitlarni oqishda xato:', error);
        this.keys.set([]);
      }
    }
  }

  async signSimpleData(key: ESignKey, textToSign: string): Promise<string> {
    await this.init();
    try {
      const result = await this.client.signPkcs7(key, textToSign);

      console.log('Paketdan qaytgan toliq result:', result);

      if (result && result.hash && result.hash.pkcs7_64) {
        return result.hash.pkcs7_64;
      } else if (result && result.pkcs7_64) {
        return result.pkcs7_64;
      } else if (typeof result === 'string') {
        return result;
      }

      return 'Hash topilmadi!';
    } catch (error) {
      console.error('Imzolash bekor qilindi yoki xato:', error);
      throw error;
    }
  }
}
