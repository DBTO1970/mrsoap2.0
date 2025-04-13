import connectDB from '../../../../utils/connectDB'
import Orders from '../../../../models/orderModel'

import auth from '../../../../middleware/auth'


connectDB()


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await shippedOrder(req, res)
            break;
    }
}

const shippedOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid'})
        const {id} = req.query
       
        
        const order = await Orders.findOne({_id: id})
        if(order.paid){
            
            await Orders.findOneAndUpdate({_id: id}, {shipped: true})
            
            res.json({
                    msg: 'Update Shipping Success!', 
                    result: {
                        paid: true,
                        dateOfPayment: order.dateOfPayment,
                        method: order.method,
                        shipped: true

                    }
            })
            
        } else {
            await Orders.findOneAndUpdate({_id: id}, {
                paid: true, 
                dateOfPayment: new Date().toISOString(), 
                method: 'Cash Receipt',
                shipped: true
            })
            
            res.json({
                msg: 'Update Shipping Success!',
                result: {
                    paid: true, 
                    dateOfPayment: new Date().toISOString(), 
                    method: 'Cash Receipt',
                    shipped: true
                }
            })
            
        }

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}