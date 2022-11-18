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
app.post("/getShippingMethods/:order_id", (req, res) => {
  merchantApi
    .getShippingMethods(req.params.order_id)
    .then((orderWithShippingMethods) => {
      console.log("response-getShippingMethods");
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

app.patch("/setShippingMethod/:order_id/:code_method", (req, res) => {
  merchantApi
    .setShippingMethod(req.params.order_id, req.params.code_method)
    .then((orderWithShippingMethods) => {
      console.log("response-setShippingMethod");
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

app.post("/applyCoupons/:order_id", (req, res) => {
  merchantApi
    .applyCoupon(req.params.order_id, req.body.coupon_code)
    .then((orderWithToken) => {
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

app.delete("/removeCoupons/:order_id/code/:coupon_code", (req, res) => {
  merchantApi
    .removeCoupon(req.params.order_id, req.params.coupon_code)
    .then((orderWithToken) => {
      console.log("response-removeCoupons");
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
