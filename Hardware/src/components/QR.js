import QRCode from "react-native-qrcode-svg";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";


const QR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrPressed, setQrPressed] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`El trabajo fue realizado por ${data}`);
  };


  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value="Joaquin Maceira, Santiago Doff, Lorenzo Shammah Zalba"
          size={350}
        //logo={{ uri: 'assets:/zheoden.jfif' }}
        />
      </View>
      {!hasPermission ? (
        <Text>Requesting for camera permission</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={"Toca para escanear"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
});

export default QR;
