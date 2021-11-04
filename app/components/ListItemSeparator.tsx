import React from "react";
import { View, StyleSheet } from "react-native";
import defaultStyle from "../store/defaultStyle";

import colors from "../store/defaultStyle";

export default function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: defaultStyle.colors.danger,
  },
});
