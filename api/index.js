const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.json({
    ok: true,
    msg: "Test API success",
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
