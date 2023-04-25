import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GENRE } from "../api/global";
import { Picker } from "@react-native-picker/picker";

const GenrePicker = ({ selectedGenre, onSelectGenre }) => {
  return (
    <View style={styles.genreSelect}>
      <Text style={styles.genreTitle}>Rechercher par genre :</Text>
      <Picker
        itemStyle={styles.picker}
        selectedValue={selectedGenre}
        onValueChange={(itemValue) => onSelectGenre(itemValue)}
      >
        <Picker.Item label="Tous" value="all" />
        {GENRE.map((genre, index) => (
          <Picker.Item key={index} label={genre} value={genre} />
        ))}
      </Picker>
    </View>
  );
};

export default GenrePicker;

const styles = StyleSheet.create({
  genreSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  genreTitle: {
    fontSize: 17,
  },
  picker: {
    width: 170,
    height: 110,
    fontSize: 16,
    fontWeight:"500"
  },
});
