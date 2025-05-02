export class Item {
    id:string
    description:string
    images:string[]
    location:string
    price:number
    name:string
    views: number
    rating: number
    rateCount: number
    constructor(id:string,name:string,  description:string, images:string[], location: string, price:number, views: number, rating: number, rateCount: number){
        this.id = id
        this.name=name
        this.description=description
        this.images=images
        this.location=location
        this.price=price
        this.views=views
        this.rating=rating
        this.rateCount=rateCount
    }
}
