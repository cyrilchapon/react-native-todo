import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TaskList } from "./components/task-list";
import { Header } from "./components/header";
import { TaskAdderBar } from "./components/task-adder-bar";
import { PaperProvider } from "react-native-paper";
import { SearchBarContainer } from "./components/search-bar-container";

const App = () => {
  return (
    <PaperProvider>
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.subContainer}
      >
        <View style={styles.taskView}>
          <SearchBarContainer />

          <TaskList />

          <TaskAdderBar />
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>

      {/* <SafeAreaProvider>
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
      </SafeAreaProvider> */}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  subContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  taskView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  taskAdderItemContainer: {
    marginTop: "auto",
  },
});

export default App;
