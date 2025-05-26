import { useState } from "react";
import { Platform, Pressable, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ThemedModal from "@/components/shared/ThemedModal";
import ThemedInput from "@/components/shared/ThemedInput";
import { ThemedButton } from "@/components/shared/ThemedButton";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (data: { doseCount: number; expiration_date: string }) => void;
};

export function MedicationUnitModal({ visible, onClose, onSave }: Props) {
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);
    const [doseCount, setDoseCount] = useState("");

    const handleSubmit = () => {
        if (!expirationDate) return;
        const isoDate = expirationDate.toISOString().split("T")[0]; // YYYY-MM-DD
        onSave({
            expiration_date: isoDate,
            doseCount: Number(doseCount),
        });
        setDoseCount("");
        setExpirationDate(null);
        onClose();
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setExpirationDate(selectedDate);
        }
    };

    return (
        <ThemedModal title="Додати одиницю" isVisible={visible} onClose={onClose} variant="medium">
            <ThemedInput placeholder="Кількість" value={doseCount} onChangeText={setDoseCount} keyboardType="numeric" />

            <ThemedInput
                placeholder="Дата закінчення (YYYY-MM-DD)"
                value={expirationDate ? expirationDate.toISOString().split("T")[0] : ""}
                editable={false}
                pointerEvents="none"
            />

            <DateTimePicker
                style={{ marginHorizontal: 'auto' }}
                value={expirationDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
            />

            <ThemedButton label="Додати" onPress={handleSubmit} />
        </ThemedModal>
    );
}
