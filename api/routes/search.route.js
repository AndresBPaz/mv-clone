const { Router } = require("express");
const { search } = require("../controllers/search.controller");
const { blogsgetpagination } = require("../controllers/search.controller");

const router = Router();

router.get("/:collection/:item", search);

router.get("/busqueda", blogsgetpagination);

module.exports = router;
