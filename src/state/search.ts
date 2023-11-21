import { atomWithDebounce } from './_atom-with-debounce'

const defaultSearch = ''

export const {
  currentValueAtom: searchAtom,
  debouncedValueAtom: debouncedSearchAtom,
  isDebouncingAtom: isSearchDebouncingAtom,
  clearTimeoutAtom: clearSearchDebounceAtom
} = atomWithDebounce(defaultSearch)
