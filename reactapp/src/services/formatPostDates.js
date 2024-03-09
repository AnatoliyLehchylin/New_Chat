import {format, parseISO} from "date-fns";
import { uk } from 'date-fns/locale';

const FormatPostDates = (posts) => {
    return posts.map((post) => {
        try {
            const dateObject = parseISO(post.created_at);
            const dateEditObject = parseISO(post.updatedAt);

            const formattedDate = format(dateObject, 'dd MMMM yyyy');
            const formattedTime = format(dateObject, 'HH:mm');
            const compareDate = new Date(formattedDate);

            const formattedEditDate = format(dateEditObject, 'dd MMMM yyyy HH:mm');

            const isEditPost = post.created_at !== post.updatedAt;

            return {...post, formattedDate, formattedTime, compareDate, formattedEditDate, isEditPost};
        } catch (error) {
            console.error('Error formatting date:', error);
            return post;
        }
    });
};

export default FormatPostDates;