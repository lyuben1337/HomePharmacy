import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Alert } from "react-native";
import { MedicalKitIcon } from "../shared/Icons";
import { ThemedText } from "../shared/ThemedText";
import { PlusButton } from "../shared/PlusButton";
import { MedicationUnit } from "./MedicationUnit";
import { MedicationUnit as MedicationUnitModel } from "@/models/MedicationUnit";
import { MedicationRepository } from "@/repositories/MedicationRepository";
import { useState } from "react";
import { MedicationUnitModal } from "./MedicationUnitModal";

type Props = {
    medicationId: number;
    units: MedicationUnitModel[];
    onUnitsChange: (newUnits: MedicationUnitModel[]) => void;
};

export function MedicationUnitsSection({ medicationId, units, onUnitsChange }: Props) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");
    const repository = new MedicationRepository();

    const [modalVisible, setModalVisible] = useState(false);

    const handleAddUnit = async (newUnit: { doseCount: number, expiration_date: string }) => {
        await repository.addUnit(medicationId, newUnit);
        const updated = await repository.getById(medicationId);
        onUnitsChange(updated!.medicationUnits);
    };

    const handleDeleteUnit = async (unitId: number) => {
        Alert.alert(
            t("Видалити одиницю?"),
            "",
            [
                { text: "Скаусвати", style: "cancel" },
                {
                    text: "Видалити",
                    style: "destructive",
                    onPress: async () => {
                        await repository.deleteUnit(unitId);
                        const updated = await repository.getById(medicationId);
                        onUnitsChange(updated!.medicationUnits);
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <MedicalKitIcon size={32} color={textColor} />
                    <ThemedText size="xl" variant="bold">{t("medication.units")}</ThemedText>
                </View>
                <PlusButton onPress={() => setModalVisible(true)} />
            </View>
            <View style={styles.units}>
                {units.map((unit) => (
                    <MedicationUnit
                        key={unit.id}
                        unit={unit}
                        onLongPress={() => handleDeleteUnit(unit.id!)}
                    />
                ))}
            </View>
            <MedicationUnitModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleAddUnit}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    section: { gap: 16 },
    header: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16 },
    title: { flexDirection: "row", gap: 16, alignItems: "center" },
    units: { flexDirection: "row", flexWrap: "wrap", gap: 19 },
});
