import { Props } from "./types";
import './styles.css';

export const Button = ({ appearance, children, ...props }: Props): JSX.Element => {
    return (
        <button
            className={['btn', appearance].join(' ')}
            {...props}
        >
            {children}
        </button>
    )
};