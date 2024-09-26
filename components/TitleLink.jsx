import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../constants/icons";

const TitleLink = ({ title, handlePress }) => {
  return (
    <View className="mt-8 flex-row items-center justify-between">
      <Text className="font-osemibold600 text-xl text-primary">{title}</Text>
      <TouchableOpacity className="flex-row items-center">
        <Text className="font-lregular400 text-xs leading-4 text-[#424955]">View more</Text>
        <Icons.More className="ml-1" stroke={"#424955"} />
      </TouchableOpacity>
    </View>
  );
};

export default TitleLink;
