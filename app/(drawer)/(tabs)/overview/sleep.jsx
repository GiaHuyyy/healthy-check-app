import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, Platform, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import CustomButtonBack from "../../../../components/CustomButtonBack";
import Icons from "../../../../constants/icons";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { getSleepData } from "../../../../lib/appwrite-sleep";
import { androidShadowStyle } from "../../../../components/androidShadowStyle";

const Sleep = () => {
  const { user } = useGlobalContext();
  const [data, setData] = useState({
    Today: [
      { label: "Mon", total: 100, progress: 0 },
      { label: "Tue", total: 100, progress: 0 },
      { label: "Wed", total: 100, progress: 0 },
      { label: "Thu", total: 100, progress: 0 },
      { label: "Fri", total: 100, progress: 0 },
      { label: "Sat", total: 100, progress: 0, isCurrent: true },
      { label: "Sun", total: 100, progress: 0 },
    ],
    Weekly: [
      { label: "Mon", total: 100, progress: 0 },
      { label: "Tue", total: 100, progress: 0 },
      { label: "Wed", total: 100, progress: 0 },
      { label: "Thu", total: 100, progress: 0 },
      { label: "Fri", total: 100, progress: 0 },
      { label: "Sat", total: 100, progress: 0 },
      { label: "Sun", total: 100, progress: 0, isCurrent: true },
    ],
    Monthly: [
      { label: "Mon", total: 100, progress: 0 },
      { label: "Tue", total: 100, progress: 0 },
      { label: "Wed", total: 100, progress: 0 },
      { label: "Thu", total: 100, progress: 0 },
      { label: "Fri", total: 100, progress: 0 },
      { label: "Sat", total: 100, progress: 0, isCurrent: true },
      { label: "Sun", total: 100, progress: 0 },
    ],
  });
  const [selectedTab, setSelectedTab] = useState("Weekly");
  const [modalVisible, setModalVisible] = useState(false);
  const [bedtime, setBedtime] = useState(new Date());
  const [wakeup, setWakeup] = useState(new Date());
  const [showBedtimePicker, setShowBedtimePicker] = useState(false);
  const [showWakeupPicker, setShowWakeupPicker] = useState(false);

  useEffect(() => {
    getSleepData(user.$id)
      .then((data) => {
        const dataParsed = JSON.parse(data.sleeps);
        if (dataParsed && typeof dataParsed === "object") {
          setData(dataParsed); // Set data to parsed JSON object
        } else {
          console.error("No data found or invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching sleep data:", error);
      });
  }, []);

  const animatedHeights = data[selectedTab].map(() => useSharedValue(0));

  useEffect(() => {
    animatedHeights.forEach((height, index) => {
      height.value = withTiming((data[selectedTab][index].progress / data[selectedTab][index].total) * 200, {
        duration: 1000,
      });
    });
  }, [data, selectedTab]);

  const handleSave = () => {
    // Implement save logic here
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <CustomButtonBack title="Sleep" handlePress={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-8 px-5">
          <View className="mt-10 items-center">
            <Text className="w-[250px] text-center font-osemibold600 text-2xl leading-9 text-primary dark:text-[#E0E0E0]">
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
                  <View className="h-[200px] w-8 justify-end rounded-t-full bg-[#E6E6E6] dark:bg-[#777676]">
                    <Animated.View
                      className={`w-full rounded-t-full ${day.isCurrent ? "bg-[#7C83ED]" : "bg-[#CACDF8]"}`}
                      style={[animatedStyle]}
                    />
                  </View>
                  <Text className="mt-[10px] text-center font-lregular400 text-xs text-primary dark:text-[#E0E0E0]">
                    {day.label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Time */}
          <View className="mt-9 flex-row space-x-5">
            <View
              className="h-[70px] flex-1 items-center justify-center rounded-2xl border border-[#e9e9eb] bg-white dark:border-[#616161] dark:bg-[#424242]"
              style={{
                shadowColor: "rgba(23, 26, 31, 0.20)",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text className="font-oregular400 text-xs text-[#323842] dark:text-[#E4E4E7]">
                🌟 Sleep rate
              </Text>
              <Text className="mt-1 font-osemibold600 text-lg text-primary dark:text-[#E4E4E7]">82%</Text>
            </View>
            <View
              className="h-[70px] flex-1 items-center justify-center rounded-2xl border border-[#e9e9eb] bg-white dark:border-[#616161] dark:bg-[#424242]"
              style={{
                shadowColor: "rgba(23, 26, 31, 0.20)",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text className="font-oregular400 text-xs text-[#323842] dark:text-[#E4E4E7]">
                😴 Deepsleep
              </Text>
              <Text className="mt-1 font-osemibold600 text-lg text-primary dark:text-[#E4E4E7]">1h 3min</Text>
            </View>
          </View>

          {/* Schedule */}
          <View className="mt-10">
            <View className="flex-row items-center justify-between">
              <Text className="font-obold700 text-xl text-primary dark:text-[#E4E4E7]">Schedule</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text className="px-2 font-lregular400 text-sm text-secondary">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-4 flex-row space-x-5">
              <TouchableOpacity
                onPress={() => setShowBedtimePicker(true)}
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
                  <Text className="font-oregular400 text-xs text-white dark:text-[#E4E4E7]">Bedtime</Text>
                </View>
                <View className="mt-1 flex-row gap-x-1">
                  <Text className="font-osemibold600 text-xl text-white dark:text-[#E4E4E7]">
                    {bedtime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                  <Text className="font-lregular400 text-xs leading-7 text-white dark:text-[#E4E4E7]">
                    pm
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowWakeupPicker(true)}
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
                  <Text className="font-oregular400 text-xs text-white dark:text-[#E4E4E7]">Wake up</Text>
                </View>
                <View className="mt-1 flex-row gap-x-1">
                  <Text className="font-osemibold600 text-xl text-white dark:text-[#E4E4E7]">
                    {wakeup.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                  <Text className="font-lregular400 text-xs leading-7 text-white dark:text-[#E4E4E7]">
                    am
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="z-50 flex-1 items-center justify-center bg-white/50">
              <View
                className="w-[90%] items-center rounded-lg bg-white p-5 shadow-lg"
                style={androidShadowStyle}
              >
                <Text className="mb-4 text-center font-omedium500 text-lg">Change your Schedule</Text>
                <View className="mt-2 h-11 flex-row items-center justify-center">
                  <TouchableOpacity
                    className="h-full w-[40%] flex-row items-center justify-center rounded-lg border border-[#e9e9eb] pr-3"
                    onPress={() => Platform.OS !== "web" && setShowBedtimePicker(true)}
                  >
                    <TextInput
                      value={bedtime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      className={`h-full flex-1 pl-3 font-omedium500 text-sm ${Platform.OS === "web" ? "w-full" : ""}`}
                      style={{ outline: "none" }}
                      onChangeText={(text) => setBedtime(new Date(text))}
                      editable={Platform.OS === "web" ? true : false}
                    />
                    <Text className="font-omedium500 text-lg">Bedtime</Text>
                  </TouchableOpacity>

                  <Text className="mx-3 text-lg text-[#ababaf]">|</Text>

                  <TouchableOpacity
                    className="h-full w-[40%] flex-row items-center justify-center rounded-lg border border-[#e9e9eb] pr-3"
                    onPress={() => Platform.OS !== "web" && setShowWakeupPicker(true)}
                  >
                    <TextInput
                      value={wakeup.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      className={`h-full flex-1 pl-3 font-omedium500 text-sm ${Platform.OS === "web" ? "w-full" : ""}`}
                      style={{ outline: "none" }}
                      onChangeText={(text) => setWakeup(new Date(text))}
                      editable={Platform.OS === "web" ? true : false}
                    />
                    <Text className="font-omedium500 text-lg">Wake up</Text>
                  </TouchableOpacity>
                </View>

                <View className="mt-3 w-full flex-row justify-between">
                  <TouchableOpacity
                    className="mr-2 rounded-lg bg-red-500 px-4 py-2"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-center font-omedium500 text-white">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-2" onPress={handleSave}>
                    <Text className="text-center font-omedium500 text-white">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {showBedtimePicker && (
            <DateTimePicker
              value={bedtime}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setShowBedtimePicker(false);
                if (selectedDate) {
                  setBedtime(selectedDate);
                }
              }}
            />
          )}

          {showWakeupPicker && (
            <DateTimePicker
              value={wakeup}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setShowWakeupPicker(false);
                if (selectedDate) {
                  setWakeup(selectedDate);
                }
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sleep;
