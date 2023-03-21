import { View, Text } from "react-native";
import React, { useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function ProfileOptions(props) {
  const { onReload } = props;
  const [showModal, setshowModal] = useState(false);
  const [conteined, setConteined] = useState(null);
  const onClose = () => setshowModal((prevState) => !prevState);
  const selectComponent = (key) => {
    //console.log("selectComponnet->", key)
    if (key == "displayName") {
      //console.log("Componente para nombre")
      //setConteined(<Text>Componente para nombre</Text>)
      setConteined(<ChangeNameForm close={onClose} onReload={onReload} />);
    }
    if (key == "password") {
      //console.log("Componente para contraseña")
      //setConteined(<Text>Componente para contraseña</Text>)
      setConteined(<ChangePasswordForm close={onClose} />);
    }
    if (key == "email") {
      //console.log("Componente para contraseña")
      //setConteined(<Text>Componente para contraseña</Text>)
      setConteined(<ChangeEmailForm close={onClose} onReload={onReload} />);
    }
    onClose();
  };
  const optionsMenu = getOptionsMenu(selectComponent);
  //console.log(optionsMenu);
  return (
    <View>
      {map(optionsMenu, (option, index) => (
        <ListItem key={index} onPress={option.onPress}>
          <Icon
            type={option.typeIcon}
            name={option.nameIconLeft}
            color={option.colorIocn}
          />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={option.typeIcon}
            name={option.nameIconRight}
            color={option.colorIocn}
          />
        </ListItem>
      ))}
      <Modal visible={showModal} close={onClose}>
        {/* <Text>Holaaaa</Text> */}
        {conteined}
      </Modal>
    </View>
  );
}

function getOptionsMenu(selectComponent) {
  return [
    {
      title: "Cambiar nombre",
      typeIcon: "material-community",
      nameIconLeft: "account-circle",
      nameIconRight: "chevron-right",
      colorIocn: "#ccc",
      //onPress: () => console.log("nombre")
      onPress: () => selectComponent("displayName"),
    },
    {
      title: "Cambiar contraseña",
      nameIconLeft: "lock-reset",
      typeIcon: "material-community",
      nameIconRight: "chevron-right",
      colorIocn: "#ccc",
      //onPress: () => console.log("contraseña")
      onPress: () => selectComponent("password"),
    },
    {
      title: "Cambiar correo",
      nameIconLeft: "email-outline",
      typeIcon: "material-community",
      nameIconRight: "chevron-right",
      colorIocn: "#ccc",
      //onPress: () => console.log("contraseña")
      onPress: () => selectComponent("email"),
    },
  ];
}
