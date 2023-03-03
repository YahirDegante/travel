import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message"
import { useNavigation } from "@react-navigation/native";

export default function RegsiterForm() {
  const navigation = useNavigation;
  const [showPass, setShowPass] = useState(false);
  const [showRepetPass, setShowRepetPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Formato de email no valido")
        .required("Email obligatorio"),
      password: Yup.string().required("contraseña obligatoria"),
      repeatPassword: Yup.string()
        .required("contraseña obligatoria")
        .oneOf([Yup.ref("password")], "Contraseña no coincide"),
    }),
    validateOnChange:false,
    onSubmit: async(formValue) => {
      //console.log(formValue);
      //Firebase
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth, 
          formValue.email,
          formValue.password
        );
        //navigation.navigate("indexXS")
        navigation.goBack();
      } catch (error) {
        console.log(error)
        Toast.show({
          type:"error",
          position:"top",
          text1: "Error ocrreo en uso"
        })
      }

    },
  });
  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const showHideRepetPass = () => {
    setShowRepetPass(!showRepetPass);
  };
  return (
    <View style={styles.viewForm}>
      <Text>AQUI SI VA EL FORMULARIO</Text>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={showPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
        onChangeText={(Text) => formik.setFieldValue("password", Text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={showRepetPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepetPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHideRepetPass}
          />
        }
        onChangeText={(Text) => formik.setFieldValue("repeatPassword", Text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="REGISTRAR"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  containerBtn: {
    width: "95%",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#0D5BD7",
  },
});
