
import express from "express";
import * as Routes from "./config/importsForRoutes.js";

const PORT = 5000;


  // Middleware to parse JSON bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  
  app.use("/api/users", Routes.userRouter);

  

  app.get("/", async (req, res) => {
    try {
      const dataObject = await getSessionData(req, res);

      res.send(dataObject?.adminUser);
    } catch (error) {
      console.error("Error fetching session data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });

  if (process.env.NODE_ENV === "production") await admin.initialize();
  else admin.watch();


start();
