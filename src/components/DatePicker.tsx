import React, { useState } from 'react'
import { HelperText, TextInput } from 'react-native-paper'
// import { Box, FormLabel } from 'components/styled'
import RNDatePicker from 'react-native-date-picker'
import moment from 'moment'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
// import { useTranslation } from 'react-i18next'
// import { getErrorMessage } from 'components/Form/Form.utils'
import { myColors } from '@utils'
moment.locale('vi')

export type DatePickerProps = {
    label: string
    errorMessage?: string
    value?: string
    required?: boolean
    format?: string
    dateCount?: string
    maxDate?: Date
    borderColor?: string
    hideLabel?: boolean
    disabled?: boolean
    isMaxDateNow?: boolean
    onChangeText: (value?: string) => void
}

const DatePicker = ({
    label,
    errorMessage,
    required,
    value,
    disabled,
    onChangeText,
    dateCount,
    format = 'DD/MM/YYYY',
    maxDate,
    borderColor,
    isMaxDateNow,
    hideLabel,
}: DatePickerProps) => {
    const [open, setOpen] = useState(false)
    const [countDate, setCountDate] = useState('')
    const [dataSelect, setDataSelect] = useState<Date>()
    const dataObj = value ? moment(value, format) : null

    //   const { t } = useTranslation(['formFields'])
    const isExpireDate = label === 'expire'
    const isDoi = label == 'doi'
    const caculateDateNotState = (selectedDate: any) => {
        const pastDate = moment(selectedDate, 'YYYY-MM-DD')
        const currentDate = moment()
        const duration = currentDate.diff(pastDate, 'month')
        let formattedDiff = ''
        if (duration > 12) {
            const years = Math.floor(duration / 12).toFixed(0)
            if (duration % 12 > 0) {
                formattedDiff = `${years} năm ${duration % 12} tháng`
            } else {
                formattedDiff = `${years} năm`
            }
        } else {
            formattedDiff = `${duration} tháng`
        }
        return formattedDiff
    }
    const caculateDate = (selectedDate: any) => {
        const formatData = caculateDateNotState(selectedDate)
        setCountDate(formatData)
    }

    const getDayBefore = () => {
        let currentDate = new Date()
        let dayBefore = new Date(currentDate)
        dayBefore.setDate(currentDate.getDate() - 1)
        return dayBefore
    }
    const getDayAfter = () => {
        let currentDate = new Date()
        let dayBefore = new Date(currentDate)
        dayBefore.setDate(currentDate.getDate() + 1)
        return dayBefore
    }
    const renderMaxDate = () => {
        if (isDoi || isMaxDateNow) {
            return new Date()
        }
        if (isExpireDate) {
            return undefined
        }
        return getDayBefore()
    }
    const renderMinDate = () => {
        if (isDoi) {
            return undefined
        }
        if (isExpireDate) {
            return getDayAfter()
        }
        return undefined
    }

    const renderInitDate = () => {
        if (dataObj) {
            return dataObj.toDate()
        }
        if (isExpireDate) {
            return getDayAfter()
        }
        if (isDoi) {
            return new Date()
        }
        if (maxDate) {
            return maxDate
        }
        return getDayBefore()
    }

    return (
        <View style={styles.container}>
            {/* {!hideLabel && (
        <Box mb="5">
          <FormLabel>
            {label} {required && <FormLabel color={color.palette.main}>*</FormLabel>}
          </FormLabel>
        </Box>
      )} */}

            <TouchableOpacity disabled={disabled} onPress={() => setOpen(true)}>
                <TextInput
                    value={dataObj ? dataObj.format(format) : ''}
                    mode="outlined"
                    autoCapitalize="none"
                    placeholderTextColor="#B2B2B2"
                    placeholder={label}
                    pointerEvents="none"
                    outlineStyle={{ borderRadius: 4 }}
                    editable={false}
                    //   right={
                    //     <TextInput.Icon
                    //       icon="calendar"
                    //       pointerEvents="none"
                    //       iconColor={borderColor || color.palette.black5}
                    //     />
                    //   }
                    theme={{
                        colors: {
                            outline: borderColor || myColors.error,
                        },
                    }}
                />
            </TouchableOpacity>

            <RNDatePicker
                modal
                mode="date"
                maximumDate={renderMaxDate()}
                minimumDate={renderMinDate()}
                open={open}
                date={renderInitDate()}
                locale="vi_VN"
                title={label}
                confirmText={'Confirm'}
                cancelText={'Cancel'}
                onConfirm={(selectedDate) => {
                    setOpen(false)
                    onChangeText(moment(selectedDate).format(format))
                    caculateDate(selectedDate)
                    setDataSelect(selectedDate)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            {!!dateCount && !dataSelect && dataObj && (
                <TextInput style={styles.dateCount}>{dateCount + ` ${caculateDateNotState(dataObj)}`}</TextInput>
            )}
            {!!dateCount && dataSelect && <TextInput>{dateCount + ` ${countDate}`}</TextInput>}
            {!!errorMessage && (
                <HelperText type="error" visible>
                    {/* {getErrorMessage(label, errorMessage, t)} */}
                </HelperText>
            )}
        </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 15
    },
    input: {
        backgroundColor: myColors.background,
        borderRadius: 10,
        fontSize: 15
    },
    dateCount: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        textAlign: 'right'
    }
})