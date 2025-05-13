import React from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedPressable } from "./ThemedPressable";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Divider } from "./Divider";
import { PrimaryColor } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { PlusButton } from "./PlusButton";

type ThemedListProps<T> = {
    items: T[];
    getLabel: (item: T) => string;
    onItemPress?: (item: T) => void;
    newItemPress?: () => void;
    containerStyle?: ViewStyle;
};

export function ThemedList<T>({
    items,
    getLabel,
    onItemPress,
    newItemPress,
    containerStyle,
}: ThemedListProps<T>) {
    const { t } = useTranslation();

    return (
        <ThemedView variant="view" style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <ThemedText size="large" variant="semibold" style={{ opacity: 0.5 }}>
                    {t("shared.record", { count: items.length })}
                </ThemedText>
                <PlusButton onPress={newItemPress} />
            </View>
            <Divider height={1.5} style={styles.divider} />
            <FlatList
                data={items}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                renderItem={({ item, index }) => (
                    <ThemedPressable
                        onPress={() => onItemPress?.(item)}
                        style={styles.item}
                    >
                        <View style={styles.itemContent}>
                            <ThemedText size="large" variant="semibold" style={styles.itemIndex}>
                                {index + 1}
                            </ThemedText>
                            <ThemedText size="large" variant="semibold" style={styles.itemLabel}>
                                {getLabel(item)}
                            </ThemedText>
                        </View>
                    </ThemedPressable>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    header: {
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    item: {
        width: "100%",
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    divider: {
        marginHorizontal: 12,
        marginVertical: 2,
    },
    itemContent: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    itemIndex: {
        width: 24,
        textAlign: "right",
        marginRight: 8,
        color: PrimaryColor,
    },
    itemLabel: {
        flex: 1,
    },
});
