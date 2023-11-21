import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import {
  Searchbar as _SearchBar,
  SearchbarProps as _SearchBarProps,
} from "react-native-paper";
import {
  debouncedSearchAtom,
  isSearchDebouncingAtom,
  searchAtom,
} from "../state/search";

export type SearchBarProps = Omit<_SearchBarProps, "value" | "onChangeText">;

export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  const [search] = useAtom(searchAtom);
  const [, setSearch] = useAtom(debouncedSearchAtom);
  const [isSearching] = useAtom(isSearchDebouncingAtom);

  return (
    <_SearchBar
      {...props}
      placeholder="Recherche"
      onChangeText={setSearch}
      value={search}
      loading={isSearching}
      mode="view"
      showDivider={false}
      autoFocus
    />
  );
};
