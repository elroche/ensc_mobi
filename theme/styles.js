import { StyleSheet } from "react-native";

// Common styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontSize: 18, paddingBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1b69bc",
  },
});

// Common stack header options
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#1b69bc",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default styles;
