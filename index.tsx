import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Dialog, Portal, RadioButton, Searchbar, Text, TextInput} from 'react-native-paper'
import {ScrollView, StyleProp, TextStyle, View, ViewStyle} from 'react-native'
import {LocationType} from "./interfaces"

type Props = {
    value: string
    onChange: (text: string) => void
    location?: LocationType
    setLocation: (location: LocationType) => void
    lang?: string
    noResultFoundText?: string
    placeHolder?: string
    searchPlaceHolder?: string
    mode: 'outlined' | 'flat'
    style?: StyleProp<TextStyle>
    contentStyle?: StyleProp<TextStyle>
    outlineStyle?: StyleProp<ViewStyle>
    searchBarStyle?: StyleProp<TextStyle>
    searchBarInputStyle?: StyleProp<TextStyle>
    searchResultLabelStyle?: StyleProp<TextStyle>
    loaderColor?: string
    loaderSize: number | 'small' | 'large'
    modalBgColor: string
    dismissable: boolean
}

const OpenStreetMapSearchPlace: React.FC<Props> = (
    {
        value,
        onChange,
        location,
        setLocation,
        lang = 'en',
        noResultFoundText = 'No result found',
        placeHolder = 'Search place',
        searchPlaceHolder = 'Enter address',
        mode,
        style,
        contentStyle,
        outlineStyle,
        searchBarStyle,
        searchBarInputStyle,
        searchResultLabelStyle,
        loaderColor= 'blue',
        loaderSize,
        modalBgColor = 'white',
        dismissable = true
    }
) => {
    const [show, setShow] = useState<boolean>(false)
    const [data, setData] = useState<LocationType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string>('')

    useEffect(() => {
        if (value !== '') {
            setLoading(true)

            fetch(
                `https://nominatim.openstreetmap.org/search?q=${value}&format=jsonv2&addressdetails=1&accept-language=${lang}&dedupe=1&limit=9`,
            )
                .then((res: Response) => res.json())
                .then(d => setData(d))
                .finally(() => setLoading(false))
        }
    }, [value])

    useEffect(() => {
        const location: LocationType | undefined = data.find((datum: any) => datum.place_id.toString() === selectedValue)

        if (location) {
            setLocation(location)
        }
    }, [selectedValue])

    const selectedLabel = (): string => {
        const location: LocationType | undefined = data.find((datum: any) => datum.place_id.toString() === selectedValue)
        return location ? location.display_name : ''
    }

    return (
        <>
            <TextInput
                mode={mode}
                placeholder={placeHolder}
                style={style}
                value={selectedLabel()}
                contentStyle={contentStyle}
                onTouchStart={() => setShow(true)}
                outlineStyle={outlineStyle}
            />

            <Portal>
                <Dialog visible={show} onDismiss={() => setShow(false)} style={{backgroundColor: modalBgColor}} dismissable={dismissable}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Dialog.Content>
                            <Searchbar
                                value={value}
                                onChangeText={onChange}
                                placeholder={searchPlaceHolder}
                                inputStyle={searchBarInputStyle}
                                style={searchBarStyle}
                                autoFocus={true}
                            />

                            {data.length > 0 && (
                                <>
                                    <RadioButton.Group
                                        onValueChange={(value: string) => {
                                            setSelectedValue(value)
                                            setShow(false)
                                        }}
                                        value={selectedValue}>
                                            {data.map((datum: LocationType) => (
                                                <RadioButton.Item
                                                    key={datum.place_id}
                                                    label={datum.display_name}
                                                    value={datum.place_id.toString()}
                                                    labelStyle={searchResultLabelStyle}
                                                />
                                        ))}
                                    </RadioButton.Group>
                                </>
                            )}

                            {loading && (
                                <View style={{marginBottom: 20}}>
                                    <ActivityIndicator animating={true} color={loaderColor} size={loaderSize} />
                                </View>
                            )}

                            {data.length === 0 && (
                                <View style={{alignItems: 'center', marginTop: 20}}>
                                    <Text style={searchResultLabelStyle}>{noResultFoundText}</Text>
                                </View>
                            )}
                        </Dialog.Content>
                    </ScrollView>
                </Dialog>
            </Portal>
        </>
    )
}

module.exports = OpenStreetMapSearchPlace
