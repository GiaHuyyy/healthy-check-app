import React from "react";
import { View, Image, Text } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

const date = new Date();

export default function Message(props) {
  const { user } = useGlobalContext();
  return (
    <View className="mb-2 flex-1 rounded-lg bg-[#f1f2f3] p-4 dark:bg-[#242424]">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Image
            source={{ uri: user?.avatar }}
            resizeMode="contain"
            className="h-[44px] w-[44px] rounded-full"
          />
          <Text className="font-osemibold600 text-base text-primary dark:text-[#9e9da8]">
            {user?.username}
          </Text>
        </View>
        <Text className="font-osemibold600 text-xs text-primary dark:text-[#9e9da8]">
          {date.getHours()}:{date.getMinutes()}
        </Text>
      </View>
      <Text className="ml-2 mt-3 font-lregular400 text-base text-primary dark:text-[#9e9da8]">
        {props.message}
      </Text>
    </View>
  );
}
