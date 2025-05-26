import { View, StyleSheet } from "react-native";
import { Reminder as ReminderModel } from "@/models/Reminder";
import { Reminder } from "@/components/medications/Reminder";
import { ThemedText } from "@/components/shared/ThemedText";
import { PlusButton } from "@/components/shared/PlusButton";
import { BellIcon } from "@/components/shared/Icons";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReminderModal } from "./ReminderModal";
import { useState } from "react";
import { ReminderRepository } from "@/repositories/ReminderRepository";
import { MedicationRepository } from "@/repositories/MedicationRepository";
import { useNotifications } from "@/context/NotificationContext";


type Props = {
    medicationId: number;
    reminders: ReminderModel[];
    onRemindersChange: (newReminders: ReminderModel[]) => void;
};

export function MedicationRemindersSection({ reminders: initialReminders, onRemindersChange, medicationId }: Props) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");
    const [modalVisible, setModalVisible] = useState(false);
    const [reminders, setReminders] = useState(initialReminders);
    const repository = new ReminderRepository();
    const { syncNotifications } = useNotifications();

    const handleSaveReminder = async (data: { times: string; days: string[]; dose: number }) => {
        if (!medicationId) return;

        const newReminder = {
            medicationId: medicationId,
            times: data.times,
            days: data.days.join(","),
            doseShouldBeTaken: data.dose,
            startDate: new Date().toISOString().split("T")[0],
            endDate: undefined,
            isActive: true,
            notes: "",
        };

        await repository.create(newReminder);
        const updated = await (new MedicationRepository()).getById(medicationId);
        setReminders(updated!.reminders);
        await syncNotifications();
        onRemindersChange?.(updated!.reminders);
    };

    const handleDeleteReminder = async (id: number) => {
        await repository.deleteById(id); // Видалення з бази
        const updated = reminders.filter(r => r.id !== id);
        setReminders(updated);
        await syncNotifications();
        onRemindersChange?.(updated);
    };

    const handleDeactivateReminder = async (id: number) => {
        const reminder = reminders.find(r => r.id === id);
        if (!reminder) return;

        const updatedReminder = { ...reminder, isActive: !reminder.isActive };
        await repository.update(id, { isActive: updatedReminder.isActive });

        const updated = reminders.map(r => (r.id === id ? updatedReminder : r));
        setReminders(updated);
        await syncNotifications();
        onRemindersChange?.(updated);
    };


    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleView}>
                    <BellIcon size={28} color={textColor} />
                    <ThemedText size="xl" variant="bold">
                        {t("medication.reminders")}
                    </ThemedText>
                </View>
                <PlusButton onPress={() => setModalVisible(true)} />
            </View>
            <View style={styles.remindersView}>
                {reminders.map(reminder => (
                    <Reminder
                        key={reminder.id}
                        reminder={reminder}
                        onDelete={() => handleDeleteReminder(reminder.id!)}
                        onDeactivate={() => handleDeactivateReminder(reminder.id!)}
                    />
                ))}
            </View>
            <ReminderModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveReminder}
            />
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
