import { View, Text, Image, ScrollView } from "react-native";
import React, { useContext } from "react";
import FitnessCard from "../componenets/FitnessCard";
import { FitnessItems } from "../Context";

const HomeScreen = () => {
  const { minutes, calories, workout } = useContext(FitnessItems);
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View
        style={{
          backgroundColor: "#CD853F",
          padding: 10,
          height: 200,
          width: "100%",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
          Home Workout
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {workout}
            </Text>
            <Text
              style={{
                color: "#D0D0D0",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              WORKOUTS
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {calories}
            </Text>
            <Text
              style={{
                color: "#D0D0D0",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              KCAL
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {minutes}
            </Text>
            <Text
              style={{
                color: "#D0D0D0",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              MINS
            </Text>
          </View>
        </View>

        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{
              width: "90%",
              height: 120,
              marginTop: 20,
              borderRadius: 7,
            }}
            source={{
              uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
            }}
          />
        </View> */}
      </View>
      <FitnessCard />
    </ScrollView>
  );
};

export default HomeScreen;
