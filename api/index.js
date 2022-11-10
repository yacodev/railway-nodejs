const express = require("express");
const cors = require("cors");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
const merchantApi = require("./controller");
const response = require("../network/response");

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// Get Tokenized Order
app.post("/tokenizeOrder", (req, res) => {
  merchantApi
    .getTokenizedOrder(req.body)
    .then((tokenizedOrder) => {
      response.success(req, res, tokenizedOrder, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

// Set ShippingMethods to Order
app.post("/getShippingMethods/:orderId", (req, res) => {
  merchantApi
    .getShippingMethods(req.params.orderId)
    .then((orderWithShippingMethods) => {
      console.log("response-getShippingMethods", orderWithShippingMethods);
      res.status(200).send({
        order: orderWithShippingMethods.order,
        token: orderWithShippingMethods.token,
        shipping_methods: orderWithShippingMethods.shipping_methods,
      });
      //response.success(req, res, orderWithShippingMethods, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.patch("/setShippingMethod/:orderId/:codeMethod", (req, res) => {
  merchantApi
    .setShippingMethod(req.params.orderId, req.params.codeMethod)
    .then((orderWithShippingMethods) => {
      console.log("response-setShippingMethod", orderWithShippingMethods);
      res.status(200).send({
        order: orderWithShippingMethods.order,
        token: orderWithShippingMethods.token,
      });

      //response.success(req, res, orderWithShippingMethods, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.post("/applyCoupons/:orderId", (req, res) => {
  merchantApi
    .applyCoupon(req.params.orderId, req.body.coupon_code)
    .then((orderWithToken) => {
      console.log("response-applyCoupons", orderWithToken);
      res.status(200).send({
        order: orderWithToken.order,
        token: orderWithToken.token,
      });
      // response.success(req, res, orderWithToken, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.delete("/removeCoupons/:orderId/code/:couponCode", (req, res) => {
  merchantApi
    .removeCoupon(req.params.orderId, req.params.couponCode)
    .then((orderWithToken) => {
      console.log("response-removeCoupons", orderWithToken);
      res.status(200).send({
        order: orderWithToken.order,
        token: orderWithToken.token,
      });
      //response.success(req, res, orderWithToken, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});
app.post("/notify", (req, res) => {
  merchantApi
    .notifyStatus(req.body.order)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.listen(process.env.API_PORT, () => {
  console.log("Node server listening on the port:", process.env.API_PORT);
});
