export interface IBlogItems {
    //keys can be start off in lowercase, becasue when returning data it will always start off as lowercase
    id: number,
    userID: number
    publishedName: string
    date: string
    title: string
    description: string
    image: string
    tags: string
    categories: string
    isPublished: boolean
    isDeleted: boolean
}

//Get our token

export interface IToken {
    token: string
}

//For Login and Create account fetch

export interface IUserInfo {
    username: string,
    password: string
}

//This for getting user's info Id and username

export interface IUserData {
    id: number,
    username: string
}