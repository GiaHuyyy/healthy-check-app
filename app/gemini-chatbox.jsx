import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TextInput, TouchableOpacity, Text } from "react-native";
import Images from "../constants/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import Icons from "../constants/icons";

import Response from "../components/GeminiChatBox/Response";
import Message from "../components/GeminiChatBox/Message";

const GeminiChatBox = () => {
  const { user, colorScheme } = useGlobalContext();
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);
  const SearchInput = () => {
    setListData((prevList) => [...prevList, inputText]);
    setInputText("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      {/* Header */}
      <View className="relative flex-row items-center justify-center">
        <TouchableOpacity className="absolute left-5 p-2" onPress={() => router.back()}>
          <Icons.Back fill={colorScheme === "dark" ? "#E4E4E7" : "#323842"} />
        </TouchableOpacity>
        <Image source={Images.GeminiLogo} className="h-24 w-24" resizeMode="contain" />
      </View>
      <View className="flex-1 px-5">
        {/* Content */}
        {listData.length === 0 ? (
          <View className="flex-1">
            <Text className="mt-[20%] text-center font-osemibold600 text-5xl text-[#aeadb7] dark:text-[#9e9da8]">
              Chào {user?.username}!
            </Text>
          </View>
        ) : (
          <FlatList
            className="mb-20"
            data={listData}
            renderItem={({ item }) => (
              <View>
                <Message message={item} />
                <Response prompt={item} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}

        {/* Search-Bar */}
        <View className="mb-3 h-12 w-full flex-row items-center justify-center space-x-3 px-5">
          <TextInput
            placeholder="Ask to Gemini AI"
            className="h-full w-full rounded-full border border-gray-300 bg-white pl-4 font-oregular400 text-base text-primary dark:border-gray-600 dark:bg-[#374151] dark:text-[#9e9da8]"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            selectionColor={"#323232"}
          />
          <TouchableOpacity onPress={SearchInput}>
            <Ionicons name="send" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GeminiChatBox;
