import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

import { robotSchema, Robot, RobotType } from "@/validation/tp4-robots-rtk/robotSchema";
import { useAppDispatch } from "@/app/(tp4-robots-rtk)/hooks";
import { createRobot, updateRobot } from "@/features/robots/tp4-robots-rtk/robotsSlice";

interface RobotFormProps {
    initialValues?: Robot;        // si fourni → édition
    onSubmitSuccess?: () => void;
}

const RobotForm: React.FC<RobotFormProps> = ({ initialValues, onSubmitSuccess }) => {
    const dispatch = useAppDispatch();
    const isEdit = Boolean(initialValues);

    return (
        <Formik
            initialValues={
                initialValues || {
                    name: "",
                    label: "",
                    year: new Date().getFullYear(),
                    type: "industrial" as RobotType,
                }
            }
            // En création, on ne valide pas l'id (il sera généré côté slice)
            validationSchema={isEdit ? robotSchema : robotSchema.omit(["id"])}
            onSubmit={(values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    if (isEdit && initialValues) {
                        // Edition : on repasse l'id existant + le reste
                        const payload: Robot = { ...(values as Robot), id: initialValues.id };
                        dispatch(updateRobot(payload));
                    } else {
                        // Création : on envoie Omit<Robot, "id"> ; l'id est généré dans le slice
                        const { name, label, year, type } = values as Omit<Robot, "id">;
                        dispatch(createRobot({ name, label, year, type }));
                    }

                    resetForm();
                    onSubmitSuccess?.();
                } catch (err: any) {
                    setErrors({ name: err.message });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={{ gap: 12, padding: 16 }}>
                    <Text>Nom</Text>
                    <TextInput
                        style={{ borderWidth: 1, padding: 8 }}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                    />
                    {touched.name && !!errors.name && <Text style={{ color: "red" }}>{String(errors.name)}</Text>}

                    <Text>Label</Text>
                    <TextInput
                        style={{ borderWidth: 1, padding: 8 }}
                        onChangeText={handleChange("label")}
                        onBlur={handleBlur("label")}
                        value={values.label}
                    />
                    {touched.label && !!errors.label && <Text style={{ color: "red" }}>{String(errors.label)}</Text>}

                    <Text>Année</Text>
                    <TextInput
                        style={{ borderWidth: 1, padding: 8 }}
                        keyboardType="numeric"
                        onChangeText={handleChange("year")}
                        onBlur={handleBlur("year")}
                        value={String(values.year)}
                    />
                    {touched.year && !!errors.year && <Text style={{ color: "red" }}>{String(errors.year)}</Text>}

                    <Text>Type</Text>
                    <Picker
                        selectedValue={values.type}
                        onValueChange={(val) => setFieldValue("type", val)}
                    >
                        <Picker.Item label="Industriel" value="industrial" />
                        <Picker.Item label="Service" value="service" />
                        <Picker.Item label="Médical" value="medical" />
                        <Picker.Item label="Éducatif" value="educational" />
                        <Picker.Item label="Autre" value="other" />
                    </Picker>
                    {touched.type && !!errors.type && <Text style={{ color: "red" }}>{String(errors.type)}</Text>}

                    <Button title={isEdit ? "Mettre à jour" : "Créer"} onPress={() => handleSubmit()} />
                </View>
            )}
        </Formik>
    );
};

export default RobotForm;
