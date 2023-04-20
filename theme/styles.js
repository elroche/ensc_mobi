import { StyleSheet } from "react-native";

// Common styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  text: { fontSize: 18, paddingBottom: 10 },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 10,
    padding: 5,
    color: "#1b69bc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  descriptionContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  labelDetails: {
    fontWeight: 700,
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
