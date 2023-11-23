import { useAtom } from "jotai";
import { FunctionComponent, RefAttributes, forwardRef } from "react";
import {
  Searchbar as _SearchBar,
  SearchbarProps as _SearchBarProps,
} from "react-native-paper";
import {
  debouncedSearchAtom,
  isSearchDebouncingAtom,
  searchAtom,
} from "../state/search";
import { TextInput } from "react-native";

export type SearchBarProps = Omit<_SearchBarProps, "value" | "onChangeText">;

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  (props, ref) => {
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
        ref={ref}
      />
    );
  }
);
