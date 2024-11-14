import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import { router } from "expo-router";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

import CustomButtonBack from "../../../../components/CustomButtonBack";
import CustomButton from "../../../../components/CustomButton";
import Icons from "../../../../constants/icons";
import { useGlobalContext } from "../../../../context/GlobalProvider";
import { getNutritonData, updateNutritonData } from "../../../../lib/appwrite-nutriton";
import { androidShadowStyle } from "../../../../components/androidShadowStyle";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const colors = ["#535CE8", "#FF6B6B", "#F9A826", "#4AD584", "#3B82F6", "#6366F1"];
const Nutrition = () => {
  const { user } = useGlobalContext();
  const [nutritionData, setNutritionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nameMeal, setNameMeal] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [nutritionId, setNutritionId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    getNutritonData(user.$id)
      .then((data) => {
        setNutritionId(data.$id);
        const dataParsed = JSON.parse(data.nutritions);
        if (Array.isArray(dataParsed) && dataParsed.length > 0) {
          setNutritionData(dataParsed);
        } else {
          console.error("No data found or invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching nutrition data:", error);
      });
  }, []);

  const totalKcal = nutritionData.reduce((acc, item) => acc + item.value, 0);
  const percentageTotalKcal = totalKcal > 1300 ? 1300 : ((totalKcal / 1300) * 100).toFixed(2);

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
          <Text className="font-osemibold600 text-4xl text-primary dark:text-[#E4E4E7]">
            {displayPercentage}%
          </Text>
        ) : (
          <Text className="font-osemibold600 text-base text-primary dark:text-[#E4E4E7]">
            {displayPercentage}%
          </Text>
        )}
      </>
    );
  };

  const handleSaveMeal = async () => {
    if (!nameMeal || !selectedColor) {
      alert("Please enter a meal name and select a color");
      return;
    }
    const newNutritionData = [
      ...nutritionData,
      {
        name: nameMeal,
        value: 0,
        color: selectedColor,
        percentage: 0,
        radius: 120,
      },
    ];
    setNutritionData(newNutritionData);
    setNameMeal("");
    setSelectedColor(null);
    await updateNutritonData(nutritionId, newNutritionData);
    setModalVisible(false);
    alert("Add meal successfully");
  };

  const handleDeleteMeal = async () => {
    const newNutritionData = nutritionData.filter((_, i) => i !== itemToDelete);
    setNutritionData(newNutritionData);
    await updateNutritonData(nutritionId, newNutritionData);
    setDeleteModalVisible(false);
  };

  const renderRightActions = (index) => (
    <TouchableOpacity
      className="h-[54px] w-20 items-center justify-center rounded-2xl rounded-bl-none rounded-tl-none bg-red-500"
      onPress={() => {
        setItemToDelete(index);
        setDeleteModalVisible(true);
      }}
    >
      <Text className="text-white">Delete</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
        <CustomButtonBack title="Nutrition" handlePress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 pb-8">
            <View className="mt-10 items-center">
              <Text className="w-[240px] text-center font-osemibold600 text-2xl leading-9 text-primary dark:text-[#E4E4E7]">
                You have consumed
                <Text className="text-secondary"> {totalKcal} kcal </Text>
                today
              </Text>
            </View>

            <View className="relative mt-8 items-center justify-center">
              <Svg className="h-60 w-60 -rotate-90" viewBox="0 0 240 240">
                {nutritionData.slice(0, 3).map((item, index) => (
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
                <AnimatedPercentageText targetPercentage={percentageTotalKcal} main />
                <Text className="font-lregular400 text-sm text-[#9095A0] dark:text-[#A0A0A0]">
                  of 1300 kcal
                </Text>
              </View>
            </View>

            <View className="mt-12 space-y-4">
              {nutritionData.map((item, index) => (
                <View
                  key={index}
                  className="overflow-hidden rounded-2xl"
                  style={{
                    shadowColor: "rgba(23, 26, 31, 0.20)",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation: 3,
                  }}
                >
                  <Swipeable renderRightActions={() => renderRightActions(index)}>
                    <View className="h-[54px] flex-row items-center justify-between bg-white px-[14px] dark:bg-[#1E1E1E]">
                      <View className="flex-row items-center">
                        <View
                          className={`mr-2 h-6 w-6 rounded-full`}
                          style={{ backgroundColor: item.color }}
                        ></View>
                        <Text className="w-16 font-oregular400 text-base text-primary dark:text-[#E4E4E7]">
                          {item.name}
                        </Text>
                      </View>
                      <Text className="font-osemibold600 text-base text-primary dark:text-[#E4E4E7]">
                        {item.value}g
                      </Text>
                      <AnimatedPercentageText targetPercentage={item.percentage} />
                    </View>
                  </Swipeable>
                </View>
              ))}
            </View>

            <CustomButton
              title="Add meals"
              textStyles="text-white"
              containerStyles="bg-[#535CE8] mt-[35px]"
              Icon={Icons.Meals}
              handlePress={() => setModalVisible(true)}
            />

            {/* Modal add meals */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View className="flex-1 items-center justify-center bg-white/50">
                <View
                  className="w-[70%] items-center rounded-lg bg-white p-5 shadow-lg"
                  style={androidShadowStyle}
                >
                  <Text className="mb-4 text-center font-omedium500 text-lg">Add your meals</Text>
                  <View className="h-11 w-[68%] flex-row items-center justify-center rounded-lg border border-[#e9e9eb] pr-3">
                    <TextInput
                      className="h-full flex-1 pl-3 text-center font-omedium500 text-base"
                      style={{ outline: "none" }}
                      value={nameMeal}
                      onChangeText={setNameMeal}
                      placeholder="Name your meal"
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>

                  {colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      className="mt-3 h-11 w-full flex-row items-center justify-between rounded-lg bg-white p-3"
                      style={{
                        shadowColor: "#ccc",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                        elevation: 3,
                        borderColor: selectedColor === color ? "blue" : "transparent",
                        borderWidth: selectedColor === color ? 2 : 0,
                      }}
                      onPress={() => setSelectedColor(color)}
                    >
                      <View className="h-6 w-6 rounded-full" style={{ backgroundColor: color }}></View>
                      <Text className="font-oregular400 text-base text-primary dark:text-[#E4E4E7]">
                        {nameMeal}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <View className="mt-3 w-full flex-row justify-between">
                    <TouchableOpacity
                      className="mr-2 rounded-lg bg-red-500 px-4 py-2"
                      onPress={() => {
                        setModalVisible(false);
                        setNameMeal("");
                      }}
                    >
                      <Text className="text-center font-omedium500 text-white">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-2" onPress={handleSaveMeal}>
                      <Text className="text-center font-omedium500 text-white">Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Modal confirm delete */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={deleteModalVisible}
              onRequestClose={() => setDeleteModalVisible(false)}
            >
              <View className="flex-1 items-center justify-center bg-white/50">
                <View
                  className="w-[70%] items-center rounded-lg bg-white p-5 shadow-lg"
                  style={androidShadowStyle}
                >
                  <Text className="mb-4 text-center font-omedium500 text-lg">Confirm Delete</Text>
                  <Text className="mb-4 text-center font-omedium500 text-base">
                    Are you sure you want to delete this meal?
                  </Text>
                  <View className="mt-3 w-full flex-row justify-between">
                    <TouchableOpacity
                      className="mr-2 rounded-lg bg-red-500 px-4 py-2"
                      onPress={() => setDeleteModalVisible(false)}
                    >
                      <Text className="text-center font-omedium500 text-white">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-2" onPress={handleDeleteMeal}>
                      <Text className="text-center font-omedium500 text-white">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Nutrition;
