export interface IContactInfo {
    icon: number;
    title: string;
    lines: string[];
}

export interface IContactInfoCardProps {
    contactInfoItem: IContactInfo;
}

export const contactInfoItems: IContactInfo[] = [
    { icon: 0, title: "ADDRESS", lines: ["St. Kulparkivska, 200a,", "Lviv, 79071 Ukraine"] },
    { icon: 1, title: "CALL US", lines: ["+38 096 675 6680", "WhatsApp / Telegram"] },
    { icon: 2, title: "EMAIL US", lines: ["logisticmaster.2000@gmail.com"] },
    { icon: 3, title: "WORKING HOURS", lines: ["Mon - Fri: 9AM to 6PM", "Saturday: 9AM to 1PM"] }
]

