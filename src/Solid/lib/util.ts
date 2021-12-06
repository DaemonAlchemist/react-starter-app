import { append, joinWith, pipe, pop, replace, split, tuple } from "ts-functional";

export const getParentDir = pipe(replace(/\/$/)(""), split("/"), pop, tuple.second, joinWith("/"), append("/"));
