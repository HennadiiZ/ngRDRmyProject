
export interface RegisterUser {
    firstname: string
    lastname: string
    email: string
    password: string
    confirm_password: string
    stack_id?: any
    level_id?: any
}

export interface LoginUser {
    username: string
    password: string
    access_token?: string 
    checkbox?: boolean
}
export interface ResetPassword{
    email: string
}

export interface ResponseBody {
    expires_in: string
    access_token: string
    refresh_token: string
    toke_type: string
    valid_to: string
}

export class UserJwt {
    email?: string;
    firstname?: string;
    id?: string;
    is_active?: boolean;
    is_admin?: boolean;
    is_employee?: boolean;
}


