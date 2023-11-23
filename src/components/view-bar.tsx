import * as React from "react";
import {
  Animated,
  ColorValue,
  GestureResponderEvent,
  I18nManager,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

import color from "color";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  Surface,
  useTheme,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface Style {
  marginRight: number;
}

export type ViewBarProps = React.ComponentPropsWithRef<typeof TextInput> & {
  /**
   * Hint text shown when the input is empty.
   */
  placeholder?: string;
  /**
   * The value of the text input.
   */
  value: string;
  /**
   * Callback that is called when the text input's text changes.
   */
  onChangeText?: (query: string) => void;
  /**
   * Icon name for the left icon button (see `onIconPress`).
   */
  icon?: IconSource;
  /**
   * Custom color for icon, default will be derived from theme
   */
  iconColor?: string;
  /**
   * Color of the ripple effect.
   */
  rippleColor?: ColorValue;
  /**
   * Callback to execute if we want the left icon to act as button.
   */
  onIconPress?: (e: GestureResponderEvent) => void;

  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  searchAccessibilityLabel?: string;
  /**
   * @supported Available in v5.x with theme version 3
   * Callback which returns a React element to display on the right side.
   * Works only when `mode` is set to "bar".
   */
  right?: (props: {
    color: string;
    style: Style;
    testID: string;
  }) => React.ReactNode;
  /**
   * @supported Available in v5.x with theme version 3
   * Whether to show `Divider` at the bottom of the search.
   * Works only when `mode` is set to "view". True by default.
   */
  showDivider?: boolean;
  /**
   * @supported Available in v5.x with theme version 3
   * Changes Searchbar shadow and background on iOS and Android.
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
  /**
   * Set style of the TextInput component inside the searchbar
   */
  inputStyle?: StyleProp<TextStyle>;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /**
   * Custom flag for replacing clear button with activity indicator.
   */
  loading?: Boolean;
};

type TextInputHandles = Pick<
  TextInput,
  "setNativeProps" | "isFocused" | "clear" | "blur" | "focus"
>;

/**
 * Searchbar is a simple input box where users can type search queries.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Searchbar } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [searchQuery, setSearchQuery] = React.useState('');
 *
 *   const onChangeSearch = query => setSearchQuery(query);
 *
 *   return (
 *     <Searchbar
 *       placeholder="Search"
 *       onChangeText={onChangeSearch}
 *       value={searchQuery}
 *     />
 *   );
 * };
 *
 * export default MyComponent;

 * ```
 */
const ViewBar = React.forwardRef<TextInputHandles, ViewBarProps>(
  (
    {
      icon,
      iconColor: customIconColor,
      rippleColor: customRippleColor,
      onIconPress,
      searchAccessibilityLabel = "search",
      right,
      showDivider = true,
      inputStyle,
      placeholder,
      elevation = 0,
      style,
      value,
      loading = false,
      testID = "search-bar",
      ...rest
    }: ViewBarProps,
    ref
  ) => {
    const theme = useTheme();
    const root = React.useRef<TextInput>(null);

    React.useImperativeHandle(ref, () => {
      const input = root.current;

      if (input) {
        return {
          focus: () => input.focus(),
          clear: () => input.clear(),
          setNativeProps: (args: TextInputProps) => input.setNativeProps(args),
          isFocused: () => input.isFocused(),
          blur: () => input.blur(),
        };
      }

      const noop = () => {
        throw new Error("TextInput is not available");
      };

      return {
        focus: noop,
        clear: noop,
        setNativeProps: noop,
        isFocused: noop,
        blur: noop,
      };
    });

    const { roundness, dark, fonts } = theme;

    const placeholderTextColor = theme.colors.onSurfaceDisabled;
    const textColor = theme.colors.onSurfaceVariant;
    const iconColor = customIconColor ?? theme.colors.onSurfaceVariant;
    const rippleColor =
      customRippleColor ?? color(textColor).alpha(0.32).rgb().string();

    const font = {
      ...fonts.bodyLarge,
      lineHeight: Platform.select({
        ios: 0,
        default: fonts.bodyLarge.lineHeight,
      }),
    };

    return (
      <Surface
        style={[
          { borderRadius: roundness },
          { backgroundColor: theme.colors.elevation.level3 },
          styles.container,
          style,
        ]}
        testID={`${testID}-container`}
        elevation={elevation}
      >
        {/* Actual input */}
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              ...font,
              ...Platform.select({ web: { outline: "none" } }),
            },
            styles.viewModeInput,
            inputStyle,
          ]}
          placeholder={placeholder ?? ""}
          placeholderTextColor={placeholderTextColor}
          selectionColor={theme.colors?.primary}
          underlineColorAndroid="transparent"
          returnKeyType="search"
          keyboardAppearance={dark ? "dark" : "light"}
          accessibilityRole="search"
          ref={root}
          value={value}
          testID={testID}
          {...rest}
        />

        {/* Loading indicator */}
        {loading ? (
          <ActivityIndicator
            testID="activity-indicator"
            style={styles.v3Loader}
          />
        ) : null}

        {/* Right part */}
        {right != null ? (
          right({ color: textColor, style: styles.rightStyle, testID })
        ) : icon != null ? (
          <IconButton
            accessibilityRole="button"
            borderless
            rippleColor={rippleColor}
            onPress={onIconPress}
            iconColor={iconColor}
            icon={icon}
            theme={theme}
            accessibilityLabel={searchAccessibilityLabel}
            testID={`${testID}-icon`}
          />
        ) : null}

        {/* Divider */}
        {showDivider ? (
          <Divider
            bold
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.outline,
              },
            ]}
            testID={`${testID}-divider`}
          />
        ) : null}
      </Surface>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 16,
    alignSelf: "stretch",
    textAlign: I18nManager.getConstants().isRTL ? "right" : "left",
    minWidth: 0,
  },
  viewModeInput: {
    paddingLeft: 0,
    minHeight: 72,
  },
  elevation: {
    elevation: 4,
  },
  loader: {
    margin: 10,
  },
  v3Loader: {
    marginHorizontal: 16,
  },
  rightStyle: {
    marginRight: 16,
  },
  divider: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default ViewBar;
