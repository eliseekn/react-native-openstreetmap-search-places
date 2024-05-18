# OpenStreetMapSearchPlace
[![NPM version](https://img.shields.io/npm/v/react-native-openstreetmap-search-places.svg?style=flat)](https://www.npmjs.com/package/react-native-openstreetmap-search-places) 
[![NPM downloads](https://img.shields.io/npm/dm/react-native-openstreetmap-search-places.svg?style=flat)](https://npmjs.org/package/react-native-openstreetmap-search-places) 

A React Native component to search places using OpenStreetMap

## Demo

<img src="./Screenrecorder-2024-05-18-14-29-50-492.gif" width="250">

## Requirements
```bash
node v20.13.1
```

## Installation
```bash
npm install react-native-openstreetmap-search-places
```
```bash
yarn add react-native-openstreetmap-search-places
```

## Usage

```tsx
import {useState} from 'react'
import {OpenStreetMapSearchPlace, LocationType} from 'react-native-openstreetmap-search-places'

const MyComponent = () => {
    const [address, setAddress] = useState<string>('')
    const [location, setLocation] = useState<LocationType | undefined>(undefined)

    return (
        <OpenStreetMapSearchPlace
            value={address}
            onChange={setAddress}
            setLocation={setLocation}
            lang='en'
            noResultFoundText='No result found'
            placeHolder='Search place'
            searchPlaceHolder='Enter address'
            mode='outlined'
            style={{
                height: 61, 
                backgroundColor: '#C7E9FD'
            }}
            contentStyle={{fontFamily: 'Roboto'}}
            outlineStyle={{
                borderRadius: 14, 
                borderWidth: 0, 
                marginHorizontal: 2
            }}
            searchBarStyle={{
                backgroundColor: '#C7E9FD',
                borderRadius: 12,
                borderWidth: 0,
                marginTop: 2,
            }}
            searchBarInputStyle={{fontFamily: 'Roboto'}}
            searchResultLabelStyle={{fontSize: 14}}
            modalStyle={{borderRadius: 14}}
            loaderColor='blue'
            loaderSize='small'
            modalBgColor='white'
            dismissable
        />
    )
}

export default MyComponent
```

## Props

| Property               | Type                 | Required | Description                                     |
|------------------------|----------------------|----------|-------------------------------------------------|
| value                  | String               | True     | Value to search                                 |
| onChange               | function             | True     | Set searched value                              |
| location               | LocationType         | True     | Location data of searched value                 |
| setLocation            | function             | True     | Set location value of searched value            |
| lang                   | String               | False    | Language used to search places (default en)     |
| noResultFoundText      | String               | False    | Text to display when no result found            |
| placeHolder            | String               | False    | Input text component placeholder                |
| searchPlaceHolder      | String               | False    | Search input text placeholder                   |
| mode                   | String               | True     | Text input style display (eg: outlined or flat) |
| style                  | StyleProp<TextStyle> | False    | Input text component style                      |
| contentStyle           | StyleProp<TextStyle> | False    | Input text component content style              |
| outlineStyle           | StyleProp<ViewStyle> | False    | Input text component outline style              |
| searchBarStyle         | StyleProp<TextStyle> | False    | Search bar component style                      |
| searchBarInputStyle    | StyleProp<TextStyle> | False    | Search input text component style               |
| searchResultLabelStyle | StyleProp<TextStyle> | False    | Search result label style                       |
| modalStyle             | StyleProp<ViewStyle> | False    | Search results modal custom style               |
| loaderColor            | String               | False    | Loader color (default blue)                     |
| loaderSize             | String or Number     | True     | Loader size (eg: 12, small or large)            |
| loaderColor            | String               | True     | Loader color                                    |
| modalBgColor           | String               | True     | Modal background color                          |
| dismissable            | Boolean              | True     | Set if modal dismissable                        |
| icon                   | String               | False    | Input text component left icon. [(See scons list)](https://callstack.github.io/react-native-paper/docs/guides/icons)                 |
| iconSize               | Number               | False    | Input text component left icon size             |

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
