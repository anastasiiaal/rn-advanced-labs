// components/RobotForm.tsx
import { createRobot, Robot, RobotType, updateRobot } from "@/services/tp5-robots-db/robotsRepo";
import { robotCreateSchema } from "@/validation/tp5-robots-db/robotSchema";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

type Props = {
    initial?: Robot | null;
    onSuccess?: () => void;
};

export default function RobotForm({ initial, onSuccess }: Props) {
    const qc = useQueryClient();
    const isEdit = !!initial;

    const mCreate = useMutation({
        mutationFn: createRobot,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["robots"] }),
    });

    const mUpdate = useMutation({
        mutationFn: updateRobot,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["robots"] }),
    });

    return (
        <Formik
            initialValues={
                initial ?? {
                    name: "",
                    label: "",
                    year: new Date().getFullYear(),
                    type: "industrial" as RobotType,
                    archived: false,
                }
            }
            validationSchema={isEdit ? undefined : robotCreateSchema}
            onSubmit={async (values, helpers) => {
                try {
                    if (isEdit && initial) {
                        await mUpdate.mutateAsync({ ...initial, ...values, year: Number(values.year) });
                    } else {
                        await mCreate.mutateAsync({
                            name: values.name,
                            label: values.label,
                            year: Number(values.year),
                            type: values.type,
                            archived: !!values["archived"],
                        });
                    }
                    onSuccess?.();
                } catch (e: any) {
                    helpers.setFieldError("name", e?.message ?? "Erreur");
                } finally {
                    helpers.setSubmitting(false);
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
                <View style={{ gap: 12 }}>
                    <Text>Nom</Text>
                    <TextInput
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        style={{ borderWidth: 1, padding: 8 }}
                    />
                    {touched.name && errors.name && <Text style={{ color: "red" }}>{String(errors.name)}</Text>}

                    <Text>Label</Text>
                    <TextInput
                        onChangeText={handleChange("label")}
                        onBlur={handleBlur("label")}
                        value={values.label}
                        style={{ borderWidth: 1, padding: 8 }}
                    />
                    {touched.label && errors.label && <Text style={{ color: "red" }}>{String(errors.label)}</Text>}

                    <Text>Année</Text>
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={handleChange("year")}
                        onBlur={handleBlur("year")}
                        value={String(values.year)}
                        style={{ borderWidth: 1, padding: 8 }}
                    />
                    {touched.year && errors.year && <Text style={{ color: "red" }}>{String(errors.year)}</Text>}

                    <Text>Type</Text>
                    <Picker selectedValue={values.type} onValueChange={(v) => setFieldValue("type", v)}>
                        <Picker.Item label="Industriel" value="industrial" />
                        <Picker.Item label="Service" value="service" />
                        <Picker.Item label="Médical" value="medical" />
                        <Picker.Item label="Éducatif" value="educational" />
                        <Picker.Item label="Autre" value="other" />
                    </Picker>

                    <Button title={isEdit ? "Mettre à jour" : "Créer"} onPress={() => handleSubmit()} disabled={isSubmitting} />
                </View>
            )}
        </Formik>
    );
}
