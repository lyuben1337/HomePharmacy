import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { NeutralColor } from "@/constants/Colors";

export default function ThemedInput({
  style,
  multiline,
  editable = true,
  ...rest
}: TextInputProps) {
  const themeStyle = {
    backgroundColor: useThemeColor("background"),
    color: useThemeColor("text"),
  };

  const heightStyle: TextStyle = { height: multiline ? 120 : 48 };
  const disabledStyle: TextStyle = { opacity: 0.6 };

  return (
    <TextInput
      style={[
        style,
        themeStyle,
        heightStyle,
        !editable && disabledStyle,
        styles.default,
      ]}
      placeholderTextColor={NeutralColor}
      multiline={multiline}
      editable={editable}
      textAlignVertical={multiline ? "top" : "center"}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    width: "100%",
    fontSize: 16,
    lineHeight: 20,
    padding: 10,
  },
});
