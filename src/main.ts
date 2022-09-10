import express, { Application, Response, Request } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
const app: Application = express()

/* Loaders */
import MongoLoader from './Loaders/mongodb';
MongoLoader()
import ExpressLoader from './Loaders/express';
ExpressLoader(app)

/* Checks */
import DataCheck from './Loaders/data';
DataCheck()
setInterval(DataCheck, 1000)
import DirCheck from './Loaders/dir';
DirCheck()


/* Parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* EndPoints */
import RequestEndPoint from './EndPoints/API/request';
app.use('/files/:ID', async (req: Request, res: Response) => RequestEndPoint(req, res))

import UploadEndPoint from './EndPoints/API/upload';
app.post('/api/upload', async (req: Request, res: Response) => UploadEndPoint(req, res))

import ListEndPoint from './EndPoints/API/list';
app.get('/api/list', async (req: Request, res: Response) => ListEndPoint(req, res))

import DeleteEndPoint from './EndPoints/API/delete';
app.patch('/api/delete', async (req: Request, res: Response) => DeleteEndPoint(req, res))

import RootEndPoint from './EndPoints/Handlers/root';
app.use('/', async (req: Request, res: Response) => RootEndPoint(req, res))