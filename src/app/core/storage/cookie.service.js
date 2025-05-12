import VueCookies from 'vue-cookies';

class CookieService {
    setCookie(name, value, expires) {
        VueCookies.set(name, value, expires);
    }

    getCookie(name) {
        return VueCookies.get(name);
    }

    deleteCookie(name) {
        VueCookies.remove(name);
    }
}

export default new CookieService();