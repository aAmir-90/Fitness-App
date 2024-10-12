import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import fitness from "../data/fitness";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const FitnessCard = () => {
  const navigation = useNavigation();
  const FitnessData = fitness;
  return (
    <View>
      {FitnessData.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Workout", {
              image: item.image,
              excersises: item.excersises,
              id: item.id,
            })
          }
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
          key={index}
        >
          <Image
            style={{
              width: "95%",
              height: 170,
              borderRadius: 7,
            }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 25,
            }}
          >
            {item.name}
          </Text>
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "white",
              bottom: 15,
              left: 20,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCard;
