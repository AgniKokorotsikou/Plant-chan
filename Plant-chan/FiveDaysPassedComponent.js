import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const FiveDaysPassedComponent = () => {
  const [currentImage, setCurrentImage] = useState('image1'); // Set initial image state

  useEffect(() => {
    const fiveDaysMilliseconds = 5 * 24 * 60 * 60 * 1000; // Five days in milliseconds

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
        <Image source={require('./assets/IVYTREE_background_day.png')} style={styles.image} />
      )}
      {currentImage === 'image2' && (
        <Image source={require('./assets/IVYTREE_background_night.png')} style={styles.image} />
      )}
    </View>
  );
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

export default FiveDaysPassedComponent;
