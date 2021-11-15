import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import defaultStyle from "../store/defaultStyle";

interface IProps {
  icon: string;
  width: string;
  onChangeText:(text:string)=>void;
}

function AppTextInput({ icon, width="100%", ...otherProps }) {
  return (
    <View style={[styles.container, {width}]}>
      {icon && (
        <AntDesign
          name={icon}
          size={20}
          color={defaultStyle.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyle.colors.medium}
        style={defaultStyle.text}
        {...otherProps}
        width={width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyle.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
