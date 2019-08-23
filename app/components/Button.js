import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, children, bStyle, tStyle }) => {
    const { buttonStyle, textStyle } = styles
    return(
        <TouchableOpacity onPress={onPress} style={[buttonStyle, bStyle]}>
            <Text style={[textStyle, tStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#997A2D',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export default Button