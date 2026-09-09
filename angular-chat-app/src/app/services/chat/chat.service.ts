import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = environment.apiUrl; // Use the API URL from the environment configuration
  private http = inject(HttpClient);

  async sendMessageToLLM(message: string): Promise<string> {
    const body = {
      model: 'llama3.2', // Replace with your downloaded model name
      prompt: message,
      stream: false      // Disables chunked streaming for a single JSON response
    };
    try {
      const { reply } = await firstValueFrom(this.http.post<{ reply: string }>(`${this.apiUrl}/chat`, body));
      return reply;
    } catch (error: any) {
      throw new Error('Error sending message to LLM: ' + error.message);
    }
  }
}
