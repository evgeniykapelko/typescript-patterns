enum ShippingMethodCode {
    Delivery = 'Delivery',
    PickUp = 'PickUp',
}

class Product {
    public id: number;
    public name: string;
    public price: number;

    constructor (id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShippingMethod {
    public date: Date;
    public code: ShippingMethodCode;
    public storeId: number | string;

    constructor (date: Date, code: ShippingMethodCode, storeId: number | string) {
        this.code = code;
        this.storeId = storeId;
        this.date = date;
    }
}

class Cart {
   private products: Product[] = [];
   private shippingStatus: ShippingMethod | undefined;

    public addProductToCart(product: Product): void {
        this.products.push(product)
    }

    public deleteProductFromCartById(id: number): void {
        this.products = this.products.filter(product => product.id !== id)
    }

    public calculateSum(): number {
        let sum = 0;

        this.products.map((p: Product) => p.price)
            .reduce((p1: number, p2: number) => p1 + p2);

       return sum;
    }

    public setShippingMethod(shippingMethod: ShippingMethod): void {
        this.shippingStatus = shippingMethod;
    }

    public isCheckout(): boolean {
        if (this.products.length > 0 && this.shippingStatus) {
            return true;
        }

        return false;
    }

}



const product = new Product(1, 'T-Shirt', 5.00);
const product2 = new Product(2, 'Polo', 8.00);

const cart = new Cart();

cart.addProductToCart(product);
cart.addProductToCart(product2);

const shippingMethod = new ShippingMethod(new Date, ShippingMethodCode.Delivery, 1);
cart.setShippingMethod(shippingMethod);



console.log(cart);

console.log(cart.calculateSum());

console.log(cart.isCheckout());