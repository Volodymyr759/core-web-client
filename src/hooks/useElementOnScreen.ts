import { RefObject, useEffect, useState } from "react";

export default function useElementOnScreen(ref: RefObject<Element>, rootMargin = "0px") {
    const [isIntersecting, setIsIntersecting] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { setIsIntersecting(entry.isIntersecting) }, { rootMargin });
        if (ref.current) observer.observe(ref.current);

        return () => {
            // eslint-disable-next-line
            if (ref.current) observer.unobserve(ref.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isIntersecting;
}