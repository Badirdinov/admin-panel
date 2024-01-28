
export interface IUserInitialTypes {
    data: IUserDataType[] | IUserTypes[] | null
    isLoading: boolean
    error: boolean
}

export interface IUserDataType {
    count : number | null
    next : any
    previous : any
    results : any | null
}


export interface IUserTypes {
    avatar : string | null
    date_joined : string
    email : string
    first_name : string
    get_full_name : string
    id :  number
    is_active :  boolean
    is_staff :  boolean
    is_superuser :  boolean
    last_activity : string | null
    last_login : string | null
    last_name :  string
    phone :  string
    role :  string
}