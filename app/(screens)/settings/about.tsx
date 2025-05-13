import { ThemedView } from "@/components/shared/ThemedView";
import { StyleSheet } from "react-native";
import { nativeApplicationVersion } from "expo-application";
import { ThemedText } from "@/components/shared/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          title: t("settings.title.about"),
          headerBackTitle: t("screens.settings"),
        }}
      />
      <ThemedView variant="background" style={styles.container}>
        <ThemedText>LimasAssist {nativeApplicationVersion}</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
