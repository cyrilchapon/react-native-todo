import { FunctionComponent } from "react";
import { useAtom } from "jotai";
import { settingsAtom } from "../state/settings";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";
import { Menu } from "../components/menu";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export const Header: FunctionComponent = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <Appbar.Header mode="small" elevated>
      <Appbar.Content title="Todo" />
      <Appbar.Action
        icon={settings.showDone ? "archive-eye" : "archive-eye-outline"}
        onPress={() =>
          setSettings((prevSettings) => ({
            ...prevSettings,
            showDone: !prevSettings.showDone,
          }))
        }
      />
      <Appbar.Action
        icon="magnify"
        onPress={() =>
          setSettings((prevSettings) => ({
            ...prevSettings,
            searching: !prevSettings.searching,
          }))
        }
      />
      <Menu
        anchor={
          <Appbar.Action
            icon={MORE_ICON}
            onPress={() =>
              setSettings((prevSettings) => ({
                ...prevSettings,
                menuOpen: !prevSettings.menuOpen,
              }))
            }
          />
        }
        anchorPosition="bottom"
      />
    </Appbar.Header>
  );
};
