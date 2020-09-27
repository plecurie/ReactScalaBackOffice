
export const authService = {

    isAuthenticated: false,

    signin(username: string, password: string, cb: any) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },

    logout(cb: any) {
        this.isAuthenticated = false;
        setTimeout(cb, 100) // fake async
    },
};



