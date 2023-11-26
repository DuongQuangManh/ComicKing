import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ScrollViewProps,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {ScreenProps} from './screen.props';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {myColors} from '@utils';
import { useAppSelector } from '@redux/store';

const isIos = Platform.OS === 'ios';


function ScreenWithoutScrolling(props: ScreenProps) {
  const colorTheme = useAppSelector(state => state.userSlice.colorTheme);
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = {paddingTop: props.unsafe || isIos ? 0 : insets.top};
  const isFocused = useIsFocused();
  
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={
        props.removekeyBoard ? undefined : isIos ? 'padding' : undefined
      }
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      {isFocused ? (
        <StatusBar
          translucent={props.translucent}
          backgroundColor={props.statusBarColor ?? '#fff'}
          barStyle={props.statusBar ?? 'dark-content'}
        />
      ) : null}
      {isIos && !props.unsafe && (
        <View
          style={{ height: insets.top, backgroundColor: colorTheme === 'light' ? myColors.background : myColors.backgroundDark }}
        />
      )}
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps & ScrollViewProps) {
  const colorTheme = useAppSelector(state => state.userSlice.colorTheme);
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const insetStyle = {paddingTop: props.unsafe || isIos ? 0 : insets.top};
  const isFocused = useIsFocused();

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      {isFocused ? (
        <StatusBar
          translucent={props.translucent}
          backgroundColor={props.statusBarColor ?? '#fff'}
          barStyle={props.statusBar ?? 'dark-content'}
        />
      ) : null}
      {isIos && !props.unsafe && (
        <View
          style={{ height: insets.top, backgroundColor: colorTheme === 'light' ? myColors.background : myColors.backgroundDark }}
        />
      )}
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          {...props}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || 'handled'
          }>
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps & ScrollViewProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
