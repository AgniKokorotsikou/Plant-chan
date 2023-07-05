import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const WeekPassedComponent = () => {
  const [showSadPlantChan, setshowSadPlantChan] = useState(false);

  useEffect(() => {
    const oneWeekMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

    const checkTimePassed = () => {
      const currentTime = new Date();
      const startTime = new Date('2023/5/24'); // Replace 'your-start-date' with the desired start date

      if (currentTime - startTime >= oneWeekMilliseconds) {
        setshowSadPlantChan(true);
      }
    };

    const interval = setInterval(checkTimePassed, 1000); // Check the time every second

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (showSadPlantChan) {
    return (
      <View style={styles.container}>
        {/* Your component content */}
        <Image source={require('./assets/IVYTREE_background_night.png')} style={styles.image} />
      </View>
    );
  } else {
    return null; // Component is hidden until a week has passed
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default WeekPassedComponent;
