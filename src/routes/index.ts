import { Router } from "express";
import client from "../controllers/client";

const router = Router()

router.get("/client", client.getAll);
router.get("/client/:id", client.getOne);
router.post("/client/:id", client.setCollection);

module.exports = router;
