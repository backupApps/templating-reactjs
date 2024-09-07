import express from "express"
import {tables, insert, prodi, kelas, deleted, update, tableByID} from "../controllers/mahasiswa.js";

const router = express.Router()

router.get("/tables", tables)
router.get("/tableById/:id", tableByID)
router.get("/prodi", prodi)
router.get("/kelas", kelas)
router.post("/insert", insert)
router.put("/update/:id", update)
router.delete("/deleted/:id", deleted)

export default router