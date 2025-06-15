import express from 'express';
const accountsRouter = express.Router();
import { accountsGet, accountUpdate, accountDelete, accountCreate, getAccountByUsername } from './accounts.controller';

accountsRouter.get('/', accountsGet);
accountsRouter.get('/:username', getAccountByUsername);
accountsRouter.post('/', accountCreate);

accountsRouter.delete('/:accountId', accountDelete);

accountsRouter.put('/:accountId', accountUpdate);

export default accountsRouter;