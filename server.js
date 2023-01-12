const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000
const colors = require("colors")
const path = require("path")
const {errorHandler} = require("./middleware/errorMiddleware")


const userRoutes = require("./routes/userRoutes")
const recipeRoutes = require("./routes/recipeRoutes")

const connectDB = require("./config/db")
connectDB()

const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/users", userRoutes)
app.use("/api/recipes", recipeRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"./client/build")))
  app.get("*", (req,res) => res.sendFile(__dirname, "client", "build", "index.html"))
} else {
  app.get("/", (req, res) => {
    res.status(200).json({message: "Bienvenu sur Recipea"})
  })
}

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})