const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get(
  //   "/api/admin/getallusers",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.GetALL
  // );


  app.post("/api/createProduct",[authJwt.verifyToken, authJwt.isAdmin], controller.CreateProduct);
  app.get(
    "/api/getallProdcuts",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.GetALLProducts
  );
  app.delete(
    "/api/deleteProduct",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );
  


};