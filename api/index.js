const express = require("express");
const cors = require("cors");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
const merchantApi = require("./controller");
const response = require("../network/response");
const orderPayload = require("../mock/orderPayload");

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// Get Tokenized Order
app.post("/tokenizeOrder", (req, res) => {
  console.log("2222");
  console.log("orden", req.body);
  merchantApi
    .getTokenizedOrder(req.body)
    .then((tokenizedOrder) => {
      response.success(req, res, tokenizedOrder, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 401);
    });
});

// Set ShippingMethods to Order
app.post("/getShippingMethods/:orderId", (req, res) => {
  merchantApi
    .getShippingMethods(req.params.orderId)
    .then((orderWithShippingMethods) => {
      response.success(req, res, orderWithShippingMethods, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.patch("/setShippingMethod/:orderId/:codeMethod", (req, res) => {
  merchantApi
    .setShippingMethod(req.params.orderId, req.params.codeMethod)
    .then((orderWithShippingMethods) => {
      response.success(req, res, orderWithShippingMethods, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.post("/applyCoupons/:orderId", (req, res) => {
  merchantApi
    .applyCoupon(req.params.orderId, req.body.coupon_code)
    .then((orderWithToken) => {
      response.success(req, res, orderWithToken, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});

app.delete("/removeCoupons/:orderId/code/:couponCode", (req, res) => {
  merchantApi
    .removeCoupon(req.params.orderId, req.params.couponCode)
    .then((orderWithToken) => {
      response.success(req, res, orderWithToken, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 400);
    });
});
app.get("/", (req, res) => {
  response.success(req, res, { mensage: "hola" }, 200);
});
console.log("aqui");
app.listen(process.env.API_PORT, () => {
  console.log("Node server listening on the port:", process.env.API_PORT);
});
