import User from "../Models/User.js";

export const UpdateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.userId;

        await User.findByIdAndUpdate(userId, { cartItems });

        res.json({
            success: true,
            message: "Cart updated"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};