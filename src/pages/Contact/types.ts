export interface IContactInfo {
    icon: number;
    title: string;
    lines: string[];
}

export interface IContactInfoCardProps {
    contactInfoItem: IContactInfo;
}

export const contactInfoItems: IContactInfo[] = [
    { icon: 0, title: "ADDRESS", lines: ["A108 Adam Street,", "New York, NY 535022"] },
    { icon: 1, title: "CALL US", lines: ["+1 5589 55488 55", "+1 5589 22548 64"] },
    { icon: 2, title: "EMAIL US", lines: ["contact@example.com", "info @example.com"] },
    { icon: 3, title: "WORKING HOURS", lines: ["Mon - Fri: 9AM to 6PM", "Sunday: 9AM to 1PM"] }
]

