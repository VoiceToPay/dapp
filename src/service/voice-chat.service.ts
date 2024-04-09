import axiosClient from './axios-client';

export const voiceChatService = {
  initVoiceChat: async ({ message }: { message: string }) => {
    const response = await axiosClient.post('/init', {
      message,
    });
    return response.data;
  },
  communicate: async ({ chatId, message }: { chatId: string; message: string }) => {
    const response = await axiosClient.post('/communicate', { chatId, message });
    return response.data;
  },
};
