import { useEffect } from "react";

export default function ScrollToSomewhereOnMount() {
    useEffect(() => {
        window.scrollTo(0, 200);
    }, []);

    return null;
}