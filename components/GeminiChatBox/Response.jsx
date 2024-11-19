import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import Images from "../../constants/images";
import { LinearGradient } from "expo-linear-gradient";

import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";
import { REACT_APP_GOOGLE_API_KEY } from "@env";
import { useGlobalContext } from "../../context/GlobalProvider";

const date = new Date();
const API_KEY = REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Response(props) {
  const { colorScheme } = useGlobalContext();
  const textColor = colorScheme === "dark" ? "#9e9da8" : "#171a1f";
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchData = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = props.prompt;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      if (isMounted) {
        setGeneratedText(text);
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [props.prompt]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["-100%", "100%"],
  });

  const Skeleton = ({ width = "w-full" }) => {
    return (
      <View className={`mt-[6px] ${width} h-5 overflow-hidden rounded-lg bg-[#e0e0e0] dark:bg-[#242424]`}>
        <Animated.View
          className="absolute h-full w-full bg-[#e0e0e0] dark:bg-[#242424]"
          style={{ transform: [{ translateX }] }}
        >
          <LinearGradient
            colors={["#e0e0e0", "#c0c0c0", "#e0e0e0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-full w-[40%]"
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View className="mb-2 rounded-lg bg-[#f1f2f3] p-4 dark:bg-[#242424]">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Image source={Images.GeminiIcon} className="h-8 w-8" resizeMode="contain" />
          <Text className="font-osemibold600 text-lg text-primary dark:text-[#9e9da8]">Gemini</Text>
        </View>
        <Text className="font-osemibold600 text-xs text-primary dark:text-[#9e9da8]">
          {date.getHours()}:{date.getMinutes()}
        </Text>
      </View>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton width="w-[80%]" />
          <Skeleton width="w-[60%]" />
        </>
      ) : (
        <Markdown
          style={{
            body: {
              fontSize: 14,
              fontWeight: "500",
              color: textColor,
            },
          }}
        >
          {generatedText}
        </Markdown>
      )}
    </View>
  );
}
