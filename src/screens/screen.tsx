import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ScrollViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenProps } from './screen.props';
import { isNonScrolling, offsets, presets } from './screen.presets';
import { myColors } from '@utils';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.unsafe || isIos ? 0 : insets.top };
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={
        props.removekeyBoard ? undefined : isIos ? 'padding' : undefined
      }
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        backgroundColor={props.statusBarColor ?? '#fff'}
        barStyle={props.statusBar ?? 'dark-content'}
      />
      {isIos && !props.unsafe && (
        <View
          style={{ height: insets.top, backgroundColor: myColors.background }}
        />
      )}
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps & ScrollViewProps) {
  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const insetStyle = { paddingTop: props.unsafe || isIos ? 0 : insets.top };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        backgroundColor={props.statusBarColor ?? '#fff'}
        barStyle={props.statusBar ?? 'dark-content'}
      />
      {isIos && !props.unsafe && (
        <View
          style={{ height: insets.top, backgroundColor: myColors.background }}
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
