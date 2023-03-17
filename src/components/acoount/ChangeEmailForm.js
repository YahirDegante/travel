import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message";
import { color } from "react-native-reanimated";

export default function ChangeEmailForm(props) {
  const { close } = props;
  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      displayEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
        displayEmail: Yup.string()
        .email("Email no valido")
        .required("Email obligatorio"),
      password: Yup.string().required("Contraseña es requerda"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
      close();
    //   try {
    //     console.log(formValue);
    //     close();
    //   } catch (error) {
    //     Toast.show({
    //       type: "error",
    //       position: "bottom",
    //       text1: "Error al cambiar correo",
    //     });
    //   }
    },
  });
  const showHidePass = () => {
    setShowPass(!showPass);
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Ingresa el nuevo correo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayEmail", text)}
        errorMessage={formik.errors.displayEmail}
      />
      <Input
        placeholder="Ingresa Contraseña Actual"
        secureTextEntry={!showPass}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showHidePass,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Actualizar correo"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    viewForm: {
        alignItems: "center",
        paddingVertical: 10,
      },
      input: {
        marginBottom: 10,
      },
      btnContainer: {
        marginTop: 15,
        width: "95%",
      },
      btnStyle: {
        backgroundColor: "#0d5bd7",
      },
});
