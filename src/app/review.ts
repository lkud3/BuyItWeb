export class Review {
    id:string
    comment:string
    date: string
    userId:string
    constructor(id:string, comment: string, date:string, userId:string) {
        this.id = id
        this.comment = comment
        this.date = date
        this.userId = userId
    }
}
