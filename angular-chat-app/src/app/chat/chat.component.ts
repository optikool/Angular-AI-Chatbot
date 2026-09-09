import { Component, effect, ElementRef, inject, signal, viewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../interfaces/message';
import { ChatService } from '../services/chat/chat.service';

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

  private chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');

  private chatService = inject(ChatService);

  constructor() {
    effect(() => {
      if (this.history().length > 0) {
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom(): void {
    const container = this.chatContainer();

    if (container) {
      setTimeout(() => {
        container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
      }, 0);
    }
  }

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
    this.askLLM(userMsg);
  }

  async askLLM(newMessage: Message): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const botMessage =await this.chatService.sendMessageToLLM(newMessage.message);
      const botMsg: Message = { 
        message: botMessage, 
        sender: 'bot', 
        id: Date.now() + 1
      };

      this.history.update(prev => [...prev, botMsg]);
      this.loading.set(false);
    } catch (error: any) {
      this.error.set(error.message);
    } finally {
      // this.loading.set(false);
    }
  }
}