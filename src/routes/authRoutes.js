const authRouter = function(express) {
    const authRouter = express.Router();
    const authController = require("../controllers/authController");
  
    authRouter.route("/login").post(authController.authenticate);
  
    return authRouter;
  };
  
  module.exports = authRouter;