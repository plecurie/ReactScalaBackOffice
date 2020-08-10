
export const auth = {

    isAuthenticated: false,

    signin(cb: any) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },

    signout(cb: any) {
        this.isAuthenticated = false;
        setTimeout(cb, 100) // fake async
    },
};



