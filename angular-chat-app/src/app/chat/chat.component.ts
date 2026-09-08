import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: Date | number;
  message: string;
  sender: 'user' | 'bot';
  modelName?: string;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  history: WritableSignal<Message[]> = signal<Message[]>([]);
  loading: WritableSignal<boolean> = signal<boolean>(false);
  error: WritableSignal<string | null> = signal<string | null>(null);
  message: WritableSignal<string> = signal<string>('');

  sendMessage(): void {
    const content = this.message().trim();
    if (!content || this.loading()) {
      return;
    }

    // Add user message
    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      message: content,
    };
    this.history.update(prev => [...prev, userMsg]);
    
    // Reset input and start loading
    this.message.set('');
    this.loading.set(true);

    // Simulate Bot response
    setTimeout(() => {
      const botMsg: Message = { 
        message: `This is a simulated response to: ${content}`, 
        sender: 'bot', 
        id: Date.now() + 1
      };
      this.history.update(prev => [...prev, botMsg]);
      this.loading.set(false);
    }, 1500);
  }
}