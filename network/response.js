//Set response type: success and  error
function success(req, res, data, status) {
  let codeStatus = status || 200;
  //let codeMessage = message || "";
  /* res.status(codeStatus).send({
    error: false,
    status: codeStatus,
    body: codeMessage,
  }); */
  res.status(codeStatus).send({
    order: data.order,
    token: data.token,
    shipping_methods: data.shipping_methods,
  });
}
function error(req, res, message, status) {
  let codeStatus = status || 500;
  let codeMessage = message || "Internal error";
  res.status(codeStatus).send({
    error: true,
    status: codeStatus,
    body: codeMessage,
  });
}

module.exports = {
  success,
  error,
};
