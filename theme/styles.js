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
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
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
