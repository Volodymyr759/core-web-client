export interface IStatCard {
    icon: number;
    maxNumber: number;
    content: string;
    redirectLink: string;
}

export interface IStatCardProps {
    item: IStatCard;
}

export const statCardItems: IStatCard[] = [
    { icon: 0, maxNumber: 232, content: 'Happy Clients consequuntur quae qui deca rode', redirectLink: '#' },
    { icon: 1, maxNumber: 521, content: 'Projects adipisci atque cum quia aut numquam delectus', redirectLink: '#' },
    { icon: 2, maxNumber: 1463, content: 'Hours Of Support aut commodi quaerat. Aliquam ratione', redirectLink: '#' },
    { icon: 3, maxNumber: 15, content: 'Hard Workers rerum asperiores dolor molestiae doloribu', redirectLink: '#' }
]