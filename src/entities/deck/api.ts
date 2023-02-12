import { getRequest } from "@/shared/api";

export const fetchDeckList = () => getRequest("/decklist");
