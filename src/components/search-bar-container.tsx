import { useAtom } from "jotai";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { settingsAtom } from "../state/settings";
import { SearchBar } from "./search-bar";
import { focusAtom } from "jotai-optics";
import { TextInput, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { debouncedSearchAtom } from "../state/search";

const isSearchingAtom = focusAtom(settingsAtom, (optic) =>
  optic.prop("searching")
);

export const SearchBarContainer: FunctionComponent<ViewProps> = (props) => {
  const [searching] = useAtom(isSearchingAtom);
  const [, setSearch] = useAtom(debouncedSearchAtom);

  const hiddenMargin = -72;
  const visibleMargin = 0;

  const translationY = useSharedValue(hiddenMargin);
  const slideStyle = useAnimatedStyle(() => ({
    marginTop: translationY.value,
  }));

  const searchInputRef = useRef<TextInput>(null);

  const show = () => {
    translationY.value = withSpring(visibleMargin, { duration: 1000 });
  };

  const hide = () => {
    translationY.value = withSpring(hiddenMargin, { duration: 1000 });
  };

  const focus = useCallback(() => {
    if (searchInputRef.current != null) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef]);

  const blur = useCallback(() => {
    if (searchInputRef.current != null) {
      searchInputRef.current.blur();
    }
  }, [searchInputRef]);

  useEffect(() => {
    if (searching) {
      show();
      focus();
    } else {
      hide();
      blur();
      setSearch("");
    }
  }, [searching]);

  return (
    <Animated.View
      style={[
        ...(props.style != null ? [props.style] : []),
        slideStyle,
        // { marginTop: margin }
      ]}
      // entering={FadeInUp}
      // exiting={FadeOutUp}
    >
      <SearchBar ref={searchInputRef} />
    </Animated.View>
  );
};
