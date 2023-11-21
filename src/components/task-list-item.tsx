import { PrimitiveAtom, useAtom } from "jotai";
import {
  FunctionComponent,
  PropsWithChildren,
  createRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { TodoTask, tasksSplitAtom } from "../state/todo-tasks";
import { StyleSheet, Pressable, TextInput, View } from "react-native";
import { List, ListItemProps } from "react-native-paper";
import { format } from "date-fns";
import { settingsAtom } from "../state/settings";

export type TaskListItemProps = Omit<
  ListItemProps,
  "title" | "description" | "left"
> & {
  taskAtom: PrimitiveAtom<TodoTask>;
};

export const TaskListItem: FunctionComponent<TaskListItemProps> = (props) => {
  const { taskAtom, ...restProps } = props;
  const [, dispatch] = useAtom(tasksSplitAtom);
  const [todo, setTodo] = useAtom(taskAtom);
  const [{ showDone }] = useAtom(settingsAtom)

  const [editing, setEditing] = useState(false);

  // const inputRef = useRef<
  //   (TextInput & PropsWithChildren<ListItemInputProps>) | null
  // >(null);

  // const focusInput = useCallback(() => {
  //   setImmediate(() => {
  //     console.log("pouet");
  //     console.log(inputRef.current);
  //     if (inputRef.current != null) {
  //       inputRef.current.focus();
  //     }
  //   });
  // }, [inputRef]);

  return (
    <List.Item
      title={todo.title}
      description={
        todo.doneAt != null
          ? `Terminé le ${todo.doneAt.toLocaleDateString()} à ${todo.doneAt.toLocaleTimeString()}`
          : `Créé le ${todo.createdAt.toLocaleDateString()} à ${todo.createdAt.toLocaleTimeString()}`
      }
      left={showDone ? (props) => (
        <List.Icon
          {...props}
          icon={todo.doneAt != null ? "radiobox-marked" : "radiobox-blank"}
        />
      ) : undefined}
      onPress={() =>
        setTodo((prevTodo) => ({
          ...prevTodo,
          doneAt: prevTodo.doneAt == null ? new Date(Date.now()) : null,
        }))
      }
    />
    // <ListItem.Swipeable
    //   {...restProps}
    //   leftContent={(reset) => (
    //     <Button
    //       onPress={() => {
    //         setEditing(true);
    //         focusInput();
    //         reset();
    //       }}
    //       icon={{ name: "pen", type: "font-awesome-5", size: 15 }}
    //       type="clear"
    //       buttonStyle={{ minHeight: "100%", backgroundColor: "#f4f4f4" }}
    //     />
    //   )}
    //   rightContent={(reset) => (
    //     <Button
    //       title="Delete"
    //       onPress={() => {
    //         dispatch({ type: "remove", atom: taskAtom });
    //         reset();
    //       }}
    //       icon={{ name: "delete", color: "white" }}
    //       buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
    //     />
    //   )}
    //   onPress={() =>
    //     setTodo((prevTodo) => ({ ...prevTodo, done: !prevTodo.done }))
    //   }
    //   disabled={editing}
    // >
    //   <ListItem.CheckBox
    //     checkedIcon={
    //       <Icon
    //         name="radio-button-checked"
    //         type="material"
    //         // color="grey"
    //         size={25}
    //         iconStyle={{ marginLeft: 10 }}
    //       />
    //     }
    //     uncheckedIcon={
    //       <Icon
    //         name="radio-button-unchecked"
    //         type="material"
    //         // color="grey"
    //         size={25}
    //         iconStyle={{ marginLeft: 10 }}
    //       />
    //     }
    //     checked={todo.done}
    //     disabled={editing}
    //     disabledStyle={{ opacity: 0.5 }}
    //     onPress={() =>
    //       setTodo((prevTodo) => ({ ...prevTodo, done: !prevTodo.done }))
    //     }
    //   />

    //   <ListItem.Content>
    //     {editing ? (
    //       <ListItem.Input
    //         textAlign="left"
    //         style={{ fontSize: 17 }}
    //         containerStyle={{ paddingLeft: 0, marginLeft: 0 }}
    //         allowFontScaling={false}
    //         maxFontSizeMultiplier={1}
    //         ref={inputRef}
    //       >
    //         {todo.title}
    //       </ListItem.Input>
    //     ) : (
    //       <ListItem.Title>{todo.title}</ListItem.Title>
    //     )}
    //   </ListItem.Content>

    //   <>
    //     {editing ? (
    //       <Pressable
    //         style={({ pressed }) =>
    //           pressed
    //             ? { ...styles.rightIcon, opacity: 0.8 }
    //             : { ...styles.rightIcon, opacity: 1 }
    //         }
    //         hitSlop={10}
    //         onPress={() => setEditing(false)}
    //       >
    //         <Icon size={18} name="check" type="font-awesome-5" />
    //       </Pressable>
    //     ) : null}
    //   </>
    // </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  rightIcon: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    minWidth: 25,
  },
});
