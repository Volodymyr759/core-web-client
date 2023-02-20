export interface ICandidate {
    fullName: string;
    email: string;
    phone: string;
    notes: string;
    isDismissed: boolean;
    joinedAt: Date;
    vacancyId: number;
}