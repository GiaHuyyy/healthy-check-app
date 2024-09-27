import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icons from "../constants/icons";

const BlogItem = ({ thumb, title, subtitle, votes, handlePress }) => {
  return (
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
      <Image source={thumb} className="h-[162px] w-full" resizeMode="cover" />
      <Text className="mt-4 font-oregular400 text-xs text-[#323842]">{subtitle}</Text>
      <Text className="font-osemibold600 text-lg text-[#323842]">{title}</Text>
      <View className="mt-5 flex-row justify-between">
        <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-full bg-[#F1F2FD] px-[6px] py-[5px]">
          <Icons.Like />
          <Text className="font-lregular400 text-[11px] text-secondary">{votes} votes</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center gap-x-1 px-1">
          <Text className="font-lregular400 text-[11px] text-[#9095A0]">Tell me more</Text>
          <Icons.More stroke={"#9095A0"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogItem;

const styles = StyleSheet.create({});
