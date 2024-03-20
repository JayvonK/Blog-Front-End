export interface IBlogItem {
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