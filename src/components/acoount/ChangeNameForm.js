import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message";
import {getAuth, updateProfile} from "firebase/auth"

export default function ChangeNameForm(props) {
  const { close, onReload } = props;
  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Nombre y Apellido es requerido"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // console.log(formValue);
      // close();
      try {
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, {displayName: formValue.displayName});
        onReload();
        close();
      } catch (error) {
        Toast.show({
          type:"error",
          position: "bottom",
          text1:"Error al cambiar nombre y apellido"
        })
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre y Apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellido"
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
