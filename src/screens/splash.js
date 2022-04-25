import React, {useState, useEffect} from "react";
import { StatusBar, StyleSheet, Text, View, Image } from "react-native";
import Modal from "react-native-modal";

export default function Splash() {
    const [isModalOpen, setIsModalOpen] = useState(true)
    useEffect(() => {
      setTimeout(() => {
         setIsModalOpen(false)
      }, 3100);
    }, [])
    
    return(
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Modal
                style={{justifyContent: 'center', alignItems: 'center'}}
                isVisible={isModalOpen}
                animationIn="rotate"
                animationOut="fadeOutUp"
                animationInTiming={3000}
                animationOutTiming={2500}
                backdropOpacity={0.5}
            >
                <View>
                    <Image style={{ height: 130 ,width: 130 }} source={require('../assets/images/round_logo.png')}/>
                </View>
            </Modal>
            <Text style={styles.label}>Mobility Warrior Excellon</Text>
        </View>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    label: {
        color: 'orange',
        fontWeight: '700',
        top: 100
    }
})