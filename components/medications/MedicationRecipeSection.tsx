import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Modal, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/shared/ThemedText";
import { ThemedButton } from "@/components/shared/ThemedButton";
import { RecipeIcon } from "@/components/shared/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedModal from "../shared/ThemedModal";

type Props = {
    recipeUri?: string;
    onChange?: (uri?: string) => void;
};

export function MedicationRecipeSection({ recipeUri, onChange }: Props) {
    const { t } = useTranslation();
    const textColor = useThemeColor("text");
    const [localUri, setLocalUri] = useState<string | undefined>(recipeUri);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setLocalUri(recipeUri);
    }, [recipeUri]);

    // Request permissions
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(t("permissions.cameraRollRequired"));
                }
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraStatus.status !== "granted") {
                    Alert.alert(t("permissions.cameraRequired"));
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setLocalUri(result.assets[0].uri);
                onChange?.(result.assets[0].uri);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                setLocalUri(result.assets[0].uri);
                onChange?.(result.assets[0].uri);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleAdd = () => {
        Alert.alert(
            t("medication.add-recipe"),
            "",
            [
                { text: t("shared.camera"), onPress: takePhoto },
                { text: t("shared.gallery"), onPress: pickImage },
                { text: t("shared.cancel"), style: "cancel" },
            ],
            { cancelable: true }
        );
    };

    const handleView = () => setModalVisible(true);
    const handleDelete = () => {
        Alert.alert(
            t("medication.deleteRecipeTitle"),
            t("medication.deleteRecipeMessage"),
            [
                { text: t("shared.cancel"), style: "cancel" },
                {
                    text: t("shared.delete"),
                    style: "destructive",
                    onPress: () => {
                        setLocalUri(undefined);
                        onChange?.(undefined);
                        setModalVisible(false);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleView}>
                    <RecipeIcon size={28} color={textColor} />
                    <ThemedText size="xl" variant="bold">
                        {t("medication.recipe")}
                    </ThemedText>
                </View>
            </View>

            {localUri ? (
                <ThemedButton
                    label={t("shared.view")}
                    onPress={handleView}
                    style={styles.recipeButton}
                />
            ) : (
                <ThemedButton
                    label={t("shared.add")}
                    onPress={handleAdd}
                    style={styles.recipeButton}
                />
            )}

            <ThemedModal
                variant="medium"
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={t("medication.recipe")}
            >
                <View style={styles.modalContainer}>
                    {localUri && (
                        <Image source={{ uri: localUri }} style={styles.imagePreview} />
                    )}
                    <View style={styles.modalButtons}>
                        <ThemedButton label={t("shared.delete")} onPress={handleDelete} />
                    </View>
                </View>
            </ThemedModal>
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
    recipeButton: {
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePreview: {
        width: "100%",
        height: "85%",
        resizeMode: "contain",
        marginBottom: 12,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
});
