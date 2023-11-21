import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TaskList } from "./components/task-list";
import { Header } from "./components/header";
import { TaskAdderBar } from "./components/task-adder-bar";
import { PaperProvider, Surface } from "react-native-paper";
import { useAtom } from "jotai";
import { settingsAtom } from "./state/settings";
import { SearchBar } from "./components/search-bar";
import { Menu } from "./components/menu";

const App = () => {
  const [{ searching, menuOpen }] = useAtom(settingsAtom);

  return (
    <PaperProvider>
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.subContainer}
      >
        <View style={styles.taskView}>
          {searching ? <SearchBar /> : null}

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
