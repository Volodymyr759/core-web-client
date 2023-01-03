import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	appearance?: "primary" | "dark";
	children: ReactNode;
	onClick: () => void;
}