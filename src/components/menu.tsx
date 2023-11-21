import { FunctionComponent, useCallback } from "react";
import { useAtom } from "jotai";
import { menuAtom } from "../state/settings";
import {
  Button,
  Divider,
  Menu as _Menu,
  MenuProps as _MenuProps,
} from "react-native-paper";
import { clearDoneTasksAtom } from "../state/todo-tasks";

export type MenuProps = Omit<_MenuProps, "children" | "visible" | "theme">;

export const Menu: FunctionComponent<MenuProps> = (props) => {
  const [menuOpen, setMenuOpen] = useAtom(menuAtom);
  const [, clearDoneTasks] = useAtom(clearDoneTasksAtom);

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  return (
    <_Menu {...props} visible={menuOpen} onDismiss={closeMenu}>
      <_Menu.Item
        leadingIcon="archive-remove"
        onPress={() => {
          clearDoneTasks();
          closeMenu();
        }}
        title="Supprimer les terminés"
      />
    </_Menu>
  );
};
