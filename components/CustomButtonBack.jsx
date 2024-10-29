import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

import Icons from "../constants/icons";
import { useGlobalContext } from "../context/GlobalProvider";

const CustomButtonBack = ({ title, handlePress }) => {
  const { colorScheme } = useGlobalContext();
  return (
    <View className="relative mt-5 flex-row items-center justify-center">
      <TouchableOpacity className="absolute left-5 p-2" onPress={handlePress}>
        <Icons.Back fill={colorScheme === "dark" ? "#E4E4E7" : "#323842"} />
      </TouchableOpacity>
      <Text className="font-omedium500 text-xl text-primary dark:text-[#E4E4E7]">{title}</Text>
    </View>
  );
};

export default CustomButtonBack;
