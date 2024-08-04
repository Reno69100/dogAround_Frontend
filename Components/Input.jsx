import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";


// Input Component
export function Input({ value, onChangeText, placeholder }) {

    return (
      <View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    height: "5%",
    width: "80%",
    borderRadius: "8px",
  },
});
