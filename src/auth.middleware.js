import passport from "passport";

export const authRequired = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(401).error({
        errorCode: "AUTH001",
        reason: "Token validation failed",
        data: null,
      });
    }

    if (!user) {
      return res.status(401).error({
        errorCode: "AUTH002",
        reason: "Unauthorized: Token missing or invalid",
        data: null,
      });
    }

    req.user = user; // 로그인한 유저 정보 저장
    next();
  })(req, res, next);
};