import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import Modal from "react-native-modal";

function languageModel({ onCancelPressed, showModel, onLangSelect }) {

    // For mentain isVisible inside this modal only
    const [ getShowModal, setShowModal ] = useState(showModel)
    const langList = [
        { code: 'ma', label: 'Marathi - मराठी' },
        { code: 'hi', label: 'Hindi - हिन्दी' },
        { code: 'en', label: 'English' },
    ]

     // You knows right :-) No magic just true code
    const passLangValue = (value) => {
        setTimeout(() => {
            onLangSelect(value)
        }, 350);
    }

    return (
        <Modal
            style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}
            isVisible={getShowModal}
            animationIn="lightSpeedIn"
            animationOut="lightSpeedOut"
            animationInTiming={300}
            animationOutTiming={350}
            backdropOpacity={0.8}
            onBackButtonPress={onCancelPressed}>
                <ImageBackground style={{ height: '60%',width: '75%', opacity: 0.7 }}  source={require('../assets/images/rama_logo.png')}>
                    <View style={styles.background}>
                
                        <FlatList
                            contentContainerStyle={{marginVertical: '50%'}}
                            data={langList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={{ margin: 2}} onPressIn={() => setShowModal(false) } onPress={() =>  passLangValue(item) }>
                                        <View style={{backgroundColor: '#e07204', padding: 5, margin: 0.5, borderBottomColor: 'orange', borderWidth: 0.5, borderRadius: 3}}>
                                            <Text style={{color: 'black', textAlign: 'center', fontWeight: '600'}}>{item.label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            // ListHeaderComponent={<UserProfile userName={userName} userLevel={userLevel} />}
                            />
                    
                    </View>
                </ImageBackground> 
        </Modal>
    )

}

export default languageModel

const styles = StyleSheet.create({
    background: {
        width: '100%',
        padding: 1,
        alignItems: "center",
    },   
})