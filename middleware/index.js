
var User = require("../models/user");
// Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkUserOwnership = function (req, res, next) {
    // is someone logged in
    if (req.isAuthenticated()) {
        User.findById(req.user.id, (err, foundUser) => {
            if (err || !foundUser) {
                req.flash("error", "User not found !");
                console.log(err);
                res.redirect("/home");
            }
            else {
                //does the user own itself
                if (foundUser._id.equals(req.params.id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "User not found !");
                    res.redirect("/home");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First !");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First !");
    res.redirect("/login");
}

// middlewareObj.checkCommentOwnership = function (req, res, next) {
//     // is someone logged in
//     if (req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, (err, foundComment) => {
//             if (err || ! foundComment) {
//                 req.flash("error", "Comment not found !");
//                 console.log(err);
//                 res.redirect("/campgrounds");
//             }
//             else {
//                 //does the user own the comment
//                 if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
//                     next();
//                 } else {
//                     req.flash("error", "Permission denied !");
//                     res.redirect("/campgrounds");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "Please Login First !");
//         res.redirect("/login");
//     }
// }

module.exports = middlewareObj;