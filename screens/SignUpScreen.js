import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={this.handleFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={this.handleLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        onChangeText={this.handleEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={this.handlePassword}
      />
      <Button text="Créer mon compte" onPress={() => test()} />
    </View>
  );
};

export default SignUpScreen;

const styleScreen = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
  },
});
