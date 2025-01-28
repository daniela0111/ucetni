import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDup_1PuUFSLm4ZHPLgUJVuDCGEudBVhWk",
  authDomain: "naseucetni-database.firebaseapp.com",
  projectId: "naseucetni-database",
  storageBucket: "naseucetni-database.appspot.com",
  messagingSenderId: "33185754458",
  appId: "1:33185754458:web:125a2adeb95cab7afe9763",
  measurementId: "G-VS19N5MB79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

interface PhotoScreenProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f00',
    marginBottom: 20,
  },
});

const PhotoScreen: React.FC<PhotoScreenProps> = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (hasCameraPermission && cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: true,
        });
        setPhoto(data.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleChooseFromLibrary = async () => {
    const result: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleImage = async () => {
    if (selectedCollection && photo) {
      await uploadImageToFirebase(photo, selectedCollection);
    } else {
      Alert.alert('Please select a collection');
    }
  };

  const uploadImageToFirebase = async (imageUrl: string, collectionName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${collectionName}/${Date.now()}`);
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on('state_changed',
        () => {}, // Handle progress updates if needed
        (error) => {
          console.error('Upload error:', error);
          Alert.alert('Upload failed');
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await setDoc(doc(db, collectionName, Date.now().toString()), {
              imageUrl: downloadURL,
              timestamp: new Date(),
            });
            Alert.alert('Upload successful!');
          } catch (error) {
            console.error('Firestore error:', error);
            Alert.alert('Error saving to database');
          }
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload failed');
    }
  };

  const handleShare = async () => {
    if (photo) {
      await shareAsync(photo);
    }
  };

  const handleSave = async () => {
    if (photo && hasMediaLibraryPermission) {
      await MediaLibrary.saveToLibraryAsync(photo);
      Alert.alert('Photo saved to library!');
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.preview}
            source={{ uri: photo }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setPhoto(null)}>
              <Text>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Text>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImage}>
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          {hasCameraPermission ? (
            <Camera
              style={styles.preview}
              type={CameraType.back}
              ref={cameraRef}
            >
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleTakePicture}
                />
                <TouchableOpacity onPress={handleChooseFromLibrary}>
                  <Text style={{ color: 'white' }}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <Text>No camera permission</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default PhotoScreen;