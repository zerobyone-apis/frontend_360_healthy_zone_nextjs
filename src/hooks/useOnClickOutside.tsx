import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

/**
 * Custom hook that allows detecting clicks outside of a specified element.
 *
 * @template T - The type of the element to be referenced.
 * @param {RefObject<T>} ref - The reference to the element to be monitored for clicks outside.
 * @param {(event: AnyEvent) => void} handler - The callback function to be executed when a click outside the element occurs.
 * @param {RefObject<T>} [noRef] - An optional reference to another element that should not trigger the callback when clicked.
 */
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: AnyEvent) => void,
	noRef?: RefObject<T>
) {
	useEffect(() => {
		const listener = (event: AnyEvent) => {
			const el = ref?.current;
			const noEl = noRef?.current;
			if (
				!el ||
				el.contains(event.target as Node) ||
				(noEl && noEl.contains(event.target as Node))
			) {
				return;
			}
			handler(event);
		};
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;
