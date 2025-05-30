import express from "express"
import {createUser, loginUser, getUsers, updateUser, deleteUser} from "../controllers/user.controller.js"

const route = express.Router()

route.post("/", createUser)
route.post("/login", loginUser)
route.get("/", getUsers)
route.put("/:id", updateUser)
route.delete("/:id", deleteUser)

export default route