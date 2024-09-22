import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import React from "react";
import Icons from "../../../constants/icons";
import Images from "../../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Overview = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="px-5 pb-8">
          <View className="mt-4 flex-row justify-between">
            <Icons.LogoSmall />
            <TouchableOpacity>
              <Image source={Images.avatar} resizeMode="contain" className="h-[44px] w-[44px] rounded-full" />
            </TouchableOpacity>
          </View>

          <View className="mt-3 flex-row items-center">
            <Icons.Sun className="mx-2" />
            <Text className="font-lbold700 text-xs text-[#565E6C]">TUES 11 JUL</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="font-obold700 text-[32px] leading-[48px] text-primary">Overview</Text>
            <TouchableOpacity onPress={() => router.push("/overview/all-data")} className="flex-row items-center gap-x-1 rounded-full border border-[#535ce8] px-2 py-2">
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
              <Text className="font-obold700 text-2xl leading-9 text-white">78</Text>
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
          <View className="mt-8 flex-row items-center justify-between">
            <Text className="font-osemibold600 text-xl text-primary">Highlight</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="font-lregular400 text-xs leading-4 text-[#424955]">View more</Text>
              <Icons.More className="ml-1" stroke={"#424955"} />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <View className="flex-row flex-wrap gap-x-4">
              <TouchableOpacity className="flex-1 rounded-2xl bg-[#7C83ED] p-4">
                <Icons.Run className="ml-auto" />
                <Text className="mt-3 font-omedium500 text-sm text-white">Steps</Text>
                <Text className="font-omedium500 text-2xl leading-9 text-white">11,857</Text>
                <Text className="font-lregular400 text-[11px] text-white">updated 15 min ago</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 rounded-2xl bg-[#9973D7] p-4">
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
              <TouchableOpacity className="flex-1 rounded-2xl bg-[#125D95] p-4">
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
              <TouchableOpacity onPress={() => router.push("/overview/nutrition")} className="flex-1 rounded-2xl bg-[#21A1A3] p-4">
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
          <View className="mt-8 flex-row items-center justify-between">
            <Text className="font-osemibold600 text-xl text-primary">This week report</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="font-lregular400 text-xs leading-4 text-[#424955]">View more</Text>
              <Icons.More className="ml-1" stroke={"#424955"} />
            </TouchableOpacity>
          </View>

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
          <View className="mt-8 flex-row items-center justify-between px-5">
            <Text className="font-osemibold600 text-xl text-primary">Blogs</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="font-lregular400 text-xs leading-4 text-[#424955]">View more</Text>
              <Icons.More className="ml-1" stroke={"#424955"} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex-row items-center gap-x-4">
              <View
                className="w-[272px] rounded-2xl border border-[#e9e9eb] bg-white p-5"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Image source={Images.blog01} className="h-[162px] w-full" resizeMode="cover" />
                <Text className="mt-4 font-oregular400 text-xs text-[#323842]">Nutrition</Text>
                <Text className="font-osemibold600 text-lg text-[#323842]">
                  More about Apples: Benefits, nutrition, and tips
                </Text>
                <View className="mt-5 flex-row justify-between">
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-full bg-[#F1F2FD] px-[6px] py-[5px]">
                    <Icons.Like />
                    <Text className="font-lregular400 text-[11px] text-secondary">78 votes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 px-1">
                    <Text className="font-lregular400 text-[11px] text-[#9095A0]">Tell me more</Text>
                    <Icons.More stroke={"#9095A0"} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                className="w-[272px] rounded-2xl border border-[#e9e9eb] bg-white p-5"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Image source={Images.blog02} className="h-[162px] w-full" resizeMode="cover" />
                <Text className="mt-4 font-oregular400 text-xs text-[#323842]">Power</Text>
                <Text className="font-osemibold600 text-lg text-[#323842]">
                  More about cabbage: Benefits, nutrition, and tips
                </Text>
                <View className="mt-5 flex-row justify-between">
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-full bg-[#F1F2FD] px-[6px] py-[5px]">
                    <Icons.Like />
                    <Text className="font-lregular400 text-[11px] text-secondary">54 votes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 px-1">
                    <Text className="font-lregular400 text-[11px] text-[#9095A0]">Tell me more</Text>
                    <Icons.More stroke={"#9095A0"} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                className="w-[272px] rounded-2xl border border-[#e9e9eb] bg-white p-5"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Image source={Images.blog03} className="h-[162px] w-full" resizeMode="cover" />
                <Text className="mt-4 font-oregular400 text-xs text-[#323842]">Nutrition</Text>
                <Text className="font-osemibold600 text-lg text-[#323842]">
                  More about cauliflower: Benefits, nutrition, and tips
                </Text>
                <View className="mt-5 flex-row justify-between">
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-full bg-[#F1F2FD] px-[6px] py-[5px]">
                    <Icons.Like />
                    <Text className="font-lregular400 text-[11px] text-secondary">102 votes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 px-1">
                    <Text className="font-lregular400 text-[11px] text-[#9095A0]">Tell me more</Text>
                    <Icons.More stroke={"#9095A0"} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                className="w-[272px] rounded-2xl border border-[#e9e9eb] bg-white p-5"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Image source={Images.blog04} className="h-[162px] w-full" resizeMode="cover" />
                <Text className="mt-4 font-oregular400 text-xs text-[#323842]">Heart rate</Text>
                <Text className="font-osemibold600 text-lg text-[#323842]">
                  More about carrots: Benefits, nutrition, and tips
                </Text>
                <View className="mt-5 flex-row justify-between">
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-full bg-[#F1F2FD] px-[6px] py-[5px]">
                    <Icons.Like />
                    <Text className="font-lregular400 text-[11px] text-secondary">99 votes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center justify-center gap-x-1 px-1">
                    <Text className="font-lregular400 text-[11px] text-[#9095A0]">Tell me more</Text>
                    <Icons.More stroke={"#9095A0"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Overview;
