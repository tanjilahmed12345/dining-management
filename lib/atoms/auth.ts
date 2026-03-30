import { atom } from "jotai";

export const loginAtom = atom<boolean>(false);

export type CurrentUser = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export const currentUserAtom = atom<CurrentUser>({
  id: "",
  username: "",
  email: "",
  role: "",
});
