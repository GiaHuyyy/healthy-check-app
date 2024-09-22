import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

import Icons from "../constants/icons";

const CustomButtonBack = ({ title, handlePress }) => {
  return (
    <View className="relative mt-5 flex-row items-center justify-center">
      <TouchableOpacity className="absolute left-5 p-2" onPress={handlePress}>
        <Icons.Back />
      </TouchableOpacity>
      <Text className="font-omedium500 text-xl text-primary">{title}</Text>
    </View>
  );
};

export default CustomButtonBack;
