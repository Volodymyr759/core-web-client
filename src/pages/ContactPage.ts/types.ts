export interface IContactInfo {
    title: string;
    lines: string[];
}

export interface IContactInfoCardProps {
    contactInfoItem: IContactInfo;
}

export const contactInfoItems: IContactInfo[] = [
    { title: "ADDRESS", lines: ["A108 Adam Street,", "New York, NY 535022"] },
    { title: "CALL US", lines: ["+1 5589 55488 55", "+1 5589 22548 64"] },
    { title: "EMAIL US", lines: ["contact@example.com", "info @example.com"] },
    { title: "WORKING HOURS", lines: ["Mon - Fri: 9AM to 6PM", "Sunday: 9AM to 1PM"] }
]

