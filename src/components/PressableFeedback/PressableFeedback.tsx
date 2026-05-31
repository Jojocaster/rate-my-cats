import { PropsWithChildren } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressableFeedbackProps extends PressableProps {
  scaleValue?: number;
}

const PressableFeedback = ({
  children,
  scaleValue = 0.85,
  style,
  onPressIn,
  onPressOut,
  ...props
}: PropsWithChildren<PressableFeedbackProps>) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      {...props}
      style={[animatedStyle, style]}
      onPressIn={(e) => {
        scale.value = withTiming(scaleValue, {
          duration: 100,
          easing: Easing.out(Easing.ease),
        });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withTiming(1, {
          duration: 150,
          easing: Easing.out(Easing.ease),
        });
        onPressOut?.(e);
      }}
    >
      {children}
    </AnimatedPressable>
  );
};

export default PressableFeedback;
