import { StyleSheet, ViewStyle } from "react-native";
import { PrimaryColor } from "@/constants/Colors";
import { ThemedText } from "@/components/shared/ThemedText";
import { ThemedPressable } from "@/components/shared/ThemedPressable";

type ThemedButtonProps = {
  label: string;
  onPress?: () => void;
  size?: "default";
  variant?: "default";
  style?: ViewStyle;
  disabled?: boolean;
};

export function ThemedButton({
  label,
  onPress,
  size = "default",
  variant = "default",
  disabled = false,
  style,
}: ThemedButtonProps) {
  const disabledStyle: ViewStyle = { opacity: 0.5 };

  return (
    <ThemedPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        sizeStyles[size],
        variantStyles[variant],
        disabled && disabledStyle,
        style,
      ]}
    >
      <ThemedText
        size={size}
        variant="semibold"
        lightColor="#fff"
        darkColor="#fff"
      >
        {label}
      </ThemedText>
    </ThemedPressable>
  );
}

const sizeStyles = StyleSheet.create({
  default: {
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: PrimaryColor,
  },
});
