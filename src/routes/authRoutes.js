const authRouter = function(express) {
    const authRouter = express.Router();
    const authController = require("../Controllers/authController");
  
    authRouter.route("/login").post(authController.authenticate);
  
    return authRouter;
  };
  
  module.exports = authRouter;