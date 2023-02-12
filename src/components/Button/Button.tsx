import { Props } from "./types";
import './styles.css';

export default function Button({ appearance, children, ...props }: Props): JSX.Element {
    return (
        <button
            className={['btn', appearance].join(' ')}
            {...props}
        >
            {children}
        </button>
    )
};