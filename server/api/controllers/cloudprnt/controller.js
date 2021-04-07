//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
import orderService from "../../services/order.service";
import OrderService from "../../services/order.service";

export class Controller{
    async poll(req, res) {
        // console.log(req.body);
        const batchedOrders = await OrderService.findNew();
        const numNew = batchedOrders.newOrders.length
        res.json({
            jobReady: numNew > 0,
            mediaTypes: ["text/plain"],
            // jobToken: numNew > 0?batchedOrders.jobToken:""
            // deleteMethod: "GET",
            // clientAction: [ {"request": "<request type>", "options": "<request parameters>"} ],
            // claimBarcodeReader: [ "<device name" ],
            // claimKeyboard: [ "<device name>" ],
            // display: [ { "name": "<device name>", "message": "<message markup>" } ],
            // jobGetUrl: "<alternative URL for job GET>",
            // jobConfirmationUrl: "<alternative URL for job confirmation>"
        });
    }

    async retrieve(req, res) {
        console.log(req.query);
        const lines = await orderService.retrieveJobOrders(req.query.token);
        res.set('Content-Type', 'text/plain');
        for (const line of lines){
            res.write(line);
            res.write("\n")
        }
        res.end();
    }

    async complete(req, res) {
        await orderService.completeProcessingBatched();
        res.set('Content-Type', 'text/plain');
        res.end();
    }
}
export default new Controller();