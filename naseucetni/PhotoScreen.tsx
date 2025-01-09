import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

interface PhotoScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  documentButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  helpButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

const PhotoScreen: React.FC<PhotoScreenProps> = () => {
  let cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: true,
      };

      const newPhoto = await cameraRef.current.takePictureAsync(options);
      // Assuming you have a Firebase function here:
      // await uploadToFirebase(newPhoto.uri); // Replace with actual Firebase upload logic
      setPhoto(newPhoto);
    }
  };

  const handleShare = () => {
    if (photo) {
      shareAsync(photo.uri).then(() => {
        setPhoto(null);
      });
    }
  };

  const handleSave = () => {
    if (photo && hasMediaLibraryPermission) {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(null);
      });
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.preview}
            source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
          />
          <TouchableOpacity onPress={handleShare}>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.preview} type="back" ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                {/* No need to explicitly specify children for TouchableOpacity */}
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </View>
  );
};

export default PhotoScreen;