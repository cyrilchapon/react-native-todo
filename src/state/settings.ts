import { atom } from "jotai"
import { focusAtom } from "jotai-optics"

export type Settings = {
  showDone: boolean
  searching: boolean
  menuOpen: boolean
}

const defaultSettings: Settings = {
  showDone: false,
  searching: false,
  menuOpen: false
}

export const settingsAtom = atom(defaultSettings)

export const menuAtom = focusAtom(settingsAtom, (optic) => optic.prop('menuOpen'))
