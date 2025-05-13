import { useThemeColor } from "@/hooks/useThemeColor";
import { View, ViewStyle } from "react-native";
import React from "react";

type DividerProps = {
  style?: ViewStyle;
  height?: number;
};

export function Divider({ style, height = 1 }: DividerProps) {
  const dividerColor = useThemeColor("divider");

  return <View style={[{ backgroundColor: dividerColor, height: height }, style]} />;
}
