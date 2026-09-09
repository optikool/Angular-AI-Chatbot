export interface Message {
    id: Date | number;
    message: string;
    sender: 'user' | 'bot';
    modelName?: string;
}