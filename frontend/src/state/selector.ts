import { selector } from "recoil";

import { img1Atom, img2Atom } from "./atom";

export const imgSelector = selector({
  key: "img1Selector",
  get: ({ get }) => {
    const img1 = get(img1Atom);
    const img2 = get(img2Atom);

    return {img1, img2};
  }
});