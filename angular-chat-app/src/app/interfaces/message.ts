export interface Message {
    id: Date | number;
    message: string;
    sender: 'user' | 'bot';
    modelName?: string;
}

export interface Messages {
    role: string;
    content: string;
    thinking?: string;
}

export interface MessageAPIBody {
    model: string;
    messages: Messages[];
    stream: boolean;
}

