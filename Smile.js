import * as React from "react";
import Animated, {
  Easing,
  interpolate,
  repeat,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";
import {
  withPause,
  interpolateColor,
  interpolatePath,
  parse,
} from "react-native-redash";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Smile = ({ lvl, lvlState }) => {
  const star = useSharedValue(0);
  const drop = useSharedValue(10);
  const paused = useSharedValue(false);

  React.useEffect(() => {
    star.value = repeat(
      withTiming(360, { duration: 2000, easing: Easing.in(Easing.linear) }),
      -1,
      false
    );

    drop.value = withPause(
      repeat(
        withTiming(90, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      ),
      paused
    );
  }, []);

  React.useEffect(() => {
    if (lvlState > 1) {
      paused.value = true;
    } else {
      paused.value = false;
    }
  }, [lvlState]);

  const happySmile = parse(
    "M36.01 111.174c-7.491 47.13 110.395 92.823 128.944 0"
  );
  const sadSmile = parse("M36.01 111.174c9.673-44.6 144.091-24.945 128.944 0");

  const headProps = useAnimatedProps(() => {
    return {
      r: interpolate(lvl.value, [1, 5], [60, 90]),
      fill: interpolateColor(lvl.value, [1, 5], ["#670067", "#7cedff"]),
    };
  });

  const eye1Props = useAnimatedProps(() => {
    return {
      r: interpolate(lvl.value, [1, 5], [30, 22]),
    };
  });

  const eye2Props = useAnimatedProps(() => {
    return {
      r: interpolate(lvl.value, [1, 5], [30, 19]),
    };
  });

  const smileProps = useAnimatedProps(() => {
    const d = interpolatePath(lvl.value, [1, 5], [sadSmile, happySmile]);
    return {
      d,
      strokeWidth: lvl.value,
    };
  });

  const starStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${star.value}deg` },
        {
          scale: interpolate(
            star.value,
            [0, 90, 180, 260, 360],
            [1, 1.4, 2.3, 0.8, 1]
          ),
        },
      ],
    };
  });

  const startPathProps = useAnimatedProps(() => {
    const fill = interpolateColor(
      lvl.value,
      [1, 5],
      ["#DAA52000", "#DAA520FF"]
    );
    return {
      fill,
    };
  });

  const dropAnimatedProps = useAnimatedProps(() => {
    return {
      cy: drop.value,
      r: interpolate(drop.value, [10, 50, 90], [0, 7, 0]),
    };
  });

  const dropSvgStyles = useAnimatedStyle(() => {
    return {
      opacity: lvl.value <= 2 ? 1 : 0,
    };
  });

  return (
    <>
      <Svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width={400}
        height={400}
      >
        <AnimatedCircle
          cx={100.384}
          cy={98.813}
          r={92.327}
          fill="#cf3434"
          animatedProps={headProps}
        />
        <AnimatedCircle
          cx={66.833}
          cy={57.439}
          r={22.575}
          fill="#fff"
          animatedProps={eye1Props}
        />
        <AnimatedCircle
          cx={131.697}
          cy={56.733}
          r={22.558}
          fill="#fffefe"
          animatedProps={eye2Props}
        />
        <AnimatedPath
          stroke="#ffffff"
          fill="#ffcccc"
          animatedProps={smileProps}
        />
        <Circle cx={130.662} cy={61.194} r={15.942} fill="#426686" />
        <Circle cx={65.511} cy={62.478} r={14.694} fill="#426686" />
      </Svg>
      <AnimatedSvg
        id="gwiazdeczka"
        style={[{ position: "absolute", right: 10, top: 170 }, starStyles]}
        viewBox="0 0 100 100"
        width={140}
        height={140}
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedPath
          d="M77.947 57.147l-23.252.517L47.1 79.647l-7.68-21.954-23.253-.43 18.507-14.086L27.9 20.928l19.115 13.248 19.066-13.32-6.693 22.275z"
          animatedProps={startPathProps}
        />
      </AnimatedSvg>
      <AnimatedSvg
        id="tear"
        style={[
          {
            position: "absolute",
            left: 80,
            top: 360,
          },
          dropSvgStyles,
        ]}
        viewBox="0 0 100 100"
        width={200}
        height={200}
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedCircle
          cx={10.697}
          cy={10.733}
          fill="#00a7be"
          animatedProps={dropAnimatedProps}
        />
      </AnimatedSvg>
    </>
  );
};

export default Smile;
