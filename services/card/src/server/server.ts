import { Elysia } from "elysia";

const app = new Elysia().get("/", () => {
    return "Hello World";
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
});