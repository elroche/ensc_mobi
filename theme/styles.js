import { StyleSheet } from "react-native";

// Common styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3FF" },
  main: { padding: 10 },
  text: {
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
    color: "#1F3976",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 10,
    padding: 5,
    color: "#1F3976",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  descriptionContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 3,
    paddingHorizontal: 10,
  },
  headerDelimiter: {
    borderBottomColor: "#1F3976",
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 20,
    maxWidth: 200,
  },
  labelDetails: {
    fontWeight: 700,
  },
});

// Common stack header options
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#1F3976",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default styles;
