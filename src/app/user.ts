export class User {
    id:string
    username:string
    password:string
    thumbnail:string
    wishlist: string[]
    constructor(id:string,  username:string, password: string, thumbnail:string, wishlist:string[]) {
        this.id = id
        this.password=password
        this.username=username
        this.thumbnail=thumbnail
        this.wishlist=wishlist
    }
}
