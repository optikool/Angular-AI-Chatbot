import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageAPIBody } from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = environment.apiUrl; // Use the API URL from the environment configuration
  private http = inject(HttpClient);

  async sendMessageToLLM(message: string): Promise<any> {
    const body: MessageAPIBody = {
      model: 'qwen3:14b',
      messages: [{ role: 'user', content: message }],
      stream: true
    };

    try {
      const reply = await firstValueFrom(this.http.post(`${this.apiUrl}/chat`, body));
      return reply;
    } catch (error: any) {
      throw new Error('Error sending message to LLM: ' + error.message);
    }
  }
}
