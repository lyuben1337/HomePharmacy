import React, { ReactNode, useRef } from "react";
import {
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  GestureResponderEvent,
  View,
} from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { PrimaryColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

type Variant = "default" | "icon";

type AnimatedPressableProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  variant?: Variant;
};

export function ThemedPressable({
  children,
  onPress,
  style,
  disabled = false,
  variant = "default",
}: AnimatedPressableProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const borderColor = useThemeColor("border");

  const handlePress = (to: number) =>
    Animated.timing(anim, {
      toValue: to,
      duration: 150,
      useNativeDriver: false,
    }).start();

  const shared = {
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.3] }),
    scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }),
    outlineOpacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
  };

  const variantConfig: Record<
    Variant,
    {
      wrapperStyle?: ViewStyle;
      animatedOverlay?: () => ReactNode;
    }
  > = {
    icon: {
      wrapperStyle: styles.iconSize,
      animatedOverlay: () => (
        <Animated.View
          style={[
            styles.absoluteFill,
            {
              backgroundColor: PrimaryColor,
              opacity: shared.opacity,
              borderRadius: 999,
            },
          ]}
        />
      ),
    },
    default: {
      wrapperStyle: styles.fullWidth,
      animatedOverlay: () => (
        <Animated.View
          style={[
            styles.absoluteFill,
            {
              backgroundColor: borderColor,
              opacity: shared.outlineOpacity,
            },
          ]}
        />
      ),
    },
    // 🟨 Нові варіанти додаються тут
    // fancy: {
    //   wrapperStyle: { borderWidth: 1, borderColor: "gold" },
    //   animatedOverlay: () => null,
    // },
  };

  const config = variantConfig[variant];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => handlePress(1)}
      onPressOut={() => handlePress(0)}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.base,
          config?.wrapperStyle,
          variant === "icon" && { transform: [{ scale: shared.scale }] },
          style,
        ]}
      >
        {config?.animatedOverlay?.()}
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  fullWidth: {
    width: "100%",
  },
  iconSize: {
    width: 36,
    height: 36,
    borderRadius: 999,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
