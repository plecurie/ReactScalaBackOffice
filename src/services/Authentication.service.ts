export const auth = {
    isAuthenticated: false,

    authenticate(_: { cb: any }) {
        let cb = _.cb;
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },

    signout(_: { cb: any }) {
        let cb = _.cb;
        this.isAuthenticated = false;
        setTimeout(cb, 100) // fake async
    }
};
