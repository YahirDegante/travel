import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

export default function ProfileInfo(props) {
  //console.log(props)
  const {settextLoading, setvisible} = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [photo, setPhoto] = useState(photoURL);
  //console.log(uid);
  const changePhoto = async () => {
    //console.log("CAMBIAR FOTO")
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    //console.log(result)
    if (!result.canceled) uploadPhoto(result.uri);
  };
  const uploadPhoto = async (uri) => {
    settextLoading("Cargando foto")
    setvisible(true)
    //console.log(uri)
    const response = await fetch(uri);
    const blob = await response.blob();
    //console.log(blob)
    const storage = getStorage();
    const refStorage = ref(storage, `imgProfile/${uid}`);
    uploadBytes(refStorage, blob).then((snapshot) => {
      //console.log(snapshot.metadata)
      updatePhoto(snapshot.metadata.fullPath);
    });
  };
  const updatePhoto = async (imegePath) => {
    //console.log(imegePath)
    setvisible(true)
    settextLoading("Actualizando foto");
    const imgRef = ref(getStorage(), imegePath);
    const urlImg = await getDownloadURL(imgRef);
    //console.log("urlImg-> "+urlImg);
    updateProfile(getAuth().currentUser,{photoURL: urlImg});
    setPhoto(urlImg);
    setvisible(false)
  };

  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded={true}
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{uri:photo}}
      >
        <Avatar.Accessory size={25} onPress={changePhoto} />
      </Avatar>
      <View>
        <Text style={styles.name}>{displayName || "USUARIO"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 30,
  },
  avatar: {
    backgroundColor: "#faad07",
    marginRight: 20,
  },
  name: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
