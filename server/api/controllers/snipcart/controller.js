//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import OrderService from "../../services/order.service";
// import * as express from 'express';
export class controller{
    async webhook(req, res) {
        const obj = req.body;
        const x = await OrderService.create({
            customerName: obj.content.shippingAddress.fullName,
            customerPhoneNumber: obj.content.shippingAddress.phone,
            orderNumber: obj.content.invoiceNumber,
            products: obj.content.items.map(item=>{
                return {
                    price: item.totalPrice,
                    name: item.name,
                    options: item.customFields.map(cf=>{
                        return {name: cf.name,
                        value: cf.displayValue}
                    })
                }
            })
        });
        res.json({
            status: "done",
            response: x
        });
    }
}

export default new controller();