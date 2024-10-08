import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';


const  POCKET_BASE_URL = 'http://127.0.0.1:8090';



export class DatabaseClient {
    client: PocketBase;
    // fileBaseURL: string;
    categoriesImageBaseURL: string;
    productImageBaseURL: string;
    constructor () {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.categoriesImageBaseURL = `${POCKET_BASE_URL}/api/files/rk0kuf79ehkhvz5/`
        // this.fileBaseURL = `${POCKET_BASE_URL}/api/files/vopk3cx7gapqz5e/`
        this.productImageBaseURL = `${POCKET_BASE_URL}/api/files/vopk3cx7gapqz5e/`
    }

    async authenticate_admin (email: string, password: string) {
        try {
            const result = await this.client.admins.authWithPassword(email, password);
            // console.log('authenticate result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }

    async authenticate (email: string, password: string) {
        try {
            const result = await this.client.collection('users').authWithPassword(email, password);
            // console.log('authenticate result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }

    isAuthenticated(cookieStore: any) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }
    async isAdminAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('apb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }

    async getUser(cookieStore: any) {
        const cookie = cookieStore.get('pb_auth');
        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model ;
    }

    async getAdminUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('apb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model ;
    }
     logoutUser(){
        try {
            this.client.authStore.clear();
            document.cookie = this.client.authStore.exportToCookie({ httpOnly: false });

        } catch (err) {
            // @ts-ignore
            throw new Error(err.message);
        }
    }
    
}

export const pb = new DatabaseClient();

export default pb;