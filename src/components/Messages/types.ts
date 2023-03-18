import { ReactNode } from "react";

export enum MessageAppearance {
	SMALL,
	REGULAR,
	LARGE
}

export interface ErrorMessageProps {
	message: string;
}

export interface MessageProps {
	appearance: MessageAppearance;
	children: ReactNode;
}