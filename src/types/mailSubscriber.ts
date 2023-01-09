export interface IMailSubscriber {
    id?: number;
    email: string;
    isSubscribed: boolean;
    mailSubscriptionId: number;
}