import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Dialog, Portal, RadioButton, Searchbar, Text, TextInput} from 'react-native-paper'
import {ScrollView, StyleProp, TextStyle, View, ViewStyle} from 'react-native'

type LocationType = {
    place_id: number
    licence: string
    osm_type: string
    osm_id: number
    lat: string
    lon: string
    category: string
    type: string
    place_rank: number
    importance: number
    addresstype: string
    name: string
    display_name: string
    address: any
    boundingbox: string[]
}

type Props = {
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
    modalStyle?: StyleProp<ViewStyle>
    loaderColor?: string
    loaderSize: number | 'small' | 'large'
    modalBgColor: string
    dismissable: boolean
    icon?: string
    iconSize?: number
}

const OpenStreetMapSearchPlace: React.FC<Props> = (
    {
        setLocation,
        mode,
        style,
        contentStyle,
        outlineStyle,
        searchBarStyle,
        searchBarInputStyle,
        searchResultLabelStyle,
        modalStyle,
        loaderSize,
        location = undefined,
        lang = 'en',
        noResultFoundText = 'No result found',
        placeHolder = 'Search place',
        searchPlaceHolder = 'Enter address',
        loaderColor= 'blue',
        modalBgColor = 'white',
        dismissable = true,
        icon = 'map-marker',
        iconSize= 24
    }
) => {
    const [value, setValue] = React.useState<string>('')
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
        const location: LocationType | undefined = data?.find((datum: any) => datum.place_id.toString() === selectedValue)

        if (location) {
            setLocation(location)
        }
    }, [selectedValue])

    const selectedLabel = (): string => {
        const location: LocationType | undefined = data?.find((datum: any) => datum.place_id.toString() === selectedValue)
        return location ? location?.display_name : ''
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
                left={icon && <TextInput.Icon icon={icon} size={iconSize} />}
            />

            <Portal>
                <Dialog visible={show} onDismiss={() => setShow(false)} style={{backgroundColor: modalBgColor}} dismissable={dismissable}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Dialog.Content style={modalStyle}>
                            <Searchbar
                                value={value}
                                onChangeText={setValue}
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

export {OpenStreetMapSearchPlace, LocationType}
