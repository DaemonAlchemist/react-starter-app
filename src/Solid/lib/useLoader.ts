import { useState } from "react";

export const useLoader = ():{isLoading: boolean, start: () => void, done: () => void} => {
    const [count, setCount] = useState<number>(0);

    const start = () => {setCount(c => c+1);}
    const done = () => {setCount(c => c - 1);}

    return {isLoading: count > 0, start, done};
}