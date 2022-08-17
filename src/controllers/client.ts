import { Request, Response } from "express";
import { IClient } from "../interfaces/IClient";
import { IOpportunity } from "../interfaces/IOpportunities";
import database from "./../../database/functions.js";

const getAll = async (req: Request, res: Response) => {
  const clients = await database.getAll("users");

  const clientFormated = Object.keys(clients).map((id) => {
    return clients[id];
  });
  res.json(clientFormated);
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clientInformations = await database.getOne("users", id);
    const opportunities = await database.getOne("opportunities", id);

    res.json({
      ...clientInformations,
      opportunities: opportunities?.opportunities,
    });
  } catch (error) {
    res.json(error);
  }
};

const setCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const values = req.body;

  const {opportunities} = await database.set("opportunities", id, {
    opportunities: values,
  });
  console.log(opportunities);
  res.json(opportunities );
};

const client = {
  getAll,
  getOne,
  setCollection,
};

export default client;
