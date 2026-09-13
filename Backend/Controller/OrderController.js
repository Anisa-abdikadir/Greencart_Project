import Product from "../Models/Product.js";
import Order from "../Models/Order.js";
import stripe from "stripe"
import User from "../Models/User.js"

export const PlaceOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (!userId || !address || !items || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid Data"
            });
        }
        //calcilate amouting using items

        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.json({
                    success: false,
                    message: `Product not found: ${item.product}`
                });
            }

            const price = Number(product.offerPrice);
            const quantity = Number(item.quantity);

            if (isNaN(price) || isNaN(quantity)) {
                return res.json({
                    success: false,
                    message: `Invalid price or quantity for product: ${product.name}`
                });
            }

            // amount += price * quantity;
                        amount += product.offerPrice * item.quantity;

        }

         //add Tax Charge(2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success: true,message: "Order placed successfully"
        });

    } catch (error) {
        console.log(error);
        return res.json({success: false,message: error.message
        });
    }
};


// ORDER sTRIPE: /api/order/stripe
export const PlaceOrderStripe =async(req,res)=>{
    try {
        // const { userId, items, address } = req.body;
        const userId = req.userId;
        const { items, address } = req.body;
        const {origin} = req.headers;

        if (!address || !items || items.length === 0) {
            return res.json({success: false,message: "Invalid Data"
            });
        }

        let productDate=[];

        //calcilate amouting using items
    //    let amount = 0;

        // for (const item of items) {
        //     const product = await Product.findById(item.product);

        //     if (!product) {
        //         return res.json({
        //             success: false,message: "Product not found"});
        //     }
            
        //     // amount += product.offerPrice * item.quantity;
        //     amount += Number(product.offerPrice) * Number(item.quantity);
            
        // }
        let amount =await items.reduce(async(acc, item)=>{
            const product =await Product.findById(item.product);
            productDate.push({
                name:product.name,
                price:product.offerPrice,
                quantity:item.quantity,
            })
            return(await acc)+product.offerPrice*item.quantity

        },0)

        //add Tax Charge(2%)
        amount += Math.floor(amount * 0.02);


       const order= await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });
        //stripe getway  intialize
        const stripeInstance = new  stripe(process.env.STRIPE_SECRET_KEY);
        // create line items for stripe
        const line_items=productDate.map((item)=>{
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name,

                    },
                    unit_amount:Math.floor(item.price+item.price*0.02)*100
                },
                quantity:item.quantity,
            }
        })


        //cretate session

        const session =await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=my-Orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId,
            }
        })

        return res.json({success:true,url:session.url})
    } catch (error) {
        return res.json({success:false,message:error.message});
        
    }
}

//stripe  webhook to verivy payment action :/stripe
export const stripewebhook =async(req,res)=>{
    // stripe getway instial
    const stripeInstance =new stripe(process.env.STRIPE_SECRET_KEY);

    const sig=req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        ) ; 
    } catch (error) {
        res.status(400).send(`wenhook Error: ${error.message}`)
        
    }
    //handle  thr event
    switch(event.type){
        case "payment_intent.succeeded":{
            const payment_intent= event.data.object;
            const payment_intentId = payment_intent.id

            //get session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:payment_intentId,
            });
            
            const {orderId,userId} = session.data[0].metadata;

            //mark payment is paid
             await order.findByIdAndUpdate(orderId,{isPaid:true})
            //  clear user cart
            await User.findByIdAndUpdate(userId,{cartItems:{}})
        }
        break;
                case "payment_intent.succeeded":{
                     const payment_intent= event.data.object;
                    const payment_intentId = payment_intent.id

            //get session metadata
                     const session = await stripeInstance.checkout.sessions.list({
                     payment_intent:payment_intentId,
            });
            
            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId)
            break;

                }

        default: 
        console.error(`unhandle event  type ${event.type}`)
        break;   
    }
    res.json({received:true})
}

//get Order by User Id: /api/order/user

export const getUserOrders= async(req,res)=>{
    try {
                const userId = req.userId;

        // order databese ka radina user
        const orders =await Order.find({
            // wuu sinaya orderka uu lka helo userIdkan iyo 
            // check garena 2 conditionka midkod inu true noqde
            userId, $or:[{paymentType:"COD"},{isPaid:true}]
        })
        //.populate  wxa lo isticmala marka mongodb  decument uu leyhy  reference ah
        // wuxuna kuso celina id aa wydisate xogtisa
        .populate("items.product address").sort({createdAt:-1}); 
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

// Get All Orders (for seller /admin ): /api/order/seller

export const GetAllOrders =async(req,res)=>{
    try {
        const orders=await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}]
        })
        .populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}