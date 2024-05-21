import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput, useTheme, Button } from 'react-native-paper'
import { RadioButton, Card } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addteacher = ({ navigation }) => {


    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
        );
    };
    const dataa = [
        { label: 'Receptionist', value: '1' },
        { label: 'librarian', value: '2' },
        { label: 'Clerk', value: '3' },
        { label: 'peons', value: '4' },
        { label: 'human resource manager', value: '5' },
        { label: 'counselors', value: '6' },
        { label: 'cafeteria member', value: '7' },
        { label: 'cleaning staff', value: '8' },
        { label: 'administrator', value: '9' },

    ];
    const [teacherRolevalue, setteacherRolevalue] = useState(null);

    const { colors } = useTheme();
    const [gender, setgender] = useState(" ");
    const [role, setrole] = useState("")
    const [accessToken, setaccessToken] = useState("")
    const [refreshtoken, setrefreshToken] = useState("")


    const [joindate, setjoindate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [joindata, setjoindata] = useState("")

    const [birthdate, setbirthdate] = useState(new Date())
    const [openn, setOpenn] = useState(false)
    const [birthdata, setbirthdata] = useState("")



    const [name, setname] = useState("")
    const namedetails = (name) => {
        setname(name)
        console.log(name);
    }

    const [relation, setrelationdetails] = useState("")
    const relationdetails = (name) => {
        setrelationdetails(name)
        console.log(name);
    }
    const [mobilenumber, setmobilenumberdetails] = useState("")
    const mobilenumberdetails = (name) => {
        setmobilenumberdetails(name);
        console.log(name);
    }
    const [relationmobilenumber, setrelationmobilenumberdetails] = useState("")
    const relationmobilenumberdetails = (name) => {
        setrelationmobilenumberdetails(name)
        console.log(name);
    }
    const [address, setaddressdetails] = useState("")
    const addressdetails = (name) => {
        setaddressdetails(name)
        console.log(name);
    }

    {/* <Text> Integration </Text> */ }

    const getuserdata = async () => {
        const role = await AsyncStorage.getItem("role");
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshtoken = await AsyncStorage.getItem("refreshtoken");
        setrole(role);
        setaccessToken(accessToken);
        setrefreshToken(refreshtoken);
    }

    const Addteacher = async () => {
        try {
            const teacherresponse = await fetch("https:localhost.com:3000/create-teacher", {
                method: "POST",
                body: JSON.stringify({ name: name, gender: gender, birth: birthdate, join: joindate, mother: mothername, father: fathername, mobilenumber: mobilenumber, relation: relation, relationMobileNumber: relationmobilenumber, address: address, branch: Branchvalue, subject: subjectname, role: teacherRolevalue, authRole: role }),
                Authorization: `Bearer ${accessToken}`,
                headers: { Accept: "application/JSON, text/plain, */*", 'Content-Type': 'application/json; charset=UTF-8' }
            });

            const teacherdata = await teacherresponse.then(data);
            if (teacherdata.success) {
                Alert.alert('successfully teacher has added')
            } else {
                if (teacherdata.message == "invalid token") {
                    generateRefreshtoken(refreshtoken);
                } else {
                    Alert.alert('this teacher cant be added right now👌')
                }
            }

        } catch (error) {
            Alert.alert(error)
        }

        const generateRefreshtoken = async (refreshtoken) => {
            try {
                const teacherresponse = await fetch("https:localhost.com:3000/generaterefreshtoken", {
                    method: "POST", Authorization: `Bearer ${refreshtoken}`
                }).then((Res) => { return Res.JSON() });

                const teacherdata = teacherresponse

                if (teacherresponse.success) {
                    AsyncStorage.setItem("accesstoken", teacherdata.accesstoken)
                    AsyncStorage.setItem("refreshtoken", teacherdata.refreshtoken)
                    await Addteacher();
                }
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        getuserdata()
    }, [])

    {/* <Text> Integration End </Text> */ }

    return (

        <SafeAreaView>
            <ScrollView>

                <View style={{ flex: 1, backgroundColor: colors.primary, justifyContent: 'center', }}>

                    <Image source={require("./Image/School.jpg")} style={{ height: 150, width: 150, justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 30 }}></Image>

                    <TextInput textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeOutlineColor={colors.text} outlineColor={colors.text} mode='outlined' onChangeText={namedetails} value={name} placeholder='Name' style={{ fontSize: 18, width: '87%', backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center', marginTop: 20 }}></TextInput>

                    <View style={{ width: '87%', height: 60, backgroundColor: 'transparent', marginTop: 20, justifyContent: 'center', alignSelf: 'center', borderColor: colors.text, borderWidth: 1 }}>

                        <View>
                            <RadioButton.Group value={gender} onValueChange={(gender) => { setgender(gender) }}>

                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 13, columnGap: 35 }}>
                                    <Text style={{ color: colors.text, fontSize: 20 }}>Gender</Text>

                                    <View style={{ flexDirection: 'row', }}>
                                        <RadioButton value='male' color='black'></RadioButton>
                                        <Text style={{ textAlign: 'center', color: colors.text, fontSize: 20 }}>Male</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', }}>
                                        <RadioButton value='female' color='black'></RadioButton>
                                        <Text style={{ textAlign: 'center', color: colors.text, fontSize: 20 }}>Female</Text>
                                    </View>

                                </View>
                            </RadioButton.Group>
                        </View>

                    </View>


                    <TextInput textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeOutlineColor={colors.text} outlineColor={colors.text} mode='outlined' onChangeText={mobilenumberdetails} value={mobilenumber} placeholder='Mobile Number' style={{ fontSize: 18, width: '87%', backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center', marginTop: 20 }}></TextInput>

                    <View style={{ justifyContent: 'center', alignSelf: 'center', width: '87%', flexDirection: 'row', borderRadius: 5, borderColor: colors.text, borderWidth: 1, marginTop: 20 }}>
                        <Icon name='calendar-month-outline' color={colors.text} size={25} style={{ borderRadius: 18, alignSelf: 'center' }} onPress={() => { setOpen(true) }} />
                        <TextInput disabled textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeUnderlineColor={'transparent'} underlineColor={'transparent'} placeholder='Date of Joining' style={{ fontSize: 18, width: '80%', backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center', }}>{joindata ? joindate.toLocaleDateString() : ""}</TextInput>

                        <DatePicker
                            modal
                            open={open}
                            mode='date'
                            date={joindate}
                            onConfirm={(date) => {
                                setOpen(false)
                                setjoindate(date)
                                setjoindata(date)
                                console.log("==========>" + date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}>
                        </DatePicker>

                    </View>

                    <View>
                        <Dropdown
                    style={[styles.dropdown,{borderBottomColor: colors.text,borderColor: colors.text  }]}
                    placeholderStyle={[styles.placeholderStyle,{color: colors.text}]}
                    selectedTextStyle={[styles.selectedTextStyle,{color:colors.text}]}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataa}
                            search

                            maxHeight={400}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Role"
                            searchPlaceholder="Search..."
                            value={teacherRolevalue}
                            onChange={item => {
                                setteacherRolevalue(item.value);
                            }}

                        />
                    </View>
                    {/* <Text> Dropdown views above </Text> */}


                    <Card style={{ width: '87%', height: 180, marginTop: 20, alignSelf: 'center' }}>

                        <Text style={{ color: colors.text, fontSize: 16, marginStart: 10, fontWeight: 'bold', marginTop: 6 }}>Emergency Contact</Text>
                        <TextInput textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeOutlineColor={colors.text} outlineColor={colors.text} mode='outlined' onChangeText={relationdetails} value={relation} placeholder='Relation' style={{ fontSize: 18, width: '96%', backgroundColor: 'transparent', borderRadius: 5, marginTop: 10, marginStart: 7 }}></TextInput>
                        <TextInput textColor={colors.text} placeholderTextColor={colors.text} textContentType='name' activeOutlineColor={colors.text} outlineColor={colors.text} mode='outlined' onChangeText={relationmobilenumberdetails} value={relationmobilenumber} placeholder='Mobile Number' style={{ fontSize: 18, width: '96%', backgroundColor: 'transparent', borderRadius: 5, marginTop: 10, marginStart: 7 }}></TextInput>

                    </Card>

                    {/* <Text> Card view above </Text> */}

                    <TextInput textColor={colors.text} placeholderTextColor={colors.text} multiline={true} textContentType='name' activeOutlineColor={colors.text} outlineColor={colors.text} mode='outlined' onChangeText={addressdetails} value={address} placeholder='Address' style={{ fontSize: 18, width: '87%', backgroundColor: 'transparent', borderRadius: 5, alignSelf: 'center', marginTop: 20, height: 200, justifyContent: 'center' }}></TextInput>

                    <Button textColor={colors.text} buttonColor={colors.bg} labelStyle={{ fontSize: 20, color: colors.text, fontWeight: 'bold' }} style={{ width: '40%', height: 55, borderColor: colors.primary, justifyContent: "center", alignSelf: 'center', borderRadius: 10, margin:10 }} onPress={()=>navigation.navigate('Otherstafflist')}>
                        SAVE
                    </Button >

                    {/* <Text> Button view above </Text> */}


                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    dropdown: {

        width: '87%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 57,
        marginTop: 20
    },

    placeholderStyle: {
        fontSize: 16,
        height: 20,
        color: 'black',
        alignSelf: 'center',
        justifyContent: 'center', margin: 6
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000000', columnGap: 7, margin: 7, width: '88%', alignSelf: 'center'

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

// {/* <Text> Dropdown styles </Text> */ }
const styless = StyleSheet.create({
    container: { padding: 2 },
    dropdown: {
        height: 80,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 1,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});

export default Addteacher;




