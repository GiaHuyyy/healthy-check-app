import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import CustomButtonBack from "../../../../components/CustomButtonBack";
import Icons from "../../../../constants/icons";

const data = {
  Today: [
    { label: "Mon", total: 100, progress: 60 },
    { label: "Tue", total: 100, progress: 10 },
    { label: "Wed", total: 100, progress: 70 },
    { label: "Thu", total: 100, progress: 30 },
    { label: "Fri", total: 100, progress: 50 },
    { label: "Sat", total: 100, progress: 100, isCurrent: true },
    { label: "Sun", total: 100, progress: 0 },
  ],
  Weekly: [
    { label: "Mon", total: 100, progress: 20 },
    { label: "Tue", total: 100, progress: 60 },
    { label: "Wed", total: 100, progress: 90 },
    { label: "Thu", total: 100, progress: 100 },
    { label: "Fri", total: 100, progress: 60 },
    { label: "Sat", total: 100, progress: 70 },
    { label: "Sun", total: 100, progress: 80, isCurrent: true },
  ],
  Monthly: [
    { label: "Mon", total: 100, progress: 100 },
    { label: "Tue", total: 100, progress: 30 },
    { label: "Wed", total: 100, progress: 80 },
    { label: "Thu", total: 100, progress: 40 },
    { label: "Fri", total: 100, progress: 90 },
    { label: "Sat", total: 100, progress: 77, isCurrent: true },
    { label: "Sun", total: 100, progress: 0 },
  ],
};

const Sleep = () => {
  const [selectedTab, setSelectedTab] = useState("Weekly");

  const animatedHeights = data[selectedTab].map(() => useSharedValue(0));

  useEffect(() => {
    animatedHeights.forEach((height, index) => {
      height.value = withTiming((data[selectedTab][index].progress / data[selectedTab][index].total) * 200, {
        duration: 1000,
      });
    });
  }, [selectedTab]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomButtonBack title="Sleep" handlePress={() => router.back()} />
        <View className="mb-8 px-5">
          <View className="mt-10 items-center">
            <Text className="w-[250px] text-center font-osemibold600 text-2xl leading-9 text-primary">
              Your average time of sleep a day is
              <Text className="text-secondary"> 7h 31 min </Text>
            </Text>
          </View>

          {/* Tabs */}
          <View className="mt-16 h-9 flex-row">
            {["Today", "Weekly", "Monthly"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className={`mx-2 flex-1 items-center justify-center rounded-full ${selectedTab === tab ? "bg-[#535CE8]" : ""}`}
              >
                <Text
                  className={`font-lregular400 text-sm ${selectedTab === tab ? "text-white" : "text-secondary"}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dynamic Bars */}
          <View className="mt-10 flex-row justify-between">
            {data[selectedTab].map((day, index) => {
              // Animated style for each bar
              const animatedStyle = useAnimatedStyle(() => {
                return {
                  height: animatedHeights[index].value,
                };
              });

              return (
                <View key={index}>
                  <View className="h-[200px] w-8 justify-end rounded-t-full bg-[#E6E6E6]">
                    <Animated.View
                      className={`w-full rounded-t-full ${day.isCurrent ? "bg-[#7C83ED]" : "bg-[#CACDF8]"}`}
                      style={[animatedStyle]}
                    />
                  </View>
                  <Text className="mt-[10px] text-center font-lregular400 text-xs text-primary">
                    {day.label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Time */}
          <View className="mt-9 flex-row space-x-5">
            <View
              className="h-[70px] flex-1 items-center justify-center rounded-2xl border border-[#e9e9eb] bg-white"
              style={{
                shadowColor: "rgba(23, 26, 31, 0.20)",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text className="font-oregular400 text-xs text-[#323842]">🌟 Sleep rate</Text>
              <Text className="mt-1 font-osemibold600 text-lg text-primary">82%</Text>
            </View>
            <View
              className="h-[70px] flex-1 items-center justify-center rounded-2xl border border-[#e9e9eb] bg-white"
              style={{
                shadowColor: "rgba(23, 26, 31, 0.20)",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text className="font-oregular400 text-xs text-[#323842]">😴 Deepsleep</Text>
              <Text className="mt-1 font-osemibold600 text-lg text-primary">1h 3min</Text>
            </View>
          </View>

          {/* Schedule */}
          <View className="mt-10">
            <View className="flex-row items-center justify-between">
              <Text className="font-obold700 text-xl text-primary">Schedule</Text>
              <TouchableOpacity>
                <Text className="px-2 font-lregular400 text-sm text-secondary">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row space-x-5">
              <View
                className="h-[72px] flex-1 justify-center rounded-2xl bg-[#7B48CC] pl-4"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <View className="flex-row items-center gap-x-2">
                  <Icons.BedSmall />
                  <Text className="font-oregular400 text-xs text-white">Bedtime</Text>
                </View>
                <View className="mt-1 flex-row gap-x-1">
                  <Text className="font-osemibold600 text-xl text-white">22:00</Text>
                  <Text className="font-lregular400 text-xs leading-7 text-white">pm</Text>
                </View>
              </View>
              <View
                className="h-[72px] flex-1 justify-center rounded-2xl bg-[#2ACCCF] pl-4"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <View className="flex-row items-center gap-x-2">
                  <Icons.Bell />
                  <Text className="font-oregular400 text-xs text-white">Wake up</Text>
                </View>
                <View className="mt-1 flex-row gap-x-1">
                  <Text className="font-osemibold600 text-xl text-white">07:30</Text>
                  <Text className="font-lregular400 text-xs leading-7 text-white">am</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sleep;
