import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButtonBack from "../../../../components/CustomButtonBack";
import Icons from "../../../../constants/icons";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { getStepsData } from "../../../../lib/appwrite-steps";

// Get screen dimensions for responsive layout
const screenWidth = Dimensions.get("window").width;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Steps = () => {
  const { user } = useGlobalContext();
  const [stepsData, setStepsData] = useState({ Today: [], Weekly: [], Monthly: [] });
  const [selectedTab, setSelectedTab] = useState("Weekly");
  const [step, setStep] = useState(0);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    getStepsData(user.$id)
      .then((data) => {
        setStep(data.step);
        const dataStepsParsed = JSON.parse(data.steps);
        const dataActivityParsed = JSON.parse(data.activity);
        if (
          dataStepsParsed &&
          typeof dataStepsParsed === "object" &&
          Array.isArray(dataActivityParsed) &&
          dataActivityParsed.length > 0
        ) {
          setStepsData(dataStepsParsed); // Set data to parsed JSON object
          setActivityData(dataActivityParsed);
        } else {
          console.error("No data found or invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching steps data:", error);
      });
  }, []);

  const stepsPercentage = (step / 18000) * 100;

  const animatedStepsValue = useSharedValue(0);
  const animatedProgressValue = useSharedValue(0);

  useEffect(() => {
    animatedStepsValue.value = withTiming(step, { duration: 1000 });
    animatedProgressValue.value = withTiming(stepsPercentage, { duration: 1000 });
  }, [animatedStepsValue, animatedProgressValue]);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: stepsData[selectedTab],
      },
    ],
  };

  const circleIcon = [{ Icon: Icons.Fire }, { Icon: Icons.Map }, { Icon: Icons.Min }];

  const circlecColor = [
    { color: "#2ACCCF", feColor: "#d4f5f5" },
    { color: "#7B48CC", feColor: "#e5daf5" },
    { color: "#535CE8", feColor: "#dddefa" },
  ];

  const CircleProgress = ({ percentage, color, feColor = "#F4F6FA", radius, strokeWidth }) => {
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
        <Circle strokeWidth={strokeWidth} stroke={feColor} fill="transparent" r={radius} cx="120" cy="120" />
        <AnimatedCircle
          strokeWidth={strokeWidth}
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

    return (
      <Text className="font-osemibold600 text-[32px] text-primary dark:text-[#B0B0B0]">
        {displaySteps.toLocaleString()}
      </Text>
    );
  };

  const { colorScheme } = useGlobalContext();
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomButtonBack title="Steps" handlePress={() => router.back()} />
        <View className="px-5 pb-8">
          <View className="mt-10 items-center">
            <Text className="w-[240px] text-center font-osemibold600 text-2xl leading-9 text-primary dark:text-[#E0E0E0]">
              You have achieved
              <Text className="text-secondary"> {stepsPercentage.toFixed(0)}% </Text>
              of your goal today
            </Text>
          </View>

          {/* Main Steps Progress */}
          <View className="relative mt-10 items-center justify-center">
            <Svg className="h-48 w-48 -rotate-90" viewBox="0 0 240 240">
              <CircleProgress percentage={stepsPercentage} color={"#535CE8"} radius={110} strokeWidth={16} />
            </Svg>
            <View className="absolute items-center justify-center">
              <Icons.Steps />
              <AnimatedStepsText targetSteps={step} />
              <Text className="font-lregular400 text-sm text-[#9095A0] dark:text-[#B0B0B0]">
                Steps out of 18k
              </Text>
            </View>
          </View>

          {/* Circular icons */}
          <View className="mt-10 flex-row justify-center space-x-5">
            {activityData.map((item, index) => (
              <View key={index}>
                <View className="items-center justify-center">
                  <Svg className="h-[64px] w-[64px] -rotate-90" viewBox="0 0 240 240">
                    <CircleProgress
                      percentage={item.percentage}
                      color={circlecColor[index].color}
                      feColor={circlecColor[index].feColor}
                      radius={104}
                      strokeWidth={26}
                    />
                  </Svg>
                  <View className="absolute">{circleIcon[index].Icon()}</View>
                </View>
                <Text className="mt-1 text-center font-omedium500 text-base text-primary dark:text-[#E0E0E0]">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Chart & Tabs */}
          <View className="mt-10 w-full rounded-lg bg-[#7C83ED] p-4 dark:bg-[#4B4B4B]">
            <View className="mb-5 flex-row rounded-full bg-[#535CE8] dark:bg-[#333]">
              {["Today", "Weekly", "Monthly"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  className={`h-9 flex-1 items-center justify-center rounded-full ${selectedTab === tab ? "bg-white dark:bg-[#212121]" : "bg-transparent"}`}
                >
                  <Text
                    className={`font-lregular400 text-sm ${selectedTab === tab ? "text-secondary" : "text-white"} `}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Line Chart */}
            <LineChart
              data={chartData}
              width={screenWidth - 70} // Dynamic width based on screen
              height={200}
              chartConfig={{
                backgroundColor: colorScheme === "dark" ? "#4B4B4B" : "#7C83ED",
                backgroundGradientFrom: colorScheme === "dark" ? "#4B4B4B" : "#7C83ED",
                backgroundGradientTo: colorScheme === "dark" ? "#4B4B4B" : "#7C83ED",
                decimalPlaces: 0,
                color: () => (colorScheme === "dark" ? "#7C83ED" : "#fff"),
                propsForLabels: {
                  fontSize: 12,
                  fontFamily: "Lato-Regular",
                },
                propsForBackgroundLines: {
                  strokeDasharray: "", // solid line
                  stroke: colorScheme === "dark" ? "#7C83ED" : "#fff", // Color of horizontal lines
                },
                strokeWidth: 2,
              }}
              withHorizontalLines={false}
              bezier
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Steps;
