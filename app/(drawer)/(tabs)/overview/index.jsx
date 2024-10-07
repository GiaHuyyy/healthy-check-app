import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { useGlobalContext } from "../../../../context/GlobalProvider";
import BlogItem from "../../../../components/BlogItem";
import TitleLink from "../../../../components/TitleLink";
import Images from "../../../../constants/images";
import Icons from "../../../../constants/icons";

const Overview = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();

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

    return <Text className="font-obold700 text-2xl leading-9 text-white">{displaySteps}</Text>;
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-8 pt-5">
          <View className="flex-row items-center justify-between">
            <Icons.LogoSmall />
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer);
              }}
            >
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="contain"
                className="h-[44px] w-[44px] rounded-full"
              />
            </TouchableOpacity>
          </View>

          <View className="mt-3 flex-row items-center">
            <Icons.Sun className="mx-2" />
            <Text className="font-lbold700 text-xs text-[#565E6C]">TUES 11 JUL</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="font-obold700 text-[32px] leading-[48px] text-primary">Overview</Text>
            <TouchableOpacity
              onPress={() => router.push("/overview/all-data")}
              className="flex-row items-center gap-x-1 rounded-full border border-[#535ce8] px-2 py-2"
            >
              <Icons.Rocket />
              <Text className="font-lregular400 text-xs text-secondary">All data</Text>
            </TouchableOpacity>
          </View>

          <View className="relative mt-6 bg-[#F1F2FD] px-5 py-2">
            <ImageBackground
              source={Images.bgScore}
              resizeMode="contain"
              className="absolute right-4 h-[72px] w-[72px] items-center justify-center"
            >
              <AnimatedStepsText targetSteps="78" />
            </ImageBackground>
            <Text className="font-osemibold600 text-lg text-primary">Health Score</Text>
            <Text className="mt-1 w-[198px] font-lregular400 text-sm text-primary">
              Based on your overview health tracking, your score is 78 and consider good..
            </Text>
            <TouchableOpacity className="mt-2 flex-row items-center">
              <Text className="font-lregular400 text-xs leading-4 text-secondary">Tell me more</Text>
              <Icons.More className="ml-1" stroke={"#535CE8"} />
            </TouchableOpacity>
          </View>

          {/* Highlight */}
          <TitleLink title="Highlight" handlePress={() => router.push("/overview/all-data")} />

          <View className="mt-4">
            <View className="flex-row flex-wrap gap-x-4">
              <TouchableOpacity
                onPress={() => router.push("/overview/steps")}
                className="flex-1 rounded-2xl bg-[#7C83ED] p-4"
              >
                <Icons.Run className="ml-auto" />
                <Text className="mt-3 font-omedium500 text-sm text-white">Steps</Text>
                <Text className="font-omedium500 text-2xl leading-9 text-white">11,857</Text>
                <Text className="font-lregular400 text-[11px] text-white">updated 15 min ago</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/overview/cycle-tracking")}
                className="flex-1 rounded-2xl bg-[#9973D7] p-4"
              >
                <Icons.Cycle className="ml-auto" />
                <Text className="mt-3 font-omedium500 text-sm text-white">Cycle tracking</Text>
                <View className="flex-row">
                  <Text className="font-omedium500 text-2xl text-white">12 </Text>
                  <Text className="mt-auto text-end font-omedium500 text-sm leading-9 text-white">
                    days before period
                  </Text>
                </View>
                <Text className="font-lregular400 text-[11px] text-white">updated 30m ago</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-6 flex-row flex-wrap gap-x-4">
              <TouchableOpacity
                onPress={() => router.push("/overview/sleep")}
                className="flex-1 rounded-2xl bg-[#125D95] p-4"
              >
                <Icons.Sleep className="ml-auto" />
                <Text className="mt-3 font-omedium500 text-sm text-white">Sleep</Text>
                <View className="flex-row">
                  <Text className="font-omedium500 text-2xl text-white">7</Text>
                  <Text className="mt-auto text-end font-omedium500 text-sm leading-9 text-white"> h</Text>
                  <Text className="font-omedium500 text-2xl text-white"> 31</Text>
                  <Text className="mt-auto text-end font-omedium500 text-sm leading-9 text-white"> min</Text>
                </View>
                <Text className="font-lregular400 text-[11px] text-white">updated a day ago</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/overview/nutrition")}
                className="flex-1 rounded-2xl bg-[#21A1A3] p-4"
              >
                <Image source={Images.nutrition} className="ml-auto" />
                <Text className="mt-3 font-omedium500 text-sm text-white">Nutrition</Text>
                <View className="flex-row">
                  <Text className="font-omedium500 text-2xl text-white">960</Text>
                  <Text className="mt-auto text-end font-omedium500 text-sm leading-9 text-white"> kcal</Text>
                </View>
                <Text className="font-lregular400 text-[11px] text-white">updated 5 min ago</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* This week report */}
          <TitleLink title="This week report" />

          <View className="mt-4">
            <View className="flex-row gap-x-4">
              <TouchableOpacity
                className="flex-1 rounded-2xl border border-[#e9e9eb] bg-white py-[14px] pl-[18px]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Text className="font-lregular400 text-sm text-[#323842]">👣 Steps</Text>
                <Text className="mt-3 font-obold700 text-xl text-[#565E6C]">697,978</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-2xl border border-[#e9e9eb] bg-white py-[14px] pl-[18px]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Text className="font-lregular400 text-sm text-[#323842]">💪 Workout</Text>
                <Text className="mt-3 font-obold700 text-xl text-[#565E6C]">6h 45min</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-5 flex-row gap-x-4">
              <TouchableOpacity
                className="flex-1 rounded-2xl border border-[#e9e9eb] bg-white py-[14px] pl-[18px]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Text className="font-lregular400 text-sm text-[#323842]">💧 Water</Text>
                <Text className="mt-3 font-obold700 text-xl text-[#565E6C]">10,659 ml</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-2xl border border-[#e9e9eb] bg-white py-[14px] pl-[18px]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Text className="font-lregular400 text-sm text-[#323842]">😴 Sleep</Text>
                <Text className="mt-3 font-obold700 text-xl text-[#565E6C]">29h 17min</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Blog */}
          <TitleLink title="Blog" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex-row items-center gap-x-5">
              <View>
                <BlogItem
                  thumb={Images.blog01}
                  subtitle="Nutriton"
                  title="More about Apples: Benefits, nutrition, and tips"
                  votes={78}
                />
              </View>
              <View>
                <BlogItem
                  thumb={Images.blog02}
                  subtitle="Lifestyle"
                  title="The sience of using time to maximize your health"
                  votes={54}
                />
              </View>
              <View>
                <BlogItem
                  thumb={Images.blog03}
                  subtitle="Nutriton"
                  title="The best time to eat breakfast, lunch, and dinner"
                  votes={78}
                />
              </View>
              <View>
                <BlogItem
                  thumb={Images.blog04}
                  subtitle="Lifestyle"
                  title="The sience of using time to maximize your health"
                  votes={78}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Overview;
