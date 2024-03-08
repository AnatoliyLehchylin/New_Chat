globalThis.users = 'users';
globalThis.posts = 'posts';

// globalThis.users = 'userNews';
// globalThis.posts = 'postNews';

export const getUserById = async (id) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.users}/${id}`);

        // if (!data.ok) {
        //     throw new Error(`ErrorTest: ${data.status}`);
        // }

        return data;
    } catch (err) {
        throw err;
    }
};

export const createUser = async (name, password, role, photoFileUser) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.users}/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({name, password, role, photoFileUser}),
        });

        return data;
    } catch (err) {
        throw err;
    }
}


export const deleteUser = async (id) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.users}/${id}`, {
            method: "DELETE",
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const editUser = async ({id, photoFileUser}) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.users}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({photoFileUser}),
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const loginUser = async (name, password) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.users}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({name, password}),
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const getPosts = async () => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.posts}`);

        return data;
    } catch (err) {
        throw err;
    }
};

export const addPost = async ({text, userName, userID, photoFileUserPost, photoFile}) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.posts}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({text, userName, userID, photoFileUserPost, photoFile}),
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const deletePost = async (id) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.posts}/${id}`, {
            method: "DELETE",
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const editPost = async ({id, text, photoFile}) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.posts}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({text, photoFile}),
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const editAvatarPost = async ({id, photoFileUserPost}) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.posts}/editAvatar/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({photoFileUserPost}),
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const deleteAllPost = async (id) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.posts}/deleteAllPost/${id}`, {
            method: "DELETE",
        });

        return data;
    } catch (err) {
        throw err;
    }
};

export const editPassword = async (id, currentPassword, newPassword) => {
    try {
        const data = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${globalThis.users}/editPassword/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({currentPassword, newPassword}),
        });

        return data;
    } catch (err) {
        throw err;
    }
};
