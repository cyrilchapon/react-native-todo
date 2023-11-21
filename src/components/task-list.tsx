import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { filteredTasksSplitAtom } from "../state/todo-tasks";
import { TaskListItem } from "./task-list-item";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

export const TaskList: FunctionComponent = (props) => {
  const [tasksAtoms] = useAtom(filteredTasksSplitAtom);

  return (
    <FlatList
      contentContainerStyle={styles.mainView}
      data={tasksAtoms}
      renderItem={({ item: taskAtom, separators }) => (
        <TaskListItem
          key={`${taskAtom}`}
          taskAtom={taskAtom}
        />
      )}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 10,
  },
});
