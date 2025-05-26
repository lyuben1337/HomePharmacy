import { Reminder as ReminderModel } from "@/models/Reminder";
import { ThemedView } from "../shared/ThemedView";
import { ThemedText } from "../shared/ThemedText";
import { NeutralColor, WarningColor } from "@/constants/Colors";
import { hexToRgba } from "@/utils/colors";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import { formatReminderDays } from "@/utils/format-date";
import React, { useContext } from "react";
import { LocaleContext } from "@/context/LocaleContext";
import { useTranslation } from "react-i18next";

type ReminderProps = {
    reminder: ReminderModel;
    onDelete?: () => void;
    onDeactivate?: () => void;
};

export function Reminder({ reminder, onDelete, onDeactivate }: ReminderProps) {
    const backgroundColor = hexToRgba(reminder.isActive ? WarningColor : NeutralColor, 0.2);
    const doseShouldBeTakenColor = reminder.isActive ? WarningColor : NeutralColor;
    const { locale } = useContext(LocaleContext)!;
    const daysLabel = formatReminderDays(reminder.days, locale);
    const { t } = useTranslation();

    const handleLongPress = () => {
        Alert.alert(
            "Опції нагадування",
            "",
            [
                {
                    text: reminder.isActive
                        ? "Зробити неактивним"
                        : "Активувати",
                    onPress: onDeactivate,
                    style: "default",
                },
                {
                    text: "Видалити",
                    onPress: onDelete,
                    style: "destructive",
                },
                { text: "Скасувати", style: "cancel" },
            ]
        );
    };

    return (
        <Pressable onLongPress={handleLongPress}>
            <ThemedView style={styles.container} lightColor={backgroundColor} darkColor={backgroundColor}>
                <View>
                    <ThemedText variant="bold" size="large" lightColor={doseShouldBeTakenColor}>
                        {reminder.doseShouldBeTaken} {t('reminder.dose', { count: reminder.doseShouldBeTaken })}
                    </ThemedText>
                    <ThemedText variant="semibold" style={{ opacity: 0.8 }}>
                        {reminder.times} {daysLabel}
                    </ThemedText>
                </View>
            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between",
    },
});
