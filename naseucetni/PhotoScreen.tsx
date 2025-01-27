import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { 
  doc, 
  setDoc, 
  collection, 
  getFirestore 
} from 'firebase/firestore'; // Import getFirestore from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDup_1PuUFSLm4ZHPLgUJVuDCGEudBVhWk",
  authDomain: "naseucetni-database.firebaseapp.com",
  projectId: "naseucetni-database",
  storageBucket: "naseucetni-database.firebasestorage.app",
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
  let cameraRef = useRef<typeof Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: true,
      };

      try {
        const newPhoto = await cameraRef.current.takePictureAsync(options);
        const { uri } = newPhoto; 
        setPhoto(uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleChooseFromLibrary = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  const handleImage = async () => {
    if (selectedCollection) {
      if (photo) {
        await uploadImageToFirebase(photo, selectedCollection);
      } else {
        Alert.alert('Please select a collection');
      }
    } else {
      Alert.alert('Please select a collection');
    }
  };

  const uploadImageToFirebase = async (imageUrl: string, collectionName: string) => {
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const imageRef = ref(storage, `images/${collectionName}/${Date.now()}`);
      const uploadTask = uploadBytes(imageRef, blob);

      uploadTask.on('state_changed',
        () => {
          // Progress updates
        },
        () => {
          // Handle errors
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL: any) => {
              try {
                await setDoc(doc(db, collectionName, Date.now().toString()), {
                  imageUrl: downloadURL,
                });
              } catch (error) {
                console.error('Error saving image to Firestore:', error);
              }
            });
        }
      );
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
            <TouchableOpacity onPress={handleShare}>
              <Text>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          {hasCameraPermission && (
            <Camera style={styles.preview} type="back" ref={cameraRef}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
                  {/* No need to explicitly specify children for TouchableOpacity */}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChooseFromLibrary}>
                  <Text>Choose from Library</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
          {!hasCameraPermission && <Text>No camera permission</Text>}
        </View>
      )}
    </View>
  );
};

export default PhotoScreen;