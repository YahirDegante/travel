import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message";
import { color } from "react-native-reanimated";
import {getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth"

export default function ChangePasswordForm(props) {
  const {close} = props;
  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Contraseña Obligatoria"),
      newPassword: Yup.string().required("Contraseña Obligatoria"),
      repeatNewPassword: Yup.string()
        .required("Contraseña Obligatoria")
        .oneOf(
          [Yup.ref("newPassword")],
          "Las nuevas contraseñas deben ser iguales"
        ),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //console.log(formValue);
        const user = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(
          user.email,
          formValue.password
        )
        reauthenticateWithCredential(user, credentials);
        await updatePassword(user, formValue.newPassword);
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar contraseña",
        });
      }
    },
  });

  const showHidePass = () => {
    setShowPass(!showPass);
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Contraseña Actual"
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
      <Input
        placeholder="Contraseña Nueva"
        secureTextEntry={!showPass}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showHidePass ,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar Nueva Contraseña"
        secureTextEntry={!showPass}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showHidePass ,
        }}
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
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
