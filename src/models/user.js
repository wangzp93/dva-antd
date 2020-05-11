export default {
    namespace: 'user',

    state: {
        userId: "1",
        userName: "wangzp",

    },

    effects: {

    },

    reducers: {
        setUser(state, { payload }) {
            const { userId, userName } = payload;
            return {
                ...state,
                userId,
                userName
            }
        }
    }
}