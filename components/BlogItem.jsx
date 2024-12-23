import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Icons from "../constants/icons";

const BlogItem = ({ thumb, title, subtitle, votes: initialVotes, handlePress }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoted, setIsVoted] = useState(false);

  const handleVote = () => {
    if (isVoted) {
      setVotes(votes - 1);
    } else {
      setVotes(votes + 1);
    }
    setIsVoted(!isVoted);
  };
  return (
    <View
      className="w-[272px] rounded-2xl border border-[#e9e9eb] bg-white p-5 dark:border-[#3b3b3b] dark:bg-gray-800"
      style={{
        shadowColor: "rgba(23, 26, 31, 0.20)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      <Image source={thumb} className="h-[162px] w-full" resizeMode="cover" />
      <Text className="mt-4 font-oregular400 text-xs text-[#323842] dark:text-gray-300">{subtitle}</Text>
      <Text className="font-osemibold600 text-lg text-[#323842] dark:text-gray-100">{title}</Text>
      <View className="mt-5 flex-row justify-between">
        <TouchableOpacity
          onPress={handleVote}
          className="flex-row items-center justify-center gap-x-1 rounded-full bg-[#F1F2FD] px-[6px] py-[5px] dark:bg-[#2D2E45]"
        >
          <Icons.Like />
          <Text className="font-lregular400 text-[11px] text-secondary dark:text-gray-300">
            {votes} votes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center gap-x-1 px-1">
          <Text className="font-lregular400 text-[11px] text-[#9095A0] dark:text-gray-400">Tell me more</Text>
          <Icons.More stroke={"#9095A0"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogItem;

const styles = StyleSheet.create({});
