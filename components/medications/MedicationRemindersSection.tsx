import { View, StyleSheet } from "react-native";
import { Reminder as ReminderModel } from "@/models/Reminder";
import { Reminder } from "@/components/medications/Reminder";
import { ThemedText } from "@/components/shared/ThemedText";
import { PlusButton } from "@/components/shared/PlusButton";
import { BellIcon } from "@/components/shared/Icons";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    reminders: ReminderModel[];
};

export function MedicationRemindersSection({ reminders }: Props) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleView}>
                    <BellIcon size={28} color={textColor} />
                    <ThemedText size="xl" variant="bold">
                        {t("medication.reminders")}
                    </ThemedText>
                </View>
                <PlusButton />
            </View>
            <View style={styles.remindersView}>
                {reminders.map((reminder, index) => (
                    <Reminder key={index} reminder={reminder} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { gap: 16 },
    sectionHeader: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "space-between",
    },
    sectionTitleView: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    remindersView: {
        gap: 12,
    },
});
