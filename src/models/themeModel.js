import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Modal from "react-native-modal";
import { Themes } from '../styles/themes';


function themeModel({onCancelPressed,showModel, onThemeSelect}) {
    
    // For mentain isVisible inside this modal only
    const [getShowModal, setShowModal] = useState(showModel)
    // Static Theme data and formate
    const langList = [
        { value: Themes.primaryTheme, label: 'White', color: 'white',  textColor: 'black' },
        { value: Themes.secondaryTheme, label: 'Dark', color: 'black', textColor: 'white' },
    ]

    // You knows right :-) No magic just true code
    const passThemeValue = (value) => {
        setShowModal(false)
        setTimeout(() => {
            onThemeSelect(value)
        }, 350);
    }
    // We can write Modal inside the View for better controlling
    return (
        <View>
            <Modal
                style={{ alignItems: 'center' }}
                isVisible={getShowModal}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                animationInTiming={300}
                animationOutTiming={350}
                backdropOpacity={0.8}
                onBackdropPress={onCancelPressed}
                onBackButtonPress={onCancelPressed}>
                    <View>
                        {/* <Image style={{ height: 150 ,width: 150, bottom: 74, right: 2 }} /> */}
                    </View>
                  
                    <FlatList
                        style={{ position: 'absolute' }}
                        data={langList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{ margin: 4 }} onPress={() => { passThemeValue(item.value)}}>
                                    <View style={{backgroundColor: item.color, padding: 5, margin: 0.5, borderBottomColor: 'black', borderWidth: 0.5, borderRadius: 3}}>
                                        <Text style={{color: item.textColor, textAlign: 'center', fontWeight: '600'}}>{item.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
            
            </Modal>
        </View>
    )

}

export default themeModel
