import {atom } from "recoil"
import {FAVORITE_ATOM_CHECK_KEY, FAVORITE_ATOM_KEY}  from "./Constants";


export const useGlobalFavoriteState = atom<IMoveDetails[]>({
    key: FAVORITE_ATOM_KEY,
    default: []
})




