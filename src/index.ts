import express from 'express';
import cors from 'cors';
import AppDataSource from './data-source';
import postRouter from './routes/PostRoutes';
import userRouter from './routes/UserRoutes';
import authorRouter from './routes/AuthorRoutes';


AppDataSource.initialize().then(() => {
    // var qui est une app de express et permet d'utiliser les fonctionnalités d'express
    const app = express();
    app.use(cors());
    //on paramètre la possibilité de récupérer des infos dans un  body au format json
    app.use(express.json());


    //url de connexion pour les posts
    app.use("/posts", postRouter);

    app.use("/users", userRouter);

    app.use("/authors", authorRouter);


    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
// .catch((error) => console.log("mon erreur", error))