import { useEffect, useState } from "react";


export const useDebounce = <T,>(value: T, delay = 500) => {
    const [debouncing, setDebouncing] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncing(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncing
}