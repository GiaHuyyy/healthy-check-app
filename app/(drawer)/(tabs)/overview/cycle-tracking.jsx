import { Image, Modal, Platform, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import TitleLink from "../../../../components/TitleLink";
import CustomButtonBack from "../../../../components/CustomButtonBack";
import Icons from "../../../../constants/icons";
import Images from "../../../../constants/images";
import { getCycleTrackingData, updateCycleTrackingData } from "../../../../lib/appwrite-cycle-tracking";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { androidShadowStyle } from "../../../../components/androidShadowStyle";

const CycleTracking = () => {
  const { user } = useGlobalContext();
  const [cycleTrackingData, setCycleTrackingData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [date, setDate] = useState(0);
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [cycleTrackingId, setCycleTrackingId] = useState(null);

  useEffect(() => {
    getCycleTrackingData(user.$id)
      .then((data) => {
        setCycleTrackingId(data.$id);
        const dataParsed = JSON.parse(data.days);
        if (Array.isArray(dataParsed) && dataParsed.length > 0) {
          setCycleTrackingData(dataParsed);
          setSelectedDay(dataParsed[5]);
          setDate(dataParsed[5].duration);
          setContent(dataParsed[5].content);
        } else {
          console.error("No data found or invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching cycle tracking data:", error);
      });
  }, []);

  const handleChangedates = async (date) => {
    if (date < 1) {
      alert("Duration must be greater than 0");
      return;
    }
    cycleTrackingData.forEach((day) => {
      if (day.date === selectedDay.date) {
        day.duration = Number(date);
        day.content = content;
      }
    });
    await updateCycleTrackingData(cycleTrackingId, cycleTrackingData);
    setModalVisible(false);
    alert("Period dates updated successfully");
  };

  const AnimatedStepsText = ({ targetSteps }) => {
    const [displaySteps, setDisplaySteps] = useState(0);
    const animatedSteps = useSharedValue(0);

    useEffect(() => {
      animatedSteps.value = withTiming(targetSteps, {
        duration: 1000,
      });

      const interval = setInterval(() => {
        setDisplaySteps(Math.round(animatedSteps.value));
      }, 16); // Update every ~16ms (60fps)

      return () => clearInterval(interval);
    }, [targetSteps]);

    return <Text className="mt-1 font-osemibold600 text-[32px] text-white">{displaySteps} days</Text>;
  };

  const MenstrualHealthItem = ({ img, content }) => {
    return (
      <TouchableOpacity
        className="w-[226px] items-center overflow-hidden rounded-2xl border border-[#e9e9eb] bg-white pb-[15px] dark:bg-[#1F1F1F]"
        style={{
          shadowColor: "rgba(23, 26, 31, 0.20)",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <Image source={img} className="h-[160px] w-full" resizeMode="cover" />
        <Text className="mt-3 w-[190px] font-osemibold600 text-lg text-[#323842] dark:text-[#E4E4E7]">
          {content}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <CustomButtonBack title="Cycle Traking" handlePress={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-8 px-5">
          {/* Calendar */}
          <View className="mt-7 flex-row justify-between">
            {cycleTrackingData.map((day, index) => (
              <View key={index} className="items-center">
                <Text className="font-lregular400 text-sm text-[#424955] dark:text-[#E4E4E7]">
                  {day.label}
                </Text>
                <TouchableOpacity
                  className={`mt-[6px] h-[42px] w-[42px] items-center justify-center rounded-2xl ${
                    selectedDay?.date === day.date ? "bg-[#535CE8]" : "bg-[#F8F9FA] dark:bg-[#2C2C2E]"
                  }`}
                  onPress={() => {
                    setSelectedDay(day);
                    setDate(day.duration);
                    setContent(day.content);
                  }}
                >
                  <Text
                    className={`font-oregular400 text-base ${selectedDay?.date === day.date ? "text-[#F1F2FD]" : "text-[#323842] dark:text-[#E4E4E7]"}`}
                  >
                    {day.date}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Period */}
          <View
            className="mx-auto mt-10 h-[270px] w-[270px] items-center rounded-full bg-[#7C83ED]"
            style={{
              shadowColor: "rgba(23, 26, 31, 0.20)",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 3,
            }}
          >
            <Text className="mt-14 font-lbold700 text-lg text-white">Period in</Text>
            <AnimatedStepsText targetSteps={selectedDay?.duration || 0} />
            <Text className="mt-1 font-lregular400 text-xs text-white">{selectedDay?.content}</Text>
            <TouchableOpacity
              className="mt-6 h-9 items-center justify-center rounded-[18px] bg-white px-3"
              onPress={() => setModalVisible(true)}
            >
              <Text className="font-lregular400 text-sm text-primary">Edit period dates</Text>
            </TouchableOpacity>
          </View>

          {/* Modal period */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 items-center justify-center bg-white/50">
              <View
                className="w-[90%] items-center rounded-lg bg-white p-5 shadow-lg"
                style={androidShadowStyle}
              >
                <Text className="mb-4 text-center font-omedium500 text-lg">Change your period dates</Text>
                <View className="mt-2 h-11 flex-row items-center justify-center">
                  <View className="h-full w-[30%] flex-row items-center justify-center rounded-lg border border-[#e9e9eb] pr-3">
                    <TextInput
                      className={`h-full flex-1 pl-3 font-omedium500 text-sm ${Platform.OS === "web" ? "w-full" : ""}`}
                      style={{ outline: "none" }}
                      value={date?.toString() || ""}
                      onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                        setDate(numericValue);
                      }}
                      placeholder="Start date"
                    />

                    <Text className="font-omedium500 text-lg">days</Text>
                  </View>

                  <Text className="mx-3 text-lg text-[#ababaf]">|</Text>

                  <View className="h-full w-[50%] flex-row items-center justify-center rounded-lg border border-[#e9e9eb] pr-3">
                    <TextInput
                      className={`h-full flex-1 pl-3 font-omedium500 text-base ${Platform.OS === "web" ? "w-full" : ""}`}
                      style={{ outline: "none" }}
                      value={content}
                      onChangeText={setContent}
                      placeholder="Start date"
                    />
                  </View>
                </View>

                <View className="mt-3 w-full flex-row justify-between">
                  <TouchableOpacity
                    className="mr-2 rounded-lg bg-red-500 px-4 py-2"
                    onPress={() => {
                      setModalVisible(false);
                      setDate(selectedDay?.duration || 0);
                    }}
                  >
                    <Text className="text-center font-omedium500 text-white">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="rounded-lg bg-blue-500 px-4 py-2"
                    onPress={() => handleChangedates(date)}
                  >
                    <Text className="text-center font-omedium500 text-white">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* How are you feeling today? */}
          <View className="mt-[42px]">
            <Text className="font-obold700 text-xl text-primary dark:text-[#E4E4E7]">
              How are you feeling today?
            </Text>
            <View className="mt-4 flex-row space-x-5">
              <TouchableOpacity
                className="h-[118px] flex-1 items-center rounded-2xl bg-white dark:bg-[#2C2C2E]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <View className="mt-[14px] h-11 w-11 items-center justify-center rounded-full bg-[#F1F2FD] dark:bg-[#444444]">
                  <Icons.Note />
                </View>
                <Text className="mt-1 w-[115px] text-center font-lregular400 text-xs leading-5 text-[#323842] dark:text-[#E4E4E7]">
                  Share your symtoms with us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="h-[118px] flex-1 items-center rounded-2xl bg-white dark:bg-[#2C2C2E]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <View className="mt-[14px] h-11 w-11 items-center justify-center rounded-full bg-[#FFF4F0] dark:bg-[#725050]">
                  <Icons.Daily />
                </View>
                <Text className="mt-1 w-[115px] text-center font-lregular400 text-xs leading-5 text-[#323842] dark:text-[#E4E4E7]">
                  Here's your daily insights
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Menstrual health */}
          <TitleLink title="Menstrual health" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex-row items-center gap-x-5">
              <View>
                <MenstrualHealthItem
                  img={Images.cycle01}
                  content="Craving sweets on your period? Here's why & what to do about it"
                />
              </View>
              <View>
                <MenstrualHealthItem
                  img={Images.cycle01}
                  content="Craving sweets on your period? Here's why & what to do about it"
                />
              </View>
              <View>
                <MenstrualHealthItem
                  img={Images.cycle01}
                  content="Craving sweets on your period? Here's why & what to do about it"
                />
              </View>
              <View>
                <MenstrualHealthItem
                  img={Images.cycle01}
                  content="Craving sweets on your period? Here's why & what to do about it"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CycleTracking;
