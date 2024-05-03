export type UserFormDataType = {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    // tokenExpiration: string
}

export type UserType = {
    id: number, 
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dateCreated: string
}

export type FactType = {
    title: string
    id: number,
    fact: string,
    dateCreated: string,
    user: UserType
}
 
export type FactFormDataType = {
    title: string,
    fact: string
}