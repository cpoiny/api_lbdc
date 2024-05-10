import express from 'express';
import cors from 'cors';
import AppDataSource from './data-source';
import postRouter from './routes/PostRoutes';
import userRouter from './routes/UserRoutes';
import authorRouter from './routes/AuthorRoutes';
import mediaRouter from './routes/MediaRoutes';


AppDataSource.initialize().then(() => {
    // var qui est une app de express et permet d'utiliser les fonctionnalités d'express
    const app = express();
    app.use(cors());
    //on paramètre la possibilité de récupérer des infos dans un  body au format json
    app.use(express.json());

    //urls de connexion à la base de données
    app.use("/posts", postRouter);

    app.use("/users", userRouter);

    app.use("/authors", authorRouter);

    app.use("/medias", mediaRouter);


    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})