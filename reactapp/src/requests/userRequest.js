import {getUserById} from "../services/api.js";
import {addUser} from "../redux/slice/userSlice.js";

const fetchDataUser = async (userId, dispatch, setLoading) => {
    try {
        if (userId) {
            setLoading(true);
            const data = await getUserById(userId);
            setLoading(false);

            if (!data.ok) {
                localStorage.removeItem(`userId${globalThis.chat}`);
            } else {
                const currentUser = await data.json();
                dispatch(addUser(currentUser.data));
            }
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export default fetchDataUser;