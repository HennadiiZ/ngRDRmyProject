export class User {
    email: string;
    firstname: string;
    userId: string;
    isActive: boolean;
    isAdmin: boolean;
    isEmployee: boolean;
    
    constructor(source: any){
        this.email = source.email;
        this.firstname = source.firstname;
        this.userId = source.id;
        this.isActive = source.is_active;
        this.isAdmin = source.is_admin;
        this.isEmployee = source.is_employee;
    }
}




