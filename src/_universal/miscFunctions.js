import { useEffect } from "react";
export function sendStateToLoading(stateToRoute, route, from) {
    return {
        stateToRoute: stateToRoute,
        route: route,
        from: from
    };
}
export function useEventListener(DOC, type, listener, options) {
    useEffect(() => {
        (options !== undefined)
            ? DOC.addEventListener(type, listener, options)
            : DOC.addEventListener(type, listener);
        return () => {
            (options !== undefined)
                ? DOC.removeEventListener(type, listener, options)
                : DOC.removeEventListener(type, listener);
        };
    });
}
export function mapear(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
export function getPosition(x, y) {
    return { x: x, y: y };
}
