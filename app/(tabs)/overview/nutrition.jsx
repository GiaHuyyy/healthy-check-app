import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import CustomButtonBack from "../../../components/CustomButtonBack";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../constants/icons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Nutrition = () => {
  const nutritionData = [
    {
      name: "Fat",
      value: 80,
      percentage: 40,
      color: "#59DBDD",
      radius: 69,
    },
    {
      name: "Protein",
      value: 160,
      percentage: 56,
      color: "#9973D7",
      radius: 88,
    },
    {
      name: "Carbs",
      value: 230,
      percentage: 62,
      color: "#7C83ED",
      radius: 108,
    },
  ];

  const CircleProgress = ({ percentage, color, radius }) => {
    const circumference = 2 * Math.PI * radius;
    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => {
      const strokeDashoffset = circumference - (progress.value / 100) * circumference;
      return {
        strokeDashoffset,
      };
    });

    useEffect(() => {
      progress.value = withTiming(percentage, { duration: 1000 });
    }, [percentage]);

    return (
      <Svg>
        <Circle strokeWidth={16} stroke="#F4F6FA" fill="transparent" r={radius} cx="120" cy="120" />
        <AnimatedCircle
          strokeWidth={16}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx="120"
          cy="120"
        />
      </Svg>
    );
  };

  const AnimatedPercentageText = ({ targetPercentage, main }) => {
    const [displayPercentage, setDisplayPercentage] = useState(0);
    const animatedPercentage = useSharedValue(0);

    useEffect(() => {
      animatedPercentage.value = withTiming(targetPercentage, {
        duration: 1000,
      });

      // Interval to update the percentage text smoothly
      const interval = setInterval(() => {
        setDisplayPercentage(Math.round(animatedPercentage.value));
      }, 16); // Update every ~16ms (60fps)

      return () => clearInterval(interval);
    }, [targetPercentage]);

    return (
      <>
        {main ? (
          <Text className="font-osemibold600 text-4xl text-primary">{displayPercentage}%</Text>
        ) : (
          <Text className="font-osemibold600 text-base text-primary">{displayPercentage}%</Text>
        )}
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomButtonBack title="Nutrition" handlePress={() => router.back()} />
        <View className="px-5 pb-8">
          <View className="mt-10 items-center">
            <Text className="w-[240px] text-center font-osemibold600 text-2xl leading-9 text-primary">
              You have consumed
              <Text className="text-secondary"> 960 kcal </Text>
              today
            </Text>
          </View>

          <View className="relative mt-8 items-center justify-center">
            <Svg className="h-60 w-60 -rotate-90" viewBox="0 0 240 240">
              {nutritionData.map((item, index) => (
                <CircleProgress
                  key={index}
                  percentage={item.percentage}
                  color={item.color}
                  radius={item.radius}
                />
              ))}
            </Svg>
            <View className="absolute items-center justify-center">
              {/* Animated percentage text */}
              <AnimatedPercentageText targetPercentage={60} main />
              <Text className="font-lregular400 text-sm text-[#9095A0]">of 1300 kcal</Text>
            </View>
          </View>

          <View className="mt-12 space-y-4">
            {nutritionData.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between rounded-2xl bg-white p-[14px]"
                style={{
                  shadowColor: "rgba(23, 26, 31, 0.20)",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <View className="flex-row items-center">
                  <View
                    className={`mr-2 h-6 w-6 rounded-full`}
                    style={{ backgroundColor: item.color }}
                  ></View>
                  <Text className="w-16 font-oregular400 text-base text-primary">{item.name}</Text>
                </View>
                <Text className="font-osemibold600 text-base text-primary">{item.value}g</Text>
                <AnimatedPercentageText targetPercentage={item.percentage} />
              </View>
            ))}
          </View>

          <CustomButton
            title="Add meals"
            textStyles="text-white"
            containerStyles="bg-[#535CE8] mt-[35px]"
            Icon={Icons.Meals}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Nutrition;
