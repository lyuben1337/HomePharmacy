import { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import ThemedModal from "../shared/ThemedModal";
import ThemedInput from "../shared/ThemedInput";
import { ThemedButton } from "../shared/ThemedButton";
import { ThemedText } from "../shared/ThemedText";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (data: { times: string; days: string[]; dose: number }) => void;
};

export function ReminderModal({ visible, onClose, onSave }: Props) {
    const [times, setTimes] = useState("");
    const [dose, setDose] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = () => {
        if (!times || selectedDays.length === 0 || !dose) return;
        onSave({ times, days: selectedDays, dose: Number(dose) });
        setTimes("");
        setDose("");
        setSelectedDays([]);
        onClose();
    };

    return (
        <ThemedModal title="Додати нагадування" isVisible={visible} onClose={onClose} variant="medium">
            <ThemedInput placeholder="Час (наприклад: 08:00,20:00)" value={times} onChangeText={setTimes} />
            <ThemedInput placeholder="Кількість доз" value={dose} onChangeText={setDose} keyboardType="numeric" />
            <View style={styles.daysContainer}>
                {WEEK_DAYS.map(day => (
                    <Pressable
                        key={day}
                        onPress={() => toggleDay(day)}
                        style={[
                            styles.day,
                            selectedDays.includes(day) && styles.daySelected,
                        ]}
                    >
                        <ThemedText>{day}</ThemedText>
                    </Pressable>
                ))}
            </View>
            <ThemedButton label="Зберегти" onPress={handleSubmit} />
        </ThemedModal>
    );
}

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginVertical: 12,
    },
    day: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#ccc",
    },
    daySelected: {
        backgroundColor: "#ffcc66",
    },
});
