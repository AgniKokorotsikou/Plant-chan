import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView ,
  Alert,
  SafeAreaView,
  ImageBackground,
  Button,
  PanResponder,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import Typewriter from 'react-native-typewriter';

import DraggableShovel from './DraggableShovel';
import DraggableScissors from './DraggableScissors';
import DraggableWateringCan from './DraggableWateringCan';
import ToolsImageBackground from './ToolsImageBackground';
import BlackBackground from './BlackBackground';
import TutorialTextBubbleOne from './TutorialTextBubbleOne';  import TutorialTextBubbleTwo from './TutorialTextBubbleTwo'; import TutorialTextBubbleThree from './TutorialTextBubbleThree'; import TutorialTextBubbleFour from './TutorialTextBubbleFour'; 
import TutorialPlayButtonOne from './TutorialPlayButtonOne';  import TutorialPlayButtonTwo from './TutorialPlayButtonTwo';  import TutorialPlayButtonThree from './TutorialPlayButtonThree';  import TutorialPlayButtonFour from './TutorialPlayButtonFour';

const images = [
  require('./assets/IVYTREE_plant_expressions_default_stage_1.png'),
  require('./assets/IVYTREE_plant_expressions_happy_stage_1.png'),
  require('./assets/IVYTREE_plant_expressions_love_eyes_stage_1.png'),
  require('./assets/IVYTREE_plant_expressions_open_mouth_stage_1.png'),
];
const progressBarImages = [
  require('./assets/0_progress_bar.png'),
  require('./assets/1_progress_bar.png'),
  require('./assets/2_progress_bar.png'),
  require('./assets/3_progress_bar.png'),
  require('./assets/4_progress_bar.png'),
];
const coinCostImages = [
  require('./assets/IVYTREE_50_coins.png'),
  require('./assets/IVYTREE_100_coins.png'),
];

const sadDarkenBgImages = [
  require('./assets/sad_one_background.png'),
  require('./assets/sad_two_background.png'),
  require('./assets/sad_three_background.png'),
];
const sadDarkenImages = [
  require('./assets/sad_one_darken.png'),
  require('./assets/sad_two_darken.png'),
  require('./assets/sad_three_darken.png'),
];
const sadPlantChanImages = [
  require('./assets/IVYTREE_plant_sad_one.png'),
  require('./assets/IVYTREE_plant_sad_two.png'),
  require('./assets/IVYTREE_plant_sad_three.png'),
];

const App = () => {
  
  const [fontsLoaded] = useFonts({
    'Bubble-Bobble': require('./assets/Bubble-Bobble.otf'),
  });

  const [coinBalance, setCoinBalance] = useState(0);
  const earnCoins = (amount) => {
    setCoinBalance(coinBalance + amount);
  };
  const buyItem = (cost) => {
    if (coinBalance >= cost) {
      setCoinBalance(coinBalance - cost);
      // Perform additional logic for the purchase
    } else {
      setAlertErrorVisible(true);
    }
  };
  
  const [showText, setShowText] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [showDarkenImagesOne, setshowDarkenImagesOne] = useState(false);
  const [showDarkenImagesTwo, setshowDarkenImagesTwo] = useState(false);
  const [showDarkenImagesThree, setshowDarkenImagesThree] = useState(false);
  const [isPlantChanHappy, setPlantChanHappy] = useState(true);

  const [showTutorialText, setshowTutorialText] = useState(false);
  const [showTutorialSecondText, setShowTutorialSecondText] = useState(false);
  const [showTutorialImage, setShowTutorialImage] = useState(false);

  const [showStartOfTutorial, setshowStartOfTutorial] = useState(false);
  const [showSecondTutorial, setshowSecondTutorial] = useState(false);
  const [showThirdTutorial, setshowThirdTutorial] = useState(false);
  const [showFourthTutorial, setshowFourthTutorial] = useState(false);

  const [bgImage, setBgImage] = useState(
    require('./assets/IVYTREE_background_night.png')
  );
  const [showSwitches, setShowSwitches] = useState(false);
  const [isDay, setIsDay] = useState(false);
  const switchImage = isDay
    ? require('./assets/IVYTREE_switch_on_day.png')
    : require('./assets/IVYTREE_switch_off_night.png');
  
  const [showCurtainsOpen, setShowCurtainsOpen] = useState(false);
  const [showCurtainsClosed, setShowCurtainsClosed] = useState(false);
  const [showPurchasedCurtainsOpen, setshowPurchasedCurtainsOpen] = useState(false);
  const [showPurchasedCurtainsClosed, setshowPurchasedCurtainsClosed] = useState(false);
  const curtainOpenImage = showPurchasedCurtainsOpen
  ?  isDay
    ? require('./assets/IVYTREE_day_curtains_open_purchased_one.png')
    : require('./assets/IVYTREE_night_curtains_open_purchased_one.png')
  : isDay
    ? require('./assets/IVYTREE_day_curtains_open.png') 
    : require('./assets/IVYTREE_night_curtains_open.png');

  const curtainClosedImage = showPurchasedCurtainsClosed
  ?  isDay
    ? require('./assets/IVYTREE_day_curtains_closed_purchased_one.png')
    : require('./assets/IVYTREE_night_curtains_closed_purchased_one.png')
  : isDay
    ? require('./assets/IVYTREE_day_curtains_closed.png') 
    : require('./assets/IVYTREE_night_curtains_closed.png');

  const [showCoinIcon, setshowCoinIcon] = useState(false);
  const [showCurrencyIcon, setshowCurrencyIcon] = useState(false);
  const currencyIconImage = isDay
    ? require('./assets/IVYTREE_day_currency_icon.png')
    : require('./assets/IVYTREE_night_currency_icon.png');

  const [showMoreInfoIcon, setshowMoreInfoIcon] = useState(false);
  const moreInfoIconImage = isDay
    ? require('./assets/IVYTREE_day_more_info_icon.png')
    : require('./assets/IVYTREE_night_more_info_icon.png');

  const [showShopIcon, setshowShopIcon] = useState(false);
  const shopIconImage = isDay
    ? require('./assets/IVYTREE_day_shop_icon.png')
    : require('./assets/IVYTREE_night_shop_icon.png');
  
  const [showToolsIcon, setshowToolsIcon] = useState(false);
  const toolsIconImage = isDay
    ? require('./assets/IVYTREE_day_tool_icon.png')
    : require('./assets/IVYTREE_night_tool_icon.png');

  const [showCatGuide, setshowCatGuide] = useState(false);
  const catGuideImage = isDay
    ? require('./assets/IVYTREE_day_cat.png')
    : require('./assets/IVYTREE_night_cat.png');

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [showPlant, setshowPlant] = useState(false);
  const sleepingImage = require('./assets/IVYTREE_night_plant_sleeping.png');
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  const [showCurrencyText, setshowCurrencyText] = useState(false);

  const [showShopLayout, setshowShopLayout] = useState(false);
  const [showShopNewRoom1, setshowShopNewRoom1] = useState(false);
  const [showItemLocked, setshowItemLocked] = useState(false);
  const [showToolsLayout, setshowToolsLayout] = useState(false);
  const [showDraggableShovel, setshowDraggableShovel] = useState(false);
  const [showDraggableScissors, setshowDraggableScissors] = useState(false);
  const [showDraggableWateringCan, setshowDraggableWateringCan] = useState(false);
  const [showToolsBackground, setshowToolsBackground] = useState(false);
  const [showBlackBackground, setshowBlackBackground] = useState(false);
  const [showSettingsLayout, setshowSettingsLayout] = useState(false);
  const [showTasksLayout, setshowTasksLayout] = useState(false);
  const [showProgressBar, setshowProgressBar] = useState(false); 
  const [showRoomOneIcon, setshowRoomOneIcon] = useState(false);
  const [showRoomOneIconLocked, setshowRoomOneIconLocked] = useState(true);

  const [showTasksIcon, setshowTasksIcon] = useState(false);
  const tasksIconImage = isDay
    ? require('./assets/IVYTREE_day_tasks.png')
    : require('./assets/IVYTREE_night_tasks.png');

  const [showAchievementsIcon, setshowAchievementsIcon] = useState(false);
  const achievementsIconImage = isDay
    ? require('./assets/IVYTREE_day_achievements.png')
    : require('./assets/IVYTREE_night_achievements.png');

  const [volume, setVolume] = useState(50);

  const getVolumeIcon = () => {
    if (volume === 0) {
      return require("./assets/0_mute_volume.png");
    } else if (volume < 33) {
      return require("./assets/1_low_volume.png");
    } else if (volume < 66) {
      return require("./assets/2_medium_volume.png");
    } else {
      return require("./assets/3_high_volume.png");
    }
  };

  const toggleButton = () => {
    if (showText) {
      setShowText(false);
      setShowSecondText(true);
      return;
    }
    if (showImage) {
      setShowImage(false);
      setBgImage(require('./assets/IVYTREE_background_day.png'));
      setshowToolsBackground(false);
      setIsDay(true);
      setShowSwitches(true);
      setShowCurtainsOpen(true);
      setShowCurtainsClosed(false);
      setshowCurrencyIcon(true); setshowMoreInfoIcon(true); setshowShopIcon(true); setshowToolsIcon(true);           
      setshowCurrencyText(true);  setshowTasksIcon(true); setshowAchievementsIcon(true);
      setshowCatGuide(true);
      setshowPlant(true);
      setShowText(false);
      setShowSecondText(false);
      return;
    }
    setShowImage(true);
    setBgImage(require('./assets/IVYTREE_background_night.png'));
    setshowToolsBackground(false);
    setIsDay(false);
    setShowSwitches(true);
    setShowCurtainsOpen(true);
    setShowCurtainsClosed(true);
    setshowCurrencyIcon(true); setshowMoreInfoIcon(true); setshowShopIcon(true); setshowToolsIcon(true);    
    setshowCurrencyText(true);  setshowTasksIcon(true); setshowAchievementsIcon(true);  
    setshowCatGuide(true);
    setshowPlant(true);
    setShowText(false);
    setShowSecondText(false);
  };

  const toggleTutorialButton = () => {
    if (showTutorialText) {
      setshowTutorialText(false);
      setShowTutorialSecondText(true);
      return;
    }
    if (showTutorialImage) {
      setShowTutorialImage(false);
      setBgImage(require('./assets/IVYTREE_background_day.png'));
      setshowToolsBackground(false);
      setshowCatGuide(true);
      setIsDay(true);
      setShowSwitches(true);
      setShowCurtainsOpen(true);
      setShowCurtainsClosed(false);
      setshowCurrencyIcon(true); setshowMoreInfoIcon(true); setshowShopIcon(true); setshowToolsIcon(true);           
      setshowCurrencyText(true);  setshowTasksIcon(true); setshowAchievementsIcon(true);
      setshowPlant(true);
      setshowTutorialText(false);
      setShowTutorialSecondText(false);

      setshowStartOfTutorial(true);
      return;
    }
    setShowTutorialImage(true);
    setBgImage(require('./assets/IVYTREE_background_night.png'));
    setshowToolsBackground(false);
    setIsDay(false);
    setShowSwitches(true);
    setShowCurtainsOpen(true);
    setShowCurtainsClosed(true);
    setshowCurrencyIcon(true); setshowMoreInfoIcon(true); setshowShopIcon(true); setshowToolsIcon(true);    
    setshowCurrencyText(true);  setshowTasksIcon(true); setshowAchievementsIcon(true);  
    setshowPlant(true);
    setshowCatGuide(true);
    setshowTutorialText(false);
    setShowTutorialSecondText(false);
  };
  
  const beginTutorialButton = () => {
    setshowStartOfTutorial(false);
    setshowSecondTutorial(true);

    setSelectedImage(images[3]);
  };

  const beginSecondTutorialButton = () => {
    setshowSecondTutorial(false);
    setshowThirdTutorial(true);
    
    setSelectedImage(images[2]);
  };

  const beginThirdTutorialButton = () => {
    setshowThirdTutorial(false);
    setshowFourthTutorial(true);

    setSelectedImage(images[1]);
  };

  const endTutorialButton = () => {
    setshowFourthTutorial(false);
  }

  const onPressSwitch = () => {
    setIsDay(!isDay);
    if (bgImage === require('./assets/new_room_one_day.png') || bgImage === require('./assets/new_room_one_night.png')) {
      setBgImage(isDay ? require('./assets/new_room_one_night.png') : require('./assets/new_room_one_day.png'));
      if (showCurtainsOpen) {
      setShowCurtainsOpen(isDay ? require('./assets/IVYTREE_day_curtains_open_purchased_one.png') : require('./assets/IVYTREE_night_curtains_open_purchased_one.png')); }
    if (showCurtainsClosed) {
      setShowCurtainsClosed(isDay ? require('./assets/IVYTREE_day_curtains_closed_purchased_one.png') : require('./assets/IVYTREE_night_curtains_closed_purchased_one.png')); }
    }
    else {
      setBgImage(isDay ? require('./assets/IVYTREE_background_night.png') : require('./assets/IVYTREE_background_day.png'));
    }
    setshowCurrencyIcon(isDay ? require('./assets/IVYTREE_day_currency_icon.png') : require('./assets/IVYTREE_night_currency_icon.png'));
    setshowMoreInfoIcon(isDay ? require('./assets/IVYTREE_day_more_info_icon.png') : require('./assets/IVYTREE_night_more_info_icon.png'));
    setshowToolsIcon(isDay ? require('./assets/IVYTREE_day_tool_icon.png') : require('./assets/IVYTREE_night_tool_icon.png'));
    setshowTasksIcon(isDay ? require('./assets/IVYTREE_day_tasks.png') : require('./assets/IVYTREE_night_tasks.png'));
    setshowAchievementsIcon(isDay ? require('./assets/IVYTREE_day_achievements.png') : require('./assets/IVYTREE_night_achievements.png'));
    setshowCatGuide(isDay ? require('./assets/IVYTREE_day_cat.png') : require('./assets/IVYTREE_night_cat.png'));
  };

  const onPressChangeRoomDefault = () => {
    setBgImage(isDay ? require('./assets/IVYTREE_background_day.png') : require('./assets/IVYTREE_background_night.png'));
    setshowPurchasedCurtainsOpen(false);
    setshowPurchasedCurtainsClosed(false);
  };

  const onPressChangeRoomOne = () => {
    setBgImage(isDay ? require('./assets/new_room_one_day.png') : require('./assets/new_room_one_night.png'));
    setshowPurchasedCurtainsOpen(true);
    setshowPurchasedCurtainsClosed(true);
  };

  const onPressCurtainClose = () => {
    if (bgImage === require('./assets/new_room_one_day.png') || bgImage === require('./assets/new_room_one_night.png')) {
      setShowCurtainsClosed(isDay ? require('./assets/IVYTREE_day_curtains_closed_purchased_one.png') : require('./assets/IVYTREE_night_curtains_closed_purchased_one.png'));
    }
    else {
      setShowCurtainsClosed(isDay ? require('./assets/IVYTREE_day_curtains_closed.png') : require('./assets/IVYTREE_night_curtains_closed.png'));
    }
    setShowCurtainsOpen(false);
    setShowCurtainsClosed(true);
  };

  const onPressCurtainOpen = () => {
    if (bgImage === require('./assets/new_room_one_day.png') || bgImage === require('./assets/new_room_one_night.png')) {
      setShowCurtainsOpen(isDay ? require('./assets/IVYTREE_day_curtains_open_purchased_one.png') : require('./assets/IVYTREE_night_curtains_open_purchased_one.png'));
    }
    else {
      setShowCurtainsOpen(isDay ? require('./assets/IVYTREE_day_curtains_open.png') : require('./assets/IVYTREE_night_curtains_open.png'));
    }
    setShowCurtainsClosed(false);
    setShowCurtainsOpen(true);
  };

  const onPressShowShop = () => {
    setshowShopLayout(true);  setshowShopNewRoom1(true);  setshowItemLocked(true);
  };

  const onPressExitLayout = () => {
    setshowShopLayout(false); setshowToolsLayout(false); setshowSettingsLayout(false);
    setshowToolsBackground(false);  setshowDraggableShovel(false);  setshowDraggableScissors(false); setshowDraggableWateringCan(false);
    setshowTasksLayout(false); setshowBlackBackground(false); setshowProgressBar(false);
  };

  const onPressShowDraggableShovel = () => {
    setshowToolsLayout(false);
    setshowDraggableShovel(true);
    setshowToolsBackground(true);
  }
  const onPressShowDraggableScissors = () => {
    setshowToolsLayout(false);
    setshowDraggableScissors(true);
    setshowToolsBackground(true);
  }
  const onPressShowDraggableWateringCan = () => {
    setshowToolsLayout(false);
    setshowDraggableWateringCan(true);
    setshowToolsBackground(true);
  }

  const onPressShowTasks = () => {
    setshowTasksLayout(true); setshowBlackBackground(true); setshowProgressBar(true);
  };

  const onPressMakeSleepingSound = () => {
    setshowShopLayout(false); setshowToolsLayout(false); setshowSettingsLayout(false);
  };

  const onPressBackToFirstState = () => {
    setShowCurtainsClosed(false); setShowCurtainsOpen(false); 
    setShowCurtainsOpen(false);
    setShowCurtainsClosed(false);
    setshowCurrencyIcon(false); setshowMoreInfoIcon(false); setshowShopIcon(false); setshowToolsIcon(false);    
    setshowCurrencyText(false);  setshowTasksIcon(false); setshowAchievementsIcon(false);  
    setshowPlant(false);  setShowSwitches(false); setshowCatGuide(false);

    setshowTutorialText(true);  setShowTutorialImage(true); setBgImage(require('./assets/IVYTREE_background_night.png')); 
  };

  const onPressPurchaseModernRoom= () => {
  };
  
  const CustomAlert = ({ title, message, imageIndex, onCancel, onConfirm }) => {
    const selectedImage = coinCostImages[imageIndex];
    return (
      <Modal animationType="fade" transparent visible>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
              <View style={styles.costContainer}>
                <Image source={selectedImage} style={styles.costImage} />
              </View>
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
               <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const CustomAlertError = ({ title, message, onConfirmExit }) => {
    return (
      <Modal animationType="fade" transparent visible>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
              <View style={styles.costContainer}>
                <Image source={sadPlantChanImages[0]} style={styles.costImage} />
              </View>
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmExitButton} onPress={onConfirmExit}>
               <Text style={styles.confirmButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [isAlertVisible, setAlertVisible] = useState(false);
  const proceedToBuyNewRoomAlert = () => {
    cost=100;
    setAlertVisible(true);
  };
  const handleCancel = () => {
    console.log('Cancel Pressed');
    setAlertVisible(false);
  };
  const handleConfirm = () => {
    console.log('Yes Pressed');
    setAlertVisible(false);
    setshowRoomOneIcon(true);
    setshowRoomOneIconLocked(false);
    buyItem(100);
    onPressPurchaseModernRoom();
  };

  const [isAlertErrorVisible, setAlertErrorVisible] = useState(false);
  const handleConfirmExit = () => {
    console.log('Cancel Pressed');
    setAlertErrorVisible(false);
    setshowRoomOneIcon(false);
    setshowRoomOneIconLocked(true);
  };

  const watchTutorialAlert = () =>
    Alert.alert('TUTORIAL', 'Do you wish to watch the tutorial?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {onPressExitLayout(), onPressBackToFirstState()}},
    ],
    {
      textStyle: styles.textBubbleStyleAlert
    }
  );
  
  const handlePress = () => {
    if(isDay){
      const availableImages = images.filter(img => img !== selectedImage && img !== images[0]);
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      setSelectedImage(availableImages[randomIndex]);
    }
  };

  useEffect(() => {
  if (isPlantChanHappy) {
    const timeout = setTimeout(() => {
      setSelectedImage(images[0]);
      setLastSelectedIndex(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }
  }, [isPlantChanHappy, selectedImage]); 

  const maxProgress = progressBarImages.length - 1;
  const [taskProgressNight, settaskProgressNight] = useState(0);
  const completeTaskNight = () => {
  if (taskProgressNight < maxProgress) {
    settaskProgressNight(taskProgressNight + 1);
  }
  else {
    earnCoins(50); // Task is considered completed
  }};
  const [taskProgressDay, settaskProgressDay] = useState(0);
  const completeTaskDay = () => {
  if (taskProgressDay < maxProgress) {
    settaskProgressDay(taskProgressDay + 1);
  }
  else {
    earnCoins(50); // Task is considered completed
  }};
  const [taskProgressshoivel, settaskProgressshoivel] = useState(0);
  const completeTaskShovel = () => {
  if (taskProgressshoivel < maxProgress) {
  settaskProgressshoivel(taskProgressshoivel + 1);
  }
  else {
    earnCoins(50); // Task is considered completed
  }};
  const [taskProgressScissors, settaskProgressScissors] = useState(0);
  const completeTaskScissors = () => {
  if (taskProgressScissors < maxProgress) {
    settaskProgressScissors(taskProgressScissors + 1);
  }
  else {
    earnCoins(50); // Task is considered completed
  }};
  const [taskProgressWateringCan, settaskProgressWateringCan] = useState(0);
  const completeTaskWateringCan = () => {
  if (taskProgressWateringCan < maxProgress) {
  settaskProgressWateringCan(taskProgressWateringCan + 1);
  }
  else {
    earnCoins(50); // Task is considered completed
  }};

  const [isTouching, setIsTouching] = useState(false);
  const [touchDuration, setTouchDuration] = useState(0);
  const plantRef = useRef(null);
  const wateringCanRef = useRef(null);

  let touchTimer = null;

  const handleTouchStart = () => {
  setIsTouching(true);
  touchTimer = setTimeout(() => {
    setIsTouching(false);
  }, 3000);
  };
  const handleTouching = () => {
  setTouchDuration(duration => duration + 100);
  if (touchDuration >= 3000) {
    setSelectedImage(images[3]);
    completeTaskNight();
  }
  };
  const handleTouchEnd = () => {
    clearTimeout(touchTimer);
  };
  const startTouchTimer = () => {
  clearTimeout(touchTimer);
  touchTimer = setTimeout(() => {
    if (touchDuration >= 3000) {
      setIsTouching(true);
      handleTouching();
    }
  }, 3000);};

  const panResponderPlant = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onMoveShouldSetPanResponder: () => true,
  onPanResponderGrant: () => {
    clearTimeout(touchTimer);
    setIsTouching(true);
    setTouchDuration(0);
  },
  onPanResponderRelease: () => {
    startTouchTimer();
  },
});

const panResponderWateringCan = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onMoveShouldSetPanResponder: () => true,
  onPanResponderStart: () => {
    handleTouchStart();
  },
  onPanResponderEnd: () => {
    handleTouchEnd();
  },
  // ...other handlers
});
const plantChanisHappyAgainComponent = () => {
  setBgImage(require('./assets/IVYTREE_background_day.png'));
  setPlantChanHappy(true);
  setSelectedImage(images[3]);
  setshowDarkenImagesOne(false);
  setshowDarkenImagesTwo(false);
  setshowDarkenImagesThree(false);
};

const threeDaysPassedComponent = () => {
  setBgImage(sadDarkenBgImages[0]);
  setPlantChanHappy(false);
  setSelectedImage(sadPlantChanImages[0]);
  setshowDarkenImagesOne(false);
  setshowDarkenImagesTwo(false);
  setshowDarkenImagesThree(false);
};
const oneWeekPassedComponent = () => {
  setBgImage(sadDarkenBgImages[1]);
  setPlantChanHappy(false);
  setSelectedImage(sadPlantChanImages[1]);
  setshowDarkenImagesTwo(false);
  setshowDarkenImagesOne(false);
  setshowDarkenImagesThree(false);
};
const twoWeeksPassedComponent = () => {
  setBgImage(sadDarkenBgImages[2]);
  setPlantChanHappy(false);
  setSelectedImage(sadPlantChanImages[2]);
  setshowDarkenImagesThree(false);
  setshowDarkenImagesOne(true);
  setshowDarkenImagesTwo(false);
};

const FiveDaysPassedComponent = () => {
  const [currentImage, setCurrentImage] = useState('image1'); // Set initial image state
  useEffect(() => {
    const fiveDaysMilliseconds = 30 * 1000; // Five days in milliseconds:  5 * 24 * 60 * 60 * 1000

    const checkTimePassed = () => {
      const currentTime = new Date();
      const startTime = new Date('2023/5/24'); // Replace 'your-start-date' with the desired start date

      if (currentTime - startTime >= fiveDaysMilliseconds) {
        setCurrentImage('image2'); // Change image after 5 days
      }
    };

    const interval = setInterval(checkTimePassed, 1000); // Check the time every second

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
}, []);

  return (
    <View style={styles.container}>
      {/* Render different images based on the currentImage state */}
      {currentImage === 'image1' && (
        <Image source={bgImage} style={styles.roomBackground} />
      )}
      {currentImage === 'image2' && (
        <Image source={require('./assets/sad_one_background.png')} style={styles.roomBackground} />
      )}
    </View>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.roomBackground} source={bgImage}>
        
        <View style={styles.container}>
          <View style={styles.contentCenter}>
          {showCurtainsOpen && (
            <TouchableOpacity
                style={styles.curtainsOpen}
                onPress={() => onPressCurtainClose()}
                activeOpacity={0.9}
              >
                <Image source={curtainOpenImage} style={styles.curtainOpenImage} />
              </TouchableOpacity>
            )}
            {showCurtainsClosed && (
            <TouchableOpacity
                style={styles.curtainsClosed}
                onPress={() => onPressCurtainOpen()}
                activeOpacity={0.9}
              >
                <Image source={curtainClosedImage} style={styles.curtainClosedImage} />
              </TouchableOpacity>
            )}
            {showImage && (
              <Image
                source={require('./assets/IVYTREE_text_bubble.png')}
                style={styles.textBubble}
              />
            )}
            {showTutorialImage && (
              <Image
                source={require('./assets/IVYTREE_text_bubble.png')}
                style={styles.textBubble}
              />
            )}
            {showText && (
              <Typewriter
                style={styles.textBubbleStyle}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => toggleButton()}
              >
                HELLO, WELCOME  BACK!
              </Typewriter>
            )}
            {showSecondText && (
              <Typewriter
                style={styles.textBubbleStyle}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => toggleButton()}
              >
                PLANT-CHAN HAS BEEN WAITING FOR YOU.
              </Typewriter>
            )}
            {showTutorialText && (
              <Typewriter
                style={styles.textBubbleStyle}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => toggleTutorialButton()}
              >
                HELLO, THIS IS PLANT-CHAN. SHE NEEDS YOUR HELP!
              </Typewriter>
            )}
            {showTutorialSecondText && (
              <Typewriter
                style={styles.textBubbleStyle}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => toggleTutorialButton()}
              >
                LET ME SHOW YOU HOW
              </Typewriter>
            )}
            {showCurrencyIcon && (
              <View style={styles.currencyIcon}>
                <Image source={currencyIconImage} style={styles.currencyIconImage} />
              </View>
            )}
            {showMoreInfoIcon && (
            <TouchableOpacity
                style={styles.moreInfoIcon}
                onPress={() => setshowSettingsLayout(true)}
                activeOpacity={0.7}
              >
                <Image source={moreInfoIconImage} style={styles.moreInfoIconImage} />
              </TouchableOpacity>
            )}
            {showShopIcon && (
            <TouchableOpacity
                style={styles.shopIcon}
                onPress={() => onPressShowShop()}
                activeOpacity={0.7}
              >
                <Image source={shopIconImage} style={styles.shopIconImage} />
              </TouchableOpacity>
            )}
            {showToolsIcon && (
            <TouchableOpacity
                style={styles.toolsIcon}
                onPress={() => setshowToolsLayout(true)}
                activeOpacity={0.7}
              >
                <Image source={toolsIconImage} style={styles.toolsIconImage} />
              </TouchableOpacity>
            )}
            {showTasksIcon && (
            <TouchableOpacity
                style={styles.tasksIcon}
                onPress={() => onPressShowTasks()}
                activeOpacity={0.7}
              >
                <Image source={tasksIconImage} style={styles.tasksIconImage} />
              </TouchableOpacity>
            )}
            {showAchievementsIcon && (
            <TouchableOpacity
                style={styles.achievementsIcon}
                onPress={() => setshowToolsLayout(true)}
                activeOpacity={0.7}
              >
                <Image source={achievementsIconImage} style={styles.achievementsIconImage} />
              </TouchableOpacity>
            )}
            {showCatGuide && (
            <TouchableOpacity
                style={styles.catGuideImage}
                onPress={() => completeTaskDay()}
                activeOpacity={0.7}
              >
                <Image source={catGuideImage} style={styles.catGuideImage} />
              </TouchableOpacity>
            )}

            {showSwitches && (
              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => onPressSwitch()}
                activeOpacity={0.7}
              >
                <Image source={switchImage} style={styles.switchImage} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => toggleButton()}
              activeOpacity={0.5}
            >
            {showImage && (
                <Image
                  source={require('./assets/IVYTREE_play_button.png')}
                  style={styles.playButton}
                  activeOpacity={0.7}
                />
            )}
            </TouchableOpacity>
            
            {showTutorialImage && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => toggleTutorialButton()}
                activeOpacity={0.5}
              >
              <Image
                  source={require('./assets/IVYTREE_play_button.png')}
                  style={styles.playButton}
                  activeOpacity={0.7}
                />
              </TouchableOpacity>
            )}
            {showCurrencyText && (
              <Text style={styles.coinBalanceText}>
                  {coinBalance}
              </Text>
            )}
            {showBlackBackground && (
              <BlackBackground />
            )}
            {showToolsBackground && (
              <ToolsImageBackground style={{ zIndex: 3 }} />
            )}
            {showPlant && (isDay ? (
              <TouchableOpacity
                style={styles.plantPinkPotStageOne}
                onPress={handlePress}
                activeOpacity={0.95}
                {...panResponderPlant.panHandlers}
              >
                <Image source={selectedImage} style={styles.selectedImage}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.plantPinkPotStageOne}
                onPress={onPressMakeSleepingSound}
                activeOpacity={0.95}
              >
                <Image source={sleepingImage} style={styles.selectedImage} />
              </TouchableOpacity>
            ))}
            {showShopLayout ? (
            <View style={styles.shopLayout}>
              <Image
                source={require('./assets/shop_animation.png')}
                style={styles.shopLayoutImage}
              />
              
              <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  
                  <Text style={styles.shopRoomsBubbleStyle}> ROOMS </Text>
                  <View style={[styles.imageContainer, {marginTop: 80}]}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => onPressChangeRoomDefault()}
                      activeOpacity={0.5}
                    >
                    <Image
                      source={require('./assets/shop_default_room.png')}
                      style={styles.shopItem}
                      activeOpacity={0.9}
                    />
                    </TouchableOpacity>
                    {showRoomOneIcon && (
                      <TouchableOpacity
                        style={styles.shopItem}
                        onPress={() => onPressChangeRoomOne()}
                        activeOpacity={0.5}
                      >
                      <Image
                        source={require('./assets/shop_new_room.png')}
                        style={styles.shopItem}
                        activeOpacity={0.9}
                      />
                      </TouchableOpacity>
                    )}
                    {showRoomOneIconLocked && (
                      <TouchableOpacity
                        style={styles.shopItem}
                        onPress={() => proceedToBuyNewRoomAlert()}
                        activeOpacity={0.5}
                      >
                      <Image
                        source={require('./assets/shop_new_room_locked.png')}
                        style={styles.shopItem}
                        activeOpacity={0.9}
                      />
                      </TouchableOpacity>
                    )}
                    
                    {[...Array(4)].map((_, index) => (
                      <Image 
                        key={index} 
                        source={require('./assets/item_locked.png')} 
                        style={styles.shopItem} 
                      />
                    ))}
                  </View>
                    
                  <View style={styles.separator} />
                  
                  <View style={styles.imageNEWContainer}>
                    <Text style={styles.shopPlantsBubbleStyle}> PLANTS </Text>
                  </View>
                  
                  <View style={styles.imageContainer}>
                      <Image 
                        source={require('./assets/shop_new_room.png')} 
                        style={styles.shopItem} 
                      />
                      {[...Array(3)].map((_, index) => (
                        <Image 
                          key={index} 
                          source={require('./assets/item_locked.png')} 
                          style={styles.shopItem} 
                        />
                      ))}
                  </View>
                </ScrollView>
              </View>
            </View>
            ) : null}
            {showTasksLayout  ? (
            <View style={styles.tasksLayout}>
              <Image
                source={require('./assets/IVYTREE_tasks_layout.png')}
                style={styles.shopLayoutImage}
              />
              <View style={styles.scrollViewContainerTasks}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  <View style={styles.imageNEWContainer}>

                    <Text style={styles.tasksBubbleStyle}> PER DAY </Text>
                    <View >
                    <Image source={require('./assets/sinigle_day_task_layout.png')} style={styles.singleTaskLayout}/>
                    <Image source={progressBarImages[taskProgressDay]} style={styles.progressBar} />
                    <Text style={styles.singleTaskBubbleStyle}>Wake Plant-chan up! It's a new day! </Text>
                    <Text style={styles.progressBarBubbleStyle}>0/1 </Text>
                    </View>
                    <View >
                    <Image source={require('./assets/sinigle_night_sleep_task_layout.png')} style={styles.singleTaskLayout}/>
                    <Image source={progressBarImages[taskProgressNight]} style={styles.progressBar} />
                    <Text style={styles.singleTaskBubbleStyle}>Let Plant-chan rest with you. </Text>
                    <Text style={styles.progressBarBubbleStyle}>0/1 </Text>
                    </View>
                   
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.imageNEWContainer}>

                    <Text style={styles.tasksBubbleStyle}>PER MONTH</Text>
                    <View >
                    <Image source={require('./assets/sinigle_tools_scissors_task_layout.png')} style={styles.singleTaskLayout}/>
                    <Image source={progressBarImages[taskProgressDay]} style={styles.progressBar} />
                    <Text style={styles.singleTaskBubbleStyle}>Give Plant-chan a new haircut! </Text>
                    <Text style={styles.progressBarBubbleStyle}>0/5 </Text>
                    </View>
                    <View >
                    <Image source={require('./assets/sinigle_tools_shovel_task_layout.png')} style={styles.singleTaskLayout}/>
                    <Image source={progressBarImages[taskProgressDay]} style={styles.progressBar} />
                    <Text style={styles.singleTaskBubbleStyle}>Take care of Plant-chan... </Text>
                    <Text style={styles.progressBarBubbleStyle}>0/2 </Text>
                    </View>
                    <View >
                    <Image source={require('./assets/sinigle_tools_watering_can_task_layout.png')} style={styles.singleTaskLayout}/>
                    <Image source={progressBarImages[taskProgressDay]} style={styles.progressBar} />
                    <Text style={styles.singleTaskBubbleStyle}>Shower Plant-chan, everyone needs one in a while! </Text>
                    <Text style={styles.progressBarBubbleStyle}>0/5 </Text>
                    </View>
                   
                  </View>
                </ScrollView>
              </View>
            </View>
            ) : null}
            {showSettingsLayout ? (
            <View style={styles.shopLayout}>
              <Image
                source={require('./assets/settings_layout.png')}
                style={styles.shopLayoutImage}
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <Image source={getVolumeIcon()} style={{ height: 30, width: 30 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Volume</Text>
              </View>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={0}
                maximumValue={100}
                value={volume}
                onValueChange={(value) => setVolume(value)}
              />
              <View style={styles.scrollViewSettingsContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => watchTutorialAlert()}
                      activeOpacity={0.5}
                    >
                    <Text style={styles.settingsBubbleStyle}>Tutorial </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => threeDaysPassedComponent()}
                      activeOpacity={0.5}
                    >
                    <Text style={styles.settingsBubbleStyle}>3 days </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => oneWeekPassedComponent()}
                      activeOpacity={0.5}
                    >
                    <Text style={styles.settingsBubbleStyle}>1 week </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => twoWeeksPassedComponent()}
                      activeOpacity={0.5}
                    >
                    <Text style={styles.settingsBubbleStyle}>2 weeks </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => plantChanisHappyAgainComponent()}
                      activeOpacity={0.5}
                    >
                    <Text style={styles.settingsBubbleStyle}>Plant-chan is happy again!</Text>
                    </TouchableOpacity>
                  </View>
                  
                </ScrollView>
              </View>
            </View>
            ) : null}
            {showToolsLayout  ? (
            <View style={styles.shopLayout}>
              <Image
                source={require('./assets/IVYTREE_tools_layout.png')}
                style={styles.shopLayoutImage}
              />

              <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => onPressShowDraggableShovel()}
                      activeOpacity={0.5}
                    >
                    <Image
                      source={require('./assets/IVYTREE_tools_shovel_icon.png')}
                      style={styles.shopItem}
                      activeOpacity={0.9}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => onPressShowDraggableScissors()}
                      activeOpacity={0.5}
                    >
                    <Image
                      source={require('./assets/IVYTREE_tools_scissors_icon.png')}
                      style={styles.shopItem}
                      activeOpacity={0.9}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.shopItem}
                      onPress={() => onPressShowDraggableWateringCan()}
                      activeOpacity={0.5}
                    >
                    <Image
                      source={require('./assets/IVYTREE_tools_watering_pan_icon.png')}
                      style={styles.shopItem}
                      activeOpacity={0.9}
                    />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
            ) : null}
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => onPressExitLayout()}
              activeOpacity={0.5}
              >
              {showShopLayout || showToolsLayout || showSettingsLayout || showTasksLayout? (
                <Image
                  source={require('./assets/exit_button.png')}
                  style={styles.exitButton}
                  activeOpacity={0.7}
                />) : null
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setshowSettingsLayout(false)}
              activeOpacity={0.5}
              >
              {showSettingsLayout ? (
                <Image source={require('./assets/OK_button.png')} style={styles.okButton} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onPressExitLayout()}
              activeOpacity={0.5}
              >
              {showToolsBackground? (
                <Image
                  source={require('./assets/SAVE_button.png')}
                  style={styles.exitButton}
                  activeOpacity={0.7}
                />) : null
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => onPressExitLayout()}
              activeOpacity={0.5}
              >
              {showToolsBackground? (
                <Image
                  source={require('./assets/BACK_button.png')}
                  style={styles.exitButton}
                  activeOpacity={0.7}
                />) : null
              }
            </TouchableOpacity>
            {showDraggableShovel && (
              <DraggableShovel />
            )}
            {showDraggableScissors && (
              <DraggableScissors />
            )}
            {showDraggableWateringCan && (
              <DraggableWateringCan ref={wateringCanRef} {...panResponderWateringCan.panHandlers}/>
            )}

            {showStartOfTutorial && (
              <TutorialTextBubbleOne />
            )}
            {showStartOfTutorial && (
              <Typewriter
                style={styles.textBubbleStyleTutorial}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => beginTutorialButton()}
              >
                HELLO! I'M YOUR GUIDE, NEKO, AND THIS IS PLANT-CHAN, YOUR VIRTUAL PLANT! ONE WAY TO TAKE CARE OF PLANT-CHAN IS BY USING THREE TOOLS.
              </Typewriter>
            )}
            {showStartOfTutorial && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => beginTutorialButton()}
                activeOpacity={0.5}
              >
                <TutorialPlayButtonOne />
              </TouchableOpacity>
            )}

            {showSecondTutorial && (
              <TutorialTextBubbleThree />
            )}
            {showSecondTutorial && (
              <Typewriter
                style={styles.textSmallBubbleStyleTutorial}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => beginSecondTutorialButton()}
              >
                THE FIRST ONE IS A WATERING CAN, THE SECOND ARE SCISSORS TO GROOM HER AND THE LAST IS A SHOVEL, WHICH IS USED FOR FERTILIZING.
              </Typewriter>
            )}
            {showSecondTutorial && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => beginSecondTutorialButton()}
                activeOpacity={0.5}
              >
                <TutorialPlayButtonThree />
              </TouchableOpacity>
            )}
            {showThirdTutorial && (
              <TutorialTextBubbleThree />
            )}
            {showThirdTutorial && (
              <Typewriter
                style={styles.textSmallBubbleStyleTutorial}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => beginThirdTutorialButton()}
              >
                AS WELL THE TOOLS, THERE ARE CERTAINS TASKS YOU HAVE TO FOLLOW IN ORDER TO KEEP PLANT-CHAN HAPPY AND ENERGETIC!
              </Typewriter>
            )}
            {showThirdTutorial && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => beginThirdTutorialButton()}
                activeOpacity={0.5}
              >
                <TutorialPlayButtonThree />
              </TouchableOpacity>
            )}

            {showFourthTutorial && (
              <TutorialTextBubbleFour />
            )}
            {showFourthTutorial && (
              <Typewriter
                style={styles.textSmallBubbleStyleTutorial}
                typing={1}
                minDelay={20}
                maxDelay={50}
                onComplete={() => endTutorialButton()}
              >
                BY COMPLETING EACH TASK,YOU ARE REWARDED WITH COINS WHICH YOU CAN LATER SPEND IN SHOP TO BUY NEW ROOMS AND PLANTS !
              </Typewriter>
            )}
            {showFourthTutorial && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => endTutorialButton()}
                activeOpacity={0.5}
              >
                <TutorialPlayButtonFour />
              </TouchableOpacity>
            )}
            {isAlertVisible && (
              <CustomAlert
                title="Modern Room"
                message="Do you wish to purchase for:"
                imageIndex={1}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                visible={isAlertVisible}
              />
            )}
            {isAlertErrorVisible && (
              <CustomAlertError
                title="Error"
                message="Not enough currency. Please complete tasks to earn more coins"
                onConfirmExit={handleConfirmExit}
                visible={isAlertErrorVisible}
              />
            )}
          </View>
        </View>
        {showDarkenImagesOne && (
          <Image source={sadDarkenImages[0]} style={styles.sadDarkenImage} />
        )}
        {showDarkenImagesTwo && (
          <Image source={sadDarkenImages[1]} style={styles.sadDarkenImage} />
        )}
        {showDarkenImagesThree && (
          <Image source={sadDarkenImages[2]} style={styles.sadDarkenImage} />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sadDarkenImage: {
    position: 'absolute',
    flex: 1,
    height: hp('100%'),
    width: wp('100%'), 
    alignItems: 'stretch',
  },  
  roomBackground: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'), 
    alignItems: 'stretch',
  },  
  textBubbleStyle: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Bubble-Bobble',
    fontSize: 30,
    width: "45%",
    textAlignVertical:'top',
  },
  textBubble:{
    height: '100%',
    width: '100%'
  },
  playButton: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  switchButton: {
    position: 'absolute',
    height: 40,
    width: 40,
    top: 245,
    right: 50,
    transform: [{ scale: 0.7 }]
  },
  curtainsOpen: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 75,
    right: 150,
    transform: [{ scale: 0.45 }]
  },
  curtainsClosed: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 75,
    right: 150,
    transform: [{ scale: 0.45 }]
  },
  currencyIcon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: -2,
    right: 115,
    transform: [{ scale: 0.35 }]
  },
  moreInfoIcon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 15,
    right: -190,
    transform: [{ scale: 0.4 }],
    zIndex: 1,
  },
  shopIcon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 685,
    right: -175,
    transform: [{ scale: 0.35 }],
  },
  toolsIcon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 583,
    right: -175,
    transform: [{ scale: 0.35 }],
  },
  catGuideImage: {
    position: 'absolute',
    height: 174,
    width: 242,
    top: 42,
    right: -38,
    transform: [{ scale: 0.7 }],
  },
  plantPinkPotStageOne: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 324,
    right: -40,
    transform: [{ scale: 0.47 }],
  },
  selectedImage: {
    position: 'absolute',
    height: 470,
    width: 500,
    right: -90,
    transform: [{ scale: 0.9 }],
  },
  coinBalanceText: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Bubble-Bobble',
    fontSize: 27,
    width: "45%",
    textAlignVertical:'top',
    top: 38,
    right: 145,
  },
  shopLayout: {
    position: 'absolute',
    top: 400,
    left: 200,
    transform: [{ translateX: -598/2 }, { translateY: -1012/2 }, { scale: 0.7 }],
    zIndex: 1, 
  },
  exitButton: {
    position: 'absolute',
    top: 65,
    left: 157,
    transform: [{ scale: 0.85 }],
    zIndex: 25, 
  },
  okButton: {
    position: 'absolute',
    top: 268,
    left: 67,
    transform: [{ scale: 0.85 }],
    zIndex: 25, 
  },
  saveButton: {
    position: 'absolute',
    top: 580,
    left: -100,
    transform: [{ scale: 0.85 }],
  },
  backButton: {
    position: 'absolute',
    top: 580,
    left: 70,
    transform: [{ scale: 0.85 }],
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  imageNEWContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  shopItem: {
    width: '31%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  scrollViewContainer: {
    position: 'absolute',
    top: '25%',
    left: '14%',
    height: '43%',
    width: '67%',
    borderRadius: 10,
  },
  scrollViewSettingsContainer: {
    position: 'absolute',
    top: '22.5%',
    left: '14%',
    height: '41%',
    width: '67%',
    borderRadius: 10,
  },
  scrollViewContainerTasks: {
    position: 'absolute',
    top: '25%',
    left: '14%',
    height: '57.5%',
    width: '70%',
    borderRadius: 10,
  },
  separator: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginHorizontal: 10,
    marginTop: 20,
  },
  shopRoomsBubbleStyle: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Bubble-Bobble',
    fontSize: 60,
    width: "45%",
    textAlignVertical:'top',
    marginHorizontal: 10,
    marginTop: 10,
    left: 110,
  },
  shopPlantsBubbleStyle: {
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize:53,
    width: "45%",
    textAlignVertical:'top',
    marginHorizontal: 10,
    zIndex: 20,
    textShadowColor: '#fff',
    textShadowRadius: 20,
    textAlign: 'center',
  },
  tasksIcon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 575,
    right: 120,
    transform: [{ scale: 0.35 }],
  },
  achievementsIcon: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 680,
    right: 130,
    transform: [{ scale: 0.35 }],
  },
  tasksLayout: {
    position: 'absolute',
    top: 390,
    left: 200,
    transform: [{ translateX: -598/2 }, { translateY: -1012/2 }, { scale: 0.7 }],
    zIndex: 20, 
  },
  singleTaskLayout: {
    width: 385,
    height: 240,
    marginBottom: 10,
    marginLeft: 1,
    marginRight: 10,
  },
  tasksBubbleStyle: {
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize: 50,
    width: "60%",
    textAlignVertical:'top',
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 13,
    zIndex: 20,
    textShadowColor: '#fff',
    textShadowRadius: 20,
    textAlign: 'center',
  },
   progressBar: {
    position: 'absolute',
    height: 45,
    width: 221,
    transform: [{ scale: 1 }],
    top: 150,
    left: 40,
    zIndex: 21, 
  },
  singleTaskBubbleStyle: {
    position: 'absolute',
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize: 30,
    width: "80%",
    textAlignVertical:'top',
    marginHorizontal: 10,
    textShadowColor: '#fff',
    textShadowRadius: 10,
    textAlign: 'left',
    top: 50,
    left: 20,
    zIndex: 21,
  },
  progressBarBubbleStyle: {
    position: 'absolute',
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize: 25,
    width: "80%",
    textAlignVertical:'top',
    marginHorizontal: 10,
    textShadowColor: '#fff',
    textShadowRadius: 10,
    textAlign: 'left',
    top: 158,
    left: 123,
    zIndex: 22,
  },
  settingsBubbleStyle: {
    position: 'absolute',
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize: 30,
    width: "100%",
    textAlignVertical:'top',
    marginHorizontal: 10,
    textShadowColor: '#fff',
    textShadowRadius: 10,
    textAlign: 'left',
    left: 10,
    zIndex: 21,
  },
  textBubbleStyleTutorial: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Bubble-Bobble',
    fontSize: 20,
    width: "60%",
    textAlignVertical:'top',
    top: 135,
  },
  textSmallBubbleStyleTutorial: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Bubble-Bobble',
    fontSize: 20,
    width: "70%",
    textAlignVertical:'top',
    top:123,
  },
  textBubbleStyleAlert: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Bubble-Bobble',
    fontSize: 20,
    width: "70%",
    textAlignVertical:'top',
    top:123,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 26,
    borderRadius: 9,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize: 30,
    marginBottom: 15,
  },
  message: {
    color: 'black',
    fontFamily: 'Bubble-Bobble',
    fontSize: 23,
    marginBottom: 10,
  },
  costContainer: {
    marginBottom: 20,
  },
  costImage: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 7,
    marginRight: 25,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'Bubble-Bobble',
  },
  confirmButton: {
    backgroundColor: '#A9BD58',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 3,
    fontFamily: 'Bubble-Bobble',
  },
  confirmExitButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 7,
  },
});