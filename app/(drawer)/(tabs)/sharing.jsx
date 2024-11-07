import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../../components/CustomButton";
import Icons from "../../../constants/icons";

const Sharing = () => {
  const SharingItem = ({ Icon, title, des }) => {
    return (
      <View
        className="mt-5 w-full flex-row rounded-2xl border border-[#e9e9eb] bg-white py-4 pl-[22px] dark:border-[#374151] dark:bg-[#1F2937]"
        style={{
          shadowColor: "rgba(23, 26, 31, 0.20)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <Icon className="mr-3 mt-1" />
        <View>
          <Text className="font-osemibold600 text-base text-primary dark:text-[#E4E4E7]">{title}</Text>
          <Text className="mt-1 w-[245px] font-lregular400 text-sm text-primary dark:text-[#9CA3AF]">
            {des}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-5">
          <Text className="font-obold700 text-[32px] text-primary dark:text-[#E4E4E7]">Sharing</Text>

          {/* SharingItem */}
          <View className="mt-1 flex">
            <SharingItem
              Icon={Icons.Check}
              title="Keep your health in check"
              des="Keep loved ones informed about your condition."
            />
            <SharingItem
              Icon={Icons.Protect}
              title="Keep your health in check"
              des="Keep loved ones informed about your condition."
            />
            <SharingItem
              Icon={Icons.Notify}
              title="Keep your health in check"
              des="Keep loved ones informed about your condition."
            />
          </View>

          <CustomButton
            title="Start sharing"
            containerStyles="bg-[#535CE8] mt-[35px]"
            textStyles="text-white"
            Icon={Icons.Share}
          />

          <CustomButton
            title="Setting"
            containerStyles="border border-[#424955] mt-5 dark:border-[#616161]"
            textStyles="text-[#424955] dark:text-[#E4E4E7]"
            Icon={Icons.Setting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sharing;
