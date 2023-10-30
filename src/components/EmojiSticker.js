import { View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function EmojiSticker({ imageSize, stickerSource }) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const preX = useSharedValue(0);
  const preY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      positionX.value = e.translationX + preX.value;
      positionY.value = e.translationY + preY.value;
    })
    .onEnd(() => {
      preX.value = positionX.value;
      preY.value = positionY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      { scale: scale.value },
    ],
  }));

  const composed = Gesture.Race(panGesture, pinchGesture);

  return (
    <GestureDetector gesture={composed}>
      <AnimatedImage
        source={stickerSource}
        resizeMode="contain"
        style={[
          animatedStyle,
          { width: imageSize, height: imageSize, top: -350 },
        ]}
      />
    </GestureDetector>
  );
}
