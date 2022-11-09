import axios from "./axios.js";

const useRefreshToken = () => {

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        localStorage.setItem('TOKEN', response.data.accessToken);
    }
    return refresh;
};

export default useRefreshToken;