import React, { useMemo, useEffect, useState } from "react";
import Slider from "react-native-smooth-slider";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { StyleSheet, View, Text } from "react-native";
import { interpolateColor } from "react-native-redash";
import Smile from "./Smile";

const App = (prop) => {
  const [value, setValue] = useState(3);
  const lvl = useSharedValue(1);

  useEffect(() => {
    lvl.value = withTiming(value, {
      duration: 500,
      easing: Easing.in(Easing.elastic(3)),
    });
  }, [value]);

  const style = useAnimatedStyle(() => {
    return {
      fontSize: 10 + 10 * lvl.value,
      fontWeight: (300 + 100 * Math.round(lvl.value)).toString(),
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        lvl.value,
        [1, 3, 5],
        ["#B22222", "#ffffff", "#228B22"]
      ),
    };
  });

  const text = useMemo(
    () =>
      ({
        1: "worst",
        2: "don't like it",
        3: "neutral",
        4: "like",
        5: "love",
      }[value]),
    [value]
  );

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <Smile lvlState={value} lvl={lvl} />
      <Slider
        style={{ marginLeft: 40, marginRight: 40 }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={value}
        useNativeDriver={true}
        onValueChange={setValue}
      />
      <Animated.Text style={[styles.text, style]}>{text}</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default App;
