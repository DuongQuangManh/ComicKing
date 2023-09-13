import React, {useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import RNDatePicker from 'react-native-date-picker';
import moment from 'moment';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {WINDOW_WIDTH, myColors} from '@utils';
import Input from './Input';
import Icon from './Icon';
moment.locale('vi');

export type DatePickerProps = {
  placeholder: string;
  errorMessage?: string;
  value?: string;
  required?: boolean;
  format?: string;
  dateCount?: string;
  maxDate?: Date;
  borderColor?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  isMaxDateNow?: boolean;
  onChangeText: (value?: string) => void;
};

const DatePicker = ({
  placeholder,
  value,
  disabled,
  onChangeText,
  format = 'DD/MM/YYYY',
  maxDate,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const dataObj = value ? moment(value, format) : null;
  const getDayBefore = () => {
    let currentDate = new Date();
    let dayBefore = new Date(currentDate);
    dayBefore.setDate(currentDate.getDate() - 1);
    return dayBefore;
  };
  const getDayAfter = () => {
    let currentDate = new Date();
    let dayBefore = new Date(currentDate);
    dayBefore.setDate(currentDate.getDate() + 1);
    return dayBefore;
  };
  const renderMaxDate = () => {
    return getDayBefore();
  };
  const renderMinDate = () => {
    return undefined;
  };

  const renderInitDate = () => {
    if (dataObj) return dataObj.toDate();
    if (maxDate) return maxDate;
    return getDayBefore();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        disabled={disabled}
        onPress={() => setOpen(true)}>
        <Input
          onChangeText={() => {}}
          pointerEvents="none"
          editable={false}
          placeholder={placeholder}
          value={dataObj ? dataObj.format(format) : ''}
          style={{flex: 1}}
        />
        <Icon style={{position: 'absolute', right: 5}} name="date-range" />
      </TouchableOpacity>
      <RNDatePicker
        modal
        mode="date"
        maximumDate={renderMaxDate()}
        minimumDate={renderMinDate()}
        open={open}
        date={renderInitDate()}
        locale="vi_VN"
        title={placeholder}
        confirmText={'Confirm'}
        cancelText={'Cancel'}
        onConfirm={selectedDate => {
          setOpen(false);
          onChangeText(moment(selectedDate).format(format));
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
  },
});
