import { ReactNode } from "react";

export interface CreateNewButtonProps {
	onAction: () => void;
	children: ReactNode;
}