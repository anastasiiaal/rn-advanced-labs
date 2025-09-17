import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

import { robotSchema, Robot, RobotType } from "@/validation/tp4-robots/robotSchema";
import { useRobotsStore } from "@/store/tp4-robots/robotsStore";

interface RobotFormProps {
    initialValues?: Robot;        // si fourni → édition
    onSubmitSuccess?: () => void;
}

const RobotForm: React.FC<RobotFormProps> = ({ initialValues, onSubmitSuccess }) => {
    const createRobot = useRobotsStore((s) => s.createRobot);
    const updateRobot = useRobotsStore((s) => s.updateRobot);

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
            validationSchema={robotSchema.omit(["id"])}  // validation sans id en création
            onSubmit={(values, { resetForm, setSubmitting, setErrors }) => {
                try {
                    if (isEdit && initialValues) {
                        const { id, ...rest } = values as Robot;
                        updateRobot(id, rest);
                    } else {
                        createRobot(values as Omit<Robot, "id">);
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
                    {touched.name && errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}

                    <Text>Label</Text>
                    <TextInput
                        style={{ borderWidth: 1, padding: 8 }}
                        onChangeText={handleChange("label")}
                        onBlur={handleBlur("label")}
                        value={values.label}
                    />
                    {touched.label && errors.label && <Text style={{ color: "red" }}>{errors.label}</Text>}

                    <Text>Année</Text>
                    <TextInput
                        style={{ borderWidth: 1, padding: 8 }}
                        keyboardType="numeric"
                        onChangeText={handleChange("year")}
                        onBlur={handleBlur("year")}
                        value={String(values.year)}
                    />
                    {touched.year && errors.year && <Text style={{ color: "red" }}>{errors.year}</Text>}

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
                    {touched.type && errors.type && <Text style={{ color: "red" }}>{errors.type}</Text>}

                    <Button title={isEdit ? "Mettre à jour" : "Créer"} onPress={() => handleSubmit()} />
                </View>
            )}
        </Formik>
    );
};

export default RobotForm;
