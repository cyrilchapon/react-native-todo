import { FunctionComponent, useState } from "react";
import { StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { tasksSplitAtom } from "../state/todo-tasks";
import { IconButton, MD3Colors, SurfaceProps } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewBar, { ViewBarProps } from "./view-bar";
import { v4 as uuidv4 } from 'uuid'
import useKeyboard from '@rnhooks/keyboard'

export type TaskAdderBarProps = Omit<ViewBarProps, 'value' | 'onChangeText'>;

export const TaskAdderBar: FunctionComponent<TaskAdderBarProps> = (props) => {
  const { style, ...restProps } = props;
  const [value, setValue] = useState("");
  const [, dispatch] = useAtom(tasksSplitAtom);

  const { bottom } = useSafeAreaInsets();
  const [keyboardVisible] = useKeyboard({
    useWillShow: true,
    useWillHide: true,
  })

  return (
    <ViewBar
      // icon={() => null}
      right={() => (
        <IconButton
          icon={"plus"}
          iconColor={MD3Colors.primary50}
          onPress={() => {
            dispatch({
              type: "insert",
              value: {
                id: uuidv4(),
                createdAt: new Date(Date.now()),
                doneAt: null,
                title: value,
              },
            });
            setValue("");
          }}
          disabled={!value}
        />
      )}
      // inputStyle={{ paddingLeft: 0, marginLeft: 0 }}
      // style={{ paddingLeft: 0, marginLeft: 0 }}
      value={value}
      onChangeText={setValue}
      placeholder="Save the world"
      showDivider={false}
      style={{ paddingBottom: !keyboardVisible ? bottom : null }}
    />
  );
};
