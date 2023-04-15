export interface IStatCard {
    icon: string;
    maxNumber: number;
    content: string;
    redirectLink: string;
}

export interface IStatCardProps {
    item: IStatCard;
}

export const statCardItems: IStatCard[] = [
    { icon: "smile", maxNumber: 232, content: 'Happy Clients consequuntur quae qui deca rode', redirectLink: '#' },
    { icon: "notebook", maxNumber: 521, content: 'Projects adipisci atque cum quia aut numquam delectus', redirectLink: '#' },
    { icon: "headerPhones", maxNumber: 1463, content: 'Hours Of Support aut commodi quaerat. Aliquam ratione', redirectLink: '#' },
    { icon: "people", maxNumber: 15, content: 'Hard Workers rerum asperiores dolor molestiae doloribu', redirectLink: '#' }
]