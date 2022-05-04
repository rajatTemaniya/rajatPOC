import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import  FontAwesomeIcons  from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from 'react-i18next'

export default function TabButtons({theme}) {
    const {t, i18n} = useTranslation();
    const [data, setData] = useState([
        {
            title: 'Job', icon: 'wrench', active: false
        },
        {
            title: 'Service', icon: 'calendar', active: true
        },
        {
            title: 'Service', icon: 'rupee', active: false
        }
    ])

    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonBox} onPress={() => {
            let copyData = [ ...data ];
            copyData[0] = {...copyData[0], active: true};
            copyData[1] = {...copyData[1], active: false};
            copyData[2] = {...copyData[2], active: false};
            setData(copyData);
            setTimeout(() => {
                console.log('getData', data);
            }, 200);
           
        }}>
            <FontAwesomeIcons name="wrench" size={18} color="#900" />
            <View style={styles.textBox}>
                <Text  style={[styles.buttonText], {color:theme.TEXT_COLOR, fontWeight: '600'}}>{t('Job')}</Text>
                <Text style={[styles.buttonText], {color: theme.TEXT_COLOR,  fontWeight: '600',lineHeight: 16}}>{t('Card')}</Text>
                <View style={data[0]?.active? styles.activeTab: {}}></View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBox} onPress={() => {
             let copyData = [ ...data ];
             copyData[0] = {...copyData[0], active: false};
             copyData[1] = {...copyData[1], active: true};
             copyData[2] = {...copyData[2], active: false};
             setData(copyData);
             setTimeout(() => {
                 console.log('getData', data);
             }, 200);
        }}>
            <FontAwesomeIcons name="calendar" size={18} color="#900" />
            <View style={styles.textBox}>
                <Text style={[styles.buttonText], {color:theme.TEXT_COLOR, fontWeight: '600'}}>{t('Service')}</Text>
                <Text style={[styles.buttonText], {color: theme.TEXT_COLOR,  fontWeight: '600',lineHeight: 16}}>{t('Appointments')}</Text>
                <View style={data[1]?.active? styles.activeTab: {}}></View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBox} onPress={() => {
             let copyData = [ ...data ];
             copyData[0] = {...copyData[0], active: false};
             copyData[1] = {...copyData[1], active: false};
             copyData[2] = {...copyData[2], active: true};
             setData(copyData);
        }}>
            <FontAwesomeIcons name="rupee" size={18} color="#900" />
            <View style={styles.textBox}>
                <Text  style={[styles.buttonText], {color:theme.TEXT_COLOR,  fontWeight: '600'}}>{t('Service')}</Text>
                <Text style={[styles.buttonText], {color: theme.TEXT_COLOR,  fontWeight: '600',lineHeight: 16}}>{t('Estimates')}</Text>
                <View style={data[2]?.active? styles.activeTab: {}}></View>
            </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        margin: 2
    },
    buttonBox: {
        alignItems: 'center',
        padding: 5,
        margin: 4
    },
    textBox: {
        margin: 2, alignItems: 'center',

    },
    buttonText: {
        textAlign: 'center',
       // lineHeight: 16
    },
    activeTab: {
        borderWidth: 0.8,
        borderColor: 'green',
        width: 25,
        margin: 2
    }

})