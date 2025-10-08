export class CatalogItem {

    id: number;
    imgUri: string;
    price: number;
    description: string;
    title: string;
    fit: string;
    ordered: boolean;
    quantity: number;

    constructor(props) {
        this.id = props.id;
        this.imgUri = props.imgUri;
        this.price = props.price;
        this.description = props.description;
        this.title = props.title;
        this.fit = props.fit;
        this.ordered = props.ordered;
        this.quantity = props.quantity;
    }

}
