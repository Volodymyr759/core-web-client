import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ImageCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    imageUrl: string;
    altAttribute: string;
    title: string;
    subTitle: string;
    content: string;
}