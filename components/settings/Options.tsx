import Option from "@/components/settings/Option";
import { Divider } from "@/components/shared/Divider";
import { StyleSheet, View } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/shared/ThemedView";

type OptionsProps<T extends React.Key> = {
  collection: Array<{ key: T; title: string; subtitle?: string }>;
  selected: (key: T) => boolean;
  onSelect: (key: T) => void;
};

export function Options<T extends React.Key>({
  collection,
  selected,
  onSelect,
}: OptionsProps<T>) {
  return (
    <ThemedView>
      {collection.map(({ key, title, subtitle }) => (
        <React.Fragment key={key}>
          <Option
            title={title}
            subtitle={subtitle}
            onPress={() => onSelect(key)}
            selected={selected(key)}
          />
          {key !== collection[collection.length - 1].key && (
            <Divider style={styles.divider} />
          )}
        </React.Fragment>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 12,
    marginVertical: 2,
  },
});
