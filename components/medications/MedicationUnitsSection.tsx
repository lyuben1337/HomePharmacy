import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { MedicalKitIcon } from "../shared/Icons";
import { ThemedText } from "../shared/ThemedText";
import { PlusButton } from "../shared/PlusButton";
import { MedicationUnit } from "./MedicationUnit";
import { MedicationUnit as MedicationUnitModel } from "@/models/MedicationUnit";

export function MedicationUnitsSection({ units }: { units: MedicationUnitModel[] }) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <MedicalKitIcon size={32} color={textColor} />
                    <ThemedText size="xl" variant="bold">{t("medication.units")}</ThemedText>
                </View>
                <PlusButton />
            </View>
            <View style={styles.units}>
                {units.map((unit, index) => <MedicationUnit key={index} unit={unit} />)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: { gap: 16 },
    header: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16 },
    title: { flexDirection: "row", gap: 16, alignItems: "center" },
    units: { flexDirection: "row", flexWrap: "wrap", gap: 19 },
});
