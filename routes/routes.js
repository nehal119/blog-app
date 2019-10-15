const router = require('express').Router();
let Blog = require('../models/routes.model');

router.get("/", function(req, res) {
    res.redirect("/blogs");
});

router.get("/blogs", function(req, res) {
    Blog.find({}, function(error, blogs) {
        if (error) {
            console.log(error);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

router.get("/blogs/new", function(req, res) {
    res.render("new");
});

router.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(error, newBlog) {
        if (error) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

router.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

router.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

router.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

router.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(error) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;