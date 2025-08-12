import { Colors } from "@/constants/Colors";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ModalPrompt({
  visible,
  onClose,
  onConfirm,
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType={"fade"}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText type={"normal"} style={styles.modalText}>
            {message}
          </CustomText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <CustomText type={"small"}>{cancelText}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <CustomText type={"small"}>{confirmText}</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    padding: 35,
    borderRadius: 6,
    alignItems: "center",
    width: "75%",
    backgroundColor: Colors.dark.secondaryBackground,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 60,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
    minWidth: 80,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.dark.destroyButton,
  },
  confirmButton: {
    backgroundColor: Colors.dark.button,
  },
});
