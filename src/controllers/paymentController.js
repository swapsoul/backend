const paymentRouter = require("express").Router({ mergeParams: true });
const paymentService = require("../services/paymentService");
const authWrapper = require("../wrappers/auth-wrapper");

paymentRouter
    .route("/capture")
    .post(authWrapper.verifyTokenForRequestWithoutPayload, paymentService.capturePayment);

module.exports = paymentRouter;
