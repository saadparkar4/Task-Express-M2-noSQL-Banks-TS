import { Request, Response } from 'express';
import { accounts } from '../../account';

export const accountCreate = (req: Request, res: Response) => {
    const id = accounts[accounts.length - 1].id + 1;
    const newAccount = { ...req.body, funds: 0, id };
    accounts.push(newAccount);
    res.status(201).json(newAccount);
};

export const accountDelete = (req: Request, res: Response) => {
    const { accountId } = req.params;
    const foundAccount = accounts.find((account) => account.id === +accountId);
    if (foundAccount) {
        let newAccounts = accounts.filter((account) => account.id !== +accountId);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
};

export const accountUpdate = (req: Request, res: Response) => {
    const { accountId } = req.params;
    const foundAccount = accounts.find((account) => account.id === +accountId);
    if (foundAccount) {
        foundAccount.funds = req.body.funds;
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Account not found' });
    }
};

export const accountsGet = (req: Request, res: Response) => {
    res.json(accounts);
};

export const getAccountByUsername = (req: Request, res: Response) => {
    const { username } = req.params;
    const foundAccount = accounts.find(
        (account) => account.username === username
    );
    if (req.query.currency === 'usd' && foundAccount) {
        const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
        res.status(201).json(accountInUsd);
    } else {
        res.status(201).json(foundAccount);
    }
};