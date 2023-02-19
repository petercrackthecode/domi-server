const PUBLISHABLE_KEY =
    "pk_test_51Md43MJNJYoa22nr14xn6Cdbu8SK6iAh3ANU5HpCDZd55eaDm9ub6oPizhAbAFlTugORVNTRZhMnodHIwt5ZVn2L00xhk2Ntn7",
  STRIPE_SECRET_KEY =
    "sk_test_51Md43MJNJYoa22nrlqZ8VHRnnv0PAb2ZD2CgMnDt4WY2PxpDuWu3YeAOuFBV750UpAXLtPhtNHLvF95oJQRnk4hL002HRyNwBr";

const express = require("express");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res.json({ message: "Hello World!", STRIPE_SECRET_KEY });
});

app.post("/create-payment-intent", async (req, res) => {
  console.log("create-payment-intent called");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"], // by default
    });
    const clientSecret = paymentIntent.client_secret;
    console.log("paymentIntent = ", paymentIntent);

    res.json({ clientSecret });
  } catch (error) {
    console.log("error.message = ", error.message);
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
