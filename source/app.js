import React, { useEffect, useState } from "react"
import { TouchableOpacity, SafeAreaView, View, Text } from "react-native"
import { Player, MediaStates } from "@react-native-community/audio-toolkit"
import ScreenBrightness from "react-native-screen-brightness"

const player = new Player("pop.mp3", {
    autoDestroy: false,
})

let interval1 = undefined
let interval2 = undefined

const reset = (setBrightness, setTime) => {
    clearTimeout(interval1)
    clearTimeout(interval2)
    setTime("00:00")
    setBrightness(1)
}

const startTimer = (duration, setTime = () => {}, setBrightness = () => {}, onDone = () => {}) => {
    reset(setBrightness, setTime)

    let timer = duration
    let minutes
    let seconds

    interval1 = setTimeout(() => {
        setBrightness(0.05)
    }, 3 * 1000)

    interval2 = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        setTime(minutes + ":" + seconds)

        if (--timer < 0) {
            reset(setBrightness, setTime)
            onDone()
        }
    }, 1000)
}

const styles = {
    container: {
        padding: "15%",
    },
    button: {
        backgroundColor: "#06f",
        marginTop: "10%",
        padding: 10,
        borderRadius: 4,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 25,
    },
    time: {
        fontSize: 50,
        textAlign: "center",
        width: "100%",
        marginTop: "10%",
    },
}

const Button = props => (
    <TouchableOpacity {...props}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
)

ScreenBrightness.setBrightness(1)

const App = () => {
    const [time, setTime] = useState("00:00")
    const [brightness, setBrightness] = useState(1)

    useEffect(() => {
        ScreenBrightness.setBrightness(brightness)
    }, [brightness])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Button
                    title="02:00"
                    onPress={() => {
                        startTimer(2 * 60, setTime, setBrightness, () => player.play())
                    }}
                />
                <Button
                    title="01:00"
                    onPress={() => {
                        startTimer(1 * 60, setTime, setBrightness, () => player.play())
                    }}
                />
                <Button
                    title="00:30"
                    onPress={() => {
                        startTimer(0.5 * 60, setTime, setBrightness, () => player.play())
                    }}
                />
                <Button
                    title="00:15"
                    onPress={() => {
                        startTimer(0.25 * 60, setTime, setBrightness, () => player.play())
                    }}
                />
                <Button title="Stop" onPress={() => reset(setBrightness, setTime)} />
                <Text style={styles.time}>{time}</Text>
            </View>
        </SafeAreaView>
    )
}

export { App }
