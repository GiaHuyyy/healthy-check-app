import { TouchableOpacity, Text } from "react-native";
import React from "react";

import Icons from "../constants/icons";

const CustomButtonBack = ({ title, handlePress }) => {
  return (
    <TouchableOpacity className="relative mt-5 flex-row items-center justify-center" onPress={handlePress}>
      <Icons.Back className="absolute left-5 p-2" />
      <Text className="font-omedium500 text-xl text-primary">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButtonBack;
