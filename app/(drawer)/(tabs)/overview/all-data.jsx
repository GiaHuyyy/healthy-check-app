import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

import CustomButtonBack from "../../../../components/CustomButtonBack";
import Icons from "../../../../constants/icons";

const AllData = () => {
  const Item = ({ Icon, bgIcon, title, value, unit, handlePress }) => {
    return (
      <TouchableOpacity
        onPress={handlePress}
        className="mt-5 flex-row rounded-2xl border border-[#e9e9eb] bg-white p-4 dark:border-[#333] dark:bg-[#1E1E1E]"
        style={{
          shadowColor: "rgba(23, 26, 31, 0.20)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <View className={`h-[54px] w-[54px] items-center justify-center rounded-lg ${bgIcon}`}>
          <Icon />
        </View>
        <View className="ml-3 justify-between">
          <Text className="font-lregular400 text-sm leading-[22px] text-primary dark:text-[#E4E4E7]">
            {title}
          </Text>
          <View className="flex-row gap-x-1">
            <Text className="mt-auto font-osemibold600 text-xl text-primary dark:text-[#E4E4E7]">
              {value}
            </Text>
            <Text className="font-lregular400 text-xs leading-7 text-[#424955] dark:text-gray-400">
              {unit}
            </Text>
          </View>
        </View>
        <View className="ml-auto justify-center">
          <Icons.More stroke={"#9095A0"} width={24} height={24} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomButtonBack title="All Health Data" handlePress={() => router.back()} />
        <View className="px-5 pb-12">
          <View className="mt-[2px]">
            {/* 1 */}
            <Item
              Icon={Icons.Target}
              bgIcon="bg-[#535CE8]"
              title="Double Support Time"
              value="29.7"
              unit="%"
            />
            {/* 2 */}
            <Item
              Icon={Icons.StepsSmall}
              bgIcon="bg-[#2ACCCF]"
              title="Steps"
              value="11,875"
              unit="steps"
              handlePress={() => router.push("/overview/steps")}
            />
            {/* 3 */}
            <Item
              Icon={Icons.CycleSmall}
              bgIcon="bg-[#FE763E]"
              title="Cycle tracking"
              value="08 April"
              handlePress={() => router.push("/overview/cycle-tracking")}
            />
            {/* 4 */}
            <Item
              Icon={Icons.Bed}
              bgIcon="bg-[#7B48CC]"
              title="Sleep"
              value="7"
              unit="hr"
              handlePress={() => router.push("/overview/sleep")}
            />
            {/* 5 */}
            <Item Icon={Icons.Heart} bgIcon="bg-[#DE3B40]" title="Heart" value="68" unit="BPM" />
            {/* 6 */}
            <Item Icon={Icons.Burne} bgIcon="bg-[#F1C932]" title="Burned calories" value="850" unit="kcal" />
            {/* 7 */}
            <Item Icon={Icons.Body} bgIcon="bg-[#535CE8]" title="Body mass index" value="18,69" unit="BMI" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllData;
