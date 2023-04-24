import { FC, PropsWithChildren, useRef } from 'react'
import useElementOnScreen from '../../hooks/useElementOnScreen';

// read more about Simple React Scroll Animations With Zero Dependencies: https://betterprogramming.pub/simple-react-scroll-animations-with-zero-dependencies-b496c1e1c7bd

export const AnimateIn: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useElementOnScreen(ref);

    return (
        <div
            ref={ref}
            style={{
                opacity: onScreen ? 1 : 0,
                translate: onScreen ? "none" : "0 2rem",
                transition: "1500ms ease-in-out",
            }}
        >
            {children}
        </div>
    );
}
