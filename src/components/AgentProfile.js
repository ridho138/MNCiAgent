import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const AgentProfile = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
          }}
        />
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.name}>Teguh Ridho Afdilla</Text>
        <Text style={styles.userInfo}>97729812993892</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingLeft: 25,
    alignItems: "center"
  },
  rightContent: {
    paddingLeft: 10
  },

  avatar: {
    "@media (max-width: 400)": {
      width: 50,
      height: 50,
      borderRadius: 25
    },
    "@media (min-width: 400)": {
      width: 70,
      height: 70,
      borderRadius: 35
    },
    borderWidth: 1,
    borderColor: "#E1C064"
  },
  name: {
    fontSize: "1rem",
    color: "white",
    fontWeight: "bold"
  },
  userInfo: {
    fontSize: "0.7rem",
    color: "white"
  }
});

// const styles = {
//   container: {
//     flex: 2,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingTop: 10,
//     paddingLeft: 25,
//     alignItems: "center"
//   },
//   rightContent: {
//     paddingLeft: 10
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: "#E1C064"
//   },
//   name: {
//     fontSize: `${moderateScale(16)}`,
//     color: "white",
//     fontWeight: "bold"
//   },
//   userInfo: {
//     fontSize: `${moderateScale(12)}`,
//     color: "white"
//   }
// };

// const styles2 = ScaledSheet.create({
//   name: {
//     fontSize: "16@ms",
//     color: "white",
//     fontWeight: "bold"
//   },
//   userInfo: {
//     fontSize: "12@ms",
//     color: "white"
//   }
// });

export default AgentProfile;
