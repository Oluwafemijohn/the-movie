import {atom } from "recoil"
import { storeData } from "./cache";
import { FAVORITE_ATOM_KEY, FAVORITE_CACHE_KEY}  from "./Constants";


export const useGlobalFavoriteState = atom<IMoveDetails[]>({
    key: FAVORITE_ATOM_KEY,
    default: []
});



// storeData(FAVORITE_CACHE_KEY,useGlobalFavoriteState)





