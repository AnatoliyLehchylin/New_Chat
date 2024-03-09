import {getPosts} from "../services/api.js";
import FormatPostDates from "../services/formatPostDates.js";

const fetchDataPosts = async (setPosts, setLoading) => {
    try {
        setLoading(true);
        const data = await getPosts();
        setLoading(false);

        if (!data.ok) {
            console.error('Error fetching posts:', data.error);
        } else {
            const currentPosts = await data.json();
            const postsWithFormattedDate = FormatPostDates(currentPosts.data);
            setPosts(postsWithFormattedDate);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export default fetchDataPosts;