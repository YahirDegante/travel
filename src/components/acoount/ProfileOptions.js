import { View, Text } from "react-native";
import React from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";

export default function ProfileOptions() {
  const optionsMenu = getOptionsMenu();
  console.log(optionsMenu);
  return (
    <View>
      {map(optionsMenu, (option, index) => (
        <ListItem key={index} onPress={ option.onPress}>
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
    </View>
  );
}

function getOptionsMenu() {
  return [
    {
      title: "Cambiar nombre",
      typeIcon: "material-community",
      nameIconLeft: "account-circle",
      nameIconRight: "chevron-right",
      colorIocn: "#ccc",
      onPress: () => console.log("nombre")
    },
    {
      title: "Cambiar contraseña",
      nameIconLeft: "lock-reset",
      typeIcon: "material-community",
      nameIconRight: "chevron-right",
      colorIocn: "#ccc",
      onPress: () => console.log("contraseña")
    },
  ];
}
