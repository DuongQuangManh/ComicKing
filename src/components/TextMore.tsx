import {myColors} from '@utils';
import React, {useState, FC} from 'react';
import {TouchableOpacity} from 'react-native';
import Text from './Text';

interface componentProps {
  text?: string;
}
const TextMore: FC<componentProps> = ({text}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isExpanded ? <Text>{text}</Text> : <Text numberOfLines={5}>{text}</Text>}
      {!isExpanded && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text type="semibold_16" style={{color: myColors.primary}}>
            Thêm
          </Text>
        </TouchableOpacity>
      )}
      {isExpanded && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text type="semibold_16" style={{color: myColors.primary}}>
            Ẩn
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default TextMore;
