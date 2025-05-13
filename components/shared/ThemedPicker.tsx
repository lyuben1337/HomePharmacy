import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker, PickerProps } from "@react-native-picker/picker";

export default function ThemedPicker({
  style,
  children,
  ...rest
}: PickerProps) {
  const themeStyle = {
    backgroundColor: useThemeColor("background"),
    color: useThemeColor("text"),
  };

  return (
    <Picker style={[style, themeStyle, styles.default]} {...rest}>
      {children}
    </Picker>
  );
}

const styles = StyleSheet.create({
  default: {
    width: "100%",
  },
});
