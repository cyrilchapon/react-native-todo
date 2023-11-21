import { FunctionComponent, useState } from "react";
import { StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { tasksSplitAtom } from "../state/todo-tasks";
import {
  IconButton,
  MD3Colors,
  Surface,
  SurfaceProps,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TaskAdderBarProps = Omit<SurfaceProps, "children">;

export const TaskAdderBar: FunctionComponent<TaskAdderBarProps> = (props) => {
  const { style, ...restProps } = props;
  const [value, setValue] = useState("");
  const [, dispatch] = useAtom(tasksSplitAtom);

  const { bottom } = useSafeAreaInsets()

  return (
    <Surface {...restProps} style={[style, styles.taskAdderBar, { paddingBottom: bottom }]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        mode="outlined"
        style={styles.taskAdderInput}
        placeholder="Save the world"
      />

      <IconButton
        icon="plus"
        iconColor={MD3Colors.primary50}
        size={30}
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
      />
    </Surface>
  )
};

const styles = StyleSheet.create({
  taskAdderBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskAdderInput: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 10,
  },
});
