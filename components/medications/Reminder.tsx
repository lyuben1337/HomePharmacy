import { Reminder as ReminderModel } from "@/models/Reminder"
import { ThemedView } from "../shared/ThemedView";
import { ThemedText } from "../shared/ThemedText";
import { NeutralColor, WarningColor } from "@/constants/Colors";
import { hexToRgba } from "@/utils/colors";
import { StyleSheet } from "react-native";
import { formatReminderDays } from "@/utils/format-date";
import { useContext } from "react";
import { LocaleContext } from "@/context/LocaleContext";
import { useTranslation } from "react-i18next";

type ReminderProps = {
    reminder: ReminderModel;
}

export function Reminder({ reminder }: ReminderProps) {
    const backgroundColor = hexToRgba(reminder.isActive ? WarningColor : NeutralColor, 0.2);
    const doseShouldBeTakenColor = reminder.isActive ? WarningColor : NeutralColor;
    const { locale } = useContext(LocaleContext)!;
    const daysLabel = formatReminderDays(reminder.days, locale);
    const { t } = useTranslation();

    return (
        <ThemedView style={styles.container} lightColor={backgroundColor} darkColor={backgroundColor}>
            <ThemedText variant="bold" size="large" lightColor={doseShouldBeTakenColor} darkColor={doseShouldBeTakenColor}>
                {reminder.doseShouldBeTaken} {t('reminder.dose', { count: reminder.doseShouldBeTaken })}
            </ThemedText>
            <ThemedText variant="semibold" style={{ opacity: 0.8 }}>
                {reminder.times} {daysLabel}
            </ThemedText>
        </ThemedView>
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