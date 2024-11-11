export class Book {
    id         : number
    title      : string
    description: string
    author     : string

    constructor(id: number, title: string, description: string, author: string){
        this.id          = id
        this.title       = title
        this.description = description
        this.author      = author
    }
}