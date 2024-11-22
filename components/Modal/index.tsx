import { secondaryMain } from "@/theme/colors";
import { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { Image } from "expo-image";

export interface IModalAlert {
  visible: boolean;
  handleCancel: () => void;
}

const ModalAlert: FC<IModalAlert> = (props) => {
  const { visible, handleCancel } = props;

  const [openModal, setOpenModal] = useState(visible);
  const [time, setTime] = useState(30);
  const [counting, setCounting] = useState(true);

  const hideModal = () => {
    setTime(30);
    setCounting(false);
    setOpenModal(false);
    handleCancel();
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };
  useEffect(() => {
    if (counting) {
      if (time > 0) {
        const intervalId = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [time, counting]);

  useEffect(() => {
    setOpenModal(visible);
    if (visible) setCounting(true);
  }, [visible]);

  return (
    <Portal>
      <Modal
        style={styles.mainModal}
        visible={openModal}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/sos.png")}
          contentFit="contain"
          transition={1000}
        />
        <Text style={styles.modalText}>
          Se enviará un mensaje de texto SMS a los contactos de seguridad en{" "}
          {`0:${time}`} segundos
        </Text>
        <Text style={styles.modalText}>Puedes cancelar</Text>
        <Button mode="outlined" textColor={secondaryMain} onPress={hideModal}>
          Cancelar
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainModal: { margin: 10 },
  modalText: {
    color: secondaryMain,
  },
  image: {
    height: 100,
  },
});

export default ModalAlert;
