
import { atom } from "jotai";


export const loginAtom = atom<boolean>(false);


export type CurrentUser = {
  username: string;
  email: string;
  role : string;
};

export const currentUserAtom = atom<CurrentUser>({
  username: "",
  email: "",
  role: "",
});


